import { getCurrentUTCtimestamp } from "@/lib/utils"
import { DatePicker, Form, Input, Select } from "antd"
import { Dayjs } from "dayjs"
import { useAtom } from "jotai"
import { eventFilterAtom } from "../_atoms"

interface FormValues {
  timeBefore: number
  query?: string
  timeRange?: [Dayjs, Dayjs]
}

type FieldType = Partial<FormValues>

export default function EventFilter() {
  const [alertFilter, setAlertFilter] = useAtom(eventFilterAtom)

  return (
    <Form<FormValues>
      className="flex items-center gap-2"
      initialValues={{
        ...alertFilter,
        timeBefore: alertFilter.timeRangeHour,
      }}
      onValuesChange={(_, values: FormValues) => {
        if (values.timeBefore === 0 && !values.timeRange) {
          return
        }

        setAlertFilter({
          query: values.query,
          timeRangeHour: values.timeBefore,
          stime:
            values.timeBefore !== 0
              ? getCurrentUTCtimestamp() - values.timeBefore * 60 * 60
              : Math.floor(
                  new Date(values.timeRange![0].toISOString() ?? "").getTime() /
                    1000,
                ),
          etime:
            values.timeBefore !== 0
              ? getCurrentUTCtimestamp()
              : Math.floor(
                  new Date(values.timeRange![1].toISOString() ?? "").getTime() /
                    1000,
                ),
        })
      }}
    >
      <Form.Item<FieldType> noStyle name="timeBefore">
        <Select
          style={{ width: 120 }}
          options={[
            {
              label: "自定义",
              value: 0,
            },
            {
              label: "最近6小时",
              value: 6,
            },
            {
              label: "最近12小时",
              value: 12,
            },
            {
              label: "最近1天",
              value: 1 * 24,
            },
            {
              label: "最近3天",
              value: 3 * 24,
            },
            {
              label: "最近7天",
              value: 7 * 24,
            },
            {
              label: "最近14天",
              value: 14 * 24,
            },
            {
              label: "最近30天",
              value: 30 * 24,
            },
            {
              label: "最近60天",
              value: 60 * 24,
            },
            {
              label: "最近90天",
              value: 90 * 24,
            },
          ]}
        />
      </Form.Item>
      <Form.Item<FieldType>
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.timeBefore !== currentValues.timeBefore
        }
      >
        {({ getFieldValue, setFieldValue }) => {
          const showCustomTime = getFieldValue("timeBefore") === 0

          if (!showCustomTime) {
            setFieldValue("timeRange", undefined)
          }

          return showCustomTime ? (
            <Form.Item<FieldType> noStyle name="timeRange">
              <DatePicker.RangePicker
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DD HH:mm"
              />
            </Form.Item>
          ) : null
        }}
      </Form.Item>
      <Form.Item<FieldType> noStyle name="query">
        <Input placeholder="模糊搜索" className="w-72" />
      </Form.Item>
    </Form>
  )
}
