import { getCurrentUTCtimestamp } from "@/lib/utils"
import { DatePicker, Form, Input, Select } from "antd"
import { Dayjs } from "dayjs"
import { useSetAtom } from "jotai"
import { alertFilterAtom } from "../_atoms"

interface FormValues {
  timeBefore: number
  severity?: number
  query?: string
  timeRange?: [Dayjs, Dayjs]
}

type FieldType = Partial<FormValues>

export default function AlertFilter() {
  const setAlertFilter = useSetAtom(alertFilterAtom)

  return (
    <Form<FormValues>
      className="flex items-center gap-2"
      initialValues={{
        timeBefore: 6,
      }}
      onValuesChange={(_, values: FormValues) => {
        if (values.timeBefore === 0 && !values.timeRange) {
          return
        }

        setAlertFilter({
          query: values.query,
          severity: values.severity,
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
      <Form.Item<FieldType> noStyle name="severity">
        <Select
          style={{ width: 90 }}
          allowClear
          placeholder="事件级别"
          options={[
            {
              label: "一级告警",
              value: 1,
            },
            {
              label: "二级告警",
              value: 2,
            },
            {
              label: "三级告警",
              value: 3,
            },
          ]}
        />
      </Form.Item>
      <Form.Item<FieldType> noStyle name="query">
        <Input
          placeholder="模糊搜索规则和标签(多个关键词请用空格分隔)"
          className="w-72"
        />
      </Form.Item>
    </Form>
  )
}
