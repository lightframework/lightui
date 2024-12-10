import { getCurrentUTCtimestamp } from "@/lib/utils"
import { DatePicker, Form, Select } from "antd"
import { Dayjs } from "dayjs"
import { useSetAtom } from "jotai"
import { incidentAlertFilterAtom } from "../-atoms"

interface FormValues {
  timeBefore?: number
  timeRange?: [Dayjs, Dayjs]
}

type FieldType = Partial<FormValues>

export default function IncidentAlertFilter() {
  const setAlertFilter = useSetAtom(incidentAlertFilterAtom)

  return (
    <Form<FormValues>
      className="flex items-center gap-2"
      onValuesChange={(_, values: FormValues) => {
        const timeBeforeValue = values.timeBefore ?? 0 // 未选择时设置为 0

        // 如果没选择时间范围且 timeBefore 为 0，则什么都不做
        if (timeBeforeValue === 0 && !values.timeRange) {
          setAlertFilter({
            timeRangeHour: 0,
            stime: 0,
            etime: 0,
          })
          return
        }

        setAlertFilter({
          timeRangeHour: timeBeforeValue,
          stime:
            timeBeforeValue !== 0 // 非自定义时间
              ? getCurrentUTCtimestamp() - timeBeforeValue * 60 * 60
              : Math.floor(
                  new Date(values.timeRange![0].toISOString() ?? "").getTime() /
                    1000,
                ),
          etime:
            timeBeforeValue !== 0 // 非自定义时间
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
          allowClear={true}
          placeholder="请选择时间范围"
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
    </Form>
  )
}
