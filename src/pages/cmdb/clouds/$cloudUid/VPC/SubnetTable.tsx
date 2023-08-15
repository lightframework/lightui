import LightTable, { LightColumnsType } from '@/components/ui/LightTable';

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

export default function SubnetTable({ vpcUid }: { vpcUid: string }) {
  const columns: LightColumnsType<AMInfo> = [
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
      dataIndex: '可用区',
      key: '可用区',
    },
    {
      title: '机型系列',
      ellipsis: true,
      dataIndex: 'InstanceFamily',
      key: 'InstanceFamily',
    },
    {
      title: 'TypeName',
      ellipsis: true,
      dataIndex: '机型名称',
      key: '机型名称',
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
    <LightTable<AMInfo>
      rowKey="Uid"
      columns={columns}
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
