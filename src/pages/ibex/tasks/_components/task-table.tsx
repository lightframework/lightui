import Table, { TableColumns } from "@/components/table"
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
} from "@/constants/table"
import { useQueryUserOptions } from "@/lib/hooks/data"
import { useLocalStorageState } from "@/lib/hooks/use-local-storage-state"
import { taskListApiIbexTasks } from "@/services/ibex/tpl"
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { useAccess, useModel } from "@umijs/max"
import { Button, InputNumber, Select, theme } from "antd"
import { useRef, useState } from "react"
import TaskDetailsModal from "./task-details-modal"
import TempTaskFormDrawer from "./temp-task-form-drawer"

export default function TaskTable() {
  const { token } = theme.useToken()
  const access = useAccess()
  const tableRef = useRef<ActionType>()

  const { initialState } = useModel("@@initialState")

  const currentUser = initialState?.currentUser

  const [filterCreator, setFilterCreator] = useLocalStorageState(
    "ibex-table-creator-filter",
    currentUser?.username ?? "",
  )
  const [filterDays, setFilterDays] = useState(7)
  const [selectedTaskToView, setSelectedTaskToView] = useState<
    IBEX.TaskMeta | undefined
  >()

  const [openFormDrawer, setOpenFormDrawer] = useState(false)

  const { data: users } = useQueryUserOptions()

  const columns: TableColumns<IBEX.TaskMeta> = [
    {
      title: "ID",
      dataIndex: "id",
      width: 60,
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 300,
      render: (_, row) =>
        access.taskReadOneApiIbexByTasksid ? (
          <Button
            type="link"
            size="small"
            onClick={() => setSelectedTaskToView(row)}
          >
            {row.title}
          </Button>
        ) : (
          row.title
        ),
    },
    {
      title: "是否完成",
      dataIndex: "done",
      width: 80,
      render: (_, row) =>
        row.done ? (
          <CheckCircleOutlined style={{ color: token.colorSuccess }} />
        ) : (
          <CloseCircleOutlined style={{ color: token.colorError }} />
        ),
    },
    {
      title: "创建者",
      dataIndex: "creator",
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      title: "创建时间",
      dataIndex: "created",
      valueType: "dateTime",
      width: TABLE_CELL_DATETIME_WIDTH,
    },
  ]

  return (
    <>
      <Table
        name="tpl-task"
        actionRef={tableRef}
        columns={columns}
        rowKey="id"
        params={
          { creator: filterCreator, days: filterDays } as IBEX.TaskRecordListReq
        }
        request={(
          params: IBEX.TaskRecordListReq & {
            pageSize?: number
            current?: number
            keywords?: string
          },
        ) =>
          taskListApiIbexTasks({
            ...params,
            p: params.current!,
            limit: params.pageSize!,
            query: params.keywords,
          }).then((res) => ({
            ...res,
            data: { ...res.data, list: res.data?.items },
          }))
        }
        searchPlaceholder="请输入标题查询"
        toolbar={{
          subTitle: (
            <div className="flex gap-x-2">
              <InputNumber
                addonBefore="最近"
                addonAfter="天"
                value={filterDays}
                onChange={(value) => setFilterDays(value ?? 7)}
                style={{ width: 120 }}
              />
              <Select
                options={users?.map((user) => ({
                  value: user.username,
                  label: user.username,
                }))}
                value={filterCreator}
                allowClear
                showSearch
                placeholder="创建者"
                style={{ width: 120 }}
                onChange={(value) => setFilterCreator(value ?? "")}
              />
            </div>
          ),
          actions: [
            <Button
              key="app-create"
              type="primary"
              onClick={() => setOpenFormDrawer(true)}
              disabled={!access.taskCreateApiIbexTasks}
            >
              创建临时任务
            </Button>,
          ],
        }}
        autoRefresh
      />
      <TaskDetailsModal
        open={!!selectedTaskToView}
        onClose={() => setSelectedTaskToView(undefined)}
        taskId={selectedTaskToView?.id}
      />
      <TempTaskFormDrawer
        open={openFormDrawer}
        onClose={() => setOpenFormDrawer(false)}
        onFinish={() => tableRef.current?.reload()}
      />
    </>
  )
}
