import Table, { TableColumns, TableColumnsState } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import TableCellEllipsisList from "@/components/table-cell-ellipsis-list"
import { ciStateDict, dictGet } from "@/constants/dict"
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_DESC_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
} from "@/constants/table"
import { useQueryDeployedEnvOptions } from "@/lib/hooks/data"
import useShowJsonModal from "@/lib/hooks/use-show-json-modal"
import { microsecondsToDuration } from "@/lib/utils"
import {
  packagesDeployRepoApiDepPackagesRepodeploy,
  packagesDeployVersionApiDepPackagesVersiondeploy,
} from "@/services/dep/packages"
import { taskPageListApiDepTasks } from "@/services/dep/task"
import { LockOutlined } from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { useQuery } from "@tanstack/react-query"
import { useAccess, useModel } from "@umijs/max"
import { Select, Tag, Tooltip, theme } from "antd"
import { useRef, useState } from "react"
import TaskStageTableModal from "./task-stage-table-modal"

export default function TaskTable({
  initialEnvUid,
}: {
  initialEnvUid?: string
}) {
  const access = useAccess()
  const { token } = theme.useToken()
  const showJsonModal = useShowJsonModal()
  const { initialState } = useModel("@@initialState")
  const currentUser = initialState?.currentUser

  const [envUid, setEnvUid] = useState<string | undefined>(initialEnvUid)
  const [repo, setRepo] = useState<string | undefined>()
  const [version, setVersion] = useState<string | undefined>()
  const [state, setState] = useState<string | undefined>()

  const [selectedTaskToView, setSelectedTaskToView] = useState<
    DEP.TaskInfo | undefined
  >()

  const tableRef = useRef<ActionType>()

  const columnsState: TableColumnsState = {
    id: { show: false },
  }

  const columns: TableColumns<DEP.TaskInfo> = [
    {
      title: "ID",
      dataIndex: "id",
      width: 100,
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 200,
      fixed: "left",
    },
    {
      title: "产品",
      dataIndex: "product",
      width: 80,
    },
    {
      title: "类型",
      dataIndex: "type",
      width: 80,
    },
    {
      title: "环境",
      dataIndex: "envName",
      width: 120,
      render: (_, row) => (
        <div className="flex items-center gap-1">
          <span>{row.envName}</span>
          {row.Locker && (
            <Tooltip title={row.Locker}>
              <LockOutlined style={{ color: token.colorPrimary }} />
            </Tooltip>
          )}
        </div>
      ),
    },
    {
      title: "代码类型",
      dataIndex: "toolsType",
      width: 100,
      render: (_, row) => (
        <Tag color={row.toolsType === "release" ? "green" : "blue"}>
          {row.toolsType}
        </Tag>
      ),
    },
    {
      title: "安装包",
      key: "version",
      width: 280,
      render: (_, row) => (
        <TableCellEllipsisList
          items={row.package.flatMap((pak) => pak.module)}
          maxCount={5}
          rowKey={(item) => `${item.moduleName} - ${item.version}`}
          renderItem={(item) => `${item.moduleName} - ${item.version}`}
        />
      ),
    },
    {
      title: "任务类型",
      dataIndex: "taskType",
      width: 120,
      render: (_, row) => (
        <Tag color={row.taskType === "升级" ? "blue" : "purple"}>
          {row.taskType}
        </Tag>
      ),
    },

    {
      title: "状态",
      dataIndex: "state",
      width: 100,
      render: (_, row) => (
        <Tag color={dictGet(row.state, ciStateDict)?.color}>
          {dictGet(row.state, ciStateDict)?.value ?? row.state}
        </Tag>
      ),
    },
    {
      title: "BuildId",
      dataIndex: "buildId",
      width: 80,
    },
    {
      title: "开始时间",
      dataIndex: "timestamp",
      width: TABLE_CELL_DATETIME_WIDTH,
    },
    {
      title: "持续时间（ms）",
      dataIndex: "duration",
      width: 100,
      render: (_, row) => microsecondsToDuration(row.duration),
    },
    {
      title: "操作人",
      dataIndex: "operator",
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      title: "消息",
      dataIndex: "message",
      width: TABLE_CELL_DESC_WIDTH,
      render: (_, row) => (
        <Tooltip className="line-clamp-3" title={row.message}>
          {row.message}
        </Tooltip>
      ),
    },
    {
      title: "操作",
      key: "options",
      width: 150,
      fixed: "right",
      render: (_, row) => (
        <TableCellActions
          actions={[
            {
              text: "查看参数",
              onClick: () =>
                showJsonModal({
                  title: "输入参数",
                  content: row.params ?? "-",
                }),
              disabled: !!row.Locker && row.Locker !== currentUser?.username,
            },
            {
              text: "执行步骤",
              onClick: () => setSelectedTaskToView(row),
              disabled:
                !access.taskReadOneApiDepTasksById ||
                (!!row.Locker && row.Locker !== currentUser?.username),
            },
          ]}
        />
      ),
    },
  ]

  const { data: envOptions, isFetching: isFetchingEnvOptions } =
    useQueryDeployedEnvOptions()

  const { data: repoOptions, isFetching: isFetchingRepoOptions } = useQuery({
    queryKey: ["deploy-repo-options"],
    queryFn: () =>
      packagesDeployRepoApiDepPackagesRepodeploy().then(
        (res) => res.data?.repos ?? [],
      ),
  })

  const { data: repoVersionOptions, isFetching: isFetchingRepoVersionOptions } =
    useQuery({
      queryKey: ["deploy-repo-version-options", repo],
      queryFn: () =>
        packagesDeployVersionApiDepPackagesVersiondeploy({ repo }).then(
          (res) => res.data?.versions ?? [],
        ),
    })

  return (
    <>
      <Table
        name="ci-task"
        actionRef={tableRef}
        columns={columns}
        rowKey="id"
        searchPlaceholder="请输入标题查询"
        params={{
          envUid: envUid ? String(envUid) : undefined,
          repo,
          version,
          state,
        }}
        request={taskPageListApiDepTasks}
        toolbar={{
          subTitle: (
            <div className="flex gap-x-2">
              <Select
                value={envUid}
                onChange={setEnvUid}
                placeholder="环境"
                options={envOptions?.map((env) => ({
                  label: env.EnvName,
                  value: env.envUid,
                }))}
                loading={isFetchingEnvOptions}
                allowClear
                showSearch
                filterOption={(input: string, option?: { label: string }) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                style={{ width: 140 }}
              />
              <Select
                value={repo}
                onChange={setRepo}
                placeholder="仓库"
                options={repoOptions?.map((r) => ({
                  label: r,
                  value: r,
                }))}
                loading={isFetchingRepoOptions}
                allowClear
                showSearch
                filterOption={(input: string, option?: { label: string }) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                style={{ width: 200 }}
              />
              <Select
                value={version}
                onChange={setVersion}
                placeholder="版本"
                options={repoVersionOptions?.map((r) => ({
                  label: r,
                  value: r,
                }))}
                loading={isFetchingRepoVersionOptions}
                allowClear
                showSearch
                filterOption={(input: string, option?: { label: string }) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                style={{ width: 100 }}
              />
              <Select
                value={state}
                onChange={setState}
                placeholder="状态"
                options={Object.keys(ciStateDict).map((key) => ({
                  label: key,
                  value: key,
                }))}
                allowClear
                style={{ width: 120 }}
              />
            </div>
          ),
        }}
        defaultColumnsState={columnsState}
        autoRefresh
      />
      <TaskStageTableModal
        open={!!selectedTaskToView}
        onCancel={() => setSelectedTaskToView(undefined)}
        task={selectedTaskToView}
      />
    </>
  )
}
