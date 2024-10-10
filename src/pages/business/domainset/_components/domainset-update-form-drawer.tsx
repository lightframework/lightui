import { useQueryDomainsetInfo } from "@/lib/hooks/data"
import { domainsetUpdateApiOpsDomainsetsById } from "@/services/ops/domainset"
import { Button, Drawer, Form, Input, message, Radio } from "antd"
import { useId } from "react"

interface FormValues extends Omit<OPS.DomainsetUpdateReq, "domains"> {
  domains: string
}

const FormItem = Form.Item<FormValues>

export interface DomainSetUpdateFormDrawerProps {
  domainSet?: OPS.DomainsetList
  open: boolean
  onClose: VoidFunction
  onFinish?: VoidFunction
}

export default function DomainSetUpdateFormDrawer({
  domainSet,
  open,
  onClose,
  onFinish,
}: DomainSetUpdateFormDrawerProps) {
  const id = useId()

  const { data, refetch } = useQueryDomainsetInfo(domainSet?.id)

  if (!data) return null

  return (
    <Drawer
      title="编辑DomainSet"
      open={open}
      onClose={onClose}
      destroyOnClose
      width={500}
      footer={
        <div className="flex justify-end gap-2">
          <Button onClick={onClose}>取消</Button>
          <Button type="primary" form={id} htmlType="submit">
            确定
          </Button>
        </div>
      }
    >
      <Form<FormValues>
        id={id}
        layout="vertical"
        preserve={false}
        onFinish={async (values) => {
          await domainsetUpdateApiOpsDomainsetsById(
            { id: data.id!.toString() },
            {
              ...values,
              domains: values.domains.split("\n"),
            },
          )
          message.success("更新成功")
          onFinish?.()
          refetch()
          onClose()
        }}
        initialValues={
          {
            ...data,
            domains: data.domains?.join("\n"),
          } satisfies Partial<FormValues>
        }
      >
        <FormItem name="name" label="名称" rules={[{ required: true }]}>
          <Input />
        </FormItem>
        <FormItem name="domains" label="DomainSet" rules={[{ required: true }]}>
          <Input.TextArea autoSize={{ minRows: 6, maxRows: 10 }} />
        </FormItem>
        <FormItem
          name="isArchive"
          label="存档"
          tooltip="提交为新存档"
          rules={[{ required: true, message: "请选择是否存档" }]}
        >
          <Radio.Group
            options={[
              { value: false, label: "否" },
              { value: true, label: "是" },
            ]}
          />
        </FormItem>
        <FormItem name="description" label="备注">
          <Input.TextArea />
        </FormItem>
      </Form>
    </Drawer>
  )
}
