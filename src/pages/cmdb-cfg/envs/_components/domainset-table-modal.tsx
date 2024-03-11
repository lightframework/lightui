import { Button, Modal } from "antd"

import DomainsetTable from "./domainset-table"

export default function DomainsetTableModal({
  open,
  onCancel,
  env,
}: {
  open: boolean
  onCancel: VoidFunction
  env?: CMDB.EnvInfo
}) {
  return (
    <Modal
      title={`域名集 - ${env?.EnvName}`}
      open={open}
      width="80%"
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          返回
        </Button>,
      ]}
    >
      {env && <DomainsetTable envUid={env.Uid} />}
    </Modal>
  )
}
