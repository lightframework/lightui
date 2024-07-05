import { scheduleManageApiSysDutiesSchedules } from "@/services/sys/duty"
import { ModalForm } from "@ant-design/pro-components"
import { Button, DatePicker, Form, message } from "antd"
import dayjs, { Dayjs } from "dayjs"

export interface CopyWeekScheduleProps {
  shiftId: number
  data?: SYS.Schedule[]
  onFinish?: VoidFunction
  defaultDate?: Dayjs
  disabled?: boolean
}

export default function CopyWeekSchedule({
  shiftId,
  data,
  onFinish,
  defaultDate,
  disabled,
}: CopyWeekScheduleProps) {
  return (
    <ModalForm<{ source: string; targets: string[] }>
      width={400}
      layout="horizontal"
      labelCol={{ span: 3 }}
      trigger={
        <Button type="primary" disabled={disabled}>
          复制
        </Button>
      }
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
      }}
      initialValues={{
        source: defaultDate,
        targets: defaultDate ? [defaultDate.add(7, "day")] : undefined,
      }}
      onFinish={async (values) => {
        const { source, targets } = values

        const sourceWeekSchedule = data?.filter((item) => {
          const itemDay = dayjs(item.date)
          return (
            itemDay.isAfter(
              dayjs(source).startOf("week").subtract(1, "day"),
              "day",
            ) &&
            itemDay.isBefore(dayjs(source).endOf("week").add(1, "day"), "day")
          )
        })

        const promises = targets.map((value) => {
          const weekDiff = dayjs(value).diff(dayjs(source), "week")

          return scheduleManageApiSysDutiesSchedules({
            shift_id: shiftId,
            items:
              sourceWeekSchedule?.map((item) => ({
                users: item.users ?? [],
                date: dayjs(item.date)
                  .add(weekDiff * 7, "day")
                  .format("YYYY-MM-DD"),
              })) ?? [],
          })
        })

        await Promise.all(promises)
        message.success("复制成功")
        onFinish?.()

        return true
      }}
    >
      <Form.Item
        label="源"
        name="source"
        rules={[{ required: true, message: "请选择" }]}
      >
        <DatePicker.WeekPicker />
      </Form.Item>

      <Form.Item
        label="目标"
        name="targets"
        rules={[{ required: true, message: "请选择" }]}
      >
        <DatePicker.WeekPicker
          multiple
          disabledDate={(day) => {
            return day.isBefore(dayjs(), "day")
          }}
        />
      </Form.Item>
    </ModalForm>
  )
}
