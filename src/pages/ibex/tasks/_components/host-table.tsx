import { Table, Tag, Typography } from "antd"

export interface HostTableProps {
  hosts?: IBEX.Host[]
}

export default function HostTable({ hosts }: HostTableProps) {
  return (
    <Table
      pagination={false}
      columns={[
        { title: "ID", dataIndex: "id", width: 60 },
        {
          title: "主机名",
          dataIndex: "host",
          render: (_, row) => (
            <Typography.Text copyable>{row.host}</Typography.Text>
          ),
          width: 300,
        },
        {
          title: "状态",
          dataIndex: "status",
          width: 80,
          render: (_, row) => (
            <Tag
              color={
                row.status === "success"
                  ? "success"
                  : row.status === "failed"
                    ? "error"
                    : row.status === "timeout"
                      ? "warning"
                      : "processing"
              }
            >
              {row.status}
            </Tag>
          ),
        },
        {
          title: "标准输出",
          dataIndex: "stdout",
        },
        {
          title: "标准错误",
          dataIndex: "stderr",
        },
      ]}
      dataSource={hosts}
    />
  )
}
