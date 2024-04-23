import { LogoutOutlined } from "@ant-design/icons"
import { history, useLocation, useModel } from "@umijs/max"
import { Avatar, Dropdown, MenuProps } from "antd"
import { flushSync } from "react-dom"

const DEFAULT_AVATAR =
  "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"

export default function CurrentUser() {
  const { initialState, setInitialState } = useModel("@@initialState")
  const { pathname, search } = useLocation()

  const currentUser = initialState?.currentUser

  if (!currentUser) return null

  const avatarSrc = currentUser.avatar || DEFAULT_AVATAR

  const logout = () => {
    flushSync(() =>
      setInitialState((prev) => ({ ...prev, currentUser: undefined })),
    )
    localStorage.removeItem("token")
    history.replace(`/auth/login?redirect=${pathname + search}`)
  }

  const menuItems: MenuProps["items"] = [
    {
      key: "user-logout",
      label: "退出",
      icon: <LogoutOutlined />,
      onClick: logout,
    },
  ]

  return (
    <Dropdown
      menu={{ items: menuItems }}
      arrow
      placement="bottomRight"
      trigger={["click"]}
      className="cursor-pointer"
    >
      <div className="flex items-center gap-1">
        <Avatar src={avatarSrc} alt="用户头像" />
        <span>{currentUser.username}</span>
      </div>
    </Dropdown>
  )
}
