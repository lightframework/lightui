import { useQueryUserOptions } from "@/lib/hooks/data"
import { getCurrentUTCtimestamp } from "@/lib/utils"
import { entryGetByNameApiArgusDictsEntries } from "@/services/argus/dict"
import { ProFormSelect } from "@ant-design/pro-components"
import { useQuery } from "@tanstack/react-query"
import { useModel } from "@umijs/max"
import { DatePicker, Form, Input, Select } from "antd"
import { useForm } from "antd/es/form/Form"
import { Dayjs } from "dayjs"
import { useAtom } from "jotai"
import { useEffect } from "react"
import { incidentFilterAtom, selectedUserIdsAtom } from "../_atoms"

interface FormValues {
  timeRangeHour: number
  severity?: number
  query?: string
  timeRange?: [Dayjs, Dayjs]
  status?: string
  source?: string
  userIds?: number[]
}

type FieldType = Partial<FormValues>

export default function IncidentFilter() {
  const [form] = useForm()
  const [incidentFilter, setIncidentFilter] = useAtom(incidentFilterAtom)
  const [selectedUserIds, setSelectedUserIds] = useAtom(selectedUserIdsAtom)
  const { initialState } = useModel("@@initialState")
  const currentUser = initialState?.currentUser

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

  const { data: users } = useQueryUserOptions()

  useEffect(() => {
    let userIds = selectedUserIds

    if (!userIds) {
      const user = users?.find(
        (user) => user.username === currentUser?.username,
      )
      if (user) {
        userIds = [user.id]
      }
    }

    if (userIds && userIds.length > 0) {
      form.setFieldValue("userIds", userIds)
      setIncidentFilter((filter) => ({
        ...filter,
        uids: userIds.join(","),
        stime: filter.timeRangeHour
          ? getCurrentUTCtimestamp() - filter.timeRangeHour * 60 * 60
          : filter.stime,
        etime: filter.timeRangeHour ? getCurrentUTCtimestamp() : filter.etime,
      }))
    }
  }, [users, currentUser])

  return (
    <Form<FormValues>
      form={form}
      className="flex flex-wrap items-center gap-2"
      initialValues={incidentFilter ?? { timeRangeHour: 6 }}
      onValuesChange={(_, values: FormValues) => {
        if (values.timeRangeHour === 0 && !values.timeRange) {
          return
        }

        setIncidentFilter({
          timeRangeHour: values.timeRangeHour,
          query: values.query,
          severity: values.severity,
          status: values.status,
          source: values.source,
          uids: values.userIds?.join(","),
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
      <Form.Item<FieldType> noStyle name="query">
        <Input placeholder="模糊搜索" className="w-60" />
      </Form.Item>
      <ProFormSelect
        name="userIds"
        noStyle
        options={users?.map((user) => ({
          value: user.id,
          label: user.username,
        }))}
        allowClear
        showSearch
        placeholder="认领人"
        mode="multiple"
        style={{ width: 200 }}
        onChange={(value: number[]) => setSelectedUserIds(value)}
      />
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
      <Form.Item<FieldType> noStyle name="status">
        <Select
          options={progressOptions?.map((item) => ({
            value: item.key,
            label: item.value,
          }))}
          style={{ width: 90 }}
          allowClear
          placeholder="状态"
        />
      </Form.Item>
    </Form>
  )
}
