import { useQueryEnvOptions } from "@/lib/hooks/data"
import { auOptionsApiOpsAuOptions, auPushApiOpsAuPush } from "@/services/ops/au"
import {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { useQuery } from "@tanstack/react-query"
import { Button, Drawer, Form, message } from "antd"
import { useId } from "react"

type FormValues = OPS.AuPushReq

export interface AccessUnitPushDrawerProps {
  related: boolean
  open: boolean
  onClose: VoidFunction
  onFinish?: VoidFunction
}

export default function AccessUnitPushDrawer({
  related,
  open,
  onClose,
  onFinish,
}: AccessUnitPushDrawerProps) {
  const formId = useId()

  const { data } = useQueryEnvOptions()
  const envOptions = data?.map((env) => ({
    value: env.Uid,
    label: env.EnvName,
  }))

  const { data: auOptions } = useQuery({
    queryKey: ["accessunit-options", related],
    queryFn: () => auOptionsApiOpsAuOptions({ related }),
    select: (data) =>
      data.data?.list?.map((item) => ({ value: item.id, label: item.name })),
  })

  return (
    <Drawer
      open={open}
      title={related ? "推送RelatedAU" : "推送PrimaryAU"}
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
        onFinish={async (values) => {
          await auPushApiOpsAuPush({ ...values, related, pushType: "push" })
          message.info("正在推送，请查看推送记录或钉钉消息")
          onClose()
          onFinish?.()
        }}
      >
        <ProFormText
          name="title"
          label="标题"
          rules={[{ required: true }]}
          placeholder=""
        />
        <ProFormSelect
          name="envUids"
          label="环境"
          mode="multiple"
          options={envOptions}
          placeholder=""
          rules={[{ required: true, message: "请选择环境" }]}
        />
        <ProFormSelect
          name="auIds"
          label="AccessUnit"
          mode="multiple"
          options={auOptions}
          placeholder=""
          rules={[{ required: true, message: "请选择环境" }]}
        />
        <ProFormTextArea name="description" label="备注" placeholder="" />
      </Form>
    </Drawer>
  )
}
