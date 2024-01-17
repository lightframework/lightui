import { useLocalStorageState } from "@/lib/hooks/use-local-storage-state"
import { subTaskListApiOpsByTasksidsubtasks } from "@/services/ops/task"
import { useQuery } from "@tanstack/react-query"
import { useAccess } from "@umijs/max"
import { Button, Modal, Result } from "antd"
import { useEffect, useState } from "react"
import SubTaskPhaseInfo from "./sub-task-phase-info"
import SubTaskTable from "./sub-task-table"

export default function SubTaskTableModal({
  open,
  onCancel,
  task,
}: {
  open: boolean
  onCancel: VoidFunction
  task?: OPS.TaskInfo
}) {
  const access = useAccess()
  const [selectedSubTask, setSelectedSubTask] = useState<
    OPS.SubTaskInfo | undefined
  >()

  const [refetchInterval, setRefetchInterval] = useLocalStorageState<
    number | false
  >("sub-task-refetch-interval", 2000)

  const { data, isPending, refetch } = useQuery({
    queryKey: ["sub-tasks", task?.id],
    queryFn: () => subTaskListApiOpsByTasksidsubtasks({ id: String(task!.id) }),
    enabled: task !== undefined,
    refetchInterval: refetchInterval,
  })

  const subTasks = data?.data?.list ?? []
  const hasSubtasks = subTasks.length > 0

  useEffect(() => {
    if (!open) {
      setSelectedSubTask(undefined)
    } else if (hasSubtasks) {
      setSelectedSubTask(subTasks[0])
    }
  }, [open, hasSubtasks])

  return (
    <Modal
      title={`${task?.name} - 任务详情`}
      open={open}
      onCancel={onCancel}
      width="80%"
      centered
      destroyOnClose
      footer={[
        <Button key="back" type="default" onClick={onCancel}>
          返回
        </Button>,
      ]}
    >
      <div className="flex h-[80vh] w-full">
        <div className="h-full w-3/5">
          <SubTaskTable
            loading={isPending}
            taskType={task?.type}
            subTasks={subTasks}
            selectedSubTask={selectedSubTask}
            onSelect={(subTask) => setSelectedSubTask(subTask)}
            refetch={refetch}
          />
        </div>
        <div className="h-full w-2/5 overflow-y-auto px-3">
          {access.subTaskPhaseListApiOpsBySubtasksidphases ? (
            selectedSubTask ? (
              <SubTaskPhaseInfo
                selectedSubTask={selectedSubTask}
                refetchInterval={refetchInterval}
                setRefetchInterval={setRefetchInterval}
              />
            ) : (
              <Result status="info" title="请先选择子任务" />
            )
          ) : (
            <Result
              status="403"
              title="403"
              subTitle="抱歉，你无权访问子任务执行步骤数据"
            />
          )}
        </div>
      </div>
    </Modal>
  )
}
