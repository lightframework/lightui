import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { ipsetTemplateUpdateApiOpsIpsetsTemplatesById } from "@/services/ops/ipsettemplate"
import { ModalForm, ProFormText } from "@ant-design/pro-components"
import { message } from "antd"
import ExcludeMultiSelect from "./exclude-multi-select"
import IspSearchSelect from "./isp-search-select"
import LimitMultiSelect from "./limit-multi-select"

export default function IpsetTemplateUpdateModalForm({
  open,
  onCancel,
  ipsetTemplate,
  onFinish,
}: {
  open: boolean
  onCancel: VoidFunction
  ipsetTemplate?: OPS.IpsetTemplateInfo
  onFinish?: VoidFunction
}) {
  return (
    <ModalForm<OPS.IpsetTemplateUpdateReq>
      title="更新ipset模板"
      name="ipset-template-update"
      width={MODAL_FORM_WIDTH}
      autoFocusFirstInput
      layout="horizontal"
      open={open}
      initialValues={{
        ...ipsetTemplate,
        limit: ipsetTemplate?.limit ?? [],
        exclude: ipsetTemplate?.exclude ?? [],
        isp: ipsetTemplate?.isp === "" ? undefined : ipsetTemplate?.isp,
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel,
        maskClosable: false,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        if (!ipsetTemplate) return false
        await ipsetTemplateUpdateApiOpsIpsetsTemplatesById(
          { id: String(ipsetTemplate.id) },
          formData,
        )
        message.success("更新成功")
        onCancel()
        onFinish?.()
        return true
      }}
    >
      <ProFormText
        label="模板名称"
        name="name"
        placeholder=""
        rules={[{ required: true, message: "请输入模板名称" }]}
      />
      <LimitMultiSelect />
      <ExcludeMultiSelect />
      <IspSearchSelect />
    </ModalForm>
  )
}
