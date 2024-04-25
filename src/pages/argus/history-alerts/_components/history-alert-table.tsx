import AlertEventTableModal from "@/components/alert-event-table-modal"
import { TableColumns } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import { TABLE_CELL_DATETIME_WIDTH, TABLE_FULL_HEIGHT } from "@/constants/table"
import { toLocaleDateTimeString } from "@/lib/utils"
import { hisAlertPageListApiArgusAlertsHis } from "@/services/argus/alert"
import { entryGetByNameApiArgusDictsEntries } from "@/services/argus/dict"
import { ActionType, ProTable } from "@ant-design/pro-components"
import { useQuery } from "@tanstack/react-query"
import { useAccess, useNavigate } from "@umijs/max"
import { Button, Tag } from "antd"
import { useState } from "react"

export interface HistoryAlertTableProps {
  tableRef?: React.MutableRefObject<ActionType | undefined>
  filter: Omit<ARGUS.AlertPageListReq, "p" | "limit">
}

export default function HistoryAlertTable({
  tableRef,
  filter,
}: HistoryAlertTableProps) {
  const access = useAccess()
  const [selectedAlertToViewEvents, setSelectedAlertToViewEvents] = useState<
    ARGUS.Alert | undefined
  >()
  const navigate = useNavigate()

  const { data: sourceOptions } = useQuery({
    queryKey: ["dict-entries", "alert_source"],
    queryFn: () =>
      entryGetByNameApiArgusDictsEntries({
        name: "alert_source",
      }).then((res) => res.data?.items ?? []),
  })

  const columns: TableColumns<ARGUS.Alert> = [
    {
      dataIndex: "source",
      title: "告警来源",
      width: 120,
      render: (_, row) =>
        sourceOptions?.find((item) => item.key === row.source)?.value ??
        row.source,
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
              text: "关联故障",
              onClick: () => navigate(`/argus/incidents/${row.incident_id}`),
            },
          ]}
        />
      ),
    },
  ]

  return (
    <>
      <ProTable
        actionRef={tableRef}
        className="alert-table"
        params={filter}
        search={false}
        request={async (params) => {
          const res = await hisAlertPageListApiArgusAlertsHis({
            ...params,
            p: params.current ?? 1,
            limit: params.pageSize ?? 20,
          })

          return {
            success: res.msg === "OK",
            total: res.data?.total,
            data: res.data?.items,
          }
        }}
        rowKey="id"
        columns={columns}
        scroll={{
          x: 920,
          y: TABLE_FULL_HEIGHT,
        }}
      />

      <AlertEventTableModal
        open={!!selectedAlertToViewEvents}
        onCancel={() => setSelectedAlertToViewEvents(undefined)}
        alert={selectedAlertToViewEvents}
      />
    </>
  )
}
