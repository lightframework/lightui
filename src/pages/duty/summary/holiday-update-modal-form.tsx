import { MODAL_FORM_WIDTH } from "@/constants/modal"
import {
  holidayDeleteApiSysDutiesByHolidaysdate,
  holidayUpdateApiSysDutiesHolidays,
} from "@/services/sys/duty"
import {
  ModalForm,
  ProFormDigit,
  ProFormSwitch,
  ProFormText,
} from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Button, message } from "antd"
import { Dayjs } from "dayjs"

export interface HolidayUpdateModalFormProps {
  open: boolean
  onCancel: VoidFunction
  onFinish?: VoidFunction
  holiday?: SYS.Holiday
  selectedDate?: Dayjs
}

export default function HolidayUpdateModalForm({
  open,
  onCancel,
  onFinish,
  holiday,
  selectedDate,
}: HolidayUpdateModalFormProps) {
  const access = useAccess()

  return (
    <ModalForm<SYS.HolidayUpdateReq["data"]>
      title="更新"
      name="app-update"
      width={MODAL_FORM_WIDTH}
      autoFocusFirstInput
      layout="horizontal"
      open={open}
      initialValues={holiday ?? { holiday: false, wage: 1 }}
      modalProps={{
        destroyOnClose: true,
        onCancel,
        maskClosable: false,
      }}
      labelCol={{ span: 4 }}
      onFinishFailed={console.error}
      onFinish={async (formData) => {
        await holidayUpdateApiSysDutiesHolidays({
          data: {
            ...formData,
            date: holiday?.date ?? selectedDate!.format("YYYY-MM-DD"),
          },
        })
        message.success("更新成功")
        onCancel()
        onFinish?.()
        return true
      }}
      submitter={{
        render: (_, doms) => {
          return [
            ...(access.holidayDeleteApiSysDutiesByHolidaysdate && holiday
              ? [
                  <Button
                    key="delete"
                    type="primary"
                    onClick={async () => {
                      await holidayDeleteApiSysDutiesByHolidaysdate({
                        date: holiday.date,
                      })
                      onCancel()
                      onFinish?.()
                    }}
                    danger
                  >
                    删除
                  </Button>,
                ]
              : []),
            ...doms,
          ]
        },
      }}
    >
      <ProFormText
        name="name"
        label="名称"
        placeholder=""
        rules={[{ required: true, message: "请输入名称" }]}
      />
      <ProFormDigit
        name="wage"
        placeholder=""
        label="值班系数"
        rules={[{ required: true }]}
      />
      <ProFormSwitch
        name="holiday"
        label="节假日"
        rules={[{ required: true }]}
      />
    </ModalForm>
  )
}
