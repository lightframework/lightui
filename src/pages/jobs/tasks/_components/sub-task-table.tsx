import CopyableText from "@/components/copyable-text"
import StdStringDisplayModal from "@/components/std-string-display-modal"
import TableCellActions from "@/components/table-cell-actions"
import { dictGet, taskStatusDict } from "@/constants/dict"
import { subTaskCancelApiOpsBySubtasksidcancel } from "@/services/ops/task"
import { useAccess } from "@umijs/max"
import { Modal, Table, Tag } from "antd"
import { ColumnsType } from "antd/es/table"
import { useState } from "react"
import SubTaskConfigModal from "./sub-task-config-modal"

export default function SubTaskTable({
  subTasks,
  loading,
  taskType,
  selectedSubTask,
  onSelect,
  refetch,
}: {
  subTasks: OPS.SubTaskInfo[]
  taskType?: string
  loading?: boolean
  selectedSubTask?: OPS.SubTaskInfo
  onSelect: (subTask: OPS.SubTaskInfo) => void
  refetch?: VoidFunction
}) {
  const [modal, contextHolder] = Modal.useModal()
  const access = useAccess()

  const [selectedStdinSubTask, setSelectedStdinSubTask] = useState<
    OPS.SubTaskInfo | undefined
  >()
  const [selectedStdoutSubTask, setSelectedStdoutSubTask] = useState<
    OPS.SubTaskInfo | undefined
  >()
  const [selectedSubTaskToConfig, setSelectedSubTaskToConfig] = useState<
    OPS.SubTaskInfo | undefined
  >()

  const columns: ColumnsType<OPS.SubTaskInfo> = [
    {
      title: "子任务名称",
      dataIndex: "name",
      width: 200,
      render: (value) => <CopyableText text={value} />,
    },
    {
      title: "IP",
      dataIndex: "Ip",
      width: 120,
      ellipsis: true,
    },
    {
      title: "状态",
      dataIndex: "status",
      width: 80,
      render: (_, row) => (
        <Tag color={dictGet(row.status, taskStatusDict)?.borderColor}>
          {dictGet(row.status, taskStatusDict)?.value ?? row.status}
        </Tag>
      ),
    },
    {
      title: "进度",
      key: "progress",
      width: 60,
      render: (_, row) => `${row.rate}/${row.count}`,
    },
    {
      title: "消息",
      dataIndex: "message",
      ellipsis: true,
      width: 240,
      render: (_, row) => (
        <span
          style={{
            color:
              row.status === "Failed"
                ? "#ff4d4f"
                : row.status === "InManualProgress"
                ? "#fadb14"
                : undefined,
          }}
        >
          {row.message}
        </span>
      ),
    },
    {
      title: "操作",
      key: "options",
      width: 180,
      fixed: "right",
      render: (_, row) => {
        return (
          <TableCellActions
            actions={[
              taskType === "CreateHost"
                ? {
                    text: row.retry ? "重试" : "标准输入",
                    disabled: row.retry
                      ? !access.updateCreateHostSubTaskApiOpsBySubtasksidcreatehost
                      : !access.getCreateHostSubTaskConfApiOpsBySubtasksidconfcreatehost,
                    onClick: row.retry
                      ? (e) => {
                          e.stopPropagation()
                          modal.confirm({
                            title: `确定要重试子任务 ${row.name} 吗？`,
                            content: (
                              <div style={{ color: "#ff4d4f" }}>
                                请确认云商中是否已创建出相应资源，如果要重试，请先删除已创建的资源！
                              </div>
                            ),
                            onOk: () => {
                              setSelectedSubTaskToConfig(row)
                            },
                          })
                        }
                      : (e) => {
                          e.stopPropagation()
                          setSelectedSubTaskToConfig(row)
                        },
                  }
                : {
                    text: "标准输入",
                    onClick: (e) => {
                      e.stopPropagation()
                      setSelectedStdinSubTask(row)
                    },
                  },
              {
                text: "标准输出",
                onClick: (e) => {
                  e.stopPropagation()
                  setSelectedStdoutSubTask(row)
                },
              },
              {
                text: "撤销",
                disabled: row.status !== "Waitting",
                danger: true,
                onClick: async (e) => {
                  e.stopPropagation()

                  modal.confirm({
                    title: "确定撤销子任务吗？",
                    content: `子任务名称：${row.name}`,
                    onOk: async () => {
                      await subTaskCancelApiOpsBySubtasksidcancel({
                        id: String(row.id),
                      })
                      refetch?.()
                    },
                  })
                },
              },
            ]}
          />
        )
      },
    },
  ]

  return (
    <>
      {contextHolder}
      <Table
        size="middle"
        loading={loading}
        dataSource={subTasks}
        rowKey={(row) => row.id}
        columns={columns}
        pagination={false}
        scroll={{
          x: "100%",
          y: "calc(80vh - 24px)",
        }}
        onRow={(row) => ({ onClick: () => onSelect(row) })}
        rowClassName={(row) =>
          row.id === selectedSubTask?.id
            ? "[&>td]:!bg-[#ebf0ff] [&>td]:hover:!bg-[#ebf0ff] cursor-pointer"
            : "cursor-pointer"
        }
      />
      <StdStringDisplayModal
        title={`${selectedStdinSubTask?.name} - 配置信息`}
        open={selectedStdinSubTask !== undefined}
        onCancel={() => setSelectedStdinSubTask(undefined)}
        content={selectedStdinSubTask?.stdin}
      />
      <StdStringDisplayModal
        title={`${selectedStdoutSubTask?.name} - 标准输出`}
        open={selectedStdoutSubTask !== undefined}
        onCancel={() => setSelectedStdoutSubTask(undefined)}
        content={selectedStdoutSubTask?.stdout}
      />
      <SubTaskConfigModal
        subTaskId={selectedSubTaskToConfig?.id}
        open={!!selectedSubTaskToConfig}
        onCancel={() => setSelectedSubTaskToConfig(undefined)}
        readonly={!selectedSubTaskToConfig?.retry}
        onFinish={refetch}
      />
    </>
  )
}
