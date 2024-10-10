import { useQueryIpSetTagOptions } from "@/lib/hooks/data"
import { ipsetCreateApiOpsIpsets } from "@/services/ops/ipset"
import { Button, Drawer, Form, Input, message, Radio, Select } from "antd"
import { useId } from "react"

interface FormValues extends Omit<OPS.IpsetCreateReq, "cidrs"> {
  cidrs: string
}

const FormItem = Form.Item<FormValues>

export interface IpSetCreateFromDrawerProps {
  open: boolean
  onClose: VoidFunction
  onFinish?: VoidFunction
}

export default function IpSetCreateFromDrawer({
  open,
  onClose,
  onFinish,
}: IpSetCreateFromDrawerProps) {
  const id = useId()

  const { data: tags } = useQueryIpSetTagOptions()
  const tagOptions = tags?.map((tag) => ({ value: tag, label: tag }))

  return (
    <Drawer
      title="添加IPSet"
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
          await ipsetCreateApiOpsIpsets({
            ...values,
            cidrs: values.cidrs.split("\n"),
          })
          message.success("添加成功")
          onFinish?.()
          onClose()
        }}
        initialValues={
          {
            overWall: 3,
            autoUpdate: 3,
            updateCycle: "No",
            isArchive: false,
            officialSupportApi: 3,
          } satisfies Partial<FormValues>
        }
      >
        <FormItem name="name" label="名称" rules={[{ required: true }]}>
          <Input />
        </FormItem>
        <FormItem
          name="overWall"
          label="FQ"
          rules={[{ required: true, message: "请选择" }]}
        >
          <Radio.Group
            options={[
              { value: 1, label: "不支持" },
              { value: 2, label: "支持" },
              { value: 3, label: "无" },
            ]}
          />
        </FormItem>
        <FormItem
          name="autoUpdate"
          label="自动更新"
          rules={[{ required: true, message: "请选择" }]}
        >
          <Radio.Group
            options={[
              { value: 1, label: "不支持" },
              { value: 2, label: "支持" },
              { value: 3, label: "无" },
            ]}
          />
        </FormItem>
        <FormItem
          name="updateCycle"
          label="更新周期"
          rules={[{ required: true, message: "请选择" }]}
        >
          <Select
            allowClear={false}
            options={[
              { value: "No", label: "无" },
              { value: "OfficialDetection", label: "官网探测" },
              { value: "Day", label: "天" },
              { value: "Week", label: "周" },
              { value: "Month", label: "月" },
              { value: "Year", label: "年" },
            ]}
          />
        </FormItem>
        <FormItem
          name="getWay"
          label="获取方式"
          rules={[{ required: true, message: "请选择" }]}
        >
          <Select
            allowClear={false}
            mode="multiple"
            options={[
              { value: "OfficialApi", label: "官网API" },
              { value: "OfficialWeb", label: "官网网页" },
              { value: "WayGet", label: "渠道获取" },
              { value: "WebGrab", label: "网页抓取" },
              { value: "GrabBag", label: "抓包获取" },
              { value: "IPDataBase", label: "IP数据库" },
            ]}
          />
        </FormItem>
        <FormItem
          name="officialSupportApi"
          label="官网支持API"
          rules={[{ required: true, message: "请选择" }]}
        >
          <Radio.Group
            options={[
              { value: 1, label: "不支持" },
              { value: 2, label: "支持" },
              { value: 3, label: "无" },
            ]}
          />
        </FormItem>
        <FormItem name="tags" label="标签" tooltip="支持自定义">
          <Select mode="tags" showSearch options={tagOptions} />
        </FormItem>
        <FormItem name="cidrs" label="IPSet" rules={[{ required: true }]}>
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
