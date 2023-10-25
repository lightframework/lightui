import Table, { TableColumns, TableColumnsState } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import { dictDisplay, taskStatusDict, taskTypeDict } from "@/constants/dict"
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_DESC_WIDTH,
  TABLE_CELL_UID_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
} from "@/constants/table"
import { useToken } from "@/lib/hooks/use-token"
import { taskPageListApiOpsTasks } from "@/services/ops/task"
import { ActionType } from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Select, Tag } from "antd"
import { useRef, useState } from "react"
import SubTaskTableModal from "./sub-task-table-modal"

function TaskTypeSelect({ onSelect }: { onSelect: (type?: string) => void }) {
  return (
    <Select
      allowClear
      placeholder="类型"
      style={{ width: 100 }}
      options={Object.entries(taskTypeDict).map(([key, value]) => ({
        label: value,
        value: key,
      }))}
      onChange={onSelect}
    />
  )
}

function TaskStatusSelect({
  onSelect,
}: {
  onSelect: (status?: string) => void
}) {
  return (
    <Select
      allowClear
      placeholder="状态"
      style={{ width: 100 }}
      options={Object.entries(taskStatusDict).map(([key, value]) => ({
        label: value,
        value: key,
      }))}
      onChange={onSelect}
    />
  )
}

export default function TaskTable() {
  const { token } = useToken()
  const access = useAccess()
  const tableRef = useRef<ActionType>()
  const [taskType, setTaskType] = useState<string | undefined>()
  const [taskStatus, setTaskStatus] = useState<string | undefined>()

  const [selectedTaskToView, setSelectedTaskToView] = useState<
    OPS.TaskInfo | undefined
  >()

  const columnsState: TableColumnsState = {
    Uid: { show: false },
    createBy: { show: false },
    createdAt: { show: false },
    updateBy: { show: false },
    updatedAt: { show: false },
    message: { show: false },
  }

  const columns: TableColumns<OPS.TaskInfo> = [
    {
      title: "ID",
      dataIndex: "id",
      width: TABLE_CELL_UID_WIDTH,
    },
    {
      title: "任务名称",
      dataIndex: "name",
      width: 250,
      copyable: true,
      sorter: true,
    },
    {
      title: "类型",
      dataIndex: "type",
      width: 90,
      render: (_, row) => (
        <Tag
          color={
            row.type === "CreateHost" ? token.colorSuccess : token.colorError
          }
        >
          {dictDisplay(row.type, taskTypeDict)}
        </Tag>
      ),
    },
    {
      title: "状态",
      dataIndex: "status",
      width: 90,
      renderText: (value) => dictDisplay(value, taskStatusDict),
    },
    {
      title: "进度",
      key: "progress",
      width: 240,
      render: (_, row) => (
        <div>
          成功：
          <span
            style={{ color: row.success > 0 ? token.colorSuccess : undefined }}
          >
            {row.success}
          </span>
          ，失败：
          <span
            style={{ color: row.failed > 0 ? token.colorError : undefined }}
          >
            {row.failed}
          </span>
          ，总计：<span>{row.count}</span>
        </div>
      ),
    },
    {
      title: "开始时间",
      dataIndex: "started",
      valueType: "dateTime",
      width: TABLE_CELL_DATETIME_WIDTH,
    },
    {
      title: "结束时间",
      dataIndex: "finished",
      valueType: "dateTime",
      width: TABLE_CELL_DATETIME_WIDTH,
    },
    {
      title: "创建者",
      dataIndex: "createBy",
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      valueType: "dateTime",
      width: TABLE_CELL_DATETIME_WIDTH,
    },
    {
      title: "更新者",
      dataIndex: "updateBy",
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      title: "更新时间",
      dataIndex: "updatedAt",
      valueType: "dateTime",
      width: TABLE_CELL_DATETIME_WIDTH,
    },
    {
      title: "消息",
      dataIndex: "message",
      ellipsis: true,
      width: TABLE_CELL_DESC_WIDTH,
    },
    {
      title: "备注",
      dataIndex: "remark",
      ellipsis: true,
      width: TABLE_CELL_DESC_WIDTH,
    },
    {
      title: "操作",
      key: "options",
      width: 70,
      fixed: "right",
      render: (_, row) => (
        <TableCellActions
          actions={[
            {
              text: "查看详情",
              onClick: () => setSelectedTaskToView(row),
              disabled: !access.subTaskListApiOpsByTasksidsubtasks,
            },
          ]}
        />
      ),
    },
  ]

  return (
    <>
      <Table
        name="task"
        actionRef={tableRef}
        columns={columns}
        rowKey="id"
        searchPlaceholder="请输入任务名称查询"
        params={{
          type: taskType,
          status: taskStatus,
        }}
        request={taskPageListApiOpsTasks}
        defaultColumnsState={columnsState}
        toolbar={{
          subTitle: (
            <div className="flex gap-x-2">
              <TaskTypeSelect onSelect={setTaskType} />
              <TaskStatusSelect onSelect={setTaskStatus} />
            </div>
          ),
        }}
      />
      <SubTaskTableModal
        open={selectedTaskToView !== undefined}
        onCancel={() => setSelectedTaskToView(undefined)}
        task={selectedTaskToView}
      />
    </>
  )
}
