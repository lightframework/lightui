import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { useChatTagOptions } from "@/lib/hooks/data"
import { chatCreateApiOpsChats } from "@/services/ops/chat"
import { PlusOutlined } from "@ant-design/icons"
import {
  ModalForm,
  ProFormList,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Button, message } from "antd"

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

export interface ChatCreateModalFormProps {
  onFinish?: VoidFunction
}

export default function ChatCreateModalForm({
  onFinish,
}: ChatCreateModalFormProps) {
  const access = useAccess()
  const tagQuery = useChatTagOptions()

  return (
    <ModalForm<FieldType>
      title="新建 Chat"
      name="chat-create"
      width={MODAL_FORM_WIDTH}
      trigger={
        <Button type="primary" disabled={!access.chatCreateApiOpsChats}>
          <PlusOutlined />
          新建
        </Button>
      }
      autoFocusFirstInput
      layout="horizontal"
      modalProps={{
        centered: true,
        destroyOnClose: true,
        maskClosable: false,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        await chatCreateApiOpsChats({
          ...formData,
          contents: formData.contents.map((item) => item.value),
          problems: formData.problems.map((item) => item.value),
          links: formData.links.map((item) => item.url),
          linkNames: formData.links.map((item) => item.name),
        })
        message.success("新建成功")
        onFinish?.()
        return true
      }}
    >
      <div className="max-h-[80dvh] overflow-y-auto">
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
            width={360}
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
          copyIconProps={false}
          required
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
            width={360}
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
          required
          creatorButtonProps={{ creatorButtonText: "添加一个链接" }}
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
              message: "请添加至少一个链接",
            },
          ]}
          alwaysShowItemLabel={false}
        >
          <ProFormText
            placeholder="名称"
            name="name"
            width={240}
            rules={[{ required: true }]}
          />
          <ProFormText
            placeholder="url"
            name="url"
            width={360}
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
