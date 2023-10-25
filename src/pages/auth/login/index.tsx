import { useEffect } from "react"
import DisplayImage from "./_components/display-image"
import LoginForm from "./_components/login-form"

export default function Login() {
  useEffect(() => {
    document.title = "登录 - LightOPS"
  }, [])

  return (
    <div className="grid h-screen w-full place-items-center bg-gradient-to-r from-[rgba(27,109,236,.9)] via-[rgba(61,157,236,.8)] to-[rgba(132,121,255,.9)]">
      <main className="flex items-center rounded-3xl bg-white p-5 xl:aspect-[2/1] xl:w-[1200px]">
        <DisplayImage />
        <LoginForm />
      </main>
    </div>
  )
}
