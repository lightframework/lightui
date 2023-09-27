import Table, { TableColumns, TableColumnsState } from '@/components/table';
import { dictDisplay, instanceChargeTypeDict } from '@/constants/dict';
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_DESC_WIDTH,
  TABLE_CELL_UID_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
  TABLE_MODAL_HEIGHT,
} from '@/constants/table';
import { useToken } from '@/lib/hooks/use-token';
import { instanceTypeQuotaItemPageListApiCmdbInstypes } from '@/services/cmdb/instype';
import { ActionType } from '@ant-design/pro-components';
import { Tag } from 'antd';
import { useRef } from 'react';

export default function ZoneInstanceTable({ zoneUid }: { zoneUid: string }) {
  const { token } = useToken();
  const tableRef = useRef<ActionType>();

  const columnsState: TableColumnsState = {
    Uid: { show: false },
    createAt: { show: false },
    createBy: { show: false },
    updateAt: { show: false },
    updateBy: { show: false },
    Description: { show: false },
  };

  const columns: TableColumns<CMDB.InstanceTypeQuotaItemInfo> = [
    {
      title: 'UID',
      dataIndex: 'Uid',
      width: TABLE_CELL_UID_WIDTH,
    },
    {
      title: '实例机型',
      dataIndex: 'InstanceType',
      width: 200,
      sorter: true,
    },
    {
      title: '机型名称',
      dataIndex: 'TypeName',
      width: 120,
      sorter: true,
    },
    {
      title: '机型系列',
      dataIndex: 'InstanceFamily',
      width: 100,
      sorter: true,
    },
    {
      title: '计费模式',
      dataIndex: 'InstanceChargeType',
      width: 100,
      renderText: (text) => dictDisplay(text, instanceChargeTypeDict),
    },
    {
      title: '可用区',
      dataIndex: 'Zone',
      width: 140,
    },
    {
      title: '是否售卖',
      dataIndex: 'Status',
      key: 'Status',
      width: 100,
      sorter: true,
      render: (_, row) => (
        <Tag
          color={row.Status === 'SELL' ? token.colorSuccess : token.colorError}
        >
          {row.Status}
        </Tag>
      ),
    },
    {
      title: '处理器型号',
      dataIndex: 'CpuType',
      width: 150,
    },
    {
      title: 'CPU (核)',
      dataIndex: 'Cpu',
      width: 80,
    },
    {
      title: '内存 (GB)',
      dataIndex: 'Memory',
      width: 80,
    },
    {
      title: '频率',
      dataIndex: 'Frequency',
      width: 120,
    },
    {
      title: '最大带宽 (GB)',
      dataIndex: 'InstanceBandwidth',
      width: 100,
    },
    {
      title: 'PPS',
      dataIndex: 'InstancePps',
      width: 80,
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
        name="zone-instance"
        actionRef={tableRef}
        columns={columns}
        rowKey="Uid"
        params={{ ZoneUid: zoneUid }}
        searchPlaceholder="请输入实例机型查询"
        request={instanceTypeQuotaItemPageListApiCmdbInstypes}
        defaultColumnsState={columnsState}
        scroll={{
          y: TABLE_MODAL_HEIGHT,
        }}
      />
    </>
  );
}
