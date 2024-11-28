import { Button } from "antd"
import { useEffect, useState } from "react"
import DisplayImage from "./_components/display-image"
import LoginDing from "./_components/login-ding"
import LoginForm from "./_components/login-form"

export default function Login() {
  const [loginMethod, setLoginMethod] = useState("password")

  useEffect(() => {
    document.title = "登录 - LightOPS"
  }, [])

  return (
    <div className="grid h-screen w-full place-items-center bg-gradient-to-r from-[rgba(27,109,236,.9)] via-[rgba(61,157,236,.8)] to-[rgba(132,121,255,.9)]">
      <main className="flex items-center rounded-3xl bg-white p-5 xl:aspect-[2/1] xl:w-[1200px]">
        <DisplayImage />
        <div className="flex w-full flex-col items-center justify-center">
          <div className="mb-4 flex space-x-4">
            <Button
              className={`rounded px-4 py-2 ${loginMethod === "password" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => setLoginMethod("password")}
            >
              账号密码登录
            </Button>
            <Button
              className={`rounded px-4 py-2 ${loginMethod === "ding" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => setLoginMethod("ding")}
            >
              钉钉扫码登录
            </Button>
          </div>
          {loginMethod === "password" && <LoginForm />}
          {loginMethod === "ding" && <LoginDing />}
        </div>
      </main>
    </div>
  )
}
