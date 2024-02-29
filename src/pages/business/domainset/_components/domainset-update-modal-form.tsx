import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { useQueryDomainsetInfo } from "@/lib/hooks/data"
import { domainsetUpdateApiOpsDomainsetsById } from "@/services/ops/domainset"
import {
  ModalForm,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { message } from "antd"

export default function DomainsetUpdateModalForm({
  open,
  onCancel,
  domainset,
  onFinish,
}: {
  open: boolean
  onCancel: VoidFunction
  domainset?: OPS.DomainsetList
  onFinish?: VoidFunction
}) {
  const { data, refetch } = useQueryDomainsetInfo(domainset?.id)

  if (!data) return null

  return (
    <ModalForm<OPS.DomainsetUpdateReq>
      title="更新域名集"
      name="domainset-update"
      width={MODAL_FORM_WIDTH}
      autoFocusFirstInput
      layout="horizontal"
      open={open}
      initialValues={{ ...domainset, domains: data.domains?.join("\n") }}
      modalProps={{
        destroyOnClose: true,
        onCancel,
        maskClosable: false,
      }}
      labelCol={{ span: 3 }}
      onFinish={async (formData) => {
        if (!domainset) return false
        await domainsetUpdateApiOpsDomainsetsById(
          { id: String(domainset.id) },
          {
            ...formData,
            domains: (formData.domains as unknown as string)
              .split("\n")
              .map((i) => i.trim()),
          },
        )
        message.success("更新成功")
        onCancel()
        refetch()
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
  )
}
