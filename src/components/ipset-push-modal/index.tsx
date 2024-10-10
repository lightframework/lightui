import { ipsetPushApiOpsIpsetsPush } from "@/services/ops/ipset"
import {
  ModalForm,
  ProFormDependency,
  ProFormRadio,
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
      title="推送IPSet"
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
        message.info("正在推送，请查看推送记录或钉钉消息")
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
      <ProFormDependency name={["pushNow"]}>
        {({ pushNow }) =>
          pushNow && (
            <ProFormRadio.Group
              label="推送类型"
              name="related"
              initialValue={false}
              options={[
                { value: false, label: "Primary" },
                { value: true, label: "Related" },
              ]}
              help={
                <span className="text-red-600">
                  D6.0.5版本以下的Orch，默认全部推送Primary类型
                </span>
              }
            />
          )
        }
      </ProFormDependency>
      <ProFormTextArea label="备注" name="description" placeholder="" />
    </ModalForm>
  )
}
