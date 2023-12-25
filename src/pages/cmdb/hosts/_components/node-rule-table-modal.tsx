import { Button, Modal } from "antd"
import NodeRuleTable from "./node-rule-table"
import RuleTipButton from "./rule-tip-button"

export default function NodeRuleTableModal({
  open,
  onCancel,
}: {
  open: boolean
  onCancel: VoidFunction
}) {
  return (
    <Modal
      title={
        <div>
          <span>目录结构定义</span>
          <RuleTipButton />
        </div>
      }
      open={open}
      width="80%"
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          返回
        </Button>,
      ]}
    >
      <NodeRuleTable />
    </Modal>
  )
}
