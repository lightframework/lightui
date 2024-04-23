import { Button, Modal } from "antd"
import TaskStageTable from "./task-stage-table"

export default function TaskStageTableModal({
  open,
  onCancel,
  task,
}: {
  open: boolean
  onCancel: VoidFunction
  task?: DEP.TaskInfo
}) {
  return (
    <Modal
      title={`执行步骤 - ${task?.title}`}
      open={open}
      width="80%"
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          返回
        </Button>,
      ]}
    >
      {task && <TaskStageTable taskId={task.id} />}
    </Modal>
  )
}
