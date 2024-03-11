import { useAccess } from "@umijs/max"
import { Result } from "antd"
import IpsetTable from "./_components/ipset-table"

export default function Page() {
  const access = useAccess()

  if (!access.ipsetPageListApiOpsIpsets) {
    return (
      <Result status="403" title="403" subTitle="抱歉，你无权访问IP集数据" />
    )
  }

  return <IpsetTable />
}
