import { Button, Modal } from 'antd';
import SubnetTable from './subnet-table';

export default function SubnetTableModal({
  open,
  onCancel,
  vpc,
}: {
  open: boolean;
  onCancel: VoidFunction;
  vpc?: CMDB.VpcInfo;
}) {
  return (
    <Modal
      title={`子网 - ${vpc?.VpcName}`}
      open={open}
      width="80%"
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          返回
        </Button>,
      ]}
    >
      {vpc && <SubnetTable vpcUid={vpc.Uid} />}
    </Modal>
  );
}
