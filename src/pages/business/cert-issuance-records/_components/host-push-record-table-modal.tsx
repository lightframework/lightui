import { Button, Modal } from "antd"
import HostPushRecordTable from "./host-push-record-table"

export default function HostPushRecordTableModal({
  open,
  onCancel,
  certIssuanceRecordCert,
}: {
  open: boolean
  onCancel: VoidFunction
  certIssuanceRecordCert?: OPS.CertRecordCert
}) {
  return (
    <Modal
      title={`下发主机 - ${certIssuanceRecordCert?.certName}`}
      open={open}
      width="80%"
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          返回
        </Button>,
      ]}
    >
      {certIssuanceRecordCert && (
        <HostPushRecordTable data={certIssuanceRecordCert.hostPushRecords} />
      )}
    </Modal>
  )
}
