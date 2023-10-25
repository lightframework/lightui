import { loginApiSysUserslogin } from "@/services/sys/user"
import { LockOutlined, UserOutlined } from "@ant-design/icons"
import {
  ProFormText,
  LoginForm as ProLoginForm,
} from "@ant-design/pro-components"
import { history, useModel, useSearchParams } from "@umijs/max"
import { message } from "antd"
import { flushSync } from "react-dom"

export default function LoginForm() {
  const { initialState, setInitialState } = useModel("@@initialState")
  const [searchParams] = useSearchParams()

  const login = async (values: SYS.LoginReq) => {
    const res = await loginApiSysUserslogin(values)

    if (!res.data || !res.data.accessToken) {
      message.error("服务器未返回token")
      return
    }

    message.success("登录成功")
    localStorage.setItem("token", res.data.accessToken)

    const currentUser = await initialState?.fetchCurrentUser?.()
    if (currentUser) {
      flushSync(() => setInitialState((prev) => ({ ...prev, currentUser })))
    }

    history.push(searchParams.get("redirect") || "/")
  }

  return (
    <div className="-mx-7 xl:w-[35%]">
      <ProLoginForm<SYS.LoginReq>
        title="LightOPS"
        logo="/logo.svg"
        subTitle="运维自动化平台"
        onFinish={login}
      >
        <ProFormText
          name="username"
          fieldProps={{
            size: "large",
            prefix: <UserOutlined />,
          }}
          placeholder="请输入用户名"
          rules={[{ required: true, message: "请输入用户名" }]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: "large",
            prefix: <LockOutlined />,
          }}
          placeholder="请输入密码"
          rules={[{ required: true, message: "请输入密码" }]}
        />
      </ProLoginForm>
    </div>
  )
}
