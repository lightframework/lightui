import { ipsetOnlineApiOpsIpsetsOnline } from "@/services/ops/ipset"
import {
  ModalForm,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { message } from "antd"
import EnvTransfer from "./env-transfer"
import GrayEnvSelect from "./gray-env-select"
import IpSetVersionTransfer from "./ipset-version-transfer"

export default function IpsetOnlineModal({
  open,
  onCancel,
  onFinish,
}: {
  open: boolean
  onCancel: VoidFunction
  onFinish?: VoidFunction
}) {
  return (
    <ModalForm<OPS.IpsetOnlineReq>
      title="上线ipset"
      name="ipset-online"
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
        await ipsetOnlineApiOpsIpsetsOnline(formData)
        message.success("上线成功")
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
      <GrayEnvSelect />
      <IpSetVersionTransfer />
      <ProFormText
        label="pushType"
        name="pushType"
        initialValue="online"
        hidden
      />
      <ProFormSwitch label="立即推送" name="pushNow" initialValue={false} />
      <ProFormTextArea label="备注" name="description" placeholder="" />
    </ModalForm>
  )
}
