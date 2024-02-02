import { certPushApiOpsCertsPush } from "@/services/ops/cert"
import {
  ModalForm,
  ProFormDatePicker,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Button, message } from "antd"
import CertTransfer from "./cert-transfer"

export default function CertIssuanceModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction
}) {
  const access = useAccess()

  return (
    <ModalForm<OPS.CertPushReq>
      title="下发证书"
      name="ipset-push"
      width={800}
      trigger={
        <Button type="primary" disabled={!access.certPushApiOpsCertsPush}>
          下发
        </Button>
      }
      autoFocusFirstInput
      layout="horizontal"
      modalProps={{
        centered: true,
        destroyOnClose: true,
        maskClosable: false,
      }}
      labelCol={{ span: 2 }}
      onFinish={async (formData) => {
        await certPushApiOpsCertsPush(formData)
        message.success("下发成功")
        onFinish?.()
        return true
      }}
    >
      <ProFormText
        label="标题"
        name="title"
        placeholder=""
        rules={[
          {
            required: true,
            message: "请输入标题",
          },
        ]}
      />
      <CertTransfer />
      <ProFormDatePicker
        label="下发日期"
        name="orderTime"
        rules={[
          {
            required: true,
            message: "请选择下发日期",
          },
        ]}
      />
      <ProFormTextArea label="备注" name="description" placeholder="" />
    </ModalForm>
  )
}
