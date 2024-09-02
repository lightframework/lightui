import DiffEditorAdapter from "@/components/diff-editor-adapter"
import { hostCtfInitApiIbexCtfsHostsByUidinit } from "@/services/ibex/hosts"
import { CloseOutlined, PlusOutlined } from "@ant-design/icons"
import { Alert, Button, Drawer, Form, message } from "antd"
import FormItem from "antd/es/form/FormItem"
import useFormInstance from "antd/es/form/hooks/useFormInstance"
import { useId, useState } from "react"
import CtfTemplateSelect from "./ctf-template-select"

function CtfTypeSelect({
  name,
  onContentSelect,
}: {
  name: number
  onContentSelect?: (val: string) => void
}) {
  const form = useFormInstance()

  return (
    <CtfTemplateSelect
      onSelect={(tpl) => {
        form.setFieldValue(["confs", name, "ctf_type"], tpl.ctf_type)
        form.setFieldValue(["confs", name, "content"], tpl.content)
        form.validateFields()
        onContentSelect?.(tpl.content)
      }}
      defaultSelectConfig={name === 0}
    />
  )
}

function CtfConfFormItems({
  name,
  remove,
}: {
  name: number
  remove: VoidFunction
}) {
  const [original, setOriginal] = useState("")

  return (
    <div>
      <div className="mb-3 flex items-center gap-2 text-sm">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#3f56e2] text-white">
          {name + 1}
        </span>
        <FormItem<IBEX.HostCtfInitReq>
          noStyle
          shouldUpdate={(prev, curr) =>
            prev.confs.at(name)?.ctf_type !== curr.confs.at(name)?.ctf_type
          }
        >
          {({ getFieldValue }) => {
            const ctfType = getFieldValue(["confs", name, "ctf_type"])
            return (
              <>
                <span className="font-semibold">{ctfType}</span>
                {ctfType !== "config" && (
                  <Button
                    danger
                    type="text"
                    icon={<CloseOutlined />}
                    onClick={remove}
                  />
                )}
              </>
            )
          }}
        </FormItem>
      </div>
      <Form.Item
        label="监控项配置模版"
        name={[name, "ctf_type"]}
        rules={[
          { required: true, message: "请选择监控项配置模版" },
          ({ getFieldValue }) => ({
            validator: (_, value) => {
              const types =
                (
                  getFieldValue("confs") as
                    | IBEX.HostCtfInitReq["confs"]
                    | undefined
                )?.map((conf) => conf.ctf_type) ?? []

              if (
                types.reduce(
                  (prev, curr) => (curr === value ? prev + 1 : prev),
                  0,
                ) > 1
              ) {
                return Promise.reject("不能选择重复的监控")
              } else {
                return Promise.resolve()
              }
            },
          }),
        ]}
      >
        <CtfTypeSelect name={name} onContentSelect={setOriginal} />
      </Form.Item>
      <Form.Item
        label="配置"
        name={[name, "content"]}
        rules={[{ required: true }]}
      >
        <DiffEditorAdapter original={original} height={120} language="yaml" />
      </Form.Item>
    </div>
  )
}

export interface HostInstallCategrafDrawerProps {
  open?: boolean
  onClose?: VoidFunction
  onFinish?: VoidFunction
  host?: CMDB.HostInfo
}

export default function HostInstallCategrafDrawer({
  host,
  open,
  onClose,
  onFinish,
}: HostInstallCategrafDrawerProps) {
  const formId = useId()

  return (
    <Drawer
      open={open}
      title={`${host?.HostName} - 安装监控`}
      onClose={onClose}
      destroyOnClose
      width="80dvw"
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
      <Form
        id={formId}
        layout="vertical"
        initialValues={{ confs: [{ ctf_type: "config" }] }}
        onFinish={async (values) => {
          if (host) {
            await hostCtfInitApiIbexCtfsHostsByUidinit(
              { uid: host.Uid },
              values,
            )
            message.success("添加成功")
          }

          onClose?.()
          onFinish?.()
        }}
      >
        <Alert message="必须选择安装config监控" closable className="mb-3" />
        <Form.List name="confs">
          {(fields, { add, remove }, { errors }) => {
            return (
              <div>
                {fields.map(({ key, name }) => (
                  <CtfConfFormItems
                    key={key}
                    name={name}
                    remove={() => remove(name)}
                  />
                ))}
                <Form.ErrorList errors={errors} />
                <Button
                  icon={<PlusOutlined />}
                  type="dashed"
                  onClick={() => add()}
                  block
                >
                  添加监控项
                </Button>
              </div>
            )
          }}
        </Form.List>
      </Form>
    </Drawer>
  )
}
