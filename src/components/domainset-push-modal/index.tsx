import { domainsetPushApiOpsDomainsetsPush } from "@/services/ops/domainset"
import {
  ModalForm,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { message } from "antd"
import DomainsetVersionTransfer from "./domainset-version-transfer"
import EnvTransfer from "./env-transfer"

export default function DomainsetPushModal({
  open,
  onCancel,
  onFinish,
}: {
  open: boolean
  onCancel: VoidFunction
  onFinish?: VoidFunction
}) {
  return (
    <ModalForm<OPS.DomainsetPushReq>
      title="推送域名集"
      name="domainset-push"
      width={800}
      open={open}
      autoFocusFirstInput
      layout="horizontal"
      modalProps={{
        centered: true,
        onCancel,
        destroyOnClose: true,
        maskClosable: false,
      }}
      labelCol={{ span: 2 }}
      onFinish={async (formData) => {
        await domainsetPushApiOpsDomainsetsPush(formData)
        message.success("推送成功")
        onCancel()
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
      <EnvTransfer />

      <DomainsetVersionTransfer />

      <ProFormText
        label="pushType"
        name="pushType"
        initialValue="push"
        hidden
      />
      <ProFormSwitch label="立即推送" name="pushNow" initialValue={false} />
      <ProFormTextArea label="备注" name="description" placeholder="" />
    </ModalForm>
  )
}
