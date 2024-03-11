import { ipsetPushApiOpsIpsetsPush } from "@/services/ops/ipset"
import {
  ModalForm,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { message } from "antd"
import EnvTransfer from "./env-transfer"
import IpSetVersionTransfer from "./ipset-version-transfer"

export default function IpsetPushModal({
  open,
  onCancel,
  onFinish,
}: {
  open: boolean
  onCancel: VoidFunction
  onFinish?: VoidFunction
}) {
  return (
    <ModalForm<OPS.IpsetPushReq>
      title="推送IP集"
      name="ipset-push"
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
        await ipsetPushApiOpsIpsetsPush(formData)
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

      <IpSetVersionTransfer />

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
