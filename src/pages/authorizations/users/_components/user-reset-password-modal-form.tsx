import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { userResetPassApiSysUsersByIdpass } from "@/services/sys/user"
import { ModalForm, ProFormText } from "@ant-design/pro-components"
import { message } from "antd"

export default function UserResetPasswordModalForm({
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
  return (
    <ModalForm<SYS.ResetPassReq>
      title="修改用户密码"
      name="user-reset-password"
      width={MODAL_FORM_WIDTH}
      autoFocusFirstInput
      layout="horizontal"
      open={open}
      initialValues={user}
      modalProps={{
        destroyOnClose: true,
        onCancel,
        maskClosable: false,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        if (!user) return false
        await userResetPassApiSysUsersByIdpass(
          { id: String(user.id) },
          formData,
        )
        message.success("修改成功")
        onFinish?.()
        return true
      }}
    >
      <ProFormText.Password
        label="密码"
        name="password"
        placeholder=""
        rules={[
          { required: true, message: "请输入密码" },
          {
            pattern:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{12,}$/,
            message: "最少12位，包含大小写，数字，特殊字符",
          },
        ]}
      />
      <ProFormText.Password
        label="确认密码"
        name="confirm"
        placeholder=""
        rules={[
          {
            required: true,
            message: "请输入确认密码",
          },
          (form) => ({
            validateTrigger: ["onBlur", "onChange"],
            message: "密码输入不一致，请重新输入",
            validator: (_, value) => {
              const p = form.getFieldValue("password")
              if (p !== value) {
                return Promise.reject()
              }
              return Promise.resolve()
            },
          }),
        ]}
      />
    </ModalForm>
  )
}
