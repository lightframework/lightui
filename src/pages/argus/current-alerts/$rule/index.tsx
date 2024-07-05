import AlertTable from "@/components/alert-table"
import { getCurrentUTCtimestamp } from "@/lib/utils"
import { alertCardsApiArgusAlertsCards } from "@/services/argus/alert"
import { SyncOutlined } from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { useQuery } from "@tanstack/react-query"
import { useAccess, useParams } from "@umijs/max"
import { Button, Result, Select, Space, Tooltip } from "antd"
import { useAtom, useAtomValue } from "jotai"
import { RESET } from "jotai/utils"
import { useEffect, useRef } from "react"
import { alertFilterAtom, refetchIntervalAtom, showGridAtom } from "./_atoms"
import AlertCardGrid from "./_components/alert-card-grid"
import AlertFilter from "./_components/alert-filter"

export default function Page() {
  const access = useAccess()
  const tableRef = useRef<ActionType>()

  const { rule } = useParams()
  const showGrid = useAtomValue(showGridAtom)
  const [alertFilter, setAlertFilter] = useAtom(alertFilterAtom)
  const [refetchInterval, setRefetchInterval] = useAtom(refetchIntervalAtom)

  const { data: cards } = useQuery({
    queryKey: [
      "alert-cards",
      {
        rule,
        ...alertFilter,
      },
    ],
    queryFn: () =>
      alertCardsApiArgusAlertsCards({
        rule,
        ...alertFilter,
      }).then((res) => res.data?.items ?? []),
  })

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
      {showGrid ? (
        access.alertCardsApiArgusAlertsCards ? (
          <AlertCardGrid
            filter={{
              rule,
              ...alertFilter,
              stime:
                alertFilter.stime ??
                getCurrentUTCtimestamp() - alertFilter.timeRangeHour! * 60 * 60,
              etime: alertFilter.etime ?? getCurrentUTCtimestamp(),
            }}
          />
        ) : (
          <Result
            status="403"
            title="403"
            subTitle="抱歉，你无权访问活跃告警卡片数据"
          />
        )
      ) : access.alertPageListApiArgusAlerts ? (
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
            ids: cards?.flatMap((card) => card.alert_ids).join(","),
          }}
        />
      ) : (
        <Result
          status="403"
          title="403"
          subTitle="抱歉，你无权访问活跃告警列表数据"
        />
      )}
    </div>
  )
}
