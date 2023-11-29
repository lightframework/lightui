import { useAccess } from "@umijs/max"
import { Result } from "antd"
import ReleasedHostTable from "./_components/released-host-table"

export default function Page() {
  const access = useAccess()

  if (!access.releaseHostPageListApiOpsReleasehosts) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="抱歉，你无权访问已回收主机数据"
      />
    )
  }

  return <ReleasedHostTable />
}
