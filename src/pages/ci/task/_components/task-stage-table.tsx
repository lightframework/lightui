import Table, { TableColumns, TableColumnsState } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import { ciStageResultDict, ciStageStateDict, dictGet } from "@/constants/dict"
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_MODAL_HEIGHT,
} from "@/constants/table"
import {
  taskReadOneApiDepTasksById,
  taskRestartStageApiDepTasksByIdstageid,
} from "@/services/dep/task"
import { ActionType } from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Button, Tag, message } from "antd"
import useModal from "antd/es/modal/useModal"
import { useRef } from "react"

export default function TaskStageTable({ taskId }: { taskId: number }) {
  const access = useAccess()
  const tableRef = useRef<ActionType>()
  const [modal, contextHolder] = useModal()

  const columnsState: TableColumnsState = {
    id: { show: false },
  }

  const columns: TableColumns<DEP.Stage> = [
    {
      title: "ID",
      dataIndex: "id",
      width: 100,
    },
    {
      title: "名称",
      dataIndex: "name",
      fixed: "left",
      width: 180,
      render: (_, row) =>
        row.link ? (
          <a href={row.link} target="_blank" rel="noreferrer">
            {row.name}
          </a>
        ) : row.messaage ? (
          <Button
            type="link"
            size="small"
            onClick={() => message.info(row.messaage)}
          >
            {row.name}
          </Button>
        ) : (
          row.name
        ),
    },
    {
      title: "当前状态",
      dataIndex: "state",
      width: 100,
      render: (_, row) => (
        <Tag color={dictGet(row.state, ciStageStateDict)?.color}>
          {dictGet(row.state, ciStageStateDict)?.value ?? row.state}
        </Tag>
      ),
    },
    {
      title: "构建结果",
      dataIndex: "result",
      width: 100,
      render: (_, row) => (
        <Tag color={dictGet(row.result, ciStageResultDict)?.color}>
          {dictGet(row.result, ciStageResultDict)?.value ?? row.result}
        </Tag>
      ),
    },
    {
      title: "StageId",
      dataIndex: "stageId",
      width: 80,
    },
    {
      title: "OriStageId",
      dataIndex: "oriStageId",
      width: 80,
    },
    {
      title: "BuildId",
      dataIndex: "buildId",
      width: 80,
    },
    {
      title: "开始时间",
      dataIndex: "startTime",
      width: TABLE_CELL_DATETIME_WIDTH,
    },
    {
      title: "持续时间（ms）",
      dataIndex: "durationInMillis",
      width: 100,
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
              text: "重试",
              disabled:
                row.result === "SUCCESS" ||
                row.result === "NOT_BUILT" ||
                !access.taskRestartStageApiDepTasksByIdstageid,
              onClick: () =>
                modal.confirm({
                  title: "确定要重试该阶段？",
                  content: `重试阶段 ${row.name}`,
                  onOk: () =>
                    taskRestartStageApiDepTasksByIdstageid({
                      id: String(taskId),
                      stageid: String(row.id),
                    }).then(() => tableRef.current?.reload()),
                }),
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
        name="task-stage"
        actionRef={tableRef}
        columns={columns}
        rowKey="id"
        searchPlaceholder=""
        params={{ id: String(taskId) }}
        request={taskReadOneApiDepTasksById}
        defaultColumnsState={columnsState}
        scroll={{
          y: TABLE_MODAL_HEIGHT,
        }}
      />
    </>
  )
}
