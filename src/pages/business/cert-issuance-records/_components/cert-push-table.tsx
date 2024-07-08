import Table, { TableColumns } from "@/components/table"
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_DESC_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
} from "@/constants/table"
import { certRecordPageListApiOpsCertsRecords } from "@/services/ops/cert"
import { ActionType } from "@ant-design/pro-components"
import { Tag } from "antd"
import { useRef } from "react"

export default function CertPushTable() {
  const tableRef = useRef<ActionType>()

  const columns: TableColumns<OPS.CertRecordList> = [
    { title: "域名", dataIndex: "domain", width: 200 },
    {
      title: "证书名称",
      dataIndex: "certName",
      width: 200,
    },
    { title: "到期天数", dataIndex: "dueDays", width: 80 },
    {
      title: "状态",
      dataIndex: "state",
      width: 100,
      render: (value) => (
        <Tag color={value === "SUCCESS" ? "success" : "error"}>{value}</Tag>
      ),
    },
    {
      title: "创建者",
      dataIndex: "CreatedBy",
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      title: "创建时间",
      dataIndex: "CreatedAt",
      width: TABLE_CELL_DATETIME_WIDTH,
    },
    {
      title: "备注",
      dataIndex: "message",
      ellipsis: true,
      width: TABLE_CELL_DESC_WIDTH,
    },
  ]

  return (
    <Table
      name="cert-push"
      actionRef={tableRef}
      request={certRecordPageListApiOpsCertsRecords}
      columns={columns}
      rowKey="id"
      searchPlaceholder="输入域名/证书名称查询"
    />
  )
}
