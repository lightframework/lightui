import { nodeRuleCreateApiCmdbNoderules } from "@/services/cmdb/nodeRule"
import { PlusOutlined } from "@ant-design/icons"
import {
  ModalForm,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Button, message } from "antd"
import RuleTipButton from "./rule-tip-button"

export default function NodeRuleCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction
}) {
  const access = useAccess()
  return (
    <ModalForm<CMDB.NodeRuleCreateReq>
      title={
        <div>
          <span>新建目录结构</span>
          <RuleTipButton />
        </div>
      }
      name="node-rule-create"
      width={800}
      trigger={
        <Button
          type="primary"
          disabled={!access.nodeRuleCreateApiCmdbNoderules}
        >
          <PlusOutlined />
          新建
        </Button>
      }
      autoFocusFirstInput
      layout="vertical"
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
      }}
      onFinish={async (formData) => {
        await nodeRuleCreateApiCmdbNoderules(formData)
        message.success("新建成功")
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
