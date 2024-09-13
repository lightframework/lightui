import DiffEditorAdapter from "@/components/diff-editor-adapter"
import { hostCtfConfUpdateApiIbexCtfsHostsByConfsid } from "@/services/ibex/hosts"
import { App, Button, Drawer, Form } from "antd"
import { useId } from "react"

type FormValues = IBEX.HostCtfConfUpdateReq
const FormItem = Form.Item<FormValues>

export interface CategrafConfigDrawerProps {
  open?: boolean
  onClose?: VoidFunction
  ctf?: IBEX.CtfConfInfo
  onFinish?: VoidFunction
}

export default function CategrafConfigDrawer({
  open,
  onClose,
  ctf,
  onFinish,
}: CategrafConfigDrawerProps) {
  const formId = useId()
  const { message } = App.useApp()

  return (
    <Drawer
      open={open}
      title={`配置${ctf?.ctf_type}`}
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
        initialValues={ctf}
        onFinish={async (values) => {
          if (ctf) {
            message.loading("正在下发配置信息，请稍后...")
            await hostCtfConfUpdateApiIbexCtfsHostsByConfsid(
              { id: ctf.id.toString() },
              values,
            )
            message.destroy()
            message.success("监控配置下发成功")
          }
          onClose?.()
          onFinish?.()
        }}
      >
        <FormItem label="配置" name="content" rules={[{ required: true }]}>
          <DiffEditorAdapter
            original={ctf?.content ?? ""}
            height={800}
            language="yaml"
          />
        </FormItem>
      </Form>
    </Drawer>
  )
}
