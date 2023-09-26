import { Button, Modal } from 'antd';
import ZoneInstanceTable from './zone-instance-table';

export default function ZoneInstanceTableModal({
  open,
  onCancel,
  zone,
}: {
  open: boolean;
  onCancel: VoidFunction;
  zone?: CMDB.ZoneInfo;
}) {
  return (
    <Modal
      title={`可用机型 - ${zone?.ZoneName}`}
      open={open}
      width="80%"
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          返回
        </Button>,
      ]}
    >
      {zone && <ZoneInstanceTable zoneUid={zone.Uid} />}
    </Modal>
  );
}
