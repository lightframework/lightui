import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { useQueryUserOptions } from "@/lib/hooks/data"
import { scheduleManageApiSysDutiesSchedules } from "@/services/sys/duty"
import { ModalForm, ProFormSelect } from "@ant-design/pro-components"
import { message } from "antd"
import { Dayjs } from "dayjs"

export interface ScheduleUpdateModalFormProps {
  open: boolean
  onCancel: VoidFunction
  onFinish?: VoidFunction
  day?: Dayjs
  shiftId: number
  initialUsers?: string[]
}

export default function ScheduleUpdateModalForm({
  open,
  onCancel,
  onFinish,
  day,
  initialUsers,
  shiftId,
}: ScheduleUpdateModalFormProps) {
  const { data: userOptions } = useQueryUserOptions()

  return (
    <ModalForm<{ users: string[] }>
      title="安排值班人员"
      name="schedule-update"
      width={MODAL_FORM_WIDTH}
      autoFocusFirstInput
      layout="horizontal"
      open={open}
      initialValues={{ users: initialUsers }}
      modalProps={{
        destroyOnClose: true,
        onCancel,
        maskClosable: false,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        await scheduleManageApiSysDutiesSchedules({
          shift_id: shiftId,
          items: [{ ...formData, date: day!.format("YYYY-MM-DD") }],
        })
        message.success("更新成功")
        onCancel()
        onFinish?.()
        return true
      }}
    >
      <ProFormSelect
        name="users"
        placeholder=""
        mode="multiple"
        showSearch
        options={userOptions?.map((user) => user.username)}
      />
    </ModalForm>
  )
}
