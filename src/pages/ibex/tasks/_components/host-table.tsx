import TableCellActions from "@/components/table-cell-actions"
import { App, Table, Tag, Typography } from "antd"
import ScriptInput from "../../_components/script-input"
import CollapseText from "./collapse-text"

export interface HostTableProps {
  hosts?: IBEX.Host[]
}

export default function HostTable({ hosts }: HostTableProps) {
  const { modal } = App.useApp()

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
          width: 400,
          render: (_, row) => <CollapseText text={row.stdout} />,
        },
        {
          title: "标准错误",
          dataIndex: "stderr",
          width: 400,
          render: (_, row) => <pre className="line-clamp-5">{row.stderr}</pre>,
        },
        {
          title: "操作",
          key: "actions",
          fixed: "right",
          width: 100,
          render: (_, row) => (
            <TableCellActions
              actions={[
                {
                  text: "查看详情",
                  onClick: () =>
                    modal.info({
                      width: 800,
                      title: (
                        <div className="flex items-center gap-2">
                          <span>{row.host}</span>
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
                        </div>
                      ),
                      content: (
                        <div>
                          <div>标准输出：</div>
                          <ScriptInput value={row.stdout} disabled />
                          <div className="mt-4">标准错误：</div>
                          <ScriptInput value={row.stderr} disabled />
                        </div>
                      ),
                      icon: null,
                      okText: "确认",
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
