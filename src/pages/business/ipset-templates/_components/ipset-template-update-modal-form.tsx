import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { ipsetTemplateUpdateApiOpsIpsettemplatesById } from "@/services/ops/ipsettemplate"
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { message } from "antd"
import IspSearchSelect from "./isp-search-select"

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
        await ipsetTemplateUpdateApiOpsIpsettemplatesById(
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
      <ProFormTextArea
        label="limit"
        name="limit"
        placeholder=""
        rules={[{ required: true, message: "请输入limit" }]}
      />
      <ProFormTextArea label="exclude" name="exclude" placeholder="" />
      <IspSearchSelect />
    </ModalForm>
  )
}
