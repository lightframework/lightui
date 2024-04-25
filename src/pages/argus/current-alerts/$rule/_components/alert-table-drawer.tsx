import AlertTable from "@/components/alert-table"
import { getCurrentUTCtimestamp } from "@/lib/utils"
import { ActionType } from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Drawer, Result } from "antd"
import { useAtomValue } from "jotai"
import { useRef } from "react"
import { alertFilterAtom, refetchIntervalAtom } from "../_atoms"

export interface AlertTableDrawerProps {
  open?: boolean
  onClose?: VoidFunction
  card?: ARGUS.AlertCard
}

export default function AlertTableDrawer({
  open,
  onClose,
  card,
}: AlertTableDrawerProps) {
  const access = useAccess()
  const tableRef = useRef<ActionType>()
  const alertFilter = useAtomValue(alertFilterAtom)
  const refetchInterval = useAtomValue(refetchIntervalAtom)

  return (
    <Drawer
      open={open}
      onClose={onClose}
      width={1000}
      destroyOnClose
      title={card?.title}
    >
      {access.alertPageListApiArgusAlerts ? (
        <AlertTable
          tableRef={tableRef}
          filter={{
            ...alertFilter,
            stime: alertFilter.timeRangeHour
              ? getCurrentUTCtimestamp() - alertFilter.timeRangeHour * 60 * 60
              : alertFilter.stime!,
            etime: alertFilter.timeRangeHour
              ? getCurrentUTCtimestamp()
              : alertFilter.etime!,
            ids: card?.alert_ids.join(","),
          }}
          refetchInterval={refetchInterval}
        />
      ) : (
        <Result
          status="403"
          title="403"
          subTitle="抱歉，你无权访问活跃告警列表数据"
        />
      )}
    </Drawer>
  )
}
