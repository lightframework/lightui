import Table, { TableColumns } from "@/components/table"
import { certRecordPageListApiOpsCertsRecords } from "@/services/ops/cert"
import { ActionType } from "@ant-design/pro-components"
import { useRef } from "react"

export default function CertPushTable() {
  const tableRef = useRef<ActionType>()

  const columns: TableColumns<OPS.CertRecordList> = [
    {
      title: "标题",
      dataIndex: "title",
      width: 200,
    },
  ]

  return (
    <Table
      name="cert-push"
      actionRef={tableRef}
      request={certRecordPageListApiOpsCertsRecords}
      columns={columns}
      rowKey="id"
    />
  )
}
