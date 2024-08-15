import FormLabel from "@/components/form-label"
import {
  ProFormDependency,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components"
import { EditorView } from "@uiw/react-codemirror"
import { Button, Form, Tag, Tooltip } from "antd"
import FormItem from "antd/es/form/FormItem"
import useFormInstance from "antd/es/form/hooks/useFormInstance"
import { useRef, useState } from "react"
import ScriptInput from "../../_components/script-input"
import HostSearchModal from "./host-search-modal"

type FormValues = IBEX.TaskRecordCreateReq

export interface TaskFormProps {
  initialValues?: Partial<FormValues>
  onFinish?: (values: IBEX.TaskTplCreateReq) => void
  disabledEditScript?: boolean
}

function ScriptFormItem({ disabled }: { disabled?: boolean }) {
  const form = useFormInstance()
  const inputRef = useRef<EditorView>(null)

  const [editable, setEditable] = useState(false)

  const editButton = (
    <Button
      type={editable ? "primary" : "default"}
      onClick={() => {
        setEditable(true)

        const currentValue: string | undefined = form.getFieldValue("script")

        const timer = setInterval(() => {
          inputRef.current?.dispatch({
            selection: { anchor: currentValue?.length ?? 0 },
          })
          inputRef.current?.focus()
          if (inputRef.current?.hasFocus) clearInterval(timer)
        }, 300)
      }}
      disabled={disabled}
      size="small"
    >
      编辑
    </Button>
  )

  return (
    <FormItem
      name="script"
      label={
        <div className="flex items-center gap-2">
          <FormLabel label="Script" help={"要执行的脚本内容"} />
          {disabled ? (
            <Tooltip title="standard脚本禁止编辑">{editButton}</Tooltip>
          ) : (
            editButton
          )}
        </div>
      }
      rules={[{ required: true, message: "请输入Script" }]}
    >
      <ScriptInput inputRef={inputRef} disabled={!editable} />
    </FormItem>
  )
}

export default function TaskForm({
  initialValues = { tolerance: 0, batch: 0, timeout: 30 },
  onFinish,
  disabledEditScript,
}: TaskFormProps) {
  const [openHostSearchModal, setOpenHostSearchModal] = useState(false)

  console.log(initialValues)

  return (
    <Form<FormValues>
      layout="vertical"
      initialValues={initialValues}
      onFinish={onFinish}
      scrollToFirstError
    >
      <ProFormText
        name="title"
        label={<FormLabel label="Title" help="标题，说明这个任务的作用" />}
        placeholder=""
        rules={[{ required: true, message: "请输入Title" }]}
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
      <ScriptFormItem disabled={disabledEditScript} />
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
