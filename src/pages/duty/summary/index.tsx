import CrossMonthCalender from "@/components/cross-month-calender"
import { holidayReadListApiSysDutiesHolidays } from "@/services/sys/duty"
import { useQuery } from "@tanstack/react-query"
import { useAccess } from "@umijs/max"
import { Card, Result, Spin } from "antd"
import clsx from "clsx"
import dayjs, { Dayjs } from "dayjs"
import { useMemo, useState } from "react"
import HolidayUpdateModalForm from "./holiday-update-modal-form"

function Summary() {
  const access = useAccess()
  const [panelDate, setPanelDate] = useState(dayjs().date(4).startOf("date"))
  const [selectedDateToUpdate, setSelectedDateToUpdate] = useState<Dayjs>()

  const [sdate, edate] = useMemo(() => {
    return [
      panelDate.startOf("month").startOf("week").format("YYYY-MM-DD"),
      panelDate.endOf("month").endOf("week").format("YYYY-MM-DD"),
    ]
  }, [panelDate])

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["holiday", { sdate, edate }],
    queryFn: () =>
      holidayReadListApiSysDutiesHolidays({
        sdate,
        edate,
      }).then((res) => res.data?.items ?? []),
  })

  return (
    <Card size="small" className="relative">
      {isFetching && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-opacity-20">
          <Spin />
        </div>
      )}

      <CrossMonthCalender
        panelDate={panelDate}
        onPanelChange={setPanelDate}
        cellClassName={(date) => {
          const holiday = data?.find((item) =>
            dayjs(item.date).isSame(date, "day"),
          )

          return clsx(
            holiday?.wage === 1 && "bg-orange-100",
            holiday?.wage === 2 && "bg-yellow-100",
            holiday?.wage === 3 && "bg-green-100",
            holiday?.wage === 4 && "bg-purple-100",
          )
        }}
        cellRender={(date) => {
          const holiday = data?.find((item) =>
            dayjs(item.date).isSame(date, "day"),
          )

          const allowEdit =
            access.holidayUpdateApiSysDutiesHolidays &&
            date.isSame(panelDate, "month")

          return (
            <div
              className={clsx(
                "mt-4 h-full text-center text-sm",
                allowEdit && "cursor-pointer",
              )}
              onClick={
                allowEdit ? () => setSelectedDateToUpdate(date) : undefined
              }
            >
              {holiday && `${holiday?.name}: ${holiday?.wage}`}
            </div>
          )
        }}
      />

      <HolidayUpdateModalForm
        open={!!selectedDateToUpdate}
        onCancel={() => setSelectedDateToUpdate(undefined)}
        holiday={data?.find((item) =>
          dayjs(item.date).isSame(selectedDateToUpdate, "date"),
        )}
        onFinish={refetch}
        selectedDate={selectedDateToUpdate}
      />
    </Card>
  )
}

export default function AuthSummary() {
  const access = useAccess()

  if (!access.holidayReadListApiSysDutiesHolidays) {
    return (
      <Result status="403" title="403" subTitle="抱歉，你无权访问统计数据" />
    )
  }

  return <Summary />
}
