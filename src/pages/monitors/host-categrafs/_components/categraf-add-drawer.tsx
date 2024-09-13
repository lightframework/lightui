import DiffEditorAdapter from "@/components/diff-editor-adapter"
import { hostCtfConfCreateApiIbexCtfsHostsByUid } from "@/services/ibex/hosts"
import { App, Button, Drawer, Form } from "antd"
import useFormInstance from "antd/es/form/hooks/useFormInstance"
import { useEffect, useId, useState } from "react"
import CtfTemplateSelect from "./ctf-template-select"

function CtfTypeSelect({
  onContentSelect,
}: {
  onContentSelect?: (val: string) => void
}) {
  const form = useFormInstance()

  return (
    <CtfTemplateSelect
      onSelect={(tpl) => {
        form.setFieldsValue(tpl)
        onContentSelect?.(tpl.content)
      }}
    />
  )
}

type FormValues = IBEX.HostCtfConfCreateReq
const FormItem = Form.Item<FormValues>

export interface CategrafAddDrawerProps {
  hostUid: string
  open?: boolean
  onClose?: VoidFunction
  onFinish?: VoidFunction
}

export default function CategrafAddDrawer({
  hostUid,
  open,
  onClose,
  onFinish,
}: CategrafAddDrawerProps) {
  const formId = useId()
  const { message } = App.useApp()

  const [original, setOriginal] = useState("")

  useEffect(() => {
    if (!open) {
      setOriginal("")
    }
  }, [open])

  return (
    <Drawer
      open={open}
      title="添加监控"
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
        onFinish={async (values) => {
          message.loading("正在添加监控，请稍后...")
          await hostCtfConfCreateApiIbexCtfsHostsByUid({ uid: hostUid }, values)
          message.destroy()
          message.success("添加成功")

          onClose?.()
          onFinish?.()
        }}
      >
        <FormItem
          label="监控项配置模版"
          name="ctf_type"
          rules={[{ required: true, message: "请选择监控项配置模版" }]}
        >
          <CtfTypeSelect onContentSelect={setOriginal} />
        </FormItem>
        <FormItem label="配置" name="content" rules={[{ required: true }]}>
          <DiffEditorAdapter original={original} height={600} language="yaml" />
        </FormItem>
      </Form>
    </Drawer>
  )
}
