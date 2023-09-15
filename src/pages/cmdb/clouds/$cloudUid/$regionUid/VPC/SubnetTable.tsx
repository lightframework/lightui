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
import { ActionType } from '@ant-design/pro-components';
import { useRef } from 'react';

export default function SubnetTable({ vpcUid }: { vpcUid: string }) {
  const tableRef = useRef<ActionType>();

  const columnsConfig: TableColumnsConfig = {
    Uid: { show: false },
    VpcId: { show: false },
    createAt: { show: false },
    createBy: { show: false },
    updateAt: { show: false },
    updateBy: { show: false },
    Ipv6CidrBlock: { show: false },
    IsRemoteVpcSnat: { show: false },
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
      sorter: true,
    },
    {
      title: '子网名称',
      key: 'SubnetName',
      dataIndex: 'SubnetName',
      copyable: true,
      ellipsis: true,
      sorter: true,
      width: 200,
    },
    {
      title: '可用区',
      dataIndex: 'Zone',
      width: 150,
    },
    {
      title: '路由表实例Id',
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
      title: ' 子网网段',
      key: 'CidrBlock',
      dataIndex: 'CidrBlock',
      width: TABLE_IP_WIDTH,
      ellipsis: true,
      copyable: true,
    },
    {
      title: 'IPV6网段',
      key: 'Ipv6CidrBlock',
      dataIndex: 'Ipv6CidrBlock',
      width: 240,
      ellipsis: true,
      copyable: true,
    },
    {
      title: '是否默认',
      key: 'IsDefault',
      dataIndex: 'IsDefault',
      width: 80,
      render: (_, row) => <StatusTag content={row.IsDefault} />,
    },
    {
      title: 'SNAT地址池子网',
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
