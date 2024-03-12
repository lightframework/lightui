import {
  TABLE_CELL_DESC_WIDTH,
  TABLE_CELL_UID_WIDTH,
  TABLE_MODAL_HEIGHT,
} from "@/constants/table"
import { useToken } from "@/lib/hooks/use-token"
import { Table, Tag } from "antd"
import { ColumnsType } from "antd/es/table"
import Paragraph from "antd/es/typography/Paragraph"

export interface HostPushRecordTableProps {
  data?: OPS.HostPushRecord[]
}

export default function HostPushRecordTable({
  data = [],
}: HostPushRecordTableProps) {
  const { token } = useToken()

  const columns: ColumnsType<OPS.HostPushRecord> = [
    {
      title: "UID",
      dataIndex: "hostUid",
      width: TABLE_CELL_UID_WIDTH,
    },
    {
      title: "主机名称",
      dataIndex: "hostName",
      render: (_, row) => (
        <Paragraph
          copyable={{ text: row.hostName }}
          style={{ marginBottom: 0 }}
        >
          {row.hostName}
        </Paragraph>
      ),
    },
    {
      title: "连接",
      dataIndex: "connectState",
      width: 80,
      render: (_, row) => (
        <Tag color={row.connectState ? token.colorSuccess : token.colorError}>
          {row.connectState ? "成功" : "失败"}
        </Tag>
      ),
    },
    {
      title: "下发",
      dataIndex: "pushState",
      width: 80,
      render: (_, row) => (
        <Tag color={row.pushState ? token.colorSuccess : token.colorError}>
          {row.pushState ? "成功" : "失败"}
        </Tag>
      ),
    },
    {
      title: "重启服务",
      dataIndex: "restartState",
      width: 80,
      render: (_, row) => (
        <Tag color={row.restartState ? token.colorSuccess : token.colorError}>
          {row.restartState ? "成功" : "失败"}
        </Tag>
      ),
    },
    {
      title: "错误输出",
      dataIndex: "message",
      width: TABLE_CELL_DESC_WIDTH,
    },
  ]

  return (
    <Table
      columns={columns}
      rowKey="hostUid"
      dataSource={data}
      scroll={{
        x: "100%",
        y: TABLE_MODAL_HEIGHT,
      }}
    />
  )
}
