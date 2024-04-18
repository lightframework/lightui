import { useQueryUserOptions } from "@/lib/hooks/data"
import { entryGetByNameApiArgusDictsEntries } from "@/services/argus/dict"
import {
  ArrowRightOutlined,
  CloseOutlined,
  ScheduleOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { useQuery } from "@tanstack/react-query"
import { Form, Input, InputNumber, Radio, Select, Space } from "antd"
import { NamePath } from "antd/es/form/interface"

export interface NotifyLinkFieldProps {
  name: NamePath
  index: number
  remove: (index: number) => void
}

export default function NotifyLinkField({
  name,
  index,
  remove,
}: NotifyLinkFieldProps) {
  const { data: users, isFetching } = useQueryUserOptions()

  const { data: notifyObjectOptions } = useQuery({
    queryKey: ["dict-entries", "tactic_notify_object"],
    queryFn: () =>
      entryGetByNameApiArgusDictsEntries({
        name: "tactic_notify_object",
      }).then((res) => res.data?.items ?? []),
  })

  const { data: notifyWayOptions } = useQuery({
    queryKey: ["dict-entries", "tactic_notify_way"],
    queryFn: () =>
      entryGetByNameApiArgusDictsEntries({
        name: "tactic_notify_way",
      }).then((res) => res.data?.items ?? []),
  })

  const { data: progressOptions } = useQuery({
    queryKey: ["dict-entries", "incident_progress"],
    queryFn: () =>
      entryGetByNameApiArgusDictsEntries({
        name: "incident_progress",
      }).then((res) => res.data?.items ?? []),
  })

  return (
    <div className="rounded border border-solid border-[#d9d9d9]">
      <div className="flex items-center justify-between rounded-t bg-[#f3f4f6] px-3 py-2">
        <div className="font-semibold">环节 {index + 1}</div>

        <CloseOutlined onClick={() => remove(index)} />
      </div>

      <div className="space-y-3 p-3">
        <Space.Compact>
          <Form.Item
            name={[name, "notify_type"]}
            initialValue="personal"
            rules={[{ required: true, message: "请选择通知对象类型" }]}
            noStyle
          >
            <Select
              options={notifyObjectOptions?.map((item) => ({
                value: item.key,
                label: (
                  <div className="flex items-center gap-2">
                    {item.key === "watchkeeper" ? (
                      <ScheduleOutlined />
                    ) : item.key === "team" ? (
                      <TeamOutlined />
                    ) : (
                      <UserOutlined />
                    )}

                    {item.value}
                  </div>
                ),
              }))}
              style={{
                width: 100,
              }}
              suffixIcon={<ArrowRightOutlined />}
            />
          </Form.Item>
          <Form.Item
            name={[name, "party"]}
            rules={[{ required: true, message: "请选择通知对象" }]}
            noStyle
          >
            <Select
              placeholder="请选择通知对象"
              options={users?.map((user) => ({
                label: user.username,
                value: String(user.id),
              }))}
              loading={isFetching}
              style={{ width: 550 }}
            />
          </Form.Item>
        </Space.Compact>

        <Form.Item name={[name, "notify_mode"]} initialValue="unified">
          <Radio.Group>
            <Radio value="unified">遵循统一设置</Radio>
          </Radio.Group>
        </Form.Item>

        <Space.Compact>
          <Form.Item noStyle>
            <Input
              value="严重"
              style={{
                color: "rgba(0, 0, 0, 0.65)",
                cursor: "auto",
                width: 100,
              }}
              disabled
            />
          </Form.Item>
          <Form.Item
            name={[name, "critical_notifies"]}
            rules={[{ required: true, message: "请选择通知渠道" }]}
            noStyle
          >
            <Select
              mode="multiple"
              style={{ width: 550 }}
              options={notifyWayOptions?.map((item) => ({
                value: item.key,
                label: item.value,
              }))}
            />
          </Form.Item>
        </Space.Compact>

        <Space.Compact>
          <Form.Item noStyle>
            <Input
              value="警告"
              style={{
                color: "rgba(0, 0, 0, 0.65)",
                cursor: "auto",
                width: 100,
              }}
              disabled
            />
          </Form.Item>
          <Form.Item
            name={[name, "warning_notifies"]}
            rules={[{ required: true, message: "请选择通知渠道" }]}
            noStyle
          >
            <Select
              mode="multiple"
              style={{ width: 550 }}
              options={notifyWayOptions?.map((item) => ({
                value: item.key,
                label: item.value,
              }))}
            />
          </Form.Item>
        </Space.Compact>

        <Space.Compact>
          <Form.Item noStyle>
            <Input
              value="一般"
              style={{
                color: "rgba(0, 0, 0, 0.65)",
                cursor: "auto",
                width: 100,
              }}
              disabled
            />
          </Form.Item>
          <Form.Item
            name={[name, "info_notifies"]}
            rules={[{ required: true, message: "请选择通知渠道" }]}
            noStyle
          >
            <Select
              mode="multiple"
              style={{ width: 550 }}
              options={notifyWayOptions?.map((item) => ({
                value: item.key,
                label: item.value,
              }))}
            />
          </Form.Item>
        </Space.Compact>

        <div>
          每
          <Form.Item
            name={[name, "notify_frequency"]}
            initialValue={10}
            noStyle
            rules={[{ required: true, message: "请输入通知频率" }]}
          >
            <InputNumber min={1} className="mx-2" />
          </Form.Item>
          分钟通知一次，最多通知
          <Form.Item
            name={[name, "notify_max_times"]}
            initialValue={2}
            noStyle
            rules={[{ required: true, message: "请输入最大通知次数" }]}
          >
            <InputNumber min={1} className="mx-2" />
          </Form.Item>
          次。
        </div>

        <div>
          超过
          <Form.Item
            name={[name, "turn_after"]}
            initialValue={10}
            noStyle
            rules={[{ required: true, message: "请输入升级时间" }]}
          >
            <InputNumber min={1} className="mx-2" />
          </Form.Item>
          分钟后如果故障
          <Form.Item
            name={[name, "turn_state"]}
            noStyle
            initialValue="NotClosed"
          >
            <Radio.Group className="mx-2">
              {progressOptions?.map((item) => (
                <Radio.Button key={item.key} value={item.key}>
                  {item.value}
                </Radio.Button>
              ))}
            </Radio.Group>
          </Form.Item>
          ，则升级到下一环节。
        </div>
      </div>
    </div>
  )
}
