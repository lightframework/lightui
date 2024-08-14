import FormLabel from "@/components/form-label"
import { useQueryHostOptions } from "@/lib/hooks/data"
import {
  ProFormDependency,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { Button, Form, Tag } from "antd"

type FormValues = IBEX.TaskRecordCreateReq

export interface TaskFormProps {
  initialValues?: Partial<FormValues>
  onFinish?: (values: IBEX.TaskTplCreateReq) => void
}

export default function TaskForm({
  initialValues = { tolerance: 0, batch: 0, timeout: 30 },
  onFinish,
}: TaskFormProps) {
  const { data: hostOptions } = useQueryHostOptions()

  return (
    <Form<FormValues>
      layout="vertical"
      initialValues={initialValues}
      onFinish={onFinish}
    >
      <ProFormText
        name="title"
        label={<FormLabel label="标题" help="说明这个任务的作用" />}
        placeholder=""
        rules={[{ required: true, message: "请输入标题" }]}
      />
      <ProFormText
        name="account"
        label={
          <FormLabel label="执行账号" help="慎用root，除非要代表操作系统意志" />
        }
        placeholder=""
        rules={[{ required: true, message: "请输入执行账号" }]}
      />
      <ProFormDigit
        name="batch"
        label={
          <FormLabel
            label="并发度"
            help="0表示全并发执行，1表示顺序执行，2表示每次执行两台"
          />
        }
        placeholder=""
        min={0}
        rules={[{ required: true, message: "请输入并发度" }]}
        fieldProps={{
          style: { width: "auto" },
        }}
      />
      <ProFormDigit
        name="tolerance"
        label={
          <FormLabel
            label="容忍度"
            help="容忍几台机器失败，0表示一台都不容忍，只要失败，立即暂停"
          />
        }
        placeholder=""
        min={0}
        rules={[{ required: true, message: "请输入容忍度" }]}
        fieldProps={{
          style: { width: "auto" },
        }}
      />
      <ProFormDigit
        name="timeout"
        label={
          <FormLabel label="超时时间" help="单机脚本执行的超时时间，单位是秒" />
        }
        placeholder=""
        min={0}
        fieldProps={{
          style: { width: "auto" },
        }}
      />
      <ProFormSelect
        name="hosts"
        label={
          <FormLabel
            label="机器列表"
            help={
              <Tag style={{ fontSize: 12 }} color="orange">
                前置依赖：目标机器上需要部署 categraf，并将 ibex 配置 enable
                设置为 true
              </Tag>
            }
          />
        }
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
      />
      <ProFormDependency name={["hosts"]}>
        {({ hosts }) => {
          const selectedHosts = hosts as string[] | undefined

          return (
            <ProFormSelect
              name="pause"
              label={<FormLabel label="暂停点" help="做完某台之后暂停一下" />}
              options={selectedHosts?.map((host) => ({
                value: host,
                label: host,
              }))}
              placeholder=""
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
        label={<FormLabel label="脚本" help="要执行的脚本内容" />}
        placeholder=""
        fieldProps={{ rows: 10 }}
        rules={[{ required: true, message: "请输入脚本" }]}
      />
      <ProFormText
        name="args"
        label={
          <FormLabel
            label="参数"
            help="附于脚本之后的参数，多个参数之间用双逗号分隔，比如arg1,,arg2,,arg3"
          />
        }
        placeholder=""
      />
      <Button type="primary" htmlType="submit">
        提交
      </Button>
    </Form>
  )
}
