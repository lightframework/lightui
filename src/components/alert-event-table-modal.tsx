import { Button, Modal } from "antd"
import AlertEventTable from "./alert-event-table"

export default function AlertEventTableModal({
  open,
  onCancel,
  alert,
}: {
  open: boolean
  onCancel: VoidFunction
  alert?: ARGUS.Alert
}) {
  return (
    <Modal
      title="事件列表"
      open={open}
      width="80%"
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          返回
        </Button>,
      ]}
    >
      {alert && <AlertEventTable selectedAlert={alert} />}
    </Modal>
  )
}
