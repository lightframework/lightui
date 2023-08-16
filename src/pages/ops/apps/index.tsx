import PageContainer from '@/components/ui/PageContainer';
import Table, { TableColumns, TableColumnsConfig } from '@/components/ui/Table';
import { appPageListApiCmdbApps } from '@/services/cmdb/app';
import { sorter } from '@/utils/sorter';
import { ActionType } from '@ant-design/pro-components';
import { Button, Switch, message } from 'antd';
import { useRef } from 'react';
import AppCreateModalForm from './AppCreateModalForm';
import AppDeleteModalForm from './AppDeleteModalForm';
import AppUpdateModalForm from './AppUpdateModalForm';

export default function Apps() {
  const tableRef = useRef<ActionType>();
  const columnsConfig: TableColumnsConfig<API.AppInfo> = {
    updateAt: { show: false },
    updateBy: { show: false },
    Uid: { show: false },
  };

  const columns: TableColumns<API.AppInfo> = [
    {
      title: ' Uid',
      key: 'Uid',
      dataIndex: 'Uid',
      copyable: true,
      ellipsis: true,
    },
    {
      title: '应用名称',
      key: 'AppName',
      dataIndex: 'AppName',
      copyable: true,
      ellipsis: true,
      sorter: (a, b) => sorter(a, b, 'AppName'),
    },
    {
      title: '应用类型',
      key: 'AppType',
      dataIndex: 'AppType',
      ellipsis: true,
    },
    {
      title: '版本',
      key: 'Version',
      dataIndex: 'Version',
      ellipsis: true,
    },
    {
      title: '描述',
      key: 'Description',
      dataIndex: 'Description',
      ellipsis: true,
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
      title: '状态',
      key: 'Enabled',
      dataIndex: 'Enabled',
      width: 80,
      render(_, row) {
        return (
          <Switch
            checked={row.Enabled}
            checkedChildren="启用"
            unCheckedChildren="禁用"
            onChange={() => {
              message.info('暂未实现');
            }}
          />
        );
      },
    },
    {
      title: '操作',
      key: 'option',
      className: 'xl:w-[330px]',
      render: (_, row) => {
        return (
          <div className="inline-flex flex-wrap gap-1.5">
            <AppUpdateModalForm
              appUid={row.Uid}
              onFinish={() => tableRef.current?.reload(false)}
            />

            <Button type="link" onClick={() => message.info('暂未实现')}>
              配置监控
            </Button>

            <Button type="link" onClick={() => message.info('暂未实现')}>
              配置安装流程
            </Button>

            <AppDeleteModalForm
              appUid={row.Uid}
              appName={row.AppName}
              onFinish={() => tableRef.current?.reload(false)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <Table<API.AppInfo>
        title="apps"
        actionRef={tableRef}
        rowKey="Uid"
        columns={columns}
        search="请输入应用名称搜索"
        request={appPageListApiCmdbApps}
        columnsConfig={columnsConfig}
        toolBarRender={() => [
          <AppCreateModalForm
            key="app-create"
            onFinish={() => tableRef.current?.reload(true)}
          />,
        ]}
      />
    </PageContainer>
  );
}
