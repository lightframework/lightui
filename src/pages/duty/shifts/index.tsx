import { useAccess } from "@umijs/max"
import { Result } from "antd"
import ShiftTable from "./_components/shift-table"

export default function Shifts() {
  const access = useAccess()

  if (!access.shiftReadListApiSysDutiesShifts) {
    return (
      <Result status="403" title="403" subTitle="抱歉，你无权访问班次数据" />
    )
  }

  return <ShiftTable />
}
