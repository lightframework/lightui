import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
  TABLE_MODAL_HEIGHT,
} from "@/constants/table"
import { toLocaleDateTimeString } from "@/lib/utils"
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons"
import { App, theme } from "antd"
import Table, { ColumnsType } from "antd/es/table"
import EventDetails from "./event-details"
import TableCellActions from "./table-cell-actions"

export interface AlertEventTableProps {
  selectedAlert: ARGUS.Alert
}

export default function AlertEventTable({
  selectedAlert,
}: AlertEventTableProps) {
  const { token } = theme.useToken()
  const { modal } = App.useApp()

  const columns: ColumnsType<ARGUS.Event> = [
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
      fixed: "left",
    },
    {
      title: "请求ID",
      dataIndex: "request_id",
      width: 80,
      fixed: "left",
    },
    {
      title: "告警Hash",
      dataIndex: "alert_hash",
      width: 200,
    },
    {
      title: "触发时间",
      dataIndex: "trigger_time",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (_, record) =>
        record.trigger_time
          ? toLocaleDateTimeString(
              new Date(record.trigger_time * 1000).toString(),
            )
          : "-",
    },
    {
      title: "触发时值",
      dataIndex: "trigger_value",
      width: 200,
    },
    {
      title: "是否恢复",
      dataIndex: "is_recovered",
      width: 80,
      render: (_, row) =>
        row.is_recovered ? (
          <CheckCircleOutlined style={{ color: token.colorSuccess }} />
        ) : (
          <CloseCircleOutlined style={{ color: token.colorError }} />
        ),
    },
    {
      title: "状态",
      dataIndex: "status",
      width: 100,
    },
    {
      title: "操作人",
      dataIndex: "operator",
      width: TABLE_CELL_USERNAME_WIDTH,
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
              text: "查看推送事件",
              onClick: () =>
                modal.info({
                  title: "推送事件",
                  width: "min(80dvw, 800px)",
                  icon: null,
                  content: <EventDetails id={row.request_id} />,
                  okText: "确认",
                  className: "json-modal",
                }),
            },
          ]}
        />
      ),
    },
  ]

  return (
    <Table
      dataSource={selectedAlert.events}
      columns={columns}
      scroll={{ y: TABLE_MODAL_HEIGHT }}
    />
  )
}
