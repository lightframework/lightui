import { useAccess } from "@umijs/max"
import { Result } from "antd"
import CloudTable from "./_components/cloud-table"

export default function Clouds() {
  const access = useAccess()

  if (!access.cloudPageListApiCmdbClouds) {
    return (
      <Result status="403" title="403" subTitle="抱歉，你无权访问云商数据" />
    )
  }

  return <CloudTable />
}
