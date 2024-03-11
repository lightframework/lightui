import Table, { TableColumns } from "@/components/table"
import { TABLE_CELL_DESC_WIDTH } from "@/constants/table"
import { useToken } from "@/lib/hooks/use-token"
import { domainsetPageListApiOpsDomainsets } from "@/services/ops/domainset"
import { ActionType } from "@ant-design/pro-components"
import { Tag } from "antd"
import { useRef } from "react"

export default function DomainsetTable({ envUid }: { envUid: string }) {
  const { token } = useToken()
  const tableRef = useRef<ActionType>()

  const columns: TableColumns<OPS.DomainsetList> = [
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
    },
    {
      title: "名称",
      dataIndex: "name",
      width: 140,
    },
    {
      title: "版本",
      dataIndex: "version",
      width: 200,
    },
    {
      title: "已存档",
      dataIndex: "isArchive",
      width: 80,
      render: (_, row) => (
        <Tag color={row.isArchive ? token.colorSuccess : token.colorError}>
          {row.isArchive ? "是" : "否"}
        </Tag>
      ),
    },
    {
      title: "备注",
      dataIndex: "description",
      ellipsis: true,
      width: TABLE_CELL_DESC_WIDTH,
    },
  ]

  return (
    <Table
      name="env-domainset"
      actionRef={tableRef}
      columns={columns}
      rowKey="id"
      searchPlaceholder="请输入名称/域名查询"
      params={{ envUid }}
      request={domainsetPageListApiOpsDomainsets}
    />
  )
}
