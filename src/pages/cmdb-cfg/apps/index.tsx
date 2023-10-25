import { useAccess } from "@umijs/max"
import { Result } from "antd"
import AppTable from "./_components/app-table"

export default function Apps() {
  const access = useAccess()

  if (!access.appPageListApiCmdbApps) {
    return (
      <Result status="403" title="403" subTitle="抱歉，你无权访问应用数据" />
    )
  }

  return <AppTable />
}
