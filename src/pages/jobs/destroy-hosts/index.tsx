import { useAccess } from "@umijs/max"
import { Result } from "antd"
import ReleaseTable from "./_components/release-table"

export default function Page() {
  const access = useAccess()

  if (!access.releasePageListApiOpsReleases) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="抱歉，你无权访问已回收资源数据"
      />
    )
  }

  return <ReleaseTable />
}
