import { TABLE_CELL_DATETIME_WIDTH } from "@/constants/table"
import { toLocaleDateTimeString } from "@/lib/utils"
import { alertPageListApiArgusAlerts } from "@/services/argus/alert"
import { entryGetByNameApiArgusDictsEntries } from "@/services/argus/dict"
import { ActionType, ProTable } from "@ant-design/pro-components"
import { useQuery } from "@tanstack/react-query"
import { useAccess } from "@umijs/max"
import { useEffect, useState } from "react"
import AlertInfoModal from "./alert-info-modal"
import { TableColumns } from "./table"

export interface AlertTableProps {
  tableRef?: React.MutableRefObject<ActionType | undefined>
  filter: Omit<ARGUS.AlertPageListReq, "p" | "limit">
  refetchInterval?: number | false
}

export default function AlertTable({
  tableRef,
  filter,
  refetchInterval,
}: AlertTableProps) {
  const access = useAccess()
  const [selectedAlertToView, setSelectedAlertToView] = useState<
    ARGUS.Alert | undefined
  >()

  const { data: sourceOptions } = useQuery({
    queryKey: ["dict-entries", "alert_source"],
    queryFn: () =>
      entryGetByNameApiArgusDictsEntries({
        name: "alert_source",
      }).then((res) => res.data?.items ?? []),
  })

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (refetchInterval) {
      interval = setInterval(
        () => tableRef?.current?.reload(false),
        refetchInterval,
      )
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [refetchInterval])

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
      <ProTable
        actionRef={tableRef}
        className="alert-table"
        params={filter}
        search={false}
        request={async (params) => {
          const res = await alertPageListApiArgusAlerts({
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
          y: "calc(100vh - 214px)",
        }}
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
