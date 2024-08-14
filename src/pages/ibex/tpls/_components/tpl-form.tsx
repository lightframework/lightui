import FormLabel from "@/components/form-label"
import {
  ProFormDependency,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components"
import { Button, Form, Tag } from "antd"
import FormItem from "antd/es/form/FormItem"
import { useState } from "react"
import ScriptInput from "../../_components/script-input"
import HostSearchModal from "../../tasks/_components/host-search-modal"

type FormValues = IBEX.TaskTplCreateReq

export interface TplFormProps {
  initialValues?: Partial<FormValues>
  onFinish?: (values: IBEX.TaskTplCreateReq) => void
}

export default function TplForm({
  initialValues = { tolerance: 0, batch: 0, timeout: 30, category: "standard" },
  onFinish,
}: TplFormProps) {
  const [openHostSearchModal, setOpenHostSearchModal] = useState(false)

  return (
    <Form<FormValues>
      layout="vertical"
      initialValues={initialValues}
      onFinish={onFinish}
      scrollToFirstError
    >
      <ProFormText
        name="title"
        label={<FormLabel label="Title" help="标题，说明这个脚本的作用" />}
        placeholder=""
        rules={[{ required: true, message: "请输入Title" }]}
      />
      <ProFormRadio.Group
        name="category"
        label={
          <FormLabel
            label="Category"
            help="类型，standard类型的脚本，创建任务时不允许编辑脚本内容"
          />
        }
        options={["standard", "custom"]}
        rules={[{ required: true, message: "请选择Category" }]}
      />
      <ProFormSelect
        name="tags"
        label={<FormLabel label="Tags" help="标签，用于分类" />}
        placeholder=""
        mode="tags"
      />
      <ProFormText
        name="account"
        label={
          <FormLabel
            label="Account"
            help="执行账号，慎用root，除非要代表操作系统意志"
          />
        }
        placeholder=""
        rules={[{ required: true, message: "请输入Account" }]}
      />
      <ProFormDigit
        name="batch"
        label={
          <FormLabel
            label="Batch"
            help="并发度，默认是0，表示全并发执行，1表示顺序执行，2表示每次执行两台"
          />
        }
        placeholder=""
        min={0}
        rules={[{ required: true, message: "请输入Batch" }]}
        fieldProps={{
          style: { width: "auto" },
        }}
      />
      <ProFormDigit
        name="tolerance"
        label={
          <FormLabel
            label="Tolerance"
            help="容忍几台机器失败，默认是0，表示一台都不容忍，只要失败了，立即暂停"
          />
        }
        placeholder=""
        min={0}
        rules={[{ required: true, message: "请输入Tolerance" }]}
        fieldProps={{
          style: { width: "auto" },
        }}
      />
      <ProFormDigit
        name="timeout"
        label={
          <FormLabel label="Timeout" help="单机脚本执行的超时时间，单位是秒" />
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
            label="Hosts"
            help={
              <>
                <span>要执行的机器列表</span>
                <Button
                  type="link"
                  size="small"
                  onClick={() => setOpenHostSearchModal(true)}
                >
                  筛选主机
                </Button>
                <Tag style={{ fontSize: 12 }} color="orange">
                  前置依赖：目标主机上需要部署 categraf，并将 ibex 配置 enable
                  设置为 true
                </Tag>
              </>
            }
          />
        }
        mode="tags"
        fieldProps={{ searchValue: "" }}
        placeholder=""
        rules={[{ required: true, message: "请选择Hosts" }]}
      />
      <HostSearchModal
        open={openHostSearchModal}
        onClose={() => setOpenHostSearchModal(false)}
      />
      <ProFormDependency name={["hosts"]}>
        {({ hosts }) => {
          const selectedHosts = hosts as string[] | undefined

          return (
            <ProFormSelect
              name="pause"
              label={
                <FormLabel label="Pause" help="暂停点，做完某台之后暂停一下" />
              }
              options={selectedHosts?.map((host) => ({
                value: host,
                label: host,
              }))}
              placeholder=""
              rules={[
                {
                  validator: (_, value) => {
                    if (value && !selectedHosts?.includes(value)) {
                      return Promise.reject("该机器不存在于Hosts")
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
      <FormItem
        name="script"
        label={<FormLabel label="Script" help="要执行的脚本内容" />}
        rules={[{ required: true, message: "请输入Script" }]}
      >
        <ScriptInput />
      </FormItem>
      <ProFormText
        name="args"
        label={
          <FormLabel
            label="Args"
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
