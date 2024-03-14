import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { certCreateApiOpsCerts } from "@/services/ops/cert"
import { PlusOutlined } from "@ant-design/icons"
import {
  ModalForm,
  ProFormDigit,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Button, message } from "antd"

export default function CertCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction
}) {
  const access = useAccess()

  return (
    <ModalForm<OPS.CertCreateReq>
      title="新建客户证书"
      name="customer-cert-create"
      width={MODAL_FORM_WIDTH}
      trigger={
        <Button type="primary" disabled={!access.certCreateApiOpsCerts}>
          <PlusOutlined />
          新建证书
        </Button>
      }
      autoFocusFirstInput
      layout="horizontal"
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        await certCreateApiOpsCerts(formData)
        message.success("新建成功")
        onFinish?.()
        return true
      }}
    >
      <ProFormText
        label="证书名称"
        name="certName"
        placeholder=""
        rules={[{ required: true, message: "请输入证书名称" }]}
      />
      <ProFormText
        label="域名"
        name="domain"
        placeholder=""
        rules={[
          {
            required: true,
            message: "请输入域名",
          },
        ]}
      />
      <ProFormDigit label="端口" name="port" placeholder="" />
      <ProFormTextArea label="备注" name="description" placeholder="" />
    </ModalForm>
  )
}
