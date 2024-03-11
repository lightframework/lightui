import { Button, Modal } from "antd"

import IpsetTable from "./ipset-table"

export default function IpsetTableModal({
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
      title={`IP集 - ${env?.EnvName}`}
      open={open}
      width="80%"
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          返回
        </Button>,
      ]}
    >
      {env && <IpsetTable envUid={env.Uid} />}
    </Modal>
  )
}
