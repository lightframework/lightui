import Table, { TableColumns, TableColumnsState } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import { TABLE_CELL_UID_WIDTH } from "@/constants/table"
import {
  shiftDeleteApiSysDutiesByShiftsid,
  shiftReadListApiSysDutiesShifts,
} from "@/services/sys/duty"
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { useAccess, useModel } from "@umijs/max"
import { Button, message, theme } from "antd"
import useModal from "antd/es/modal/useModal"
import { useSetAtom } from "jotai"
import { useRef } from "react"
import { shiftTableActionAtom } from "../_atoms"
import ShiftModalForm from "./shift-modal-form"

export default function ShiftTable() {
  const access = useAccess()
  const [modal, contextHolder] = useModal()
  const { token } = theme.useToken()
  const tableRef = useRef<ActionType>()
  const setTableAction = useSetAtom(shiftTableActionAtom)

  const { initialState } = useModel("@@initialState")
  const currentUser = initialState?.currentUser?.username

  const showDeleteConfirm = (shift: SYS.Shift) =>
    modal.confirm({
      title: "确定删除班次吗？",
      icon: <ExclamationCircleOutlined />,
      content: `删除班次 ${shift.name}`,
      onOk: async () => {
        await shiftDeleteApiSysDutiesByShiftsid({ id: shift.id })
        message.success("删除成功")
        tableRef.current?.reload(false)
      },
    })

  const columns: TableColumns<SYS.Shift> = [
    {
      dataIndex: "id",
      title: "ID",
      width: TABLE_CELL_UID_WIDTH,
    },
    {
      dataIndex: "name",
      title: "名称",
      width: 200,
    },
    {
      title: "管理员",
      dataIndex: "members",
      width: 300,
      render: (_, record) => record.admins?.join(","),
    },
    {
      title: "成员",
      dataIndex: "members",
      width: 300,
      render: (_, record) => record.members?.join(","),
    },
    {
      title: "支付值班费",
      dataIndex: "is_paid_duty",
      width: 100,
      render: (_, record) =>
        record.is_paid_duty ? (
          <CheckCircleOutlined style={{ color: token.colorSuccess }} />
        ) : (
          <CloseCircleOutlined style={{ color: token.colorError }} />
        ),
    },
    {
      title: "操作",
      key: "options",
      width: 90,
      fixed: "right",
      render: (_, row) => (
        <TableCellActions
          actions={[
            {
              text: "编辑",
              disabled:
                !currentUser ||
                !row.admins.includes(currentUser) ||
                !access.shiftUpdateApiSysDutiesShifts,
              onClick: () => setTableAction({ type: "update", shift: row }),
            },
            {
              text: "删除",
              disabled:
                !currentUser ||
                !row.admins.includes(currentUser) ||
                !access.shiftDeleteApiSysDutiesByShiftsid,
              onClick: () => showDeleteConfirm(row),
              danger: true,
            },
          ]}
        />
      ),
    },
  ]

  const columnsState: TableColumnsState = {
    id: { show: false },
  }

  return (
    <>
      {contextHolder}
      <Table
        name="shift"
        actionRef={tableRef}
        columns={columns}
        rowKey="id"
        pagination={false}
        searchPlaceholder="输入名称查询"
        defaultColumnsState={columnsState}
        request={async ({ keywords }) => {
          const res = await shiftReadListApiSysDutiesShifts()

          const normalizedKeywords = keywords?.trim().toLowerCase()

          const filters = normalizedKeywords
            ? res.data?.items?.filter((item) =>
                item.name.toLowerCase().includes(normalizedKeywords),
              )
            : res.data?.items

          return {
            ...res,
            data: { list: filters },
          }
        }}
        toolbar={{
          actions: [
            <Button
              key="app-create"
              type="primary"
              icon={<PlusOutlined />}
              disabled={!access.shiftCreateApiSysDutiesShifts}
              onClick={() => setTableAction({ type: "create" })}
            >
              创建
            </Button>,
          ],
        }}
      />
      <ShiftModalForm onFinish={() => tableRef.current?.reload()} />
    </>
  )
}
