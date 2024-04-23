import { useAccess } from "@umijs/max"
import { Result } from "antd"
import EnvTable from "./_components/env-table"

export default function Deploy() {
  const access = useAccess()

  if (!access.envPageListApiCmdbEnvs) {
    return (
      <Result status="403" title="403" subTitle="抱歉，你无权访问环境数据" />
    )
  }

  return <EnvTable />
}
