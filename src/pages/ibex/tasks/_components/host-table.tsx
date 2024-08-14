import TableCellActions from "@/components/table-cell-actions"
import useShowJsonModal from "@/lib/hooks/use-show-json-modal"
import { Table, Tag, Typography } from "antd"

export interface HostTableProps {
  hosts?: IBEX.Host[]
}

export default function HostTable({ hosts }: HostTableProps) {
  const showJsonModal = useShowJsonModal("bash")

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
          title: "输出",
          key: "output",
          width: 150,
          render: (_, row) => (
            <TableCellActions
              actions={[
                {
                  text: "标准输出",
                  onClick: () =>
                    showJsonModal({
                      title: "标准输出",
                      content: row.stdout,
                    }),
                  disabled: !row.stdout || row.stdout.length === 0,
                },
                {
                  text: "标准错误",
                  disabled: !row.stderr || row.stderr.length === 0,
                  onClick: () =>
                    showJsonModal({
                      title: "标准错误",
                      content: row.stderr,
                    }),
                },
              ]}
            />
          ),
        },
      ]}
      dataSource={hosts}
    />
  )
}
