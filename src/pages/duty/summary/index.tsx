import { holidayReadListApiSysDutiesHolidays } from "@/services/sys/duty"
import { useQuery } from "@tanstack/react-query"
import { useAccess } from "@umijs/max"
import { Calendar, Card, Result, Spin } from "antd"
import clsx from "clsx"
import dayjs, { Dayjs } from "dayjs"
import React, { useMemo, useState } from "react"
import HolidayUpdateModalForm from "./holiday-update-modal-form"

const COLORS = ["#ffd8bf", "#ffffb8", "#e6fffb", "#efdbff"]

function Summary() {
  const access = useAccess()
  const [panelDay, setPanelDay] = useState<Dayjs>(dayjs())
  const [selectDate, setSelectDate] = React.useState<Dayjs>(dayjs())
  const [openHolidayUpdateModal, setOpenHolidayUpdateModal] = useState(false)

  const [sdate, edate] = useMemo(() => {
    return [
      panelDay.startOf("month").format("YYYY-MM-DD"),
      panelDay.endOf("month").format("YYYY-MM-DD"),
    ]
  }, [panelDay])

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

      <Calendar
        className="schedule-calender"
        value={selectDate}
        disabledDate={(day) => day.isBefore(dayjs(), "day")}
        mode="month"
        onPanelChange={(day) => setPanelDay(day)}
        cellRender={(date, { today }) => {
          const holiday = data?.find((item) =>
            dayjs(item.date).isSame(date, "day"),
          )

          return (
            <div
              className={clsx(
                "h-full",
                date.isBefore(today, "day") ? "bg-gray-50" : "bg-[#e2eaf5]",
              )}
            >
              {holiday ? (
                <div
                  className={clsx("grid h-full place-items-center text-sm")}
                  style={{
                    backgroundColor: holiday.wage
                      ? COLORS[holiday.wage - 1]
                      : undefined,
                  }}
                >{`${holiday.name}: ${holiday.wage}`}</div>
              ) : null}
            </div>
          )
        }}
        onSelect={(date, { source }) => {
          setSelectDate(date)

          if (
            access.holidayUpdateApiSysDutiesHolidays &&
            panelDay.isSame(date, "month") &&
            source === "date"
          ) {
            setOpenHolidayUpdateModal(true)
          }
        }}
      />

      <HolidayUpdateModalForm
        open={openHolidayUpdateModal}
        onCancel={() => setOpenHolidayUpdateModal(false)}
        holiday={data?.find((item) =>
          dayjs(item.date).isSame(selectDate, "date"),
        )}
        onFinish={refetch}
        selectedDate={selectDate}
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
