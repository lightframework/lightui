import { releaseInstanceApiOpsReleasesInstances } from "@/services/ops/release"
import {
  ProForm,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { Button, List, message } from "antd"
import { Dispatch, SetStateAction } from "react"

export type ReleaseInstance = {
  name: string
  uid: string
}

export default function InstanceDestroyForm({
  releaseInstances,
  setReleaseInstances,
  onFinish,
}: {
  releaseInstances: ReleaseInstance[]
  setReleaseInstances: Dispatch<SetStateAction<ReleaseInstance[]>>
  onFinish?: VoidFunction
}) {
  return (
    <ProForm<OPS.ReleaseInstanceReq>
      onReset={() => setReleaseInstances([])}
      submitter={{
        render: (_, dom) => (
          <div className="flex justify-end gap-1.5">{dom}</div>
        ),
      }}
      onFinish={async (values) => {
        if (releaseInstances.length === 0) {
          return false
        }

        await releaseInstanceApiOpsReleasesInstances({
          ...values,
          Uids: releaseInstances.map((instance) => instance.uid),
        })
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
        <div className="mb-1">待回收实例</div>
        <div className="max-h-96 overflow-y-auto">
          <List
            className="mb-4"
            bordered
            dataSource={releaseInstances}
            renderItem={(instance) => (
              <List.Item
                actions={[
                  <Button
                    key="remove"
                    type="link"
                    danger
                    onClick={() =>
                      setReleaseInstances((instances) =>
                        instances.filter((item) => item.uid !== instance.uid),
                      )
                    }
                  >
                    移除
                  </Button>,
                ]}
              >
                <div className="truncate py-2">{instance.name}</div>
              </List.Item>
            )}
          />
        </div>
        {releaseInstances.length === 0 && (
          <div style={{ color: "#ff4d4f" }} className="-mt-3">
            请选择实例
          </div>
        )}
      </div>
      <ProFormTextArea label="备注" name="remark" placeholder="" />
    </ProForm>
  )
}
