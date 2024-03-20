import { useChatTagOptions } from "@/lib/hooks/data"
import { chatUpdateApiOpsChatsById } from "@/services/ops/chat"
import {
  ModalForm,
  ProFormList,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { message } from "antd"

interface FieldType {
  answer: string
  contents: { value: string }[]
  keywords: string[]
  links: { name: string; url: string }[]
  persons: string[]
  problems: { value: string }[]
  tag: string[]
  title: string
}

export default function ChatUpdateModalForm({
  open,
  onCancel,
  chat,
  onFinish,
}: {
  open: boolean
  onCancel: VoidFunction
  chat?: OPS.ChatInfo
  onFinish?: VoidFunction
}) {
  const tagQuery = useChatTagOptions()

  return (
    <ModalForm<FieldType>
      title="更新 Chat"
      name="chat-update"
      width={560}
      autoFocusFirstInput
      layout="horizontal"
      open={open}
      initialValues={
        {
          ...chat,
          contents: chat?.contents?.map((item) => ({ value: item })),
          problems: chat?.problems?.map((item) => ({ value: item })),
          links: chat?.links.map((url, index) => ({
            url,
            name: chat.linkNames[index],
          })),
        } satisfies Partial<FieldType>
      }
      modalProps={{
        centered: true,
        destroyOnClose: true,
        onCancel,
        maskClosable: false,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        if (!chat) return false
        await chatUpdateApiOpsChatsById(
          { id: String(chat.id) },
          {
            ...formData,
            contents: formData.contents.map((item) => item.value),
            problems: formData.problems.map((item) => item.value),
            links: formData.links.map((item) => item.url),
            linkNames: formData.links.map((item) => item.name),
          },
        )
        message.success("更新成功")
        onCancel()
        onFinish?.()
        return true
      }}
    >
      <div className="max-h-[80dvh] overflow-y-auto pr-4">
        <ProFormText
          label="标题"
          name="title"
          placeholder=""
          rules={[{ required: true, message: "请输入标题" }]}
        />
        <ProFormList
          label="主要内容"
          name="contents"
          copyIconProps={false}
          required
          creatorButtonProps={{ creatorButtonText: "添加一条主要内容" }}
          initialValue={[{}]}
          rules={[
            {
              validator: (_, value) => {
                if (Array.isArray(value) && value.length > 0) {
                  return Promise.resolve()
                } else {
                  return Promise.reject()
                }
              },
              message: "请添加至少一条主要内容",
            },
          ]}
        >
          <ProFormText
            placeholder=""
            name="value"
            width={390}
            rules={[{ required: true }]}
          />
        </ProFormList>
        <ProFormSelect
          mode="tags"
          label="关键词"
          name="keywords"
          placeholder="回车键划分"
          rules={[
            {
              required: true,
              message: "请输入关键词",
            },
          ]}
        />
        <ProFormList
          label="常见提问"
          name="problems"
          required
          copyIconProps={false}
          creatorButtonProps={{ creatorButtonText: "添加一条提问" }}
          initialValue={[{}]}
          rules={[
            {
              validator: (_, value) => {
                if (Array.isArray(value) && value.length > 0) {
                  return Promise.resolve()
                } else {
                  return Promise.reject()
                }
              },
              message: "请添加至少一条提问",
            },
          ]}
        >
          <ProFormText
            placeholder=""
            name="value"
            width={390}
            rules={[{ required: true }]}
          />
        </ProFormList>
        <ProFormTextArea
          label="回答"
          name="answer"
          placeholder=""
          rules={[
            {
              required: true,
              message: "请输入回答",
            },
          ]}
        />
        <ProFormList
          label="链接"
          name="links"
          copyIconProps={false}
          creatorButtonProps={{ creatorButtonText: "添加一个链接" }}
          alwaysShowItemLabel={false}
        >
          <ProFormText
            placeholder="名称"
            name="name"
            width={260}
            rules={[{ required: true }]}
          />
          <ProFormText
            placeholder="url"
            name="url"
            width={390}
            rules={[{ required: true }, { type: "url" }]}
          />
        </ProFormList>
        <ProFormSelect
          mode="tags"
          label="负责人"
          name="persons"
          placeholder="回车键划分"
          rules={[
            {
              required: true,
              message: "请输入关键词",
            },
          ]}
        />
        <ProFormSelect
          mode="tags"
          label="标签"
          name="tag"
          placeholder="回车键划分，允许自定义"
          options={tagQuery.data?.map((item) => ({ label: item, value: item }))}
          fieldProps={{
            loading: tagQuery.isFetching,
          }}
          rules={[
            {
              required: true,
              message: "请输入关键词",
            },
          ]}
        />
      </div>
    </ModalForm>
  )
}
