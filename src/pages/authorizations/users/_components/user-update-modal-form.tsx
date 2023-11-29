import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { useQueryRoleOptions } from "@/lib/hooks/data"
import { userUpdateApiSysUsersById } from "@/services/sys/user"
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { message } from "antd"

export default function UserUpdateModalForm({
  open,
  onCancel,
  user,
  onFinish,
}: {
  open: boolean
  onCancel: VoidFunction
  user?: SYS.UserInfo
  onFinish?: VoidFunction
}) {
  const { data: roleOptions, isPending } = useQueryRoleOptions()

  return (
    <ModalForm<SYS.UserUpdateReq>
      title="更新用户"
      name="user-update"
      width={MODAL_FORM_WIDTH}
      autoFocusFirstInput
      layout="horizontal"
      open={open}
      initialValues={{
        ...user,
        roleIds: user?.roles
          .split(",")
          .map(
            (roleName) =>
              roleOptions?.find((role) => role.name === roleName)?.id,
          ),
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel,
        maskClosable: false,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        if (!user) return false
        await userUpdateApiSysUsersById({ id: String(user.id) }, formData)
        message.success("更新成功")
        onCancel()
        onFinish?.()
        return true
      }}
    >
      <ProFormText
        label="用户名"
        name="username"
        placeholder=""
        rules={[{ required: true, message: "请输入用户名" }]}
      />
      <ProFormText
        label="姓名"
        name="nickname"
        placeholder=""
        rules={[{ required: true, message: "请输入姓名" }]}
      />
      <ProFormText
        label="邮箱"
        name="email"
        placeholder=""
        rules={[{ type: "email", message: "邮箱格式不正确" }]}
      />
      <ProFormText
        label="联系电话"
        name="mobile"
        placeholder=""
        rules={[
          {
            pattern: /^1[3-9]\d{9}$/,
            warningOnly: true,
            message: "联系电话格式不正确",
          },
        ]}
      />
      <ProFormSelect
        showSearch
        label="角色"
        name="roleIds"
        mode="multiple"
        placeholder=""
        fieldProps={{
          loading: isPending,
        }}
        options={roleOptions?.map((role) => ({
          label: role.name,
          value: role.id,
        }))}
      />
      <ProFormTextArea label="备注" name="info" placeholder="" />
    </ModalForm>
  )
}
