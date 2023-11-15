import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { cloudUpdateApiCmdbCloudsByUid } from "@/services/cmdb/cloud"
import {
  ModalForm,
  ProFormDigit,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { message } from "antd"

export default function CloudUpdateModalForm({
  open,
  onCancel,
  cloud,
  onFinish,
}: {
  open: boolean
  onCancel: VoidFunction
  cloud?: CMDB.CloudInfo
  onFinish?: VoidFunction
}) {
  return (
    <ModalForm<CMDB.CloudUpdateReq>
      title="更新云商"
      name="cloud-update"
      width={MODAL_FORM_WIDTH}
      autoFocusFirstInput
      layout="horizontal"
      open={open}
      initialValues={cloud}
      modalProps={{
        destroyOnClose: true,
        onCancel,
        maskClosable: false,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        if (!cloud) return false
        await cloudUpdateApiCmdbCloudsByUid({ uid: cloud.Uid }, formData)
        message.success("更新成功")
        onCancel()
        onFinish?.()
        return true
      }}
    >
      <ProFormText
        label="云商ID"
        name="Cloud"
        placeholder=""
        rules={[{ required: true, message: "请输入云商ID" }]}
      />
      <ProFormText
        label="云商名称"
        name="CloudName"
        placeholder=""
        rules={[{ required: true, message: "请输入云商名称" }]}
      />
      <ProFormText
        label="资源组"
        name="ResourceGroup"
        placeholder=""
        rules={[{ required: true, message: "请输入资源组" }]}
      />
      <ProFormText
        label="账号"
        name="Account"
        placeholder=""
        rules={[{ required: true, message: "请输入账号" }]}
      />
      <ProFormText
        label="官网链接"
        name="Website"
        placeholder=""
        rules={[
          {
            type: "url",
            warningOnly: true,
          },
        ]}
      />
      <ProFormText
        label="API链接"
        name="ApiDomain"
        placeholder=""
        rules={[
          {
            type: "url",
            warningOnly: true,
          },
        ]}
      />
      <ProFormText label="SecretId" name="SecretId" placeholder="" />
      <ProFormText label="SecretKey" name="SecretKey" placeholder="" />
      <ProFormSwitch label="支持API" name="SupportApi" placeholder="" />
      <ProFormDigit
        label="权重"
        name="Weight"
        placeholder="快速开通机器时的参考权重"
      />
      <ProFormTextArea label="备注" name="Description" placeholder="" />
    </ModalForm>
  )
}
