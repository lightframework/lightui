import PageContainer from '@/components/ui/PageContainer';
import Table, { TableColumns, TableColumnsConfig } from '@/components/ui/Table';
import {
  TABLE_DATETIME_WIDTH,
  TABLE_DESC_WIDTH,
  TABLE_UID_WIDTH,
  TABLE_USERNAME_WIDTH,
} from '@/constants/table';
import { appPageListApiCmdbApps } from '@/services/cmdb/app';
import { ActionType } from '@ant-design/pro-components';
import { Button, Switch, message } from 'antd';
import { useRef } from 'react';
import AppCreateModalForm from './AppCreateModalForm';
import AppDeleteModalForm from './AppDeleteModalForm';
import AppUpdateModalForm from './AppUpdateModalForm';

export default function Apps() {
  const tableRef = useRef<ActionType>();
  const columnsConfig: TableColumnsConfig = {
    updateAt: { show: false },
    updateBy: { show: false },
    AppName: { show: false },
    Uid: { show: false },
  };

  const columns: TableColumns<API.AppInfo> = [
    {
      title: ' Uid',
      key: 'Uid',
      dataIndex: 'Uid',
      ellipsis: true,
      width: TABLE_UID_WIDTH,
    },
    {
      title: '应用名称',
      key: 'App',
      dataIndex: 'App',
      copyable: true,
      ellipsis: true,
      sorter: true,
      width: 250,
    },
    {
      title: '应用类型',
      key: 'AppType',
      dataIndex: 'AppType',
      ellipsis: true,
      width: 200,
    },
    {
      title: '版本',
      key: 'Version',
      dataIndex: 'Version',
      ellipsis: true,
      width: 200,
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
      ellipsis: true,
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
      ellipsis: true,
      width: TABLE_DATETIME_WIDTH,
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
      title: '描述',
      key: 'Description',
      dataIndex: 'Description',
      ellipsis: true,
      width: TABLE_DESC_WIDTH,
    },
    {
      title: '操作',
      key: 'options',
      width: 330,
      fixed: 'right',
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
              appName={row.App}
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
