import { useQueryIpsetInfo } from "@/lib/hooks/data"
import { ipsetUpdateApiOpsIpsetsById } from "@/services/ops/ipset"
import { Button, Drawer, Form, Input, message, Radio } from "antd"
import { useId } from "react"

interface FormValues extends Omit<OPS.IpsetUpdateReq, "cidrs"> {
  cidrs: string
}

const FormItem = Form.Item<FormValues>

export interface IpSetUpdateFormDrawerProps {
  ipSet?: OPS.IpsetList
  open: boolean
  onClose: VoidFunction
  onFinish?: VoidFunction
}

export default function IpSetUpdateFormDrawer({
  ipSet,
  open,
  onClose,
  onFinish,
}: IpSetUpdateFormDrawerProps) {
  const id = useId()

  const { data, refetch } = useQueryIpsetInfo(ipSet?.id)

  if (!data) return null

  return (
    <Drawer
      title="编辑IP集"
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
          await ipsetUpdateApiOpsIpsetsById(
            { id: data.id!.toString() },
            {
              ...values,
              cidrs: values.cidrs.split("\n"),
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
            cidrs: data.cidrs?.join("\n"),
          } satisfies Partial<FormValues>
        }
      >
        <FormItem name="name" label="名称" rules={[{ required: true }]}>
          <Input />
        </FormItem>
        <FormItem name="cidrs" label="IP集" rules={[{ required: true }]}>
          <Input.TextArea
            placeholder="支持三种格式：&#10;1.1.1.1&#10;1.1.1.0/24&#10;1.1.1.1-1.1.4.7"
            autoSize={{ minRows: 6, maxRows: 10 }}
          />
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
