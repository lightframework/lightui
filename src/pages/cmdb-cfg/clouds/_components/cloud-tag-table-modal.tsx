import { Button, Modal } from "antd"
import CloudTagTable from "./cloud-tag-table"

export default function CloudTagTableModal({
  open,
  onCancel,
  cloud,
}: {
  open: boolean
  onCancel: VoidFunction
  cloud?: CMDB.CloudInfo
}) {
  return (
    <Modal
      title={`云商标签 - ${cloud?.CloudName}`}
      open={open}
      width="80%"
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          返回
        </Button>,
      ]}
    >
      {cloud && <CloudTagTable cloudUid={cloud.Uid} />}
    </Modal>
  )
}
