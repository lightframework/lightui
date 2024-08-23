import {
  ctfTplCreateApiIbexCtfs,
  ctfTplUpdateApiIbexCtfsById,
} from "@/services/ibex/tpls"
import { ProFormDependency } from "@ant-design/pro-components"
import Editor from "@monaco-editor/react"
import { Button, Drawer, Form, Input, message, Typography } from "antd"
import { useId } from "react"

type FormValues = IBEX.CtfTplCreateReq
const FormItem = Form.Item<FormValues>

export interface CategrafTplFormDrawerProps {
  open: boolean
  onClose: VoidFunction
  onFinish?: VoidFunction
  ctf?: IBEX.CtfTplInfo
}

export default function CategrafTplFormDrawer({
  open,
  onClose,
  onFinish,
  ctf,
}: CategrafTplFormDrawerProps) {
  const formId = useId()

  return (
    <Drawer
      open={open}
      title={ctf ? "编辑监控项配置" : "添加监控项配置"}
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
        initialValues={
          ctf ??
          ({
            tpl_name: "default",
          } satisfies Partial<FormValues>)
        }
        onFinish={async (values) => {
          if (ctf) {
            await ctfTplUpdateApiIbexCtfsById({ id: ctf.id.toString() }, values)
            message.success("编辑成功")
          } else {
            await ctfTplCreateApiIbexCtfs(values)
            message.success("添加成功")
          }
          onClose()
          onFinish?.()
        }}
      >
        <FormItem name="ctf_type" label="监控项" rules={[{ required: true }]}>
          <Input />
        </FormItem>
        <FormItem name="tpl_name" label="配置名称" rules={[{ required: true }]}>
          <Input />
        </FormItem>
        <ProFormDependency name={["content"]}>
          {({ content }) => (
            <FormItem
              name="content"
              label={
                <div className="flex items-center gap-1">
                  配置
                  <Typography.Text copyable={{ text: content }} />
                </div>
              }
              rules={[{ required: true }]}
            >
              <Editor height={400} language="yaml" theme="vs-dark" />
            </FormItem>
          )}
        </ProFormDependency>
        <FormItem name="remark" label="备注">
          <Input.TextArea />
        </FormItem>
      </Form>
    </Drawer>
  )
}
