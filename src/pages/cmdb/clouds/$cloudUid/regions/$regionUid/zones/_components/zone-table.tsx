import Table, { TableColumns, TableColumnsState } from '@/components/table';
import TableCellActions from '@/components/table-cell-actions';
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_DESC_WIDTH,
  TABLE_CELL_UID_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
  TABLE_REGION_HEIGHT,
} from '@/constants/table';
import { zonePageListApiCmdbZones } from '@/services/cmdb/zone';
import { green, red } from '@ant-design/colors';
import { ActionType } from '@ant-design/pro-components';
import { Tag } from 'antd';

import CloudSyncButton from '@/components/cloud-sync-button';
import { SyncOutlined } from '@ant-design/icons';
import { useAccess } from '@umijs/max';
import { useRef, useState } from 'react';
import ZoneInstanceTableModal from './zone-instance-table-modal';

export default function ZoneTable({ regionUid }: { regionUid: string }) {
  const access = useAccess();
  const tableRef = useRef<ActionType>();

  const [selectedZoneToViewInstance, setSelectedZoneToViewInstance] = useState<
    CMDB.ZoneInfo | undefined
  >();

  const columnsState: TableColumnsState = {
    createAt: { show: false },
    createBy: { show: false },
    Uid: { show: false },
  };

  const columns: TableColumns<CMDB.ZoneInfo> = [
    {
      title: 'UID',
      dataIndex: 'Uid',
      width: TABLE_CELL_UID_WIDTH,
    },
    {
      title: '可用区ID',
      dataIndex: 'Zone',
      copyable: true,
      sorter: true,
      width: 240,
    },
    {
      title: '可用区名称',
      dataIndex: 'ZoneName',
      copyable: true,
      sorter: true,
      width: 250,
    },
    {
      title: '状态',
      dataIndex: 'ZoneState',
      width: 120,
      sorter: true,
      render: (_, row) => (
        <Tag
          color={row.ZoneState === 'AVAILABLE' ? green.primary : red.primary}
        >
          {row.ZoneState}
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
      title: '备注',
      dataIndex: 'Description',
      ellipsis: true,
      width: TABLE_CELL_DESC_WIDTH,
    },
    {
      title: '操作',
      key: 'options',
      fixed: 'right',
      width: 95,
      render: (_, row) => {
        return (
          <TableCellActions
            actions={[
              {
                text: '查看可用机型',
                onClick: () => setSelectedZoneToViewInstance(row),
                disabled: !access.instanceTypeQuotaItemPageListApiCmdbInstypes,
              },
            ]}
          />
        );
      },
    },
  ];

  return (
    <>
      <Table
        name="zone"
        actionRef={tableRef}
        columns={columns}
        rowKey="Uid"
        params={{ RegionUid: regionUid }}
        searchPlaceholder="请输入可用区ID/名称查询"
        request={zonePageListApiCmdbZones}
        defaultColumnsState={columnsState}
        scroll={{
          y: TABLE_REGION_HEIGHT,
        }}
        toolbar={{
          actions: [
            <CloudSyncButton
              key="zone-sync"
              type="zone"
              regionUid={regionUid}
              buttonProps={{
                type: 'primary',
                children: '同步',
                icon: <SyncOutlined />,
              }}
              onFinish={() => tableRef.current?.reload()}
            />,
          ],
        }}
      />

      <ZoneInstanceTableModal
        open={selectedZoneToViewInstance !== undefined}
        onCancel={() => setSelectedZoneToViewInstance(undefined)}
        zone={selectedZoneToViewInstance}
      />
    </>
  );
}
