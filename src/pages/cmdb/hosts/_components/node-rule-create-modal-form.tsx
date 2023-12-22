import { MODAL_FORM_WIDTH } from "@/constants/modal"
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

export default function NodeRuleCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction
}) {
  const access = useAccess()
  return (
    <ModalForm<CMDB.NodeRuleCreateReq>
      title="新建目录结构"
      name="node-rule-create"
      width={MODAL_FORM_WIDTH}
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
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        await nodeRuleCreateApiCmdbNoderules(formData)
        message.success("新建成功")
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
