import { useQueryIpSetTagOptions } from "@/lib/hooks/data"
import { ipsetUpdateInfoApiOpsIpsetsByInfoid } from "@/services/ops/ipset"
import { Button, Drawer, Form, message, Radio, Select } from "antd"
import { useId } from "react"

type FormValues = OPS.IpsetUpdateInfoReq
const FormItem = Form.Item<FormValues>

export interface IpSetBaseUpdateFormDrawerProps {
  ipSet?: OPS.IpsetList
  open: boolean
  onClose: VoidFunction
  onFinish?: VoidFunction
}

export default function IpSetBaseUpdateFormDrawer({
  ipSet,
  open,
  onClose,
  onFinish,
}: IpSetBaseUpdateFormDrawerProps) {
  const id = useId()

  const { data: tags } = useQueryIpSetTagOptions()
  const tagOptions = tags?.map((tag) => ({ value: tag, label: tag }))

  return (
    <Drawer
      title={`添加${ipSet?.name}基础信息`}
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
          await ipsetUpdateInfoApiOpsIpsetsByInfoid(
            { id: ipSet!.id.toString() },
            values,
          )
          message.success("更新成功")
          onFinish?.()
          onClose()
        }}
        initialValues={ipSet}
      >
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
      </Form>
    </Drawer>
  )
}
