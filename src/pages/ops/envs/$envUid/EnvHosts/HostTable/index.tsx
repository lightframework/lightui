import CopyableText from '@/components/CopyableText';
import Table, { TableColumns, TableColumnsConfig } from '@/components/ui/Table';
import {
  diskTypeDict,
  instanceChargeTypeDict,
  renewFlagDict,
  stateBorderColorDict,
  stateColorDict,
} from '@/constants/enums';
import {
  TABLE_DATETIME_WIDTH,
  TABLE_DESC_WIDTH,
  TABLE_USERNAME_WIDTH,
} from '@/constants/table';
import { useEnvList } from '@/contexts/list-data-context';
import { hostPageListApiCmdbHosts } from '@/services/cmdb/host';
import { hosttypeOptionsApiCmdbHosttypesOptions } from '@/services/cmdb/hosttype';
import { toLocaleDateTimeString } from '@/utils/func';
import { EllipsisOutlined } from '@ant-design/icons';
import { ActionType } from '@ant-design/pro-components';
import { useQuery } from '@tanstack/react-query';
import { useAccess, useSearchParams } from '@umijs/max';
import {
  Button,
  ConfigProvider,
  Modal,
  Popover,
  Select,
  Tag,
  message,
  theme,
} from 'antd';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import DeleteHostsModal from './DeleteHostsModal';
import HostCreateModal from './HostCreateModal';
import HostInfo from './HostInfo';

function HostStateSelect({
  onChange,
}: {
  onChange: (states: string[]) => void;
}) {
  return (
    <Select
      showSearch
      allowClear
      mode="multiple"
      placeholder="选择状态进行搜索"
      style={{
        width: 500,
      }}
      onChange={onChange}
      options={[
        { label: '待创建', value: 'TO_BE_CREATE' },
        { label: '待完善', value: 'TO_BE_COMPLEMENT' },
        { label: '待更新', value: 'TO_BE_UPDATE' },
        { label: 'PENDING', value: 'PENDING' },
        { label: '待销毁', value: 'TO_BE_DESTROYED' },
        { label: '已销毁', value: 'DESTROYED' },
        { label: 'RUNNING', value: 'RUNNING' },
      ]}
    />
  );
}

function HostTypeSelect() {
  const { data } = useQuery({
    queryKey: ['host-type-options'],
    queryFn: () => hosttypeOptionsApiCmdbHosttypesOptions({}),
  });

  const hostTypeOptions =
    data?.data?.list?.map((hostType) => ({
      label: hostType.HostType,
      value: hostType.HostType,
    })) ?? [];
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Select
      showSearch
      allowClear
      placeholder="选择主机类型"
      style={{
        width: 160,
      }}
      onChange={(v) => setSearchParams({ type: v })}
      options={hostTypeOptions}
    />
  );
}

