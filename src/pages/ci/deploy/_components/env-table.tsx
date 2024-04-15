import Table, { TableColumns, TableColumnsState } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import TableCellEllipsisList from "@/components/table-cell-ellipsis-list"
import { TABLE_CELL_UID_WIDTH } from "@/constants/table"
import { envPageListApiCmdbEnvs } from "@/services/cmdb/env"
import { ActionType } from "@ant-design/pro-components"
import { history, useAccess } from "@umijs/max"
import { Tag, theme } from "antd"
import { useRef, useState } from "react"
import DeployModalForm from "./deploy-modal-form"
import DownLoadPackageModalForm from "./download-package-modal-form"

export default function EnvTable() {
  const { token } = theme.useToken()
  const access = useAccess()
  const tableRef = useRef<ActionType>()

  const [selectedEnvToDeploy, setSelectedEnvToDeploy] = useState<
    CMDB.EnvInfo | undefined
  >()

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
      title: "发布状态",
      dataIndex: "IsGray",
      width: 80,
      render: (_, row) => (
        <Tag color={row.IsGray ? token.colorTextSecondary : token.colorSuccess}>
          {row.IsGray ? "灰度" : "线上"}
        </Tag>
      ),
    },
    {
      title: "当前安装包",
      key: "version",
      width: 240,
      render: (_, row) => (
        <TableCellEllipsisList
          items={row.package}
          rowKey={(item) => `${item.Repo} - ${item.Version}`}
          renderItem={(item) => `${item.Repo} - ${item.Version}`}
        />
      ),
    },
    {
      title: "操作",
      key: "options",
      width: 120,
      fixed: "right",
      render: (_, row) => (
        <TableCellActions
          actions={[
            {
              text: "部署",
              onClick: () => setSelectedEnvToDeploy(row),
              disabled: !access.taskCreateApiDepTasks,
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
        toolbar={{
          actions: [<DownLoadPackageModalForm key="download-package" />],
        }}
        defaultColumnsState={columnsState}
      />
      <DeployModalForm
        open={!!selectedEnvToDeploy}
        onCancel={() => setSelectedEnvToDeploy(undefined)}
        env={selectedEnvToDeploy}
      />
    </>
  )
}
