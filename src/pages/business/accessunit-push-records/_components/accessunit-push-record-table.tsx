import Table, { TableColumns, TableColumnsState } from "@/components/table"
import TableCellEllipsisList from "@/components/table-cell-ellipsis-list"
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_DESC_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
} from "@/constants/table"
import { useToken } from "@/lib/hooks/use-token"
import { tableCellDatetimePostProcess } from "@/lib/utils"
import { auRecordPageListApiOpsAuRecord } from "@/services/ops/au"
import { ActionType } from "@ant-design/pro-components"
import { Tag } from "antd"
import { useRef } from "react"

export default function AccessUnitPushRecordTable() {
  const { token } = useToken()
  const tableRef = useRef<ActionType>()

  const columnsState: TableColumnsState = {}

  const columns: TableColumns<OPS.AuRecordList> = [
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 200,
    },
    {
      title: "类型",
      dataIndex: "pushType",
      width: 80,
      render: (_, row) => (
        <>
          <Tag
            color={
              row.pushType === "online"
                ? token.colorSuccess
                : row.pushType === "push"
                  ? token.colorWarning
                  : token.colorError
            }
          >
            {row.pushType === "online"
              ? "上线"
              : row.pushType === "push"
                ? "推送"
                : "回退"}
          </Tag>
        </>
      ),
    },
    {
      title: "推送类型",
      dataIndex: "related",
      width: 80,
      render: (_, row) => (
        <Tag color={row.related ? "purple" : "blue"}>
          {row.related ? "Related" : "Primary"}
        </Tag>
      ),
    },
    {
      title: "环境",
      key: "env",
      width: 200,
      render: (_, row) => (
        <TableCellEllipsisList
          items={row.envNames}
          renderItem={(name) => name}
        />
      ),
    },
    {
      title: "AccessUnit",
      key: "accessunit",
      width: 200,
      render: (_, row) => (
        <TableCellEllipsisList
          items={row.auNames}
          renderItem={(name) => name}
        />
      ),
    },
    {
      title: "消息",
      dataIndex: "message",
      ellipsis: true,
      width: TABLE_CELL_DESC_WIDTH,
    },
    {
      title: "备注",
      dataIndex: "description",
      ellipsis: true,
      width: TABLE_CELL_DESC_WIDTH,
    },
    {
      title: "创建者",
      dataIndex: "createBy",
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      valueType: "dateTime",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (dom, row) => tableCellDatetimePostProcess(dom, row.createdAt),
    },
    {
      title: "更新者",
      dataIndex: "updateBy",
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      title: "更新时间",
      dataIndex: "updatedAt",
      valueType: "dateTime",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (dom, row) => tableCellDatetimePostProcess(dom, row.updatedAt),
    },
  ]

  return (
    <>
      <Table
        name="accessunit-push-record"
        actionRef={tableRef}
        columns={columns}
        rowKey="id"
        searchPlaceholder="请输入标题查询"
        request={auRecordPageListApiOpsAuRecord}
        defaultColumnsState={columnsState}
        autoRefresh
      />
    </>
  )
}
