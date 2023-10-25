import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { roleUpdateApiSysRolesById } from "@/services/sys/role"
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { message } from "antd"

export default function RoleUpdateModalForm({
  open,
  onCancel,
  role,
  onFinish,
}: {
  open: boolean
  onCancel: VoidFunction
  role?: SYS.RoleOption
  onFinish?: VoidFunction
}) {
  return (
    <ModalForm<SYS.RoleUpdateReq>
      title="更新角色"
      name="role-update"
      width={MODAL_FORM_WIDTH}
      autoFocusFirstInput
      layout="horizontal"
      open={open}
      initialValues={role}
      modalProps={{
        destroyOnClose: true,
        onCancel,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        if (!role) return false

        await roleUpdateApiSysRolesById({ id: String(role.id) }, formData)
        message.success("更新成功")
        onCancel()
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
