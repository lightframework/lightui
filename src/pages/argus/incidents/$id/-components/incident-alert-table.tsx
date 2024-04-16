import AlertInfoModal from "@/components/alert-info-modal"
import { TABLE_CELL_DATETIME_WIDTH } from "@/constants/table"
import { toLocaleDateTimeString } from "@/lib/utils"
import { alertPageListApiArgusAlerts } from "@/services/argus/alert"
import { useQuery } from "@tanstack/react-query"
import { useAccess } from "@umijs/max"
import Table, { ColumnsType } from "antd/es/table"
import { useState } from "react"

export interface IncidentAlertTableProps {
  incidentId: number
}

export default function IncidentAlertTable({
  incidentId,
}: IncidentAlertTableProps) {
  const access = useAccess()
  const [selectedAlertToView, setSelectedAlertToView] = useState<
    ARGUS.Alert | undefined
  >()

  const { data } = useQuery({
    queryKey: ["incident-alerts", incidentId],
    queryFn: () =>
      alertPageListApiArgusAlerts({
        stime: 1705460392,
        etime: 1713236392,
        ids: [1, 2, 3, 4, 5, 6, 7].join(","),
        p: 1,
        limit: 20,
        // id: String(incidentId),
      }).then((res) => res.data?.items),
  })

  const columns: ColumnsType<ARGUS.Alert> = [
    {
      dataIndex: "source",
      title: "告警来源",
      width: 120,
    },
    {
      dataIndex: "rule_name",
      title: "告警标题",
      width: 200,
    },
    {
      dataIndex: "target_ident",
      title: "告警对象",
      width: 200,
    },
    {
      dataIndex: "first_trigger_time",
      title: "首次触发",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (_, record) =>
        record.first_trigger_time
          ? toLocaleDateTimeString(
              new Date(record.first_trigger_time * 1000).toString(),
            )
          : "-",
    },
    {
      dataIndex: "last_sent_time",
      title: "末次触发",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (_, record) =>
        record.last_sent_time
          ? toLocaleDateTimeString(
              new Date(record.last_sent_time * 1000).toString(),
            )
          : "-",
    },
    {
      dataIndex: "status",
      title: "状态",
      width: 120,
      render: (_, record) => (record.status ? record.status : "-"),
    },
  ]

  return (
    <>
      <Table
        className="incident-alert-table"
        dataSource={data}
        rowKey="id"
        columns={columns}
        rowClassName={
          access.alertReadOneRespApiArgusAlertsByHash
            ? "cursor-pointer"
            : undefined
        }
        onRow={
          access.alertReadOneRespApiArgusAlertsByHash
            ? (row) => ({ onClick: () => setSelectedAlertToView(row) })
            : undefined
        }
      />
      <AlertInfoModal
        open={!!selectedAlertToView}
        onCancel={() => setSelectedAlertToView(undefined)}
        alert={selectedAlertToView}
      />
    </>
  )
}
