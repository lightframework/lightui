import TableCellActions from "@/components/table-cell-actions"
import { dictGet, subTaskStatusDict } from "@/constants/dict"
import { TABLE_CELL_DESC_WIDTH } from "@/constants/table"
import { Table } from "antd"
import { ColumnsType } from "antd/es/table"
import { useState } from "react"
import StdStringDisplayModal from "./std-string-display-modal"

export default function SubTaskTable({
  subTasks,
  loading,
  selectedSubTask,
  onSelect,
}: {
  subTasks: OPS.SubTaskInfo[]
  loading?: boolean
  selectedSubTask?: OPS.SubTaskInfo
  onSelect: (subTask: OPS.SubTaskInfo) => void
}) {
  const [selectedStdinSubTask, setSelectedStdinSubTask] = useState<
    OPS.SubTaskInfo | undefined
  >()
  const [selectedStdoutSubTask, setSelectedStdoutSubTask] = useState<
    OPS.SubTaskInfo | undefined
  >()

  const columns: ColumnsType<OPS.SubTaskInfo> = [
    {
      title: "子任务名称",
      dataIndex: "name",
      width: 180,
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
              text: "配置信息",
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
          ]}
        />
      ),
    },
  ]

  return (
    <>
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
    </>
  )
}
