import Table, { TableColumns, TableColumnsConfig } from '@/components/ui/Table';
import {
  TABLE_DATETIME_WIDTH,
  TABLE_UID_WIDTH,
  TABLE_USERNAME_WIDTH,
} from '@/constants/table';
import { useRegionList } from '@/contexts/list-data-context';
import { securitygroupPageListApiCmdbSecuritygroups } from '@/services/cmdb/securitygroup';
import { sorter } from '@/utils/sorter';
import { ActionType } from '@ant-design/pro-components';
import { useRef } from 'react';
import CloudSyncButton from '../../../CloudSyncButton';
import { useCloud } from '../../contexts/cloud-context';
import DisabledCreateButton from '../DisabledCreateButton';
import DisabledDeleteButton from '../DisabledDeleteButton';
import DisabledUpdateButton from '../DisabledUpdateButton';

export default function SecurityGroup() {
  const tableRef = useRef<ActionType>();
  const { cloud } = useCloud();

  const { selectedItem: selectedRegion } = useRegionList();

  if (!selectedRegion || !cloud) {
    return;
  }

  const columnsConfig: TableColumnsConfig<API.SecurityGroupInfo> = {
    Uid: { show: false },
    createAt: { show: false },
    createBy: { show: false },
  };

  const columns: TableColumns<API.SecurityGroupInfo> = [
    {
      title: 'Uid',
      dataIndex: 'Uid',
      key: 'Uid',
      width: TABLE_UID_WIDTH,
    },
    {
      title: '安全组Id',
      key: 'SecurityGroupId',
      dataIndex: 'SecurityGroupId',
      ellipsis: true,
    },
    {
      title: '安全组名称',
      key: 'SecurityGroupName',
      dataIndex: 'SecurityGroupName',
      ellipsis: true,
      copyable: true,
      sorter: (a, b) => sorter(a, b, 'SecurityGroupName'),
    },

    {
      title: '描述',
      key: 'SecurityGroupDesc',
      dataIndex: 'SecurityGroupDesc',
      ellipsis: true,
    },
    {
      title: 'IsDefault',
      key: 'IsDefault',
      dataIndex: 'IsDefault',
      render: (_, row) => String(row.IsDefault),
      ellipsis: true,
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
    },
    {
      title: '操作',
      className: 'xl:w-[140px]',
      render: (_, row) => {
        return (
          <div className="inline-flex flex-wrap gap-1.5">
            {/* <SecurityGroupUpdateModalForm
              sgUid={row.Uid}
              regionUid={selectedRegion.Uid}
              onFinish={() => tableRef.current?.reload(false)}
            />

              <SecurityGroupDeleteModalForm
                securityGroupUid={row.Uid}
                securityGroupId={row.SecurityGroupId}
                securityGroupName={row.SecurityGroupName}
                onFinish={() => tableRef.current?.reload(false)}
              /> */}
            <DisabledUpdateButton />
            <DisabledDeleteButton />
          </div>
        );
      },
    },
  ];

  return (
    <Table<
      API.SecurityGroupInfo,
      API.securitygroupPageListApiCmdbSecuritygroupsParams
    >
      title="cloud-sgs"
      actionRef={tableRef}
      rowKey="Uid"
      search="请输入安全组名称搜索"
      columns={columns}
      params={{
        RegionUid: selectedRegion.Uid,
      }}
      request={securitygroupPageListApiCmdbSecuritygroups}
      columnsConfig={columnsConfig}
      toolBarRender={() => [
        <CloudSyncButton
          key="security-group-sync"
          title="安全组同步"
          type="security-group"
          cloudUid={cloud.Uid!}
          regionUid={selectedRegion.Uid}
          onFinish={tableRef.current?.reload}
          hint={
            <div>
              您确定要同步{' '}
              <span className="text-red-400">
                {cloud.CloudName} - {selectedRegion.RegionName}
              </span>{' '}
              的安全组吗？
            </div>
          }
        />,
        // <SecurityGroupCreateModalForm
        //   key="region-sg-create"
        //   regionUid={selectedRegion.Uid}
        //   onFinish={() => tableRef.current?.reload(true)}
        // />,
        <DisabledCreateButton key="disabled-sg-create" />,
      ]}
    />
  );
}
