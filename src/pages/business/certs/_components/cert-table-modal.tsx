import { Button, Modal } from "antd"
import CertTable from "./cert-table"

export default function CertTableModal({
  open,
  onCancel,
  domain,
  onFinish,
}: {
  open: boolean
  onCancel: VoidFunction
  domain?: OPS.DomainInfo
  onFinish?: VoidFunction
}) {
  return (
    <Modal
      title="证书列表"
      open={open}
      width="80%"
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          返回
        </Button>,
      ]}
    >
      {domain && (
        <CertTable
          domainId={domain.id}
          certs={domain.certs}
          onFinish={onFinish}
        />
      )}
    </Modal>
  )
}
