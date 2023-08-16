import PageContainer from '@/components/ui/PageContainer';
import Table, { TableColumns, TableColumnsConfig } from '@/components/ui/Table';
import { cloudPageListApiCmdbClouds } from '@/services/cmdb/cloud';
import { sorter } from '@/utils/sorter';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { ActionType } from '@ant-design/pro-components';
import { Link } from '@umijs/max';
import { useRef } from 'react';
import CloudCreateModalForm from './CloudCreateModalForm';
import CloudDeleteModalForm from './CloudDeleteModalForm';
import CloudSyncModalForm from './CloudSyncModalForm';
import CloudUpdateModalForm from './CloudUpdateModalForm';

export default function Clouds() {
  const tableRef = useRef<ActionType>();

  const columnsConfig: TableColumnsConfig<API.CloudInfo> = {
    updateAt: { show: false },
    updateBy: { show: false },
    createBy: { show: false },
    Uid: { show: false },
  };

  const columns: TableColumns<API.CloudInfo> = [
    {
      title: 'Uid',
      key: 'Uid',
      dataIndex: 'Uid',
      copyable: true,
    },
    {
      title: '云商ID',
      key: 'CloudKey',
      dataIndex: 'CloudKey',
      copyable: true,
      ellipsis: true,
      sorter: (a, b) => sorter(a, b, 'CloudKey'),
    },
    {
      title: '云商名称',
      key: 'CloudName',
      dataIndex: 'CloudName',
      render: (value, row) => {
        return <Link to={row.Uid}>{value}</Link>;
      },
      ellipsis: true,
      sorter: (a, b) => sorter(a, b, 'CloudName'),
    },
    {
      title: '官网链接',
      key: 'Website',
      dataIndex: 'Website',
      copyable: true,
      ellipsis: true,
    },
    {
      title: '云商API',
      key: 'ApiDomain',
      dataIndex: 'ApiDomain',
      copyable: true,
      ellipsis: true,
    },
    {
      title: '支持API',
      key: 'SupportApi',
      dataIndex: 'SupportApi',
      width: 60,
      render: (_, row) =>
        row.SupportApi ? (
          <CheckCircleOutlined className="text-green-400" />
        ) : (
          <CloseCircleOutlined className="text-red-400" />
        ),
    },
    {
      title: '创建者',
      key: 'createBy',
      dataIndex: 'createBy',
      ellipsis: true,
    },
    {
      title: '创建日期',
      key: 'createAt',
      dataIndex: 'createAt',
      valueType: 'dateTime',
      ellipsis: true,
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
    },
    {
      title: '更新日期',
      key: 'updateAt',
      dataIndex: 'updateAt',
      valueType: 'dateTime',
      ellipsis: true,
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
      className: 'xl:w-[220px]',
      render: (_, row) => {
        return (
          <div className="inline-flex flex-wrap gap-1.5">
            <CloudSyncModalForm cloudUid={row.Uid} cloudName={row.CloudName} />
            <CloudUpdateModalForm
              cloudUid={row.Uid}
              onFinish={() => tableRef.current?.reload(false)}
            />
            <CloudDeleteModalForm
              cloudUid={row.Uid}
              cloudKey={row.CloudKey}
              cloudName={row.CloudName}
              onFinish={() => tableRef.current?.reload(false)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <Table<API.CloudInfo>
        actionRef={tableRef}
        rowKey="Uid"
        columns={columns}
        search="请输入云商名称搜索"
        request={cloudPageListApiCmdbClouds}
        columnsConfig={columnsConfig}
        toolBarRender={() => [
          <CloudCreateModalForm
            key="cloud-create"
            onFinish={() => tableRef.current?.reload()}
          />,
        ]}
      />
    </PageContainer>
  );
}
