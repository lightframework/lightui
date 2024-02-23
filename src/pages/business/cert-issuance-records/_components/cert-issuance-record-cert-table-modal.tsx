import { Button, Modal } from "antd"
import CertIssuanceRecordCertTable from "./cert-issuance-record-cert-table"

export default function CertIssuanceRecordCertTableModal({
  open,
  onCancel,
  record,
}: {
  open: boolean
  onCancel: VoidFunction
  record?: OPS.CertRecordList
}) {
  return (
    <Modal
      title={`下发记录 - ${record?.title}`}
      open={open}
      width="80%"
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          返回
        </Button>,
      ]}
    >
      {record && <CertIssuanceRecordCertTable recordId={record.id} />}
    </Modal>
  )
}
