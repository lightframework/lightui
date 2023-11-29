import Table, { TableColumns, TableColumnsState } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_DESC_WIDTH,
  TABLE_CELL_UID_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
} from "@/constants/table"
import { tableCellDatetimePostProcess } from "@/lib/utils"
import {
  appDeleteApiCmdbAppsByUid,
  appPageListApiCmdbApps,
} from "@/services/cmdb/app"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Switch, message } from "antd"
import useModal from "antd/es/modal/useModal"
import { useRef, useState } from "react"
import AppCreateModalForm from "./app-create-modal-form"
import AppUpdateModalForm from "./app-update-modal-form"

export default function AppTable() {
  const access = useAccess()
  const [modal, contextHolder] = useModal()
  const tableRef = useRef<ActionType>()

  const [selectedAppToUpdate, setSelectedAppToUpdate] = useState<
    CMDB.AppInfo | undefined
  >()

  const showDeleteConfirm = (app: CMDB.AppInfo) =>
    modal.confirm({
      title: "确定删除应用吗？",
      icon: <ExclamationCircleOutlined />,
      content: `删除应用 ${app.App}${app.Version ? `:${app.Version}` : ""}`,
      onOk: async () => {
        await appDeleteApiCmdbAppsByUid({ uid: app.Uid })
        message.success("删除成功")
        tableRef.current?.reload(false)
      },
    })

  const columnsState: TableColumnsState = {
    Uid: { show: false },
  }

  const columns: TableColumns<CMDB.AppInfo> = [
    {
      title: "UID",
      dataIndex: "Uid",
      width: TABLE_CELL_UID_WIDTH,
    },
    {
      title: "应用名称",
      dataIndex: "App",
      width: 160,
      copyable: true,
      fixed: "left",
    },
    { title: "应用类型", dataIndex: "AppType", width: 140 },
    { title: "版本", dataIndex: "Version", width: 140 },
    { title: "AnsibleId", dataIndex: "AnsibleId", width: 200 },
    {
      title: "状态",
      dataIndex: "Enabled",
      render: (_, row) => (
        <Switch
          checked={row.Enabled}
          disabled
          checkedChildren="启用"
          unCheckedChildren="禁用"
        />
      ),
      width: 80,
    },
    {
      title: "创建者",
      dataIndex: "createBy",
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      title: "创建时间",
      dataIndex: "createAt",
      valueType: "dateTime",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (dom, row) => tableCellDatetimePostProcess(dom, row.createAt),
    },
    {
      title: "更新者",
      dataIndex: "updateBy",
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      title: "更新时间",
      dataIndex: "updateAt",
      valueType: "dateTime",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (dom, row) => tableCellDatetimePostProcess(dom, row.updateAt),
    },
    {
      title: "备注",
      dataIndex: "Description",
      ellipsis: true,
      width: TABLE_CELL_DESC_WIDTH,
    },
    {
      title: "操作",
      key: "options",
      width: 250,
      fixed: "right",
      render: (_, row) => (
        <TableCellActions
          actions={[
            {
              text: "编辑",
              onClick: () => setSelectedAppToUpdate(row),
              disabled: !access.appUpdateApiCmdbAppsByUid,
            },
            { text: "配置监控", disabled: true },
            { text: "配置安装流程", disabled: true },
            {
              text: "删除",
              onClick: () => showDeleteConfirm(row),
              danger: true,
              disabled: !access.appDeleteApiCmdbAppsByUid,
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
        name="app"
        actionRef={tableRef}
        columns={columns}
        rowKey="Uid"
        searchPlaceholder="请输入应用名称查询"
        request={appPageListApiCmdbApps}
        defaultColumnsState={columnsState}
        toolbar={{
          actions: [
            <AppCreateModalForm
              key="app-create"
              onFinish={() => tableRef.current?.reload()}
            />,
          ],
        }}
      />
      <AppUpdateModalForm
        open={selectedAppToUpdate !== undefined}
        onCancel={() => setSelectedAppToUpdate(undefined)}
        app={selectedAppToUpdate}
        onFinish={() => tableRef.current?.reload(false)}
      />
    </>
  )
}
