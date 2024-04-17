import { MODAL_FORM_WIDTH } from "@/constants/modal"
import { AlertAggrViewCreateApiArgusAlertAggrViews } from "@/services/argus/alertAggrView"
import {
  ModalForm,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Button, message } from "antd"

export default function AggrViewCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction
}) {
  const access = useAccess()
  return (
    <ModalForm<ARGUS.AlertAggrViewCreateReq>
      title="创建聚合规则"
      name="aggr-view-create"
      width={MODAL_FORM_WIDTH}
      trigger={
        <Button
          type="link"
          disabled={!access["AlertAggrViewCreateApiArgusAlert-aggr-views"]}
        >
          新建
        </Button>
      }
      autoFocusFirstInput
      layout="vertical"
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        await AlertAggrViewCreateApiArgusAlertAggrViews({
          ...formData,
          rule: (formData.rule as unknown as string[]).join("::"),
        })
        message.success("创建成功")
        onFinish?.()
        return true
      }}
    >
      <ProFormText
        label="名称"
        name="name"
        placeholder=""
        rules={[{ required: true, message: "请输入聚合规则名称" }]}
      />
      <ProFormSelect
        label="规则"
        name="rule"
        placeholder=""
        mode="multiple"
        rules={[{ required: true, message: "请选择聚合规则" }]}
        options={[
          {
            label: "告警来源",
            value: "field:source",
          },
          {
            label: "业务组 id",
            value: "field:group_id",
          },
          {
            label: "业务组名称",
            value: "field:group_name",
          },
          {
            label: "告警级别",
            value: "field:severity",
          },
          {
            label: "告警规则 id",
            value: "field:rule_id",
          },
          {
            label: "告警规则名称",
            value: "field:rule_name",
          },
          {
            label: "告警目标",
            value: "field:target_ident",
          },
        ]}
      />
      <ProFormSwitch
        label="是否公开"
        name="cate"
        rules={[{ required: true, message: "请选择是否公开" }]}
        transform={(value) => (value ? 1 : 0)}
      />
    </ModalForm>
  )
}
