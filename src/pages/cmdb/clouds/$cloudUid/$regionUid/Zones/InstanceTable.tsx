import Table, { TableColumns, TableColumnsConfig } from '@/components/ui/Table';
import { TABLE_DATETIME_WIDTH, TABLE_USERNAME_WIDTH } from '@/constants/table';
import { instanceTypeQuotaItemPageListApiCmdbInstypes } from '@/services/cmdb/instype';
import { sorter } from '@/utils/sorter';
import { ActionType } from '@ant-design/pro-components';
import { Badge } from 'antd';
import { useRef } from 'react';

export default function InstanceTable({ zoneUid }: { zoneUid: string }) {
  const tableRef = useRef<ActionType>();

  const columnsConfig: TableColumnsConfig<API.InstanceTypeQuotaItemInfo> = {
    Uid: { show: false },
    createAt: { show: false },
    createBy: { show: false },
    updateAt: { show: false },
    updateBy: { show: false },
    Zone: { show: false },
  };

  const columns: TableColumns<API.InstanceTypeQuotaItemInfo> = [
    {
      title: '实例机型',
      ellipsis: true,
      dataIndex: 'InstanceType',
      key: 'InstanceType',
      width: 150,
    },
    {
      title: '计费模式',
      ellipsis: true,
      dataIndex: 'InstanceChargeType',
      key: 'InstanceChargeType',
      width: 140,
    },
    {
      title: '处理器型号',
      ellipsis: true,
      dataIndex: 'CpuType',
      key: 'CpuType',
      width: 140,
    },
    {
      title: 'CPU核数',
      dataIndex: 'Cpu',
      key: 'Cpu',
      width: 80,
    },
    {
      title: '内存',
      dataIndex: 'Memory',
      key: 'Memory',
      width: 80,
    },
    {
      title: '频率',
      dataIndex: 'Frequency',
      key: 'Frequency',
      width: 120,
    },
    {
      title: '带宽',
      dataIndex: 'InstanceBandwidth',
      key: 'InstanceBandwidth',
      width: 80,
    },
    {
      title: 'PPS',
      dataIndex: 'InstancePps',
      key: 'InstancePps',
      width: 80,
    },
    {
      title: '可用区',
      ellipsis: true,
      dataIndex: 'Zone',
      key: 'Zone',
      width: 100,
    },
    {
      title: '机型系列',
      ellipsis: true,
      dataIndex: 'InstanceFamily',
      key: 'InstanceFamily',
      width: 100,
    },
    {
      title: '机型名称',
      ellipsis: true,
      dataIndex: 'TypeName',
      key: 'TypeName',
      width: 150,
    },
    {
      title: '是否售卖',
      dataIndex: 'Status',
      key: 'Status',
      width: 100,
      render: (_, row) => (
        <Badge
          style={{
            backgroundColor: row.Status === 'SELL' ? '#52c41a' : undefined,
          }}
          count={row.Status}
        />
      ),
    },
    {
      title: '创建者',
      key: 'createBy',
      dataIndex: 'createBy',
      ellipsis: true,
      width: TABLE_USERNAME_WIDTH,
    },
    {
      title: '创建时间',
      key: 'createAt',
      dataIndex: 'createAt',
      valueType: 'dateTime',
      width: TABLE_DATETIME_WIDTH,
      sorter: (a, b) =>
        sorter(a, b, 'createAt', {
          valueType: 'dateTime',
        }),
    },
    {
      title: '更新者',
      key: 'updateBy',
      dataIndex: 'updateBy',
      ellipsis: true,
      width: TABLE_USERNAME_WIDTH,
    },
    {
      title: '更新时间',
      key: 'updateAt',
      dataIndex: 'updateAt',
      valueType: 'dateTime',
      width: TABLE_DATETIME_WIDTH,
      sorter: (a, b) =>
        sorter(a, b, 'updateAt', {
          valueType: 'dateTime',
        }),
    },
    {
      title: '备注',
      ellipsis: true,
      dataIndex: 'Remark',
      key: 'Remark',
    },
    {
      title: '描述',
      ellipsis: true,
      dataIndex: 'Description',
      key: 'Description',
    },
  ];

  return (
    <Table<
      API.InstanceTypeQuotaItemInfo,
      API.instanceTypeQuotaItemPageListApiCmdbInstypesParams
    >
      title="cloud-machines"
      actionRef={tableRef}
      rowKey="Uid"
      search="请输入实例机型搜索"
      columns={columns}
      params={{ ZoneUid: zoneUid }}
      request={instanceTypeQuotaItemPageListApiCmdbInstypes}
      columnsConfig={columnsConfig}
    />
  );
}
