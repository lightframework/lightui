import Table, { TableColumns, TableColumnsState } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import TableCellEllipsisList from "@/components/table-cell-ellipsis-list"
import { TABLE_CELL_UID_WIDTH } from "@/constants/table"
import { envPageListApiCmdbEnvs } from "@/services/cmdb/env"
import { ActionType } from "@ant-design/pro-components"
import { history, useAccess } from "@umijs/max"
import { Tag } from "antd"
import { useRef, useState } from "react"
import DeployModalForm from "./deploy-modal-form"
import DownloadPackageModalForm from "./download-package-modal-form"
import SyncJforgButton from "./sync-jforg-button"

export default function EnvTable() {
  const access = useAccess()
  const tableRef = useRef<ActionType>()

  const [selectedEnvToDeploy, setSelectedEnvToDeploy] = useState<
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
      title: "当前安装包",
      key: "version",
      width: 240,
      render: (_, row) => (
        <TableCellEllipsisList
          items={row.Package}
          maxCount={4}
          rowKey={(item) => `${item.Repo} - ${item.Version}`}
          renderItem={(item) => `${item.Repo} - ${item.Version}`}
        />
      ),
    },
    {
      title: "操作",
      key: "options",
      width: 180,
      fixed: "right",
      render: (_, row) => (
        <TableCellActions
          actions={[
            {
              text: "部署",
              onClick: () => setSelectedEnvToDeploy(row),
              disabled: !access.taskCreateApiDepTasks || !row.State,
            },
            {
              text: "离线包",
              onClick: () => setSelectedEnvToDownloadPackage(row),
              disabled: !access.taskCreateApiDepTasks || !row.State,
            },
            {
              text: "执行记录",
              onClick: () => history.push("/ci/task", { envId: row.EnvId }),
              disabled: !access.canMenuCiTask,
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
        request={envPageListApiCmdbEnvs}
        defaultColumnsState={columnsState}
        toolbar={{
          actions: [<SyncJforgButton key="sync" />],
        }}
      />
      <DeployModalForm
        open={!!selectedEnvToDeploy}
        onCancel={() => setSelectedEnvToDeploy(undefined)}
        env={selectedEnvToDeploy}
      />
      <DownloadPackageModalForm
        open={!!selectedEnvToDownloadPackage}
        onCancel={() => setSelectedEnvToDownloadPackage(undefined)}
        env={selectedEnvToDownloadPackage}
      />
    </>
  )
}
