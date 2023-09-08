import Table, { TableColumns, TableColumnsConfig } from '@/components/ui/Table';
import {
  TABLE_DATETIME_WIDTH,
  TABLE_DESC_WIDTH,
  TABLE_USERNAME_WIDTH,
} from '@/constants/table';
import { useEnvList } from '@/contexts/list-data-context';
import { hostPageListApiCmdbHosts } from '@/services/cmdb/host';
import { ActionType } from '@ant-design/pro-components';
import { useSearchParams } from '@umijs/max';
import { Button, Modal } from 'antd';
import { useRef, useState } from 'react';
import HostCreateModal from './HostCreateModal';
import HostInfo from './HostInfo';

export default function HostTable() {
  const { selectedItem: env } = useEnvList();

  const [selectedHost, setSelectedHost] = useState<API.HostInfo | undefined>(
    undefined,
  );
  const [searchParams] = useSearchParams();

  const hostType = searchParams.get('type');
  const type = hostType === null || hostType === 'all' ? undefined : hostType;

  const tableRef = useRef<ActionType>();

  const columnsConfig: TableColumnsConfig = {
    Uid: { show: false },
    UpdateBy: { show: false },
    UpdateAt: { show: false },
    CreateBy: { show: false },
    CreateAt: { show: false },
  };

  const columns: TableColumns<API.HostInfo> = [
    {
      title: '主机名',
      key: 'HostName',
      dataIndex: 'HostName',
      ellipsis: true,
      copyable: true,
      width: 300,
    },
    {
      title: '主机类型',
      key: 'HostType',
      dataIndex: 'HostType',
      ellipsis: true,
      render: (_, row) => row.HostType.HostType,
      width: 120,
    },
    {
      title: '所属环境',
      key: 'Env',
      dataIndex: 'Env',
      ellipsis: true,
      render: (_, row) => row.Env.EnvName,
      width: 120,
    },
    {
      title: '所属项目',
      key: 'Project',
      dataIndex: 'Project',
      ellipsis: true,
      render: (_, row) => row.Project.ProjectName,
      width: 120,
    },
    { title: '状态', key: 'State', dataIndex: 'State', width: 120 },
    {
      title: '应用',
      key: 'AppSet',
      dataIndex: 'AppSet',
      render: (_, row) =>
        row.AppSet?.map((app) => `${app.App}:${app.Version}`).join(',') ?? '-',
      width: 200,
    },
    {
      title: '运维',
      key: 'OpsSet',
      dataIndex: 'OpsSet',
      render: (_, row) =>
        row.OpsSet?.map((ops) => ops.PersonName).join(',') ?? '-',
      width: 200,
    },
    {
      title: '任务ID',
      key: 'TaskBillId',
      dataIndex: 'TaskBillId',
      width: 100,
    },
    {
      title: '创建者',
      key: 'CreateBy',
      dataIndex: 'CreateBy',
      ellipsis: true,
      width: TABLE_USERNAME_WIDTH,
    },
    {
      title: '创建时间',
      key: 'CreateAt',
      dataIndex: 'CreateAt',
      valueType: 'dateTime',
      width: TABLE_DATETIME_WIDTH,
    },
    {
      title: '更新者',
      key: 'UpdateBy',
      dataIndex: 'UpdateBy',
      ellipsis: true,
      width: TABLE_USERNAME_WIDTH,
    },
    {
      title: '更新时间',
      key: 'UpdateAt',
      dataIndex: 'UpdateAt',
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
      title: '实例名称',
      key: 'InstanceName',
      render: (_, row) => row.Instance.InstanceName,
    },
    {
      title: '操作',
      key: 'options',
      className: 'xl:w-[200px]',
      render: (_, row) => {
        return (
          <div className="inline-flex flex-wrap gap-1.5">
            <Button type="link" onClick={() => setSelectedHost(row)}>
              详情
            </Button>
            <Button type="link">配置</Button>
            <Button type="link">日志</Button>
          </div>
        );
      },
    },
  ];

  if (!env) return;

  return (
    <>
      <Table<API.HostInfo, API.hostPageListApiCmdbHostsParams>
        title="env-hosts"
        actionRef={tableRef}
        rowKey="Uid"
        search="请输入主机名搜索"
        columns={columns}
        params={{ EnvId: env.EnvId, HostType: type }}
        request={hostPageListApiCmdbHosts}
        columnsConfig={columnsConfig}
        toolBarRender={() => [<HostCreateModal key="host-create" />]}
      />
      <Modal
        open={selectedHost !== undefined}
        title="主机详情"
        width="70%"
        onCancel={() => setSelectedHost(undefined)}
        footer={[
          <Button
            key="back"
            type="default"
            onClick={() => setSelectedHost(undefined)}
          >
            返回
          </Button>,
        ]}
      >
        {selectedHost ? <HostInfo host={selectedHost} /> : null}
      </Modal>
    </>
  );
}
