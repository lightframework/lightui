import { useAccess } from "@umijs/max"
import { Result } from "antd"
import TaskTable from "./_components/task-table"

export default function Tasks() {
  const access = useAccess()

  if (!access.taskPageListApiOpsTasks) {
    return (
      <Result status="403" title="403" subTitle="抱歉，你无权访问任务数据" />
    )
  }

  return <TaskTable />
}
