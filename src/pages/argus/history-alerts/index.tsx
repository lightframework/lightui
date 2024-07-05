import { getCurrentUTCtimestamp } from "@/lib/utils"
import { SyncOutlined } from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Button, Result, Select, Space, Tooltip } from "antd"
import { useAtom } from "jotai"
import { RESET } from "jotai/utils"
import { useEffect, useRef } from "react"
import { alertFilterAtom, refetchIntervalAtom } from "./_atoms"
import AlertFilter from "./_components/alert-filter"
import HistoryAlertTable from "./_components/history-alert-table"

export default function Page() {
  const access = useAccess()

  const tableRef = useRef<ActionType>()
  const [alertFilter, setAlertFilter] = useAtom(alertFilterAtom)
  const [refetchInterval, setRefetchInterval] = useAtom(refetchIntervalAtom)

  useEffect(() => {
    return () => setAlertFilter(RESET)
  }, [])

  useEffect(() => {
    if (refetchInterval) {
      const timer = setInterval(() => {
        setAlertFilter((filter) => ({
          ...filter,
          stime: filter.timeRangeHour
            ? getCurrentUTCtimestamp() - filter.timeRangeHour * 60 * 60
            : filter.stime!,
          etime: filter.timeRangeHour
            ? getCurrentUTCtimestamp()
            : filter.etime!,
        }))
      }, refetchInterval)

      return () => clearInterval(timer)
    }
  }, [refetchInterval])

  if (!access.hisAlertPageListApiArgusAlertsHis) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="抱歉，你无权访问历史告警数据"
      />
    )
  }

  return (
    <div className="flex h-full w-full flex-col gap-3 overflow-auto rounded-sm bg-white p-3">
      <div className="flex items-center justify-between">
        <AlertFilter />

        <Space.Compact>
          <Tooltip title="手动刷新">
            <Button
              icon={<SyncOutlined />}
              onClick={() => {
                setAlertFilter((filter) => ({
                  ...filter,
                  stime: alertFilter.timeRangeHour
                    ? getCurrentUTCtimestamp() -
                      alertFilter.timeRangeHour * 60 * 60
                    : alertFilter.stime!,
                  etime: alertFilter.timeRangeHour
                    ? getCurrentUTCtimestamp()
                    : alertFilter.etime!,
                }))
              }}
            />
          </Tooltip>
          <Select
            value={refetchInterval}
            style={{ width: 56 }}
            onChange={(value) => setRefetchInterval(value)}
            options={[
              {
                label: "off",
                value: false,
              },

              {
                label: "5s",
                value: 5 * 1000,
              },

              {
                label: "30s",
                value: 30 * 1000,
              },
              {
                label: "60s",
                value: 60 * 1000,
              },
            ]}
          />
        </Space.Compact>
      </div>
      <HistoryAlertTable
        tableRef={tableRef}
        filter={{
          ...alertFilter,
          stime: alertFilter.timeRangeHour
            ? getCurrentUTCtimestamp() - alertFilter.timeRangeHour * 60 * 60
            : alertFilter.stime!,
          etime: alertFilter.timeRangeHour
            ? getCurrentUTCtimestamp()
            : alertFilter.etime!,
        }}
      />
    </div>
  )
}
