import Table, { TableColumns } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_DESC_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
} from "@/constants/table"
import { tableCellDatetimePostProcess } from "@/lib/utils"

import {
  ctfTplDeleteApiIbexCtfsById,
  ctfTplListApiIbexCtfs,
} from "@/services/ibex/tpls"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { useSearchParams } from "@umijs/max"
import { App, Button } from "antd"
import { useRef, useState } from "react"
import CategrafTplFormDrawer from "./categraf-tpl-form-drawer"

export default function CategrafTplTable() {
  const { modal, message } = App.useApp()

  const tableRef = useRef<ActionType>()

  const [openFormDrawer, setOpenFormDrawer] = useState(false)

  const [selectedCtfToUpdate, setSelectedCtfToUpdate] = useState<
    IBEX.CtfTplInfo | undefined
  >()

  const showDeleteConfirm = (ctf: IBEX.CtfTplInfo) =>
    modal.confirm({
      title: "确定删除监控项吗？",
      icon: <ExclamationCircleOutlined />,
      content: `删除监控项 ${ctf.tpl_name}`,
      onOk: async () => {
        await ctfTplDeleteApiIbexCtfsById({ id: ctf.id.toString() })
        message.success("删除成功")
        tableRef.current?.reload(false)
      },
    })

  const columns: TableColumns<IBEX.CtfTplInfo> = [
    {
      title: "ID",
      dataIndex: "id",
      width: 60,
    },
    {
      title: "监控项",
      dataIndex: "ctf_type",
      width: 140,
    },

    {
      title: "配置名称",
      dataIndex: "tpl_name",
      width: 220,
    },
    { title: "备注", dataIndex: "remark", width: TABLE_CELL_DESC_WIDTH },
    {
      title: "创建者",
      dataIndex: "created_by",
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      title: "创建时间",
      dataIndex: "created_at",
      valueType: "dateTime",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (dom, row) => tableCellDatetimePostProcess(dom, row.created_at),
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
              text: "编辑",
              onClick: () => {
                setOpenFormDrawer(true)
                setSelectedCtfToUpdate(row)
              },
            },

            {
              text: "删除",
              onClick: () => showDeleteConfirm(row),
              danger: true,
            },
          ]}
        />
      ),
    },
  ]

  const [searchParams] = useSearchParams()

  return (
    <>
      <Table
        name="ctf-tpl"
        actionRef={tableRef}
        columns={columns}
        params={
          {
            ctf_type: searchParams.get("type") ?? undefined,
          } as IBEX.CtfTplListReq
        }
        rowKey="id"
        request={(
          params: IBEX.CtfTplListReq & {
            pageSize?: number
            current?: number
            keywords?: string
          },
        ) =>
          ctfTplListApiIbexCtfs({
            ...params,
            p: params.current!,
            limit: params.pageSize!,
            query: params.keywords,
          }).then((res) => ({
            ...res,
            data: { ...res.data, list: res.data?.items },
          }))
        }
        searchPlaceholder="请输入配置名称查询"
        toolbar={{
          actions: [
            <Button
              key="ctf-tpl-create"
              type="primary"
              onClick={() => setOpenFormDrawer(true)}
            >
              添加
            </Button>,
          ],
        }}
      />
      <CategrafTplFormDrawer
        open={openFormDrawer}
        onClose={() => {
          setOpenFormDrawer(false)
          setSelectedCtfToUpdate(undefined)
        }}
        ctf={selectedCtfToUpdate}
        onFinish={() => tableRef.current?.reload()}
      />
    </>
  )
}
