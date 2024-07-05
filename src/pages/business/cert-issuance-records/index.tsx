import { useAccess } from "@umijs/max"
import { Result } from "antd"
import CertPushTable from "./_components/cert-push-table"

export default function Page() {
  const access = useAccess()

  if (!access.certRecordPageListApiOpsCertsRecords) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="抱歉，你无权访问下发记录数据"
      />
    )
  }

  return <CertPushTable />
}
