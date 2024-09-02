import { getCurrentUTCtimestamp } from "@/lib/utils"
import { DatePicker, Form, Input, Select } from "antd"
import { useForm } from "antd/es/form/Form"
import { Dayjs } from "dayjs"
import { useAtom } from "jotai"
import { categrafLogFilterAtom } from "../_atoms"

interface FormValues {
  timeRangeHour: number
  timeRange?: [Dayjs, Dayjs]
  ctf_type?: string
  status?: string
}

type FieldType = Partial<FormValues>

export default function CategrafLogFilter() {
  const [form] = useForm()
  const [filter, setFilter] = useAtom(categrafLogFilterAtom)

  return (
    <Form<FormValues>
      form={form}
      className="flex items-center gap-2"
      initialValues={filter ?? { timeRangeHour: 6 }}
      onValuesChange={(_, values: FormValues) => {
        if (values.timeRangeHour === 0 && !values.timeRange) {
          return
        }

        setFilter({
          ...values,
          timeRangeHour: values.timeRangeHour,
          stime:
            values.timeRangeHour !== 0
              ? getCurrentUTCtimestamp() - values.timeRangeHour * 60 * 60
              : Math.floor(
                  new Date(values.timeRange![0].toISOString() ?? "").getTime() /
                    1000,
                ),
          etime:
            values.timeRangeHour !== 0
              ? getCurrentUTCtimestamp()
              : Math.floor(
                  new Date(values.timeRange![1].toISOString() ?? "").getTime() /
                    1000,
                ),
        })
      }}
    >
      <Form.Item<FieldType> noStyle name="timeRangeHour">
        <Select
          placeholder="时间范围"
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
          prevValues.timeRangeHour !== currentValues.timeRangeHour
        }
      >
        {({ getFieldValue, setFieldValue }) => {
          const showCustomTime = getFieldValue("timeRangeHour") === 0

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
      <Form.Item<FieldType> noStyle name="ctf_type">
        <Input placeholder="搜索" className="w-60" />
      </Form.Item>
      <Form.Item<FieldType> name="status" noStyle>
        <Input placeholder="状态" className="w-20" />
      </Form.Item>
    </Form>
  )
}
