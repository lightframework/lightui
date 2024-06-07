import { getCurrentUTCtimestamp } from "@/lib/utils"
import { SyncOutlined } from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { Button, Select, Space, Tooltip } from "antd"
import { useAtom } from "jotai"
import { useEffect, useRef } from "react"
import { eventFilterAtom, refetchIntervalAtom } from "./_atoms"
import EventFilter from "./_components/event-filter"
import EventTable from "./_components/event-table"

export default function Page() {
  // const access = useAccess()

  const tableRef = useRef<ActionType>()
  const [eventFilter, setEventFilter] = useAtom(eventFilterAtom)
  const [refetchInterval, setRefetchInterval] = useAtom(refetchIntervalAtom)

  useEffect(() => {
    if (refetchInterval) {
      const timer = setInterval(() => {
        setEventFilter((filter) => ({
          ...filter,
          stime: eventFilter.timeRangeHour
            ? getCurrentUTCtimestamp() - eventFilter.timeRangeHour * 60 * 60
            : eventFilter.stime!,
          etime: eventFilter.timeRangeHour
            ? getCurrentUTCtimestamp()
            : eventFilter.etime!,
        }))
      }, refetchInterval)

      return () => clearInterval(timer)
    }
  }, [refetchInterval])

  // if (!access.hisAlertPageListApiArgusAlertsHis) {
  //   return (
  //     <Result
  //       status="403"
  //       title="403"
  //       subTitle="抱歉，你无权访问历史告警数据"
  //     />
  //   )
  // }

  return (
    <div className="flex h-full w-full flex-col gap-3 overflow-auto rounded-sm bg-white p-3">
      <div className="flex items-center justify-between">
        <EventFilter />

        <Space.Compact>
          <Tooltip title="手动刷新">
            <Button
              icon={<SyncOutlined />}
              onClick={() => {
                setEventFilter((filter) => ({
                  ...filter,
                  stime: eventFilter.timeRangeHour
                    ? getCurrentUTCtimestamp() -
                      eventFilter.timeRangeHour * 60 * 60
                    : eventFilter.stime!,
                  etime: eventFilter.timeRangeHour
                    ? getCurrentUTCtimestamp()
                    : eventFilter.etime!,
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
      <EventTable
        tableRef={tableRef}
        filter={{
          ...eventFilter,
          stime: eventFilter.timeRangeHour
            ? getCurrentUTCtimestamp() - eventFilter.timeRangeHour * 60 * 60
            : eventFilter.stime!,
          etime: eventFilter.timeRangeHour
            ? getCurrentUTCtimestamp()
            : eventFilter.etime!,
        }}
      />
    </div>
  )
}
