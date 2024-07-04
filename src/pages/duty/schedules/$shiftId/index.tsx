import { useQueryShiftOptions } from "@/lib/hooks/data"
import { scheduleReadListApiSysDutiesSchedules } from "@/services/sys/duty"
import { useQuery } from "@tanstack/react-query"
import { useAccess, useModel, useParams } from "@umijs/max"
import { Calendar, Card, Result } from "antd"
import dayjs, { Dayjs } from "dayjs"
import { useMemo, useState } from "react"
import ScheduleUpdateModalForm from "./_components/schedule-update-modal-form"

function ScheduleByShiftId() {
  const access = useAccess()
  const { shiftId } = useParams()

  const [panelDay, setPanelDay] = useState<Dayjs>(dayjs())
  const [selectedDay, setSelectedDay] = useState<Dayjs>(dayjs())
  const [openEditModal, setOpenEditModal] = useState(false)

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

  const { data, refetch } = useQuery({
    queryKey: ["schedule", { shiftId, sdate, edate }],
    queryFn: () =>
      scheduleReadListApiSysDutiesSchedules({
        shift_id: Number(shiftId),
        sdate,
        edate,
      }).then((res) => res.data?.items ?? []),
  })

  return (
    <>
      <Card size="small">
        <Calendar
          className="schedule-calender"
          disabledDate={(day) => day.isBefore(dayjs(), "day")}
          mode="month"
          value={selectedDay}
          onSelect={(day, { source }) => {
            setSelectedDay(day)
            if (
              access.scheduleManageApiSysDutiesSchedules &&
              source === "date" &&
              currentUser &&
              currentShift?.admins.includes(currentUser)
            ) {
              setOpenEditModal(true)
            }
          }}
          cellRender={(day) => {
            const find = data?.find((item) => {
              const dutyDay = dayjs(item.date)
              return dutyDay.isSame(day, "day")
            })

            return find ? find.users.join(" ") : ""
          }}
          onPanelChange={(day) => setPanelDay(day)}
        />
      </Card>
      <ScheduleUpdateModalForm
        open={openEditModal}
        onCancel={() => setOpenEditModal(false)}
        onFinish={refetch}
        shiftId={Number(shiftId)}
        day={selectedDay}
        initialUsers={
          data?.find((item) => dayjs(item.date).isSame(selectedDay, "day"))
            ?.users
        }
      />
    </>
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
