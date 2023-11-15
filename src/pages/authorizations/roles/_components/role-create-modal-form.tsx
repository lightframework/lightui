import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { RoleCreateApiSysRoles } from "@/services/sys/role"
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Button, message } from "antd"

export default function RoleCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction
}) {
  const access = useAccess()
  return (
    <ModalForm<SYS.RoleCreateReq>
      title="创建角色"
      name="role-create"
      width={MODAL_FORM_WIDTH}
      trigger={
        <Button type="link" disabled={!access.RoleCreateApiSysRoles}>
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
        await RoleCreateApiSysRoles(formData)
        message.success("创建成功")
        onFinish?.()
        return true
      }}
    >
      <ProFormText
        label="角色名称"
        name="name"
        placeholder=""
        rules={[{ required: true, message: "请输入角色名称" }]}
      />
      <ProFormTextArea label="备注" name="info" placeholder="" />
    </ModalForm>
  )
}
