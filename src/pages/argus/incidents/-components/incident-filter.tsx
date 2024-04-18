import { getCurrentUTCtimestamp } from "@/lib/utils"
import { entryGetByNameApiArgusDictsEntries } from "@/services/argus/dict"
import { useQuery } from "@tanstack/react-query"
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

  const { data: progressOptions } = useQuery({
    queryKey: ["dict-entries", "incident_progress"],
    queryFn: () =>
      entryGetByNameApiArgusDictsEntries({
        name: "incident_progress",
      }).then((res) => res.data?.items ?? []),
  })

  const { data: severityOptions } = useQuery({
    queryKey: ["dict-entries", "incident_severity_level"],
    queryFn: () =>
      entryGetByNameApiArgusDictsEntries({
        name: "incident_severity_level",
      }).then((res) => res.data?.items ?? []),
  })

  const { data: sourceOptions } = useQuery({
    queryKey: ["dict-entries", "alert_source"],
    queryFn: () =>
      entryGetByNameApiArgusDictsEntries({
        name: "alert_source",
      }).then((res) => res.data?.items ?? []),
  })

  return (
    <Form<FormValues>
      className="flex flex-wrap items-center gap-2"
      onValuesChange={(_, values: FormValues) => {
        if (values.timeBefore === 0 && !values.timeRange) {
          return
        }

        setIncidentFilter({
          timeRangeHour: values.timeBefore,
          query: values.query,
          severity: values.severity,
          progress: values.progress,
          source: values.source,
          stime:
            values.timeBefore === undefined
              ? undefined
              : values.timeBefore
                ? getCurrentUTCtimestamp() - values.timeBefore * 60 * 60
                : values.timeRange
                  ? Math.floor(
                      new Date(values.timeRange[0].toISOString()).getTime() /
                        1000,
                    )
                  : undefined,
          etime:
            values.timeBefore === undefined
              ? undefined
              : values.timeBefore
                ? getCurrentUTCtimestamp()
                : values.timeRange
                  ? Math.floor(
                      new Date(values.timeRange[1].toISOString()).getTime() /
                        1000,
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
          allowClear
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
          options={severityOptions?.map((item) => ({
            label: item.value,
            value: item.key,
          }))}
        />
      </Form.Item>
      <Form.Item<FieldType> noStyle name="source">
        <Select
          placeholder="故障来源"
          options={sourceOptions?.map((item) => ({
            value: item.key,
            label: item.value,
          }))}
          style={{ width: 90 }}
          allowClear
        />
      </Form.Item>
      <Form.Item<FieldType> noStyle name="progress">
        <Select
          options={progressOptions?.map((item) => ({
            value: item.key,
            label: item.value,
          }))}
          style={{ width: 90 }}
          allowClear
          placeholder="处理进度"
        />
      </Form.Item>
    </Form>
  )
}
