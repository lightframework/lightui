import { taskReadOneApiOpsByTasksidbills } from '@/services/ops/task';
import { useQuery } from '@tanstack/react-query';
import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import TaskBillInfo from './TaskBillInfo';
import TaskBillTable from './TaskBillTable';

type AppOption = {
  App: string;
  Version: string;
};

type DataDisk = {
  DiskSize: number;
  DiskType: string;
};

type SystemDisk = {
  DiskSize: number;
  DiskType: string;
};

type VpcSubnet = {
  SubnetId: string;
  VpcId: string;
};

type CloudTagOption = {
  Key: string;
  Value: string;
};

type Instance = {
  Cloud: string;
  CloudTags?: CloudTagOption[];
  Cpu: number;
  DataDisks: DataDisk[];
  ImageId: string;
  InstanceChargePeriod: number;
  InstanceChargeRenewFlag: string;
  InstanceChargeType: string;
  InstanceType: string;
  InternetMaxBandwidthOut: number;
  Memory: number;
  Password: string;
  Region: string;
  SecurityGroupIds: string[];
  SystemDisk: SystemDisk;
  VpcSubnetIds: VpcSubnet[];
  Zone: string;
};

export type Host = {
  Apps?: AppOption[];
  Count: number;
  Description?: string;
  EnvId: string;
  HostType: string;
  Instance: Instance;
  OpsIds: string[];
  Project: string;
};

export default function TaskInfoModal({
  selectedTaskId,
  onClose,
}: {
  selectedTaskId?: number;
  onClose: VoidFunction;
}) {
  const { data } = useQuery({
    queryKey: ['task', selectedTaskId],
    queryFn: () =>
      taskReadOneApiOpsByTasksidbills({ id: String(selectedTaskId) }),
    enabled: selectedTaskId !== undefined,
  });

  const task = data?.data?.task;
  const bills = data?.data?.bills;

  const [selectedBill, setSelectedBill] = useState<
    OPS.TaskBillInfo | undefined
  >(undefined);

  useEffect(() => {
    if (bills && bills.length > 0) {
      setSelectedBill(bills[0]);
    }
  }, [bills]);

  const onCancel = () => {
    setSelectedBill(undefined);
    onClose();
  };

  return (
    <Modal
      className="task-info-modal overflow-auto"
      open={selectedTaskId !== undefined}
      title={`任务 ${task?.taskName} 详情`}
      width="80%"
      bodyStyle={{
        paddingTop: 12,
        overflowX: 'auto',
        overflowY: 'hidden',
      }}
      onCancel={onCancel}
      footer={[
        <Button key="back" type="default" onClick={onCancel}>
          返回
        </Button>,
      ]}
    >
      <div className="flex max-h-[calc(100vh-200px)] gap-3">
        <TaskBillTable
          bills={bills ?? []}
          onSelect={setSelectedBill}
          selectedBillUuid={selectedBill?.uuid}
        />
        {selectedBill && <TaskBillInfo bill={selectedBill} />}
      </div>
    </Modal>
  );
}
