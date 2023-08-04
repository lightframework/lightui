import { cloudPageListApiCmdbClouds } from '@/services/cmdb/cloud';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Link } from '@umijs/max';
import { Button } from 'antd';
import { useRef } from 'react';
import CloudCreateModalForm from './CloudCreateModalForm';
import CloudDeleteModalForm from './CloudDeleteModalForm';
import CloudUpdateModalForm from './CloudUpdateModalForm';

export default function Clouds() {
  const tableRef = useRef<ActionType>();

  const reloadTable = () => {
    tableRef.current?.reload();
  };

  const columns: ProColumns<API.CloudInfo>[] = [
    {
      key: 'Uid',
      width: 48,
      search: false,
    },
    {
      title: '云商ID',
      key: 'CloudKey',
      dataIndex: 'CloudKey',
      copyable: true,
      search: false,
      sorter: (a, b) => {
        const aKey = a['CloudKey'];
        const bKey = b['CloudKey'];
        return aKey.localeCompare(bKey);
      },
    },
    {
      title: '云商名称',
      key: 'CloudName',
      dataIndex: 'CloudName',

      search: { transform: (value: string) => ({ keywords: value }) },
      render: (value, row) => {
        return <Link to={row.Uid!}>{value}</Link>;
      },
      sorter: (a, b) => {
        const aName = a['CloudName'];
        const bName = b['CloudName'];
        return aName.localeCompare(bName);
      },
    },
    {
      title: '官网链接',
      key: 'Website',
      dataIndex: 'Website',
      copyable: true,
      ellipsis: true,
      search: false,
    },
    {
      title: '云商API',
      key: 'ApiDomain',
      dataIndex: 'ApiDomain',
      copyable: true,
      ellipsis: true,
      search: false,
    },
    {
      title: '支持API',
      key: 'SupportApi',
      dataIndex: 'SupportApi',
      width: 85,
      className: 'text-center',
      render: (value) => (
        <div style={{ textAlign: 'center' }}>{value ? '是' : '否'}</div>
      ),
      search: false,
    },
    {
      title: '创建人',
      key: 'createBy',
      dataIndex: 'createBy',
      search: false,
    },
    {
      title: '创建时间',
      key: 'createAt',
      dataIndex: 'createAt',
      search: false,
      valueType: 'dateTime',
      sorter: (a, b) => {
        const aTime = new Date(a['createAt']).getTime();
        const bTime = new Date(b['createAt']).getTime();
        return aTime - bTime;
      },
    },
    {
      title: '操作',
      render: (_, row) => {
        return (
          <div className="inline-flex flex-wrap gap-5 xl:flex-nowrap">
            <Button type="link">同步</Button>
            <CloudUpdateModalForm
              uid={row.Uid}
              initialValues={row}
              onFinish={reloadTable}
            />
            <CloudDeleteModalForm
              uid={row.Uid}
              cloudKey={row.CloudKey}
              cloudName={row.CloudName}
              onFinish={reloadTable}
            />
          </div>
        );
      },
      search: false,
    },
  ];

  return (
    <ProTable<API.CloudInfo, API.cloudPageListApiCmdbCloudsParams>
      actionRef={tableRef}
      columns={columns}
      rowKey="Uid"
      request={async (params) => {
        const res = await cloudPageListApiCmdbClouds(params);
        return {
          success: res.msg === 'OK',
          data: res.data?.list,
          total: res.data?.total,
        };
      }}
      pagination={{
        showQuickJumper: true,
        showSizeChanger: true,
        defaultPageSize: 10,
      }}
      toolBarRender={() => [
        <CloudCreateModalForm key="cloud-create" onFinish={reloadTable} />,
      ]}
    />
  );
}
