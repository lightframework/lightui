import { incidentProgressDict } from "@/constants/dict"
import { getCurrentUTCtimestamp } from "@/lib/utils"
import { DatePicker, Form, Input, Select } from "antd"
import { Dayjs } from "dayjs"
import { useSetAtom } from "jotai"
import { incidentFilterAtom } from "../_atoms"

interface FormValues {
  timeBefore?: number
  severity?: number
  query?: string
  timeRange?: [Dayjs, Dayjs]
  progress?: string
  source?: string
}

type FieldType = Partial<FormValues>

export default function IncidentFilter() {
  const setIncidentFilter = useSetAtom(incidentFilterAtom)

  return (
    <Form<FormValues>
      className="flex items-center gap-2"
      onValuesChange={(_, values: FormValues) => {
        if (values.timeBefore === 0 && !values.timeRange) {
          return
        }

        setIncidentFilter({
          query: values.query,
          severity: values.severity,
          progress: values.progress,
          source: values.source,
          stime: values.timeBefore
            ? getCurrentUTCtimestamp() - values.timeBefore * 60 * 60
            : values.timeRange
              ? Math.floor(
                  new Date(values.timeRange[0].toISOString()).getTime() / 1000,
                )
              : undefined,
          etime: values.timeBefore
            ? getCurrentUTCtimestamp()
            : values.timeRange
              ? Math.floor(
                  new Date(values.timeRange[1].toISOString()).getTime() / 1000,
                )
              : undefined,
        })
      }}
    >
      <Form.Item<FieldType> noStyle name="query">
        <Input placeholder="模糊搜索" className="w-72" />
      </Form.Item>
      <Form.Item<FieldType> noStyle name="timeBefore">
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
          placeholder="故障级别"
          options={[
            {
              label: "严重",
              value: 1,
            },
            {
              label: "警告",
              value: 2,
            },
            {
              label: "提醒",
              value: 3,
            },
          ]}
        />
      </Form.Item>
      <Form.Item<FieldType> noStyle name="source">
        <Select
          placeholder="故障来源"
          options={[
            { label: "夜莺", value: "n9e" },
            { label: "Orch", value: "orch" },
            { label: "腾讯云", value: "tc" },
          ]}
          style={{ width: 90 }}
          allowClear
        />
      </Form.Item>
      <Form.Item<FieldType> noStyle name="progress">
        <Select
          options={Object.entries(incidentProgressDict).map(([key, meta]) => ({
            label: meta.value,
            value: key,
          }))}
          style={{ width: 90 }}
          allowClear
          placeholder="进展"
        />
      </Form.Item>
    </Form>
  )
}
