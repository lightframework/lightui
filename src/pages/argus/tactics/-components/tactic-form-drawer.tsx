import { entryGetByNameApiArgusDictsEntries } from "@/services/argus/dict"
import {
  TacticCreateApiArgusTactics,
  tacticUpdateApiArgusTacticsById,
} from "@/services/argus/tactic"
import { useQuery } from "@tanstack/react-query"
import {
  Alert,
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  message,
} from "antd"
import { useEffect, useState } from "react"
import FieldSet from "./fieldset"
import TacticFormConditionList from "./tactic-form-condition-list"
import TacticFormLinkList from "./tactic-form-link-list"

type FieldType = Partial<ARGUS.TacticCreateReq>

function AggrField() {
  const { data, isFetching } = useQuery({
    queryKey: ["dict-entries", "alert_tag_key"],
    queryFn: () =>
      entryGetByNameApiArgusDictsEntries({
        name: "alert_tag_key",
      }).then((res) => res.data?.items ?? []),
  })

  return (
    <Form.Item<FieldType> label="聚合维度（支持自定义）" name="aggr_fields">
      <Select
        loading={isFetching}
        allowClear
        showSearch
        mode="tags"
        options={data?.map((item) => ({ value: item.key, label: item.value }))}
      />
    </Form.Item>
  )
}

export interface TacticFormDrawerProps {
  open?: boolean
  onClose?: VoidFunction
  type?: "create" | "edit" | "copy"
  tactic?: ARGUS.TacticInfo
  onFinish?: VoidFunction
}

export default function TacticFormDrawer({
  open,
  onClose,
  type,
  tactic,
  onFinish,
}: TacticFormDrawerProps) {
  const formId = "argus-tactic-form"
  const [faultGroup, setFaultGroup] = useState<"all" | "part">()

  useEffect(() => {
    setFaultGroup(
      tactic?.conditions && tactic.conditions.length > 0 ? "part" : "all",
    )
  }, [tactic])

  const { data: severityOptions } = useQuery({
    queryKey: ["dict-entries", "incident_severity_level"],
    queryFn: () =>
      entryGetByNameApiArgusDictsEntries({
        name: "incident_severity_level",
      }).then((res) => res.data?.items ?? []),
    enabled: open,
  })

  return (
    <Drawer
      open={open}
      onClose={onClose}
      size="large"
      destroyOnClose
      title={
        type === "create"
          ? "新增策略"
          : type === "copy"
            ? "复制策略"
            : "编辑策略"
      }
      footer={
        <div className="flex w-full justify-end gap-2 py-2">
          <Button onClick={onClose}>取消</Button>
          <Button type="primary" htmlType="submit" form={formId}>
            保存
          </Button>
        </div>
      }
    >
      <Alert
        message="说明提示"
        description="您可以设定多个分派策略，新故障触发后将依次匹配，匹配到即进行人员分派，并停止匹配。"
        closable
      />
      <Form<ARGUS.TacticCreateReq>
        id={formId}
        onFinish={async (values) => {
          if (type === "edit") {
            await tacticUpdateApiArgusTacticsById(
              { id: String(tactic!.id) },
              values,
            )
            message.success("更新成功")
          } else {
            await TacticCreateApiArgusTactics(values)
            message.success("新增成功")
          }
          onClose?.()
          onFinish?.()
        }}
        layout="vertical"
        initialValues={tactic}
      >
        <FieldSet index={1} title="基础信息">
          <Form.Item<FieldType>
            name="name"
            label="策略名称"
            rules={[
              {
                required: true,
                message: "请输入策略名称",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            name="rank"
            label="分派顺序"
            rules={[
              {
                required: true,
                message: "请输入分派顺序",
              },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item<FieldType>
            name="enabled"
            label="可用"
            initialValue={true}
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </FieldSet>

        <FieldSet index={2} title="策略配置" className="space-y-2">
          <div>在全部时间内，</div>
          <div>
            针对
            <Radio.Group
              value={faultGroup}
              onChange={(e) => setFaultGroup(e.target.value)}
              className="mx-2"
            >
              <Radio.Button value="all">全部</Radio.Button>
              <Radio.Button value="part">部分</Radio.Button>
            </Radio.Group>
            故障{faultGroup === "all" ? "。" : "，"}
          </div>
          {faultGroup === "part" && <TacticFormConditionList />}
          <AggrField />

          <div>
            当活跃告警超过
            <Form.Item name="upgrade_threshold" noStyle>
              <InputNumber min={1} className="mx-2" />
            </Form.Item>
            个时，故障升级至
            <Form.Item name="upgrade_to" noStyle>
              <Select
                options={severityOptions?.map((item) => ({
                  value: Number(item.key),
                  label: item.value,
                }))}
                className="mx-2"
                style={{ width: 80 }}
              />
            </Form.Item>
            。
          </div>
        </FieldSet>

        <FieldSet index={3} title="分派配置">
          <TacticFormLinkList />
        </FieldSet>
      </Form>
    </Drawer>
  )
}
