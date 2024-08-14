import SyntaxHighlighter from "@/components/syntax-highlighter"
import { taskReadOneApiIbexByTasksid } from "@/services/ibex/tpl"
import { useQuery } from "@tanstack/react-query"
import { Modal, Tabs } from "antd"
import HostTable from "./host-table"
import TaskDetails from "./task-details"

export interface TaskDetailsModalProps {
  open: boolean
  taskId?: number
  onClose: VoidFunction
  onFinish?: VoidFunction
}

export default function TaskDetailsModal({
  open,
  taskId,
  onClose,
  onFinish,
}: TaskDetailsModalProps) {
  const { data } = useQuery({
    queryKey: ["tpl", taskId],
    queryFn: () =>
      taskReadOneApiIbexByTasksid({ id: taskId!.toString() }).then(
        (res) => res.data,
      ),
    enabled: !!taskId,
    refetchInterval: 3000,
  })

  return (
    <Modal
      title="任务详情"
      open={open}
      width={600}
      onCancel={onClose}
      onOk={() => {
        onClose()
        onFinish?.()
      }}
    >
      {data && (
        <Tabs
          items={[
            {
              key: "base",
              label: "基础信息",
              children: <TaskDetails task={data} />,
            },
            {
              key: "script",
              label: "脚本",
              children: (
                <SyntaxHighlighter
                  language="bash"
                  customStyle={{
                    maxHeight: "65dvh",
                  }}
                  wrapLongLines
                  allowCopy
                >
                  {data.meta?.script ?? ""}
                </SyntaxHighlighter>
              ),
            },
            {
              key: "hosts",
              label: "主机",
              children: <HostTable hosts={data.hosts} />,
            },
          ]}
        />
      )}
    </Modal>
  )
}
