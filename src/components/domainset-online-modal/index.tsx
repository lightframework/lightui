import { domainsetOnlineApiOpsDomainsetsOnline } from "@/services/ops/domainset"
import {
  ModalForm,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { message } from "antd"
import DomainsetVersionTransfer from "./domainset-version-transfer"
import EnvTransfer from "./env-transfer"
import GrayEnvSelect from "./gray-env-select"

export default function DomainsetOnlineModal({
  open,
  onCancel,
  onFinish,
}: {
  open: boolean
  onCancel: VoidFunction
  onFinish?: VoidFunction
}) {
  return (
    <ModalForm<OPS.DomainsetOnlineReq>
      title="上线域名集"
      name="domainset-online"
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
        await domainsetOnlineApiOpsDomainsetsOnline(formData)
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
      <DomainsetVersionTransfer />
      <ProFormText
        label="pushType"
        name="pushType"
        initialValue="online"
        hidden
      />
      <ProFormSwitch label="立即上线" name="pushNow" initialValue={false} />
      <ProFormTextArea label="备注" name="description" placeholder="" />
    </ModalForm>
  )
}
