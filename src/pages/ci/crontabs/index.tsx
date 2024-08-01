import { useAccess } from "@umijs/max"
import { Result } from "antd"
import CrontabTable from "./_components/crontab-table"

export default function Crontabs() {
  const access = useAccess()

  if (!access.crontabPageListApiDepCrontabs) {
    return (
      <Result status="403" title="403" subTitle="抱歉，你无权访问任务数据" />
    )
  }

  return <CrontabTable />
}
