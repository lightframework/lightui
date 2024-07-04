import Centered from "@/components/centered"
import { useQueryShiftOptions } from "@/lib/hooks/data"
import { Outlet, history, useAccess, useLocation, useParams } from "@umijs/max"
import { Result, Spin } from "antd"
import { useEffect } from "react"
import ShiftList from "./_components/shift-list"

function Schedules() {
  const { shiftId } = useParams()
  const { pathname } = useLocation()

  const { data: shiftOptions, status: shiftOptionsFetchStatus } =
    useQueryShiftOptions()

  useEffect(() => {
    if (
      pathname.endsWith("/schedules") &&
      shiftOptions &&
      shiftOptions.length !== 0
    ) {
      history.replace(`/duty/schedules/${shiftOptions[0].id}`)
    }
  }, [shiftOptions, pathname])

  if (shiftOptionsFetchStatus === "pending") {
    return (
      <Centered>
        <Spin />
      </Centered>
    )
  }

  if (shiftOptionsFetchStatus === "error") {
    return <Result status="500" title="抱歉，请求班次资源失败" />
  }

  return (
    <div className="flex h-full w-full gap-x-3">
      <ShiftList shifts={shiftOptions} />

      {shiftOptions.length === 0 ? (
        <Result title="暂无任何班次信息" subTitle="请先添班次" />
      ) : shiftId ? (
        <div className="h-full w-full overflow-x-auto">
          {shiftOptions.find((shift) => String(shift.id) === shiftId) ? (
            <Outlet />
          ) : (
            <Result
              status="404"
              title="404"
              subTitle={`抱歉，未找到班次：${shiftId}`}
            />
          )}
        </div>
      ) : null}
    </div>
  )
}

export default function AuthSchedules() {
  const access = useAccess()

  if (!access.shiftReadListApiSysDutiesShifts) {
    return (
      <Result status="403" title="403" subTitle="抱歉，你无权访问班次数据" />
    )
  }

  return <Schedules />
}
