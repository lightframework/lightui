import AlertInfoModal from "@/components/alert-info-modal"
import { TableColumns } from "@/components/table"
import { TABLE_CELL_DATETIME_WIDTH, TABLE_FULL_HEIGHT } from "@/constants/table"
import { toLocaleDateTimeString } from "@/lib/utils"
import { hisAlertPageListApiArgusAlertsHis } from "@/services/argus/alert"
import { ActionType, ProTable } from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { useEffect, useState } from "react"

export interface HistoryAlertTableProps {
  tableRef?: React.MutableRefObject<ActionType | undefined>
  filter: Omit<ARGUS.AlertPageListReq, "p" | "limit">
  refetchInterval?: number | false
}

export default function HistoryAlertTable({
  tableRef,
  filter,
  refetchInterval,
}: HistoryAlertTableProps) {
  const access = useAccess()
  const [selectedAlertToView, setSelectedAlertToView] = useState<
    ARGUS.Alert | undefined
  >()

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
