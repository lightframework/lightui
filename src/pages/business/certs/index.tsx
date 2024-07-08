import { useAccess } from "@umijs/max"
import { Result } from "antd"
import DomainTable from "./_components/domain-table"

export default function Page() {
  const access = useAccess()

  if (!access.domainPageListApiOpsDomains) {
    return (
      <Result status="403" title="403" subTitle="抱歉，你无权访问域名数据" />
    )
  }

  return <DomainTable />
}
