import { MODAL_FORM_WIDTH } from "@/constants/modal"
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
      width={MODAL_FORM_WIDTH}
      autoFocusFirstInput
      layout="horizontal"
      open={open}
      initialValues={nodeRule}
      modalProps={{
        destroyOnClose: true,
        onCancel,
        maskClosable: false,
      }}
      labelCol={{ span: 4 }}
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
        label="RuleName"
        name="RuleName"
        placeholder=""
        rules={[{ required: true, message: "请输入RuleName" }]}
      />
      <ProFormText
        label="NodeRoot"
        name="NodeRoot"
        placeholder=""
        rules={[{ required: true, message: "请输入NodeRoot" }]}
      />
      <ProFormSwitch
        label="IsSystemProvided"
        name="IsSystemProvided"
        initialValue={false}
      />
      <ProFormTextArea
        label="RuleDefinition"
        name="RuleDefinition"
        placeholder=""
        rules={[{ required: true, message: "请输入RuleDefinition" }]}
      />
    </ModalForm>
  )
}
