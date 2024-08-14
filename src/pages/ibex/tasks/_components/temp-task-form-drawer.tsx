import { useQueryHostOptions } from "@/lib/hooks/data"
import { taskCreateApiIbexTasks } from "@/services/ibex/tpl"
import {
  ProFormDependency,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { Button, Drawer, Form, message } from "antd"
import { useId } from "react"

type FormValues = IBEX.TaskRecordCreateReq

export interface TempTaskFormDrawerProps {
  open: boolean
  onClose: VoidFunction
  onFinish?: VoidFunction
}

export default function TempTaskFormDrawer({
  open,
  onClose,
  onFinish,
}: TempTaskFormDrawerProps) {
  const formId = useId()

  const { data: hostOptions } = useQueryHostOptions()

  return (
    <Drawer
      title="创建临时任务"
      open={open}
      onClose={onClose}
      destroyOnClose
      width={500}
      maskClosable={false}
      footer={
        <div className="flex items-center justify-end gap-2">
          <Button onClick={onClose}>取消</Button>
          <Button type="primary" htmlType="submit" form={formId}>
            确定
          </Button>
        </div>
      }
    >
      <Form<FormValues>
        id={formId}
        layout="vertical"
        initialValues={{
          batch: 0,
          tolerance: 0,
          timeout: 30,
        }}
        onFinish={async (values) => {
          await taskCreateApiIbexTasks(values)
          message.success("创建成功")
          onClose()
          onFinish?.()
        }}
      >
        <ProFormText
          name="title"
          label="标题"
          placeholder=""
          rules={[{ required: true, message: "请输入标题" }]}
        />
        <ProFormText
          name="account"
          label="执行账号"
          placeholder=""
          rules={[{ required: true, message: "请输入执行账号" }]}
        />
        <ProFormDigit
          name="batch"
          label="并发度"
          placeholder=""
          min={0}
          rules={[{ required: true, message: "请输入并发度" }]}
          extra="0表示全并发执行，1表示顺序执行，2表示每次执行两台"
        />
        <ProFormDigit
          name="tolerance"
          label="容忍度"
          placeholder=""
          min={0}
          rules={[{ required: true, message: "请输入容忍度" }]}
          extra="容忍几台机器失败，0表示一台都不容忍，只要失败，立即暂停"
        />
        <ProFormDigit
          name="timeout"
          label="单机超时时间"
          placeholder=""
          min={0}
          fieldProps={{ addonAfter: "ms" }}
        />
        <ProFormSelect
          name="hosts"
          label="机器列表"
          mode="multiple"
          options={
            hostOptions && hostOptions.length > 0
              ? hostOptions?.map((host) => ({
                  value: host.HostName,
                  label: host.HostName,
                }))
              : ["host1", "host2", "host3"]
          }
          placeholder=""
          rules={[{ required: true, message: "请选择机器" }]}
          extra="前置依赖：目标机器上需要部署categraf，并将ibex配置enable设置为true"
        />
        <ProFormDependency name={["hosts"]}>
          {({ hosts }) => {
            const selectedHosts = hosts as string[] | undefined

            return (
              <ProFormSelect
                name="pause"
                label="暂停点"
                options={selectedHosts?.map((host) => ({
                  value: host,
                  label: host,
                }))}
                placeholder=""
                extra="做完某台之后暂停一下"
                rules={[
                  {
                    validator: (_, value) => {
                      if (value && !selectedHosts?.includes(value)) {
                        return Promise.reject("该机器不存在于机器列表")
                      } else {
                        return Promise.resolve()
                      }
                    },
                  },
                ]}
              />
            )
          }}
        </ProFormDependency>
        <ProFormTextArea
          name="script"
          label="脚本"
          placeholder=""
          fieldProps={{ rows: 10 }}
          rules={[{ required: true, message: "请输入脚本" }]}
        />
        <ProFormText
          name="args"
          label="参数"
          placeholder=""
          extra="附于脚本之后的参数，多个参数之间用双逗号分隔，比如arg1,,arg2,,arg3"
        />
      </Form>
    </Drawer>
  )
}
