import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { appCreateApiCmdbApps } from "@/services/cmdb/app"
import { PlusOutlined } from "@ant-design/icons"
import {
  ModalForm,
  ProFormDigit,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Button, message } from "antd"

export default function AppCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction
}) {
  const access = useAccess()
  return (
    <ModalForm<CMDB.AppCreateReq>
      title="新建应用"
      name="app-create"
      width={MODAL_FORM_WIDTH}
      trigger={
        <Button type="primary" disabled={!access.appCreateApiCmdbApps}>
          <PlusOutlined />
          新建
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
        await appCreateApiCmdbApps(formData)
        message.success("新建成功")
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
      <ProFormSwitch label="状态" name="Enabled" initialValue={false} />
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
      <ProFormText label="CertPath" name="CertPath" placeholder="" />
      <ProFormTextArea label="备注" name="Description" placeholder="" />
    </ModalForm>
  )
}
