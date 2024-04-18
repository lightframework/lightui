import AlertEventTableModal from "@/components/alert-event-table-modal"
import { TABLE_CELL_DATETIME_WIDTH } from "@/constants/table"
import { toLocaleDateTimeString } from "@/lib/utils"
import { incidentAlertsApiArgusIncidentsByIdalerts } from "@/services/argus/incident"
import { useQuery } from "@tanstack/react-query"
import { useAccess } from "@umijs/max"
import { Button } from "antd"
import Table, { ColumnsType } from "antd/es/table"
import { useState } from "react"

export interface IncidentAlertTableProps {
  incidentId: number
  refetchInterval?: false | number
}

export default function IncidentAlertTable({
  incidentId,
  refetchInterval,
}: IncidentAlertTableProps) {
  const access = useAccess()
  const [selectedAlertToViewEvents, setSelectedAlertToViewEvents] = useState<
    ARGUS.Alert | undefined
  >()

  const { data } = useQuery({
    queryKey: ["incident-alerts", incidentId],
    queryFn: () =>
      incidentAlertsApiArgusIncidentsByIdalerts({
        id: String(incidentId),
      }).then((res) => res.data?.items ?? []),
    refetchInterval,
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
      render: (_, row) =>
        access.alertReadOneRespApiArgusAlertsByHash ? (
          <Button
            type="link"
            size="small"
            onClick={() => setSelectedAlertToViewEvents(row)}
          >
            {row.rule_name}
          </Button>
        ) : (
          row.rule_name
        ),
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
      dataIndex: "last_trigger_time",
      title: "末次触发",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (_, record) =>
        record.last_trigger_time
          ? toLocaleDateTimeString(
              new Date(record.last_trigger_time * 1000).toString(),
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
      />
      <AlertEventTableModal
        open={!!selectedAlertToViewEvents}
        onCancel={() => setSelectedAlertToViewEvents(undefined)}
        alert={selectedAlertToViewEvents}
      />
    </>
  )
}
