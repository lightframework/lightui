import AlertEventTableModal from "@/components/alert-event-table-modal"
import TableCellActions from "@/components/table-cell-actions"
import { TABLE_CELL_DATETIME_WIDTH } from "@/constants/table"
import { toLocaleDateTimeString } from "@/lib/utils"
import { incidentAlertsApiArgusIncidentsByIdalerts } from "@/services/argus/incident"
import { useQuery } from "@tanstack/react-query"
import { Flex, Tag } from "antd"
import Table, { ColumnsType } from "antd/es/table"
import clsx from "clsx"
import { useState } from "react"

export interface IncidentAlertTableProps {
  incidentId: number
  refetchInterval?: false | number
}

export default function IncidentAlertTable({
  incidentId,
  refetchInterval,
}: IncidentAlertTableProps) {
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
      title: "ID",
      dataIndex: "id",
      width: 80,
      fixed: "left",
    },
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
      dataIndex: "tags",
      title: "标签",
      width: 800,
      render: (_, row) => (
        <Flex
          gap={4}
          style={{
            flexWrap: "wrap",
          }}
        >
          {row.tags?.map((item) => (
            <Tag key={item} color="purple">
              {item}
            </Tag>
          ))}
        </Flex>
      ),
    },
    {
      dataIndex: "target_ident",
      title: "告警对象",
      width: 200,
    },
    {
      dataIndex: "last_trigger_value",
      title: "触发时值",
      width: 100,
    },
    {
      dataIndex: "severity",
      title: "级别",
      width: 80,
      render: (value) => (
        <Tag color={value === 1 ? "red" : value === 2 ? "orange" : "yellow"}>
          {value === 1 ? "严重" : value === 2 ? "警告" : "提醒"}
        </Tag>
      ),
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
      dataIndex: "recovered_time",
      title: "恢复时间",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (_, record) =>
        record.recovered_time
          ? toLocaleDateTimeString(
              new Date(record.recovered_time * 1000).toString(),
            )
          : "-",
    },
    {
      dataIndex: "status",
      title: "状态",
      width: 120,
      render: (_, record) => (record.status ? record.status : "-"),
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
              text: "查看事件",
              onClick: () => setSelectedAlertToViewEvents(row),
            },
          ]}
        />
      ),
    },
  ]

  return (
    <>
      <Table
        className="incident-alert-table"
        dataSource={data}
        rowKey="id"
        columns={columns}
        rowClassName={(row) =>
          clsx(
            row.severity === 1 &&
              "[&>*:first-child]:border-l-8 [&>*:first-child]:border-0 [&>*:first-child]:border-solid [&>*:first-child]:border-l-red-400",

            row.severity === 2 &&
              "[&>*:first-child]:border-l-8 [&>*:first-child]:border-0 [&>*:first-child]:border-solid [&>*:first-child]:border-l-orange-400",

            row.severity === 3 &&
              "[&>*:first-child]:border-l-8 [&>*:first-child]:border-0 [&>*:first-child]:border-solid [&>*:first-child]:border-l-yellow-400",
            row.recovered_time && "opacity-40 bg-gray-50",
          )
        }
      />
      <AlertEventTableModal
        open={!!selectedAlertToViewEvents}
        onCancel={() => setSelectedAlertToViewEvents(undefined)}
        alert={selectedAlertToViewEvents}
      />
    </>
  )
}
