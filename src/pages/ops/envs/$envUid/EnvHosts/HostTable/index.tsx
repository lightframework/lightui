import Table, { TableColumns, TableColumnsConfig } from '@/components/ui/Table';
import VerticalDividedContent from '@/components/ui/VerticalDividedContent';
import {
  diskTypeDict,
  instanceChargeTypeDict,
  renewFlagDict,
} from '@/constants/enums';
import {
  TABLE_DATETIME_WIDTH,
  TABLE_DESC_WIDTH,
  TABLE_USERNAME_WIDTH,
} from '@/constants/table';
import { useEnvList } from '@/contexts/list-data-context';
import { hostPageListApiCmdbHosts } from '@/services/cmdb/host';
import { toLocaleDateTimeString } from '@/utils/func';
import { ActionType } from '@ant-design/pro-components';
import { useSearchParams } from '@umijs/max';
import { Button, Modal, message } from 'antd';
import { useRef, useState } from 'react';
import DeleteHostsModal from './DeleteHostsModal';
import HostCreateModal from './HostCreateModal';
import HostInfo from './HostInfo';

export default function HostTable() {
  const { selectedItem: env } = useEnvList();

  const [selectedHost, setSelectedHost] = useState<API.HostInfo | undefined>(
    undefined,
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRowInstanceIds, setSelectedRowInstanceIds] = useState<
    string[]
  >([]);

  const onSelectChange = (
    newSelectedRowKeys: React.Key[],
    rows: API.HostInfo[],
  ) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRowInstanceIds(rows.map((row) => row.Instance.InstanceId));
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    fixed: true,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const [searchParams] = useSearchParams();

  const hostType = searchParams.get('type');
  const type = hostType === null || hostType === 'all' ? undefined : hostType;

  const tableRef = useRef<ActionType>();

  const columnsConfig: TableColumnsConfig = {
    Env: { show: false },
    UpdateBy: { show: false },
    UpdateAt: { show: false },
    CreateBy: { show: false },
    CreateAt: { show: false },
    AppSet: { show: false },
    RestrictState: { show: false },
    DefaultLoginUser: { show: false },
    DefaultLoginPort: { show: false },
    Image: { show: false },
    OsName: { show: false },
    SystemDisk: { show: false },
    DataDiskSet: { show: false },
    SecurityGroupSet: { show: false },
    SubnetWithVpcSet: { show: false },
    InstanceDesc: { show: false },
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
    { title: '状态', key: 'State', dataIndex: 'State', width: 150 },
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
      ellipsis: true,
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
      width: 200,
    },
    {
      title: '实例Id',
      key: 'InstanceId',
      render: (_, row) => row.Instance.InstanceName,
      width: 200,
    },
    {
      title: '实例状态',
      key: 'InstanceState',
      render: (_, row) => row.Instance.InstanceState,
      width: 120,
    },
    {
      title: 'RestrictState',
      key: 'RestrictState',
      render: (_, row) => row.Instance.RestrictState,
      width: 120,
    },
    {
      title: '实例类型',
      key: 'InstanceType',
      render: (_, row) => row.Instance.InstanceType,
      width: 200,
    },
    {
      title: '可用区',
      key: 'Zone',
      render: (_, row) => row.Instance.Zone.ZoneName,
      width: 120,
    },
    {
      title: '内存',
      key: 'Memory',
      render: (_, row) => row.Instance.Memory,
      width: 80,
    },
    {
      title: 'CPU',
      key: 'Cpu',
      render: (_, row) => row.Instance.Cpu,
      width: 80,
    },
    {
      title: '付费方式',
      key: 'InstanceChargeType',
      render: (_, row) =>
        instanceChargeTypeDict[row.Instance.InstanceChargeType] ??
        row.Instance.InstanceChargeType,
      width: 120,
    },
    {
      title: '续费模式',
      key: 'RenewFlag',
      render: (_, row) =>
        renewFlagDict[row.Instance.RenewFlag] ?? row.Instance.RenewFlag,
      width: 120,
    },
    {
      title: '公网IP',
      key: 'PublicIpAddresses',
      render: (_, row) => (
        <VerticalDividedContent items={row.Instance.PublicIpAddresses} />
      ),
      width: 400,
    },
    {
      title: '私网IP',
      key: 'PrivateIpAddresses',
      render: (_, row) => (
        <VerticalDividedContent items={row.Instance.PrivateIpAddresses} />
      ),
      width: 400,
    },
    {
      title: '镜像',
      key: 'Image',
      render: (_, row) => row.Instance.Image.ImageName,
      width: 120,
    },
    {
      title: '操作系统',
      key: 'OsName',
      render: (_, row) => row.Instance.OsName,
      width: 120,
    },
    {
      title: '默认用户',
      key: 'DefaultLoginUser',
      render: (_, row) => row.Instance.DefaultLoginUser,
      width: 120,
    },
    {
      title: '默认端口',
      key: 'DefaultLoginPort',
      render: (_, row) => row.Instance.DefaultLoginPort,
      width: 120,
    },
    {
      title: '安全组',
      key: 'SecurityGroupSet',
      render: (_, row) => (
        <VerticalDividedContent
          items={row.Instance.SecurityGroupSet}
          itemRender={(item) => item.SecurityGroupName}
        />
      ),
      width: 400,
    },
    {
      title: 'VPC',
      key: 'SubnetWithVpcSet',
      render: (_, row) => (
        <VerticalDividedContent
          items={row.Instance.SubnetWithVpcSet}
          itemRender={(item) => `${item.Vpc}:${item.SubnetName}`}
        />
      ),
      width: 400,
    },
    {
      title: '系统盘',
      key: 'SystemDisk',
      render: (_, row) => `${
        diskTypeDict[row.Instance.SystemDisk.DiskType] ??
        row.Instance.SystemDisk.DiskType
      }
  - ${row.Instance.SystemDisk.DiskSize}G`,
      width: 200,
    },
    {
      title: '数据盘',
      key: 'DataDiskSet',
      render: (_, row) => (
        <VerticalDividedContent
          items={row.Instance.DataDiskSet}
          itemRender={(item) =>
            `${diskTypeDict[item.DiskType] ?? item.DiskType} - ${
              item.DiskSize
            }G`
          }
        />
      ),
      width: 400,
    },
    {
      title: '云商标签',
      key: 'CloudTagOptionSet',
      render: (_, row) => (
        <VerticalDividedContent
          items={row.Instance.CloudTagOptionSet}
          itemRender={(item) => `${item.Key}:${item.Value}`}
        />
      ),
      width: 250,
    },
    {
      title: '实例创建时间',
      key: 'CreatedTime',
      render: (_, row) => toLocaleDateTimeString(row.Instance.CreatedTime),

      width: TABLE_DATETIME_WIDTH,
    },
    {
      title: '实例释放时间',
      key: 'ExpiredTime',
      render: (_, row) => toLocaleDateTimeString(row.Instance.ExpiredTime),

      width: TABLE_DATETIME_WIDTH,
    },
    {
      title: '实例备注',
      key: 'InstanceDesc',
      render: (_, row) => row.Instance.Description,
      width: TABLE_DESC_WIDTH,
    },
    {
      title: '操作',
      key: 'options',
      fixed: 'right',
      width: 200,
      render: (_, row) => {
        return (
          <div className="inline-flex flex-wrap gap-1.5">
            <Button type="link" onClick={() => setSelectedHost(row)}>
              详情
            </Button>
            <Button type="link" onClick={() => message.info('暂未实现')}>
              配置
            </Button>
            <Button type="link" onClick={() => message.info('暂未实现')}>
              日志
            </Button>
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
        rowSelection={rowSelection}
        columns={columns}
        params={{ EnvId: env.EnvId, HostType: type }}
        request={hostPageListApiCmdbHosts}
        columnsConfig={columnsConfig}
        toolBarRender={() => [
          hasSelected ? (
            <DeleteHostsModal
              key="host-delete"
              instanceIds={selectedRowInstanceIds}
            />
          ) : null,
          <HostCreateModal key="host-create" />,
        ]}
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
