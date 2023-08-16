import Table, { TableColumns } from '@/components/ui/Table';
import { ActionType } from '@ant-design/pro-components';
import { useRef } from 'react';

type AMInfo = {
  InstanceType?: string;
  InstanceChargeType?: string;
  CpuType?: string;
  Cpu?: number;
  Memory?: string;
  Zone?: string;
  InstanceFamily?: string;
  TypeName?: string;
  Status?: 'SELL' | 'SOLD_OUT';
  Frequency?: string;
  Remark?: string;
};

export default function AvailableMachineTable({
  zoneUid,
}: {
  zoneUid: string;
}) {
  const tableRef = useRef<ActionType>();

  const columns: TableColumns<AMInfo> = [
    {
      title: '实例机型',
      ellipsis: true,
      dataIndex: 'InstanceType',
      key: 'InstanceType',
    },
    {
      title: '计费模式',
      ellipsis: true,
      dataIndex: 'InstanceChargeType',
      key: 'InstanceChargeType',
    },
    {
      title: '处理器型号',
      ellipsis: true,
      dataIndex: 'CpuType',
      key: 'CpuType',
    },
    {
      title: 'CPU核数',
      ellipsis: true,
      dataIndex: 'Cpu',
      key: 'Cpu',
    },
    {
      title: '内存',
      ellipsis: true,
      dataIndex: 'Memory',
      key: 'Memory',
    },
    {
      title: '可用区',
      ellipsis: true,
      dataIndex: 'Zone',
      key: 'Zone',
    },
    {
      title: '机型系列',
      ellipsis: true,
      dataIndex: 'InstanceFamily',
      key: 'InstanceFamily',
    },
    {
      title: '机型名称',
      ellipsis: true,
      dataIndex: 'TypeName',
      key: 'TypeName',
    },
    {
      title: '是否售卖',
      ellipsis: true,
      dataIndex: 'Status',
      key: 'Status',
    },
    {
      title: '备注',
      ellipsis: true,
      dataIndex: 'Remark',
      key: 'Remark',
    },
  ];

  return (
    <Table<AMInfo>
      title="cloud-machines"
      actionRef={tableRef}
      rowKey="Uid"
      columns={columns}
      params={{ zoneUid }}
      request={async () => ({
        msg: 'OK',
        code: 2000,
        data: {
          list: [
            {
              InstanceType: 'InstanceType',
              InstanceChargeType: 'InstanceChargeType',
              CpuType: 'CpuType',
              Cpu: 4,
              Memory: 'Memory',
              Zone: 'Zone',
              InstanceFamily: 'InstanceFamily',
              TypeName: 'TypeName',
              Frequency: 'Frequency',
              Remark: 'Remark',
            },
          ],
          total: 1,
        },
      })}
    />
  );
}
