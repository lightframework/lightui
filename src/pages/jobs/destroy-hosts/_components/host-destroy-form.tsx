import { getCurrentUTCtimestamp } from "@/lib/utils"
import { releaseHostApiOpsReleasesHosts } from "@/services/ops/release"
import {
  ProForm,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import {
  Button,
  DatePicker,
  Form,
  List,
  Select,
  Space,
  Switch,
  message,
} from "antd"
import { Dayjs } from "dayjs"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

export type ReleaseHost = {
  name: string
} & OPS.ReleaseHostParams

function PlanTimeSelect({ onChange }: { onChange?: (value?: number) => void }) {
  const [duration, setDuration] = useState<number>(3)
  const [date, setDate] = useState<Dayjs | undefined>()

  useEffect(() => {
    if (duration === 0) {
      onChange?.(getCurrentUTCtimestamp())
    } else if (duration === -1) {
      onChange?.(date ? date.unix() : undefined)
    } else {
      onChange?.(getCurrentUTCtimestamp() + duration * 24 * 60 * 60)
    }
  }, [duration, date])

  return (
    <Space.Compact>
      <Select
        placeholder="回收时间"
        value={duration}
        onChange={setDuration}
        style={{ width: 100 }}
        options={[
          {
            label: "自定义",
            value: -1,
          },
          { label: "立即回收", value: 0 },
          {
            label: "1天后",
            value: 1,
          },
          {
            label: "3天后",
            value: 3,
          },
          {
            label: "5天后",
            value: 5,
          },
          {
            label: "10天后",
            value: 10,
          },
          {
            label: "30天后",
            value: 30,
          },
        ]}
      />
      {duration === -1 && (
        <DatePicker
          value={date}
          onChange={setDate}
          showTime={{ format: "HH:mm" }}
          format="YYYY-MM-DD HH:mm"
        />
      )}
    </Space.Compact>
  )
}

export default function HostDestroyForm({
  releaseHosts,
  setReleaseHosts,
  onFinish,
}: {
  releaseHosts: ReleaseHost[]
  setReleaseHosts: Dispatch<SetStateAction<ReleaseHost[]>>
  onFinish?: VoidFunction
}) {
  return (
    <ProForm<OPS.ReleaseHostReq>
      onReset={() => setReleaseHosts([])}
      submitter={{
        render: (_, dom) => (
          <div className="flex justify-end gap-1.5">{dom}</div>
        ),
      }}
      onFinish={async (values) => {
        if (releaseHosts.length === 0) {
          return false
        }

        await releaseHostApiOpsReleasesHosts({ ...values, hosts: releaseHosts })
        message.success("创建回收任务成功")
        onFinish?.()
        return true
      }}
    >
      <ProFormText
        label="任务名称"
        name="topic"
        placeholder=""
        rules={[{ required: true, message: "请输入任务名称" }]}
      />
      <div>
        <div className="mb-1">待回收主机</div>
        <div className="max-h-96 overflow-y-auto">
          <List
            className="mb-4"
            bordered
            dataSource={releaseHosts}
            renderItem={(host, index) => (
              <List.Item
                actions={[
                  <div
                    key={`${host.Uid}-remove-instance`}
                    className="flex items-center gap-2 px-3"
                  >
                    删除实例
                    <Switch
                      checked={host.DestroyIns}
                      onChange={(checked) =>
                        setReleaseHosts((hosts) =>
                          hosts.with(index, {
                            ...host,
                            DestroyIns: checked,
                          }),
                        )
                      }
                    />
                  </div>,
                  <Button
                    key="remove"
                    type="link"
                    danger
                    onClick={() =>
                      setReleaseHosts((hosts) =>
                        hosts.filter((item) => item.Uid !== host.Uid),
                      )
                    }
                  >
                    移除
                  </Button>,
                ]}
              >
                <div className="truncate py-2">{host.name}</div>
              </List.Item>
            )}
          />
        </div>
        {releaseHosts.length === 0 && (
          <div style={{ color: "#ff4d4f" }} className="-mt-3">
            请选择主机！
          </div>
        )}
      </div>
      <Form.Item
        label="回收时间"
        name="PlanTime"
        rules={[{ required: true, message: "请选择回收时间" }]}
      >
        <PlanTimeSelect />
      </Form.Item>

      <ProFormTextArea label="备注" name="remark" placeholder="" />
    </ProForm>
  )
}
