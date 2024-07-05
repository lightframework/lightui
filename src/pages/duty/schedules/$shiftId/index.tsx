import { useQueryShiftOptions } from "@/lib/hooks/data"
import {
  holidayReadListApiSysDutiesHolidays,
  scheduleManageApiSysDutiesSchedules,
  scheduleReadListApiSysDutiesSchedules,
} from "@/services/sys/duty"
import { useQuery } from "@tanstack/react-query"
import { useAccess, useModel, useParams } from "@umijs/max"
import { Calendar, Card, Result, Spin } from "antd"
import clsx from "clsx"
import dayjs, { Dayjs } from "dayjs"
import { useMemo, useState } from "react"
import CopyWeekSchedule from "./_components/copy-week-schedule"
import WatchkeeperUpdate from "./_components/watchkeeper-update"

function ScheduleByShiftId() {
  const access = useAccess()
  const { shiftId } = useParams()

  const [panelDay, setPanelDay] = useState<Dayjs>(dayjs())
  const { data: shiftOptions } = useQueryShiftOptions()

  const currentShift = useMemo(
    () => shiftOptions?.find((shift) => String(shift.id) === shiftId),
    [shiftOptions, shiftId],
  )

  const { initialState } = useModel("@@initialState")
  const currentUser = initialState?.currentUser?.username

  const [sdate, edate] = useMemo(() => {
    return [
      panelDay.startOf("month").format("YYYY-MM-DD"),
      panelDay.endOf("month").format("YYYY-MM-DD"),
    ]
  }, [panelDay])

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["schedule", { shiftId, sdate, edate }],
    queryFn: () =>
      scheduleReadListApiSysDutiesSchedules({
        shift_id: Number(shiftId),
        sdate,
        edate,
      }).then((res) => res.data?.items ?? []),
  })

  const { data: holidays } = useQuery({
    queryKey: ["holiday", { sdate, edate }],
    queryFn: () =>
      holidayReadListApiSysDutiesHolidays({
        sdate,
        edate,
      }).then((res) => res.data?.items ?? []),
  })

  const allowEdit =
    access.scheduleManageApiSysDutiesSchedules &&
    !!currentUser &&
    currentShift?.admins.includes(currentUser)

  return (
    <Card size="small" className="relative">
      {isFetching && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-opacity-20">
          <Spin />
        </div>
      )}
      <div className="absolute right-3 top-3">
        <CopyWeekSchedule
          data={data}
          shiftId={Number(shiftId)}
          onFinish={() => refetch()}
          defaultDate={panelDay}
          disabled={!allowEdit}
        />
      </div>
      <Calendar
        className="schedule-calender"
        disabledDate={(day) => day.isBefore(dayjs(), "day")}
        mode="month"
        cellRender={(day, { today }) => {
          const find = data?.find((item) => {
            const dutyDay = dayjs(item.date)
            return dutyDay.isSame(day, "day")
          })

          const holiday = holidays?.find((item) =>
            dayjs(item.date).isSame(day, "day"),
          )

          return (
            <div
              className={clsx(
                "flex h-full flex-col justify-between pt-[24px]",
                day.isBefore(today, "day") ? "bg-[#fdf4d1]" : "bg-[#dbe2f4]",
              )}
            >
              <WatchkeeperUpdate
                key={shiftId}
                initialValue={find?.users}
                allowEdit={allowEdit && day.isSame(panelDay, "month")}
                options={currentShift?.members}
                onFinish={async (users) => {
                  if (users === find?.users) {
                    return
                  }
                  await scheduleManageApiSysDutiesSchedules({
                    shift_id: Number(shiftId),
                    items: [{ users, date: day!.format("YYYY-MM-DD") }],
                  })
                  refetch()
                }}
              />
              {holiday && (
                <div className="flex justify-end text-red-400">
                  <span>
                    {`${!["周六", "周日"].includes(holiday.name) ? holiday.name : ""}${holiday.wage ? `(${holiday.wage})` : ""}`}
                  </span>
                </div>
              )}
            </div>
          )
        }}
        onPanelChange={(day) => setPanelDay(day)}
      />
    </Card>
  )
}

export default function ScheduleByShiftIdAuth() {
  const access = useAccess()

  if (!access.scheduleReadListApiSysDutiesSchedules) {
    return (
      <Result status="403" title="403" subTitle="抱歉，你无权访问排班数据" />
    )
  }

  return <ScheduleByShiftId />
}
