import Table, { TableColumns, TableColumnsConfig } from '@/components/ui/Table';
import { useEnvList } from '@/contexts/list-data-context';
import { hostPageListApiCmdbHosts } from '@/services/cmdb/host';
import { ActionType } from '@ant-design/pro-components';
import { useSearchParams } from '@umijs/max';
import { Button } from 'antd';
import { useRef } from 'react';
import HostCreateModal from './HostCreateModal';

export default function HostTable() {
  const { selectedItem: env } = useEnvList();

  const [searchParams] = useSearchParams();

  const hostType = searchParams.get('type');

  const tableRef = useRef<ActionType>();

  const columnsConfig: TableColumnsConfig = {
    Uid: { show: false },
  };

  const columns: TableColumns<API.HostInfo> = [
    {
      title: '主机名',
      key: 'HostName',
      dataIndex: 'HostName',
      ellipsis: true,
    },
    {
      title: '主机类型',
      key: 'HostType',
      dataIndex: 'HostType',
      ellipsis: true,
      render: (_, row) => row.HostType.HostType,
    },
    {
      title: '所属环境',
      key: 'Env',
      dataIndex: 'Env',
      ellipsis: true,
      render: (_, row) => row.Env.EnvName,
    },
    {
      title: '操作',
      key: 'options',
      className: 'xl:w-[200px]',
      render: () => {
        return (
          <div className="inline-flex flex-wrap gap-1.5">
            <Button type="link">详情</Button>
            <Button type="link">配置</Button>
            <Button type="link">日志</Button>
          </div>
        );
      },
    },
  ];

  if (!env) return;

  return (
    <Table<API.HostInfo, API.hostPageListApiCmdbHostsParams>
      title="env-hosts"
      actionRef={tableRef}
      rowKey="Uid"
      search="请输入主机名搜索"
      columns={columns}
      params={{ EnvId: env.EnvId, HostType: hostType ?? '11-proxy' }}
      request={hostPageListApiCmdbHosts}
      columnsConfig={columnsConfig}
      toolBarRender={() => [<HostCreateModal key="host-create" />]}
    />
  );
}
