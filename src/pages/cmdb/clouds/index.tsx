import PageContainer from '@/components/ui/PageContainer';
import StatusTag from '@/components/ui/StatusTag';
import Table, { TableColumns, TableColumnsConfig } from '@/components/ui/Table';
import {
  TABLE_DATETIME_WIDTH,
  TABLE_DESC_WIDTH,
  TABLE_UID_WIDTH,
  TABLE_USERNAME_WIDTH,
} from '@/constants/table';
import { cloudPageListApiCmdbClouds } from '@/services/cmdb/cloud';
import { SearchOutlined } from '@ant-design/icons';
import { ActionType } from '@ant-design/pro-components';
import { Link } from '@umijs/max';
import { Button, Modal } from 'antd';
import { useRef, useState } from 'react';
import CloudCreateModalForm from './CloudCreateModalForm';
import CloudDeleteModalForm from './CloudDeleteModalForm';
import CloudTagTable from './CloudTagTable';
import CloudUpdateModalForm from './CloudUpdateModalForm';

export default function Clouds() {
  const [selectedCloud, setSelectedCloud] = useState<{
    cloudUid: string;
    cloudName: string;
  }>();

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
      width: TABLE_UID_WIDTH,
    },
    {
      title: '云商ID',
      key: 'Cloud',
      dataIndex: 'Cloud',
      copyable: true,
      ellipsis: true,
      width: 140,
    },
    {
      title: '云商名称',
      key: 'CloudName',
      dataIndex: 'CloudName',
      render: (_, row) => (
        <Link to={`${row.Uid}/regions`}>{row.CloudName}</Link>
      ),
      ellipsis: true,
      sorter: true,
      width: 200,
    },
    {
      title: '官网链接',
      key: 'Website',
      dataIndex: 'Website',
      ellipsis: true,
      render: (_, row) => (
        <a
          href={
            !row.Website.startsWith('https://') ||
            !row.Website.startsWith('http://')
              ? `https://${row.Website}`
              : row.Website
          }
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-x-1"
        >
          <span>{row.Website}</span>
          <SearchOutlined />
        </a>
      ),
      width: 240,
    },
    {
      title: '云商API',
      key: 'ApiDomain',
      dataIndex: 'ApiDomain',
      copyable: true,
      ellipsis: true,
      width: 240,
    },
    {
      title: '支持API',
      key: 'SupportApi',
      dataIndex: 'SupportApi',
      width: 80,
      render: (_, row) => <StatusTag content={row.SupportApi} />,
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
    {
      title: '操作',
      width: 220,
      render: (_, row) => {
        return (
          <div className="inline-flex flex-wrap gap-1.5">
            <Button
              type="link"
              onClick={() =>
                setSelectedCloud({
                  cloudUid: row.Uid,
                  cloudName: row.CloudName,
                })
              }
            >
              查看标签
            </Button>
            <CloudUpdateModalForm
              cloudUid={row.Uid}
              onFinish={() => tableRef.current?.reload(false)}
            />
            <CloudDeleteModalForm
              cloudUid={row.Uid}
              cloud={row.Cloud}
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
        title="clouds"
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

      <Modal
        open={selectedCloud !== undefined}
        title={`${selectedCloud?.cloudName} - 标签`}
        width="80%"
        onCancel={() => setSelectedCloud(undefined)}
        footer={[
          <Button
            key="back"
            type="default"
            onClick={() => setSelectedCloud(undefined)}
          >
            返回
          </Button>,
        ]}
      >
        {selectedCloud !== undefined ? (
          <CloudTagTable
            cloudUid={selectedCloud.cloudUid}
            cloudName={selectedCloud.cloudName}
          />
        ) : null}
      </Modal>
    </PageContainer>
  );
}
