import StatusTag from '@/components/ui/StatusTag';
import Table, { TableColumns, TableColumnsConfig } from '@/components/ui/Table';
import {
  TABLE_DATETIME_WIDTH,
  TABLE_DESC_WIDTH,
  TABLE_IP_WIDTH,
  TABLE_UID_WIDTH,
  TABLE_USERNAME_WIDTH,
} from '@/constants/table';
import { subnetPageListApiCmdbSubnets } from '@/services/cmdb/subnet';
import { sorter } from '@/utils/sorter';
import { ActionType } from '@ant-design/pro-components';
import { useRef } from 'react';

export default function SubnetTable({ vpcUid }: { vpcUid: string }) {
  const tableRef = useRef<ActionType>();

  const columnsConfig: TableColumnsConfig<API.SubnetInfo> = {
    Uid: { show: false },
    VpcId: { show: false },
    createAt: { show: false },
    createBy: { show: false },
    updateAt: { show: false },
    updateBy: { show: false },
    Zone: { show: false },
  };

  const columns: TableColumns<API.SubnetInfo> = [
    {
      title: 'Uid',
      dataIndex: 'Uid',
      key: 'Uid',
      width: TABLE_UID_WIDTH,
    },
    { title: 'VpcId', key: 'VpcId', dataIndex: 'VpcId', width: 180 },
    {
      title: '子网Id',
      key: 'SubnetId',
      dataIndex: 'SubnetId',
      copyable: true,
      width: 180,
    },
    {
      title: '子网名称',
      key: 'SubnetName',
      dataIndex: 'SubnetName',
      copyable: true,
      ellipsis: true,
      sorter: (a, b) => sorter(a, b, 'SubnetName'),
      width: 200,
    },
    {
      title: 'RouteTableId',
      key: 'RouteTableId',
      dataIndex: 'RouteTableId',
      width: 120,
    },

    {
      title: '有效IP地址数',
      key: 'AvailableIpAddressCount',
      dataIndex: 'AvailableIpAddressCount',
      width: 100,
    },
    {
      title: '总IP地址数',
      key: 'TotalIpAddressCount',
      dataIndex: 'TotalIpAddressCount',
      width: 100,
    },
    {
      title: 'CidrBlock',
      key: 'CidrBlock',
      dataIndex: 'CidrBlock',
      width: TABLE_IP_WIDTH,
      ellipsis: true,
      copyable: true,
    },
    {
      title: 'Ipv6CidrBlock',
      key: 'Ipv6CidrBlock',
      dataIndex: 'Ipv6CidrBlock',
      width: TABLE_IP_WIDTH,
      ellipsis: true,
      copyable: true,
    },
    {
      title: 'IsDefault',
      key: 'IsDefault',
      dataIndex: 'IsDefault',
      width: 80,
      render: (_, row) => <StatusTag content={row.IsDefault} />,
    },
    {
      title: 'IsRemoteVpcSnat',
      key: 'IsRemoteVpcSnat',
      dataIndex: 'IsRemoteVpcSnat',
      width: 130,
      render: (_, row) => <StatusTag content={row.IsRemoteVpcSnat} />,
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
      key: 'Description',
      dataIndex: 'Description',
      ellipsis: true,
      width: TABLE_DESC_WIDTH,
    },
  ];

  return (
    <Table<API.SubnetInfo, API.subnetPageListApiCmdbSubnetsParams>
      title="cloud-subnets"
      actionRef={tableRef}
      rowKey="Uid"
      search="请输入子网名称搜索"
      columns={columns}
      columnsConfig={columnsConfig}
      params={{ VpcUid: vpcUid }}
      request={subnetPageListApiCmdbSubnets}
    />
  );
}
