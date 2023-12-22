import { Button, Modal } from "antd"
import NodeRuleTable from "./node-rule-table"

export default function NodeRuleTableModal({
  open,
  onCancel,
}: {
  open: boolean
  onCancel: VoidFunction
}) {
  return (
    <Modal
      title="目录结构定义"
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
