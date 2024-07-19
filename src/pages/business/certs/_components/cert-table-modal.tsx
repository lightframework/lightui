import { Button, Card, Modal, Timeline } from "antd"
import CertTable from "./cert-table"

export default function CertTableModal({
  open,
  onCancel,
  domain,
}: {
  open: boolean
  onCancel: VoidFunction
  domain?: OPS.DomainInfo
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
        <div className="grid grid-cols-[360px,1fr] gap-2">
          <Card
            size="small"
            title="生命周期"
            className="mt-3"
            classNames={{ body: "max-h-[500px] overflow-auto" }}
          >
            <Timeline
              className="mt-3"
              items={domain.lifeCycle?.map((item) => ({
                key: item,
                children: item,
              }))}
            />
          </Card>
          <CertTable domainId={domain.id} />
        </div>
      )}
    </Modal>
  )
}
