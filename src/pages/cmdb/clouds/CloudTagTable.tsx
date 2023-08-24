import Table, { TableColumns, TableColumnsConfig } from '@/components/ui/Table';
import {
  TABLE_DATETIME_WIDTH,
  TABLE_DESC_WIDTH,
  TABLE_UID_WIDTH,
  TABLE_USERNAME_WIDTH,
} from '@/constants/table';
import { cloudTagPageListApiCmdbCloudtags } from '@/services/cmdb/cloudTag';
import { ActionType } from '@ant-design/pro-components';
import { useRef } from 'react';
import CloudSyncButton from './CloudSyncButton';

export default function CloudTagTable({
  cloudUid,
  cloudName,
}: {
  cloudUid: string;
  cloudName: string;
}) {
  const tableRef = useRef<ActionType>();

  const columnsConfig: TableColumnsConfig<API.CloudTagInfo> = {
    Uid: { show: false },
  };

  const columns: TableColumns<API.CloudTagInfo> = [
    {
      title: 'Uid',
      key: 'Uid',
      dataIndex: 'Uid',
      width: TABLE_UID_WIDTH,
    },
    {
      title: '标签',
      key: 'Key',
      dataIndex: 'Key',
      ellipsis: true,
      copyable: true,
      sorter: true,
      width: 180,
    },
    {
      title: '标签值',
      key: 'Value',
      dataIndex: 'Value',
      ellipsis: true,
      copyable: true,
      width: 180,
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
    <Table<API.CloudTagInfo, API.cloudTagPageListApiCmdbCloudtagsParams>
      rowKey="Uid"
      title="cloud-tags"
      actionRef={tableRef}
      columns={columns}
      params={{ CloudUid: cloudUid }}
      request={cloudTagPageListApiCmdbCloudtags}
      columnsConfig={columnsConfig}
      toolBarRender={() => [
        <CloudSyncButton
          key="cloud-tag-async"
          title="标签同步"
          type="tag"
          onFinish={tableRef.current?.reload}
          hint={
            <div>
              您确定要同步 <span className="text-red-400">{cloudName}</span>{' '}
              的标签吗？
            </div>
          }
          cloudUid={cloudUid}
        />,
      ]}
    />
  );
}
