import Table, { TableColumns, TableColumnsState } from '@/components/table';
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_DESC_WIDTH,
  TABLE_CELL_IP_WIDTH,
  TABLE_CELL_UID_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
  TABLE_MODAL_HEIGHT,
} from '@/constants/table';
import { subnetPageListApiCmdbSubnets } from '@/services/cmdb/subnet';
import { green, red } from '@ant-design/colors';
import { ActionType } from '@ant-design/pro-components';
import { Tag } from 'antd';
import { useRef } from 'react';

export default function SubnetTable({ vpcUid }: { vpcUid: string }) {
  const tableRef = useRef<ActionType>();

  const columnsState: TableColumnsState = {
    Uid: { show: false },
    VpcId: { show: false },
    createAt: { show: false },
    createBy: { show: false },
    updateAt: { show: false },
    updateBy: { show: false },
    Zone: { show: false },
    Ipv6CidrBlock: { show: false },
    IsRemoteVpcSnat: { show: false },
  };

  const columns: TableColumns<CMDB.SubnetInfo> = [
    {
      title: 'UID',
      dataIndex: 'Uid',
      width: TABLE_CELL_UID_WIDTH,
    },
    { title: 'VPC ID', dataIndex: 'VpcId', width: 180 },
    {
      title: '子网ID',
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
      sorter: true,
      width: 200,
    },
    {
      title: '路由表实例ID',
      dataIndex: 'RouteTableId',
      width: 120,
    },

    {
      title: '有效IP地址数',
      dataIndex: 'AvailableIpAddressCount',
      width: 100,
    },
    {
      title: '总IP地址数',
      dataIndex: 'TotalIpAddressCount',
      width: 100,
    },
    {
      title: ' 子网网段',
      dataIndex: 'CidrBlock',
      width: TABLE_CELL_IP_WIDTH,
      copyable: true,
    },
    {
      title: 'IPV6网段',
      dataIndex: 'Ipv6CidrBlock',
      width: 200,
      copyable: true,
    },
    {
      title: '是否默认',
      key: 'IsDefault',
      dataIndex: 'IsDefault',
      width: 80,
      render: (_, row) => (
        <Tag color={row.IsDefault ? green.primary : red.primary}>
          {row.IsDefault ? '是' : '否'}
        </Tag>
      ),
    },
    {
      title: 'SNAT地址池子网',
      key: 'IsRemoteVpcSnat',
      dataIndex: 'IsRemoteVpcSnat',
      width: 130,
      render: (_, row) => (
        <Tag color={row.IsRemoteVpcSnat ? green.primary : red.primary}>
          {row.IsRemoteVpcSnat ? '是' : '否'}
        </Tag>
      ),
    },
    {
      title: '创建者',
      dataIndex: 'createBy',
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      valueType: 'dateTime',
      width: TABLE_CELL_DATETIME_WIDTH,
    },
    {
      title: '更新者',
      dataIndex: 'updateBy',
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      title: '更新时间',
      dataIndex: 'updateAt',
      valueType: 'dateTime',
      width: TABLE_CELL_DATETIME_WIDTH,
    },
    {
      title: '描述',
      dataIndex: 'Remark',
      ellipsis: true,
      width: TABLE_CELL_DESC_WIDTH,
    },
    {
      title: '备注',
      dataIndex: 'Description',
      ellipsis: true,
      width: TABLE_CELL_DESC_WIDTH,
    },
  ];

  return (
    <>
      <Table
        name="subnet"
        actionRef={tableRef}
        columns={columns}
        rowKey="Uid"
        params={{ VpcUid: vpcUid }}
        searchPlaceholder="请输入子网ID/名称查询"
        request={subnetPageListApiCmdbSubnets}
        defaultColumnsState={columnsState}
        scroll={{
          y: TABLE_MODAL_HEIGHT,
        }}
      />
    </>
  );
}
