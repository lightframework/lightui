import { useAccess } from "@umijs/max"
import { Result } from "antd"
import UserTable from "./_components/user-table"

export default function UsersPage() {
  const access = useAccess()

  if (!access.userPageListApiSysUsers) {
    return (
      <Result status="403" title="403" subTitle="抱歉，你无权访问用户数据" />
    )
  }

  return <UserTable />
}
