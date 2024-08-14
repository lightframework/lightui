import { LinkOutlined } from "@ant-design/icons"
import {
  AxiosError,
  Link,
  RequestOptions,
  RuntimeConfig,
  history,
} from "@umijs/max"
import { message } from "antd"
import CurrentUser from "./components/current-user"
import RootContainer from "./components/root-container"
import "./globals.less"
import { userCurrentInfoApiSysUsersCurrent } from "./services/sys/user"

const LOGIN_PATH = "/auth/login"

export type InitialData = {
  currentUser?: SYS.UserCurrentInfoResp["data"]
  fetchCurrentUser?: () => Promise<InitialData["currentUser"]>
}

export async function getInitialState(): Promise<InitialData> {
  const fetchCurrentUser = async () => {
    try {
      const { data } = await userCurrentInfoApiSysUsersCurrent()
      return data
    } catch (error) {
      // 全局请求错误已配置
      // 这里的异常处理是为了 getInitialState 能正常返回
    }
  }

  if (history.location.pathname !== LOGIN_PATH) {
    const currentUser = await fetchCurrentUser()
    return {
      fetchCurrentUser,
      currentUser,
    }
  }

  return { fetchCurrentUser }
}

export const layout: RuntimeConfig["layout"] = () => ({
  layout: "mix",
  logo: "/logo.svg",
  siderWidth: 220,
  rightContentRender: () => <CurrentUser />,
  links: [
    process.env.NODE_ENV === "development" ? (
      <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
        <LinkOutlined />
        <span>OpenAPI 文档</span>
      </Link>
    ) : undefined,
  ],
  menu: {
    defaultOpenAll: true,
    autoClose: false,
  },
  onPageChange: () => {
    localStorage.setItem("path", location.pathname + location.search)
  },
  token: {
    pageContainer: {
      paddingBlockPageContainerContent: 12,
      paddingInlinePageContainerContent: 12,
      colorBgPageContainer: "#f1f3f8",
    },
    sider: {
      colorBgMenuItemSelected: "#3f56e2",
      colorBgMenuItemHover: "#ebeefd",
      itemHoverColor: "#ebeefd",
      colorTextMenuSelected: "white",
      colorTextMenuItemHover: "#3a57e8",
      colorMenuBackground: "white",
    },
  },
})

export const request: RuntimeConfig["request"] = {
  timeout: 30000,
  requestInterceptors: [
    (config: RequestOptions) => {
      const url = config.url
      if (!url?.includes(LOGIN_PATH)) {
        const token = localStorage.getItem("token")
        return {
          ...config,
          headers: { ...config.headers, Authorization: token },
        }
      }
    },
  ],
  responseInterceptors: [
    [
      (response) => {
        const { data = {} as any } = response

        if (data.msg !== "OK") {
          throw new Error(data.msg)
        }

        return response
      },
      (error) => {
        if ((error as AxiosError).isAxiosError) {
          const axiosError = error as AxiosError<{
            msg?: string
            code?: number
            data?: any
          }>

          if (axiosError.response?.status === 401) {
            message.error("身份认证已过期，请重新登录")
            history.push(`${LOGIN_PATH}?redirect=${history.location.pathname}`)
          } else if (
            axiosError.request?.responseURL?.includes("/sys/users/current")
          ) {
            history.push(`${LOGIN_PATH}?redirect=${history.location.pathname}`)
          } else {
            const msg = axiosError.response?.data.msg
            message.error(msg ?? "服务器异常，请求失败")
          }
        } else if (error instanceof Error) {
          message.error(error.message)
        }

        return Promise.reject(error)
      },
    ],
  ],
}

export const rootContainer: RuntimeConfig["rootContainer"] = (root) => (
  <RootContainer>{root}</RootContainer>
)
