import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { domainsetCreateApiOpsDomainsets } from "@/services/ops/domainset"
import { PlusOutlined } from "@ant-design/icons"
import {
  ModalForm,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Button, message } from "antd"
import useModal from "antd/es/modal/useModal"

export default function DomainCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction
}) {
  const access = useAccess()
  const [modal, contextHolder] = useModal()

  return (
    <>
      {contextHolder}
      <ModalForm<OPS.DomainsetCreateReq>
        title="新建域名集"
        name="domainset-create"
        width={MODAL_FORM_WIDTH}
        trigger={
          <Button
            type="primary"
            disabled={!access.domainsetCreateApiOpsDomainsets}
          >
            <PlusOutlined />
            新建域名集
          </Button>
        }
        autoFocusFirstInput
        layout="horizontal"
        modalProps={{
          destroyOnClose: true,
          maskClosable: false,
        }}
        labelCol={{ span: 3 }}
        onFinish={async (formData) => {
          const ok = await modal.confirm({
            title: formData.isArchive
              ? "确定要提交为新版本吗？"
              : "确定仅保存而不提交为新版本吗？",
          })

          if (!ok) return false

          await domainsetCreateApiOpsDomainsets({
            ...formData,
            domains: (formData.domains as unknown as string)
              .split("\n")
              .map((i) => i.trim()),
          })
          message.success("新建成功")
          onFinish?.()
          return true
        }}
      >
        <ProFormText
          label="名称"
          name="name"
          placeholder=""
          rules={[{ required: true, message: "请输入域名集名称" }]}
        />
        <ProFormTextArea
          label="域名集"
          name="domains"
          placeholder=""
          fieldProps={{
            autoSize: {
              minRows: 6,
              maxRows: 10,
            },
          }}
          rules={[{ required: true, message: "请输入域名集" }]}
        />
        <ProFormSwitch
          label="存档"
          name="isArchive"
          tooltip="提交为新版本"
          initialValue={false}
        />
        <ProFormTextArea label="备注" name="description" placeholder="" />
      </ModalForm>
    </>
  )
}
