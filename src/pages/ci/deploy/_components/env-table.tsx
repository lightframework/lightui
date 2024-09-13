import EditableOwnersCell from "@/components/editable-owners-cell"
import EditablePipelineCell from "@/components/editable-pipeline-cell"
import Table, { TableColumns, TableColumnsState } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import TableCellEllipsisList from "@/components/table-cell-ellipsis-list"
import { ciStageStateDict, dictGet } from "@/constants/dict"
import { TABLE_CELL_UID_WIDTH } from "@/constants/table"
import {
  envLockApiCmdbEnvsLock,
  envPageListApiCmdbEnvs,
} from "@/services/cmdb/env"
import { ActionType } from "@ant-design/pro-components"
import { history, useAccess, useModel } from "@umijs/max"
import { Switch, Tag } from "antd"
import { useRef, useState } from "react"
import DeployModalForm from "./deploy-modal-form"
import DownloadPackageModalForm from "./download-package-modal-form"
import RollbackConfirmModal from "./rollback-confirm-modal"
import SyncJforgButton from "./sync-jforg-button"

export default function EnvTable() {
  const access = useAccess()
  const tableRef = useRef<ActionType>()
  const { initialState } = useModel("@@initialState")
  const currentUser = initialState?.currentUser

  const [selectedEnvToDeploy, setSelectedEnvToDeploy] = useState<
    CMDB.EnvInfo | undefined
  >()
  const [selectedEnvToRollback, setSelectedEnvToRollback] = useState<
    CMDB.EnvInfo | undefined
  >()
  const [selectedEnvToDownloadPackage, setSelectedEnvToDownloadPackage] =
    useState<CMDB.EnvInfo | undefined>()

  const columnsState: TableColumnsState = {
    Uid: { show: false },
  }

  const columns: TableColumns<CMDB.EnvInfo> = [
    {
      title: "UID",
      dataIndex: "Uid",
      width: TABLE_CELL_UID_WIDTH,
    },
    {
      title: "环境名称",
      dataIndex: "EnvName",
      width: 200,
      sorter: true,
      copyable: true,
      fixed: "left",
    },
    {
      title: "环境ID",
      dataIndex: "EnvId",
      width: 80,
      copyable: true,
    },
    {
      title: "环境Key",
      dataIndex: "EnvKey",
      width: 120,
      copyable: true,
    },
    {
      title: "状态",
      dataIndex: "State",
      width: 80,
      render: (_, row) =>
        row.State ? (
          <Tag
            color={
              row.State === "ONLINE"
                ? "green"
                : row.State === "TEST"
                  ? "orange"
                  : undefined
            }
          >
            {row.State === "ONLINE"
              ? "线上"
              : row.State === "TEST"
                ? "测试"
                : row.State === "GRAY"
                  ? "灰度"
                  : row.State}
          </Tag>
        ) : (
          "-"
        ),
    },
    {
      title: "Owners",
      dataIndex: "Owners",
      width: 240,
      render: (_, row) => (
        <EditableOwnersCell
          envUid={row.Uid}
          owners={row.Owners}
          onFinish={() => tableRef.current?.reload()}
        />
      ),
    },
    {
      title: "流水线",
      dataIndex: "Pipline",
      width: 160,
      render: (_, row) => (
        <EditablePipelineCell
          envUid={row.Uid}
          pipeline={row.Pipline}
          onFinish={() => tableRef.current?.reload()}
        />
      ),
    },
    {
      title: "流水线状态",
      dataIndex: "PiplineState",
      width: 100,
      render: (_, row) =>
        row.PiplineState ? (
          <Tag color={dictGet(row.PiplineState, ciStageStateDict)?.color}>
            {dictGet(row.PiplineState, ciStageStateDict)?.value ??
              row.PiplineState}
          </Tag>
        ) : null,
    },
    {
      title: "锁定",
      dataIndex: "Locker",
      width: 100,
      render: (_, row) => {
        return (
          <Switch
            checked={!!row.Locker}
            onChange={async (checked) => {
              await envLockApiCmdbEnvsLock({ uid: row.Uid, Lock: checked })
              tableRef.current?.reload(false)
            }}
            disabled={
              !access.envLockApiCmdbEnvsLock ||
              (!!row.Locker && row.Locker !== currentUser?.username)
            }
            checkedChildren={row.Locker}
          />
        )
      },
    },
    {
      title: "当前安装包",
      key: "version",
      width: 280,
      render: (_, row) => (
        <TableCellEllipsisList
          items={row.Package}
          maxCount={5}
          rowKey={(item) => `${item.ModuleName} - ${item.Version}`}
          renderItem={(item) => `${item.ModuleName} - ${item.Version}`}
        />
      ),
    },
    {
      title: " Orch处理器架构",
      dataIndex: "OsType",
      width: 120,
    },
    {
      title: "Orch部署架构",
      dataIndex: "EnvType",
      width: 100,
    },
    {
      title: "Orch语言",
      dataIndex: "EnvLanguage",
      width: 100,
      render: (_, row) =>
        row.EnvLanguage === "cn"
          ? "中文"
          : row.EnvLanguage === "us"
            ? "英文"
            : row.EnvLanguage,
    },
    {
      title: "操作",
      key: "options",
      width: 220,
      fixed: "right",
      render: (_, row) => (
        <TableCellActions
          actions={[
            {
              text: "部署",
              onClick: () => setSelectedEnvToDeploy(row),
              disabled:
                !!row.Locker || !access.taskCreateApiDepTasks || !row.State,
            },
            {
              text: "回退",
              onClick: () => setSelectedEnvToRollback(row),
              disabled:
                !!row.Locker ||
                !access.taskCreateBackApiDepTasksBack ||
                !row.State,
            },
            {
              text: "离线包",
              onClick: () => setSelectedEnvToDownloadPackage(row),
              disabled:
                !!row.Locker || !access.taskCreateApiDepTasks || !row.State,
            },
            {
              text: "执行记录",
              onClick: () => history.push("/ci/task", { envId: row.EnvId }),
              disabled:
                (row.Locker && row.Locker !== currentUser?.username) ||
                !access.canMenuCiTask,
            },
          ]}
        />
      ),
    },
  ]

  return (
    <>
      <Table
        name="ci-env"
        actionRef={tableRef}
        columns={columns}
        rowKey="Uid"
        searchPlaceholder="请输入环境名称查询"
        params={{ ByOwner: true }}
        request={envPageListApiCmdbEnvs}
        defaultColumnsState={columnsState}
        toolbar={{
          actions: [<SyncJforgButton key="sync" />],
        }}
        autoRefresh
      />
      <DeployModalForm
        open={!!selectedEnvToDeploy}
        onCancel={() => setSelectedEnvToDeploy(undefined)}
        env={selectedEnvToDeploy}
        onFinish={() => tableRef.current?.reload()}
      />
      <RollbackConfirmModal
        open={!!selectedEnvToRollback}
        onCancel={() => setSelectedEnvToRollback(undefined)}
        env={selectedEnvToRollback}
        onFinish={() => tableRef.current?.reload()}
      />
      <DownloadPackageModalForm
        open={!!selectedEnvToDownloadPackage}
        onCancel={() => setSelectedEnvToDownloadPackage(undefined)}
        env={selectedEnvToDownloadPackage}
        onFinish={() => tableRef.current?.reload()}
      />
    </>
  )
}
