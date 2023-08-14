import LightTable, {
  LightColumnsType,
  LightTableAction,
} from '@/components/ui/LightTable';
import { QueryColumn } from '@/components/ui/QueryHeader';
import { appPageListApiCmdbApps } from '@/services/cmdb/app';
import { sorter } from '@/utils/sorter';
import { Button, Switch, message } from 'antd';
import { useRef } from 'react';
import AppCreateModalForm from './AppCreateModalForm';
import AppDeleteModalForm from './AppDeleteModalForm';
import AppUpdateModalForm from './AppUpdateModalForm';

export default function Apps() {
  const tableRef = useRef<LightTableAction>();

  const columns: LightColumnsType<API.AppInfo> = [
    {
      title: '应用名称',
      key: 'AppName',
      dataIndex: 'AppName',
      copyAble: true,
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
      width: 80,
    },
    {
      title: '描述',
      key: 'Description',
      dataIndex: 'Description',
      ellipsis: true,
    },
    {
      title: '状态',
      key: 'Enabled',
      dataIndex: 'Enabled',
      width: 80,
      render(value) {
        return (
          <Switch
            checked={value}
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

  const queryColumns: QueryColumn[] = [
    {
      type: 'text',
      name: 'keywords',
      itemWidth: 300,
      placeholder: '请输入应用名称搜索',
    },
  ];

  return (
    <LightTable<API.AppInfo, API.appPageListApiCmdbAppsParams>
      ref={tableRef}
      rowKey="Uid"
      columns={columns}
      search
      queryColumns={queryColumns}
      request={appPageListApiCmdbApps}
      buttonRender={
        <AppCreateModalForm onFinish={() => tableRef.current?.reload(true)} />
      }
    />
  );
}
