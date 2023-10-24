import CloudSyncButton from '@/components/cloud-sync-button';
import Table, { TableColumns, TableColumnsState } from '@/components/table';
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_DESC_WIDTH,
  TABLE_CELL_UID_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
  TABLE_REGION_HEIGHT,
} from '@/constants/table';
import { useToken } from '@/lib/hooks/use-token';
import { securitygroupPageListApiCmdbSecuritygroups } from '@/services/cmdb/securitygroup';
import { SyncOutlined } from '@ant-design/icons';
import { ActionType } from '@ant-design/pro-components';
import { Tag } from 'antd';
import { useRef } from 'react';

export default function SecurityGroupTable({
  regionUid,
}: {
  regionUid: string;
}) {
  const { token } = useToken();
  const tableRef = useRef<ActionType>();

  const columnsState: TableColumnsState = {
    Uid: { show: false },
    createAt: { show: false },
    createBy: { show: false },
  };

  const columns: TableColumns<CMDB.SecurityGroupInfo> = [
    {
      title: 'UID',
      dataIndex: 'Uid',
      width: TABLE_CELL_UID_WIDTH,
    },
    {
      title: '安全组ID',
      dataIndex: 'SecurityGroupId',
      copyable: true,
      width: 150,
    },
    {
      title: '安全组名称',
      dataIndex: 'SecurityGroupName',
      copyable: true,
      sorter: true,
      width: 300,
    },
    {
      title: 'VPC ID',
      dataIndex: 'VpcId',
      width: 180,
    },
    {
      title: '安全组描述',
      dataIndex: 'SecurityGroupDesc',
      ellipsis: true,
      width: TABLE_CELL_DESC_WIDTH,
    },
    {
      title: '是否默认',
      key: 'IsDefault',
      dataIndex: 'IsDefault',
      render: (_, row) => (
        <Tag color={row.IsDefault ? token.colorSuccess : token.colorError}>
          {row.IsDefault ? '是' : '否'}
        </Tag>
      ),
      width: 70,
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
  ];

  return (
    <>
      <Table
        name="security-group"
        actionRef={tableRef}
        columns={columns}
        rowKey="Uid"
        params={{ RegionUid: regionUid }}
        searchPlaceholder="请输入安全组ID/名称查询"
        request={securitygroupPageListApiCmdbSecuritygroups}
        defaultColumnsState={columnsState}
        scroll={{
          y: TABLE_REGION_HEIGHT,
        }}
        toolbar={{
          actions: [
            <CloudSyncButton
              key="security-group-sync"
              type="security-group"
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
    </>
  );
}
