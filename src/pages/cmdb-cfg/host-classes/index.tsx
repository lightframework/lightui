import { useAccess } from "@umijs/max"
import { Result } from "antd"
import HostClassTable from "./_components/host-class-table"

export default function HostClasses() {
  const access = useAccess()

  if (!access.hosttypePageListApiCmdbHostclasses) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="抱歉，你无权访问主机类别数据"
      />
    )
  }

  return <HostClassTable />
}
