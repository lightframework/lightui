// 在你的React组件中
import { loginApiSysUserslogin } from "@/services/sys/user"
import { history, useModel, useSearchParams } from "@umijs/max"
import { message } from "antd"
import React, { useEffect } from "react"
import { flushSync } from "react-dom"

const DingTalkLogin: React.FC = () => {
  const { initialState, setInitialState } = useModel("@@initialState")
  const [searchParams] = useSearchParams()
  const login = async (authCode: string) => {
    const res = await loginApiSysUserslogin({
      username: authCode,
      password: "",
      auth_type: "dingtalk",
    })

    if (!res.data || !res.data.accessToken) {
      message.error("服务器未返回token")
      return
    }

    localStorage.setItem("token", res.data.accessToken)

    const currentUser = await initialState?.fetchCurrentUser?.()
    if (currentUser) {
      flushSync(() => setInitialState((prev) => ({ ...prev, currentUser })))
      history.push(searchParams.get("redirect") || "/")
      message.success("登录成功")
    } else {
      message.success("获取用户信息失败！")
    }
  }
  useEffect(() => {
    // 动态加载钉钉登录脚本
    const script = document.createElement("script")
    script.src =
      "https://g.alicdn.com/dingding/h5-dingtalk-login/0.21.0/ddlogin.js"
    script.onload = () => {
      if (window.DTFrameLogin) {
        // 调用DTFrameLogin方法
        window.DTFrameLogin(
          {
            id: "ding_scan_element", // 容器ID
            width: 300,
            height: 300,
          },
          {
            redirect_uri: encodeURIComponent(
              "https://lightops.fastsdwan.com/api/login/",
            ),
            // redirect_uri: encodeURIComponent(
            //   "http://43.138.108.230:8000/api/login/",
            // ),
            client_id: "dingsde87rlfbbf6tboo",
            scope: "openid",
            response_type: "code",
            prompt: "consent",
            state: "xxxxxxx",
          },
          (result) => {
            const { redirectUrl, authCode, state } = result
            console.log("Login success:", authCode, state)
            console.log("redirectUrl:", redirectUrl)
            login(authCode)
            // window.location.href = redirectUrl;
          },
          (errorMsg) => {
            console.error(`Login error: ${errorMsg}`)
          },
        )
      }
    }
    document.body.appendChild(script)

    return () => {
      // 清理加载的脚本
      document.body.removeChild(script)
    }
  }, [])

  return <div id="ding_scan_element" className="ding-login-code-scan"></div>
}

export default DingTalkLogin
