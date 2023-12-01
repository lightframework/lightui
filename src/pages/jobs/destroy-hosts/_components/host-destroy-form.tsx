import { releaseHostApiOpsReleasesHosts } from "@/services/ops/release"
import {
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { Button, List, Switch, message } from "antd"
import { Dispatch, SetStateAction } from "react"

export type ReleaseHost = {
  name: string
} & OPS.ReleaseHostParams

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
            请选择主机
          </div>
        )}
      </div>
      <ProFormSelect
        label="预删除时间"
        name="DelayDays"
        placeholder=""
        initialValue={3}
        width={160}
        options={[
          {
            label: "立即删除",
            value: 0,
          },
          {
            label: "1天",
            value: 1,
          },
          {
            label: "2天",
            value: 2,
          },
          {
            label: "3天",
            value: 3,
          },
          {
            label: "4天",
            value: 4,
          },
          {
            label: "5天",
            value: 5,
          },
        ]}
        rules={[
          {
            required: true,
            message: "请选择预删除时间",
          },
        ]}
      />

      <ProFormTextArea label="备注" name="remark" placeholder="" />
    </ProForm>
  )
}