export default function HostTable() {
  const access = useAccess();
  const { selectedItem: env } = useEnvList();

  const [states, setStates] = useState<string[]>([]);

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
    InstanceName: { show: false },
    DataDiskSet: { show: false },
    InstanceState: { show: false },
    RestrictState: { show: false },
    InstanceType: { show: false },
    Env: { show: false },
    DefaultLoginUser: { show: false },
    DefaultLoginPort: { show: false },
    Image: { show: false },
    OsName: { show: false },
    SecurityGroupSet: { show: false },
    CloudTagOptionSet: { show: false },
    InstanceDesc: { show: false },
    CreatedTime: { show: false },
    createBy: { show: false },
    createAt: { show: false },
    updateBy: { show: false },
    updateAt: { show: false },
    Description: { show: false },
  };

  const columns: TableColumns<API.HostInfo> = [
    {
      title: '主机名',
      key: 'HostName',
      dataIndex: 'HostName',

      copyable: true,
      width: 280,
    },
    {
      title: 'IP地址',
      key: 'ip',
      render: (_, row) => {
        return (
          <div>
            {row.Instance.PublicIpAddresses?.map((ip) => (
              <CopyableText key={ip} text={`${ip}（公）`} copyText={ip} />
            ))}
            {row.Instance.PrivateIpAddresses?.map((ip) => (
              <CopyableText key={ip} text={`${ip}（私）`} copyText={ip} />
            ))}
          </div>
        );
      },
      width: 180,
    },
    {
      title: '运维',
      key: 'OpsSet',
      dataIndex: 'OpsSet',
      render: (_, row) => (
        <div className="flex flex-wrap gap-x-2">
          {row.OpsSet?.map((ops, index) => (
            <span key={ops.Uid}>
              {ops.PersonName}
              {index !== row.OpsSet.length - 1 ? ',' : ''}
            </span>
          ))}
        </div>
      ),
      width: 200,
    },
    {
      title: '技术支持',
      key: 'SupportSet',
      dataIndex: 'SupportSet',
      render: (_, row) => (
        <div className="flex flex-wrap gap-x-2">
          {row.SupportSet?.map((support, index) => (
            <span key={support.Uid}>
              {support.PersonName}
              {index !== row.SupportSet.length - 1 ? ',' : ''}
            </span>
          ))}
        </div>
      ),
      width: 200,
    },
    {
      title: '实例名称',
      key: 'InstanceName',
      renderText: (_, row) => row.Instance.InstanceName,
      width: 280,
      copyable: true,
    },
    {
      title: '实例Id',
      key: 'InstanceId',
      renderText: (_, row) => row.Instance.InstanceId,
      width: 200,
      copyable: true,
    },
    {
      title: '实例配置',
      key: 'instance',
      width: 250,
      render: (_, row) => (
        <div>
          <div>
            <span>{row.Instance.Cpu}核</span>{' '}
            <span>{row.Instance.Memory}GB</span>
          </div>
          <div>
            系统盘：
            {diskTypeDict[row.Instance.SystemDisk.DiskType] ??
              row.Instance.SystemDisk.DiskType}{' '}
            - {row.Instance.SystemDisk.DiskSize}GB
          </div>
          <div className="flex items-start">
            网络：
            <div>
              {row.Instance.SubnetWithVpcSet?.map((item) => item.SubnetName)}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '数据盘',
      key: 'DataDiskSet',
      render: (_, row) => (
        <div>
          {row.Instance.DataDiskSet?.map((disk, index) => (
            <div key={index}>
              {index + 1}：{diskTypeDict[disk.DiskType] ?? disk.DiskType} -{' '}
              {disk.DiskSize}GB
            </div>
          )) ?? '-'}
        </div>
      ),
      width: 200,
    },
    {
      title: '状态',
      key: 'State',
      dataIndex: 'State',
      width: 200,
      render: (_, row) => {
        let state = '';

        switch (row.State) {
          case 'TO_BE_CREATE':
            state = '待创建';
            break;
          case 'TO_BE_COMPLEMENT':
            state = '待完善';
            break;
          case 'TO_BE_UPDATE':
            state = '待更新';
            break;
          case 'TO_BE_DESTROYED':
            state = '待销毁';
            break;
          case 'DESTROYED':
            state = '已销毁';
            break;
          default:
            state = row.State;
        }

        return (
          <div>
            <ConfigProvider
              theme={{
                components: {
                  Tag: { defaultColor: theme.getDesignToken().colorText },
                },
              }}
            >
              <Tag
                color={stateColorDict[state]}
                style={{
                  color: 'black',
                  border: `1px solid ${stateBorderColorDict[state]}`,
                }}
              >
                {state}
              </Tag>
            </ConfigProvider>
            {row.State === 'TO_BE_DESTROYED' && (
              <div>回收时间：{toLocaleDateTimeString(row.removeAt)}</div>
            )}
          </div>
        );
      },
    },
    {
      title: '实例类型',
      key: 'InstanceType',
      render: (_, row) => row.Instance.InstanceType,
      width: 150,
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
      key: 'ProjectSet',
      dataIndex: 'ProjectSet',
      ellipsis: true,
      render: (_, row) =>
        row.ProjectSet && row.ProjectSet.length !== 0 ? (
          <div>
            {row.ProjectSet.map((project) => (
              <div key={project.Project}>{project.ProjectName}</div>
            ))}
          </div>
        ) : (
          '-'
        ),
      width: 120,
    },
    {
      title: '应用',
      key: 'AppSet',
      dataIndex: 'AppSet',
      render: (_, row) =>
        row.AppSet ? (
          row.AppSet.length > 2 ? (
            <Popover
              content={
                <div>
                  {row.AppSet.map((app) => (
                    <div key={app.Uid}>{app.App}</div>
                  ))}
                </div>
              }
              placement="topLeft"
            >
              <div
                className={clsx(
                  'flex items-center gap-x-2',
                  row.AppSet && row.AppSet.length > 2 && 'cursor-pointer',
                )}
              >
                <div>
                  {row.AppSet?.filter((app) => app.App !== '')
                    .slice(0, 2)
                    .map((app) => app.App)
                    .join(',') ?? '-'}
                </div>
                {row.AppSet && row.AppSet.length > 2 && (
                  <EllipsisOutlined
                    style={{ color: theme.getDesignToken().colorPrimary }}
                  />
                )}
              </div>
            </Popover>
          ) : (
            <div
              className={clsx(
                'flex items-center gap-x-2',
                row.AppSet && row.AppSet.length > 2 && 'cursor-pointer',
              )}
            >
              <div>
                {row.AppSet?.filter((app) => app.App !== '')
                  .slice(0, 2)
                  .map((app) => app.App)
                  .join(',') ?? '-'}
              </div>
              {row.AppSet && row.AppSet.length > 2 && (
                <EllipsisOutlined
                  style={{ color: theme.getDesignToken().colorPrimary }}
                />
              )}
            </div>
          )
        ) : null,
      width: 200,
    },
    {
      title: '云商',
      key: 'cloud',
      width: 150,
      renderText: (_, row) => row.Instance.Zone.Region.Cloud.CloudName,
    },
    {
      title: '区域',
      key: 'region',
      width: 200,
      renderText: (_, row) =>
        `${row.Instance.Zone.Region.RegionName}：${row.Instance.Zone.ZoneName}`,
    },
    {
      title: '计费模式',
      key: 'instanceCharge',
      render: (_, row) => (
        <div>
          <div>
            {instanceChargeTypeDict[row.Instance.InstanceChargeType] ??
              row.Instance.InstanceChargeType}
          </div>
          <div>
            {renewFlagDict[row.Instance.RenewFlag] ?? row.Instance.RenewFlag}
          </div>
          <div>{toLocaleDateTimeString(row.Instance.ExpiredTime)}到期</div>
        </div>
      ),
      width: 160,
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
        <div>
          {row.Instance.SecurityGroupSet?.map((item, index) => (
            <div key={index}>{item.SecurityGroupName}</div>
          )) ?? '-'}
        </div>
      ),
      width: 200,
    },
    {
      title: '云商标签',
      key: 'CloudTagOptionSet',
      render: (_, row) => (
        <div>
          {row.Instance.CloudTagOptionSet?.map((item, index) => (
            <div key={index}>
              {item.Key}:{item.Value}
            </div>
          )) ?? '-'}
        </div>
      ),
      width: 140,
    },
    {
      title: '实例创建时间',
      key: 'CreatedTime',
      render: (_, row) => toLocaleDateTimeString(row.Instance.CreatedTime),
      width: TABLE_DATETIME_WIDTH,
    },
    {
      title: '实例备注',
      key: 'InstanceDesc',
      renderText: (_, row) => row.Instance.Description,
      width: TABLE_DESC_WIDTH,
      ellipsis: true,
    },
    {
      title: '创建者',
      dataIndex: 'createBy',
      ellipsis: true,
      width: TABLE_USERNAME_WIDTH,
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      valueType: 'dateTime',
      width: TABLE_DATETIME_WIDTH,
    },
    {
      title: '更新者',
      dataIndex: 'updateBy',
      ellipsis: true,
      width: TABLE_USERNAME_WIDTH,
    },
    {
      title: '更新时间',
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
      key: 'options',
      fixed: 'right',
      width: 200,
      render: (_, row) => {
        return (
          <div className="inline-flex flex-wrap gap-1.5">
            <Button
              type="link"
              onClick={() => setSelectedHost(row)}
              disabled={!(access as any).hostInfoApiCmdbHostsByUid}
            >
              详情
            </Button>
            <Button
              type="link"
              onClick={() => message.info('暂未实现')}
              disabled
            >
              配置
            </Button>
            <Button
              type="link"
              onClick={() => message.info('暂未实现')}
              disabled
            >
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
        params={{
          EnvId: env.EnvId,
          HostType: type,
          States: states.length > 0 ? states.join(',') : undefined,
        }}
        request={hostPageListApiCmdbHosts}
        columnsConfig={columnsConfig}
        toolBarRender={() => [
          <DeleteHostsModal
            key="host-delete"
            disabled={!hasSelected || !(access as any).hostDeleteApiOpsHosts}
            instanceIds={selectedRowInstanceIds}
            onFinish={() => tableRef.current?.reload(false)}
          />,
          <HostCreateModal
            key="host-create"
            onFinish={() => tableRef.current?.reload()}
          />,
        ]}
        extraSearchRender={
          <>
            <HostTypeSelect />
            <HostStateSelect onChange={setStates} />
          </>
        }
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
