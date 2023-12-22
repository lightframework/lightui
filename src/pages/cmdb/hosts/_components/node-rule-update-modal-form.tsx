import { nodeRuleUpdateApiCmdbNoderulesByUid } from "@/services/cmdb/nodeRule"
import {
  ModalForm,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { message } from "antd"

export default function NodeRuleUpdateModalForm({
  open,
  onCancel,
  nodeRule,
  onFinish,
}: {
  open: boolean
  onCancel: VoidFunction
  nodeRule?: CMDB.NodeRuleOption
  onFinish?: VoidFunction
}) {
  return (
    <ModalForm<CMDB.NodeRuleOption>
      title="更新目录结构"
      name="node-rule-update"
      width={800}
      autoFocusFirstInput
      layout="vertical"
      open={open}
      initialValues={nodeRule}
      modalProps={{
        destroyOnClose: true,
        onCancel,
        maskClosable: false,
      }}
      onFinish={async (formData) => {
        if (!nodeRule) return false
        await nodeRuleUpdateApiCmdbNoderulesByUid(
          { uid: nodeRule.Uid },
          formData,
        )
        message.success("更新成功")
        onCancel()
        onFinish?.()
        return true
      }}
    >
      <ProFormText
        label="规则名称"
        name="RuleName"
        placeholder=""
        rules={[{ required: true, message: "请输入规则名称" }]}
      />
      <ProFormText
        label="根节点"
        name="NodeRoot"
        placeholder=""
        rules={[{ required: true, message: "请输入根节点" }]}
      />
      <ProFormSwitch
        label="系统自定义"
        name="IsSystemProvided"
        initialValue={false}
      />
      <ProFormTextArea
        label="规则定义"
        name="RuleDefinition"
        placeholder=""
        rules={[{ required: true, message: "请输入规则定义" }]}
      />
    </ModalForm>
  )
}
