import CopyableText from "@/components/copyable-text"
import TableCellActions from "@/components/table-cell-actions"
import { dictGet, subTaskStatusDict } from "@/constants/dict"
import { TABLE_CELL_DESC_WIDTH } from "@/constants/table"
import { useAccess } from "@umijs/max"
import { Modal, Table } from "antd"
import { ColumnsType } from "antd/es/table"
import { useState } from "react"
import StdStringDisplayModal from "./std-string-display-modal"
import SubTaskConfigModal from "./sub-task-config-modal"

export default function SubTaskTable({
  subTasks,
  loading,
  selectedSubTask,
  onSelect,
  refetch,
}: {
  subTasks: OPS.SubTaskInfo[]
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
      title: "状态",
      dataIndex: "status",
      width: 100,
      render: (_, row) => (
        <span
          style={{ color: dictGet(row.status, subTaskStatusDict)?.borderColor }}
        >
          {row.status}
        </span>
      ),
    },
    {
      title: "进度",
      key: "progress",
      width: 80,
      render: (_, row) => `${row.rate}/${row.count}`,
    },
    {
      title: "消息",
      dataIndex: "message",
      ellipsis: true,
      width: TABLE_CELL_DESC_WIDTH,
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
      width: 140,
      fixed: "right",
      render: (_, row) => (
        <TableCellActions
          actions={[
            {
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
            },
            {
              text: "标准输出",
              onClick: (e) => {
                e.stopPropagation()
                setSelectedStdoutSubTask(row)
              },
            },
          ]}
        />
      ),
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
        pagination={{ size: "small" }}
        scroll={{
          x: "100%",
          // TODO: height
          y: 800,
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
