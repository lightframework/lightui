import { useAccess } from "@umijs/max"
import { Result } from "antd"
import DomainsetTable from "./_components/domainset-table"

export default function Page() {
  const access = useAccess()

  if (!access.domainsetPageListApiOpsDomainsets) {
    return (
      <Result status="403" title="403" subTitle="抱歉，你无权访问域名集数据" />
    )
  }
  return <DomainsetTable />
}
