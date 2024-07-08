import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { appUpdateApiCmdbAppsByUid } from "@/services/cmdb/app"
import {
  ModalForm,
  ProFormDigit,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { message } from "antd"

export default function AppUpdateModalForm({
  open,
  onCancel,
  app,
  onFinish,
}: {
  open: boolean
  onCancel: VoidFunction
  app?: CMDB.AppInfo
  onFinish?: VoidFunction
}) {
  return (
    <ModalForm<CMDB.AppUpdateReq>
      title="更新应用"
      name="app-update"
      width={MODAL_FORM_WIDTH}
      autoFocusFirstInput
      layout="horizontal"
      open={open}
      initialValues={app}
      modalProps={{
        destroyOnClose: true,
        onCancel,
        maskClosable: false,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        if (!app) return false
        await appUpdateApiCmdbAppsByUid({ uid: app.Uid }, formData)
        message.success("更新成功")
        onCancel()
        onFinish?.()
        return true
      }}
    >
      <ProFormText
        label="应用名称"
        name="App"
        placeholder=""
        rules={[{ required: true, message: "请输入应用名称" }]}
      />
      <ProFormText
        label="应用类型"
        name="AppType"
        placeholder=""
        rules={[{ required: true, message: "请输入应用类型" }]}
      />
      <ProFormText
        label="版本"
        name="Version"
        placeholder=""
        rules={[{ required: true, message: "请输入应用版本" }]}
      />
      <ProFormDigit label="AnsibleId" name="AnsibleId" placeholder="" />
      <ProFormSwitch label="状态" name="Enabled" />
      <ProFormText
        label="JumpPath"
        name="JumpPath"
        placeholder=""
        rules={[
          {
            pattern: /^\/[^]*[^/]$/,
            message: 'JumpPath以"/"开头，结尾不能为"/"',
          },
        ]}
      />
      <ProFormTextArea label="备注" name="Description" placeholder="" />
    </ModalForm>
  )
}
