import { useAccess } from "@umijs/max"
import { Result } from "antd"
import RecordTable from "./_components/record-table"

export default function Page() {
  const access = useAccess()

  if (!access.ipsetPushRecordsPageListApiOpsIpsetsPushrecords) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="抱歉，你无权访问ipset推送记录数据"
      />
    )
  }

  return <RecordTable />
}
