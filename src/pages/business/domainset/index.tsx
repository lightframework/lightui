import { useAccess, useSearchParams } from "@umijs/max"
import { Result } from "antd"
import DomainsetTable from "./_components/domainset-table"

export default function Page() {
  const access = useAccess()
  const [searchParams] = useSearchParams()

  if (!access.domainsetPageListApiOpsDomainsets) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="抱歉，你无权访问DomainSet数据"
      />
    )
  }
  return <DomainsetTable initEnvUid={searchParams.get("envUid") ?? undefined} />
}
