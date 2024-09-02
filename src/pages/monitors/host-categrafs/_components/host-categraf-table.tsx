import Table, { TableColumns } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
} from "@/constants/table"
import { tableCellDatetimePostProcess } from "@/lib/utils"

import {
  hostCtfConfDeleteApiIbexCtfsHostsByConfsid,
  hostCtfConfListApiIbexCtfsHostsByUidconfs,
} from "@/services/ibex/hosts"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { App, Button } from "antd"
import { useState } from "react"
import CategrafAddDrawer from "./categraf-add-drawer"
import CategrafConfigDrawer from "./categraf-config-drawer"

export interface HostCategrafTableProps {
  tableRef: React.MutableRefObject<ActionType | undefined>
  hostTableRef?: React.MutableRefObject<ActionType | undefined>
  selectedHost: CMDB.HostInfo
}

export default function HostCategrafTable({
  tableRef,
  selectedHost,
}: HostCategrafTableProps) {
  const { modal, message } = App.useApp()

  const showStopConfirm = (ctf: IBEX.CtfConfInfo) =>
    modal.confirm({
      title: `确定停用监控 ${ctf.ctf_type} 吗？`,
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        await hostCtfConfDeleteApiIbexCtfsHostsByConfsid({
          id: ctf.id.toString(),
        })
        message.success("停用成功")
        tableRef.current?.reload(false)
      },
    })

  const [selectedCtfToUpdate, setSelectedCtfToUpdate] = useState<
    IBEX.CtfConfInfo | undefined
  >()
  const [openAddDrawer, setOpenAddDrawer] = useState(false)

  const columns: TableColumns<IBEX.CtfConfInfo> = [
    {
      title: "配置项",
      dataIndex: "ctf_type",
      width: 120,
    },
    {
      title: "状态",
      dataIndex: "state",
      width: 80,
    },
    {
      title: "更新者",
      dataIndex: "updated_by",
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      title: "更新时间",
      dataIndex: "updated_at",
      valueType: "dateTime",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (dom, row) => tableCellDatetimePostProcess(dom, row.updated_at),
    },
    {
      title: "操作",
      key: "options",
      width: 100,
      fixed: "right",
      render: (_, row) => (
        <TableCellActions
          actions={[
            {
              text: "配置",
              onClick: () => setSelectedCtfToUpdate(row),
            },

            {
              text: "停用",
              danger: true,
              onClick: () => showStopConfirm(row),
            },
          ]}
        />
      ),
    },
  ]

  return (
    <>
      <Table
        name="host-categraf"
        className="w-[600px] max-w-[40dvw] shrink-0"
        actionRef={tableRef}
        columns={columns}
        rowKey="id"
        params={{ uid: selectedHost.Uid }}
        searchPlaceholder="请输入配置项查询"
        request={(
          params: IBEX.hostCtfConfListApiIbexCtfsHostsByUidconfsParams & {
            keywords?: string
          },
        ) =>
          hostCtfConfListApiIbexCtfsHostsByUidconfs(params).then((res) => {
            const normalizedKeywords = params.keywords?.trim().toLowerCase()

            const list = normalizedKeywords
              ? res.data?.items?.filter((item) =>
                  item.ctf_type.toLowerCase().includes(normalizedKeywords),
                )
              : res.data?.items

            return {
              ...res,
              data: { list, total: list?.length },
            }
          })
        }
        toolbar={{
          actions: [
            <Button
              key="add"
              type="primary"
              onClick={() => setOpenAddDrawer(true)}
            >
              添加监控
            </Button>,
          ],
        }}
      />
      <CategrafAddDrawer
        open={openAddDrawer}
        onClose={() => setOpenAddDrawer(false)}
        hostUid={selectedHost.Uid}
        onFinish={() => tableRef.current?.reload()}
      />
      <CategrafConfigDrawer
        open={!!selectedCtfToUpdate}
        onClose={() => setSelectedCtfToUpdate(undefined)}
        ctf={selectedCtfToUpdate}
        onFinish={() => tableRef.current?.reload()}
      />
    </>
  )
}
