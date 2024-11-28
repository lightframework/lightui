import { useAccess, useLocation } from "@umijs/max"
import { Result } from "antd"
import TaskTable from "./_components/task-table"

export default function Record() {
  const access = useAccess()
  const state = useLocation().state as { envUid?: string } | null

  if (!access.taskPageListApiDepTasks) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="抱歉，你无权访问执行记录数据"
      />
    )
  }

  return <TaskTable initialEnvUid={state?.envUid ?? undefined} />
}
