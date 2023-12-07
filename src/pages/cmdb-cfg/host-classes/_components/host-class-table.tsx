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
  hosttypeDeleteApiCmdbHostclassesByUid,
  hosttypePageListApiCmdbHostclasses,
} from "@/services/cmdb/hostclasses"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { message } from "antd"
import useModal from "antd/es/modal/useModal"
import { useRef, useState } from "react"
import HostClassCreateModalForm from "./host-class-create-modal-form"
import HostClassUpdateModalForm from "./host-class-update-modal-form"

export default function HostClassTable() {
  const access = useAccess()
  const [modal, contextHolder] = useModal()
  const tableRef = useRef<ActionType>()

  const [selectedHostClassToUpdate, setSelectedHostClassToUpdate] = useState<
    CMDB.HostClassesInfo | undefined
  >()

  const showDeleteConfirm = (hostClass: CMDB.HostClassesInfo) =>
    modal.confirm({
      title: "确定删除主机类别吗？",
      icon: <ExclamationCircleOutlined />,
      content: `删除主机类别 ${hostClass.HostClasses}`,
      onOk: async () => {
        await hosttypeDeleteApiCmdbHostclassesByUid({ uid: hostClass.Uid })
        message.success("删除成功")
        tableRef.current?.reload(false)
      },
    })

  const columnsState: TableColumnsState = {
    Uid: { show: false },
    createAt: { show: false },
    createBy: { show: false },
    updateAt: { show: false },
    updateBy: { show: false },
  }

  const columns: TableColumns<CMDB.HostClassesInfo> = [
    {
      title: "UID",
      dataIndex: "Uid",
      width: TABLE_CELL_UID_WIDTH,
    },
    {
      title: "主机类别名称",
      dataIndex: "HostClasses",
      width: 160,
      copyable: true,
      sorter: true,
      fixed: "left",
    },
    {
      title: "JumpId",
      dataIndex: "JumpId",
      width: 250,
      copyable: true,
    },
    {
      title: "Jumpserver特权用户",
      dataIndex: "AdminUser",
      width: 250,
      copyable: true,
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
      width: 90,
      fixed: "right",
      render: (_, row) => (
        <TableCellActions
          actions={[
            {
              text: "编辑",
              onClick: () => setSelectedHostClassToUpdate(row),
              disabled: !access.hosttypeUpdateApiCmdbHostclassesByUid,
            },
            {
              text: "删除",
              onClick: () => showDeleteConfirm(row),
              danger: true,
              disabled: !access.hosttypeDeleteApiCmdbHostclassesByUid,
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
        name="host-class"
        actionRef={tableRef}
        columns={columns}
        rowKey="Uid"
        searchPlaceholder="请输入主机类别名称查询"
        request={hosttypePageListApiCmdbHostclasses}
        toolbar={{
          actions: [
            <HostClassCreateModalForm
              key="host-class-create"
              onFinish={() => tableRef.current?.reload()}
            />,
          ],
        }}
        defaultColumnsState={columnsState}
      />
      <HostClassUpdateModalForm
        open={selectedHostClassToUpdate !== undefined}
        onCancel={() => setSelectedHostClassToUpdate(undefined)}
        hostClass={selectedHostClassToUpdate}
        onFinish={() => tableRef.current?.reload(false)}
      />
    </>
  )
}
