import CrossMonthCalender from "@/components/cross-month-calender"
import { useQueryShiftOptions } from "@/lib/hooks/data"
import {
  holidayReadListApiSysDutiesHolidays,
  scheduleManageApiSysDutiesSchedules,
  scheduleReadListApiSysDutiesSchedules,
} from "@/services/sys/duty"
import { useQuery } from "@tanstack/react-query"
import { useAccess, useModel, useParams } from "@umijs/max"
import { Card, Result, Spin } from "antd"
import clsx from "clsx"
import dayjs from "dayjs"
import { useMemo, useState } from "react"
import CopyWeekSchedule from "./_components/copy-week-schedule"
import WatchkeeperUpdate from "./_components/watchkeeper-update"

function ScheduleByShiftId() {
  const access = useAccess()
  const { shiftId } = useParams()

  const [panelDate, setPanelDate] = useState(dayjs().date(4).startOf("date"))
  const { data: shiftOptions } = useQueryShiftOptions()

  const currentShift = useMemo(
    () => shiftOptions?.find((shift) => String(shift.id) === shiftId),
    [shiftOptions, shiftId],
  )

  const { initialState } = useModel("@@initialState")
  const currentUser = initialState?.currentUser?.username

  const [sdate, edate] = useMemo(() => {
    return [
      panelDate.startOf("month").startOf("week").format("YYYY-MM-DD"),
      panelDate.endOf("month").endOf("week").format("YYYY-MM-DD"),
    ]
  }, [panelDate])

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
    queryKey: ["holiday", sdate, edate],
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
      <CrossMonthCalender
        panelDate={panelDate}
        onPanelChange={setPanelDate}
        extra={[
          <CopyWeekSchedule
            key="copy"
            data={data}
            shiftId={Number(shiftId)}
            onFinish={() => refetch()}
            defaultDate={panelDate}
            disabled={!allowEdit}
          />,
        ]}
        cellClassName={(date, { today }) =>
          clsx(date.isBefore(today, "day") ? "bg-gray-50" : "bg-[#e2eaf5]")
        }
        cellRender={(date) => {
          const find = data?.find((item) => {
            const dutyDay = dayjs(item.date)
            return dutyDay.isSame(date, "day")
          })

          const holiday = holidays?.find((item) =>
            dayjs(item.date).isSame(date, "day"),
          )

          const dateAllowEdit = allowEdit && date.isSame(panelDate, "month")

          return (
            <div
              className={clsx(
                "flex h-full flex-col justify-between",
                dateAllowEdit && "cursor-pointer",
              )}
            >
              <WatchkeeperUpdate
                key={shiftId}
                initialValue={find?.users}
                allowEdit={dateAllowEdit}
                options={currentShift?.members}
                onFinish={async (users) => {
                  if (users === find?.users) {
                    return
                  }
                  await scheduleManageApiSysDutiesSchedules({
                    shift_id: Number(shiftId),
                    items: [{ users, date: date!.format("YYYY-MM-DD") }],
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
