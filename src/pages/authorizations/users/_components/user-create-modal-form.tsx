import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { useQueryRoleOptions } from "@/lib/hooks/data"
import { UserCreateApiSysUsers } from "@/services/sys/user"
import { PlusOutlined } from "@ant-design/icons"
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Button, message } from "antd"

export default function UserCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction
}) {
  const access = useAccess()
  const { data: roleOptions, isPending } = useQueryRoleOptions()

  return (
    <ModalForm<SYS.UserCreateReq>
      title="新建用户"
      name="user-create"
      width={MODAL_FORM_WIDTH}
      trigger={
        <Button type="primary" disabled={!access.UserCreateApiSysUsers}>
          <PlusOutlined />
          新建
        </Button>
      }
      autoFocusFirstInput
      layout="horizontal"
      modalProps={{
        destroyOnClose: true,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        await UserCreateApiSysUsers(formData)
        message.success("创建成功")
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
      <ProFormText.Password
        label="密码"
        name="password"
        placeholder=""
        rules={[{ required: true, message: "请输入密码" }]}
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
