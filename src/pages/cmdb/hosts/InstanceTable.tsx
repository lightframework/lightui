import CopyableText from '@/components/CopyableText';
import StatusTag from '@/components/ui/StatusTag';
import Table, { TableColumns, TableColumnsConfig } from '@/components/ui/Table';
import {
  diskTypeDict,
  instanceChargeTypeDict,
  renewFlagDict,
} from '@/constants/enums';
import {
  TABLE_DATETIME_WIDTH,
  TABLE_DESC_WIDTH,
  TABLE_UID_WIDTH,
  TABLE_USERNAME_WIDTH,
} from '@/constants/table';
import { instancePageListApiCmdbInstances } from '@/services/cmdb/instance';
import { toLocaleDateTimeString } from '@/utils/func';
import { ActionType } from '@ant-design/pro-components';
import { useAccess, useSearchParams } from '@umijs/max';
import { Button, Modal } from 'antd';
import { useRef, useState } from 'react';
import HostSyncModalForm from './HostSyncModalForm';
import InstanceInfo from './InstanceInfo';

export default function InstanceTable() {
  const access = useAccess();
  const tableRef = useRef<ActionType>();
  const [clickedInstance, setClickedInstance] = useState<
    API.InstanceInfo | undefined
  >(undefined);
  const [searchParams] = useSearchParams();
  const cloudUid = searchParams.get('cloudUid') ?? undefined;
  const regionUid = searchParams.get('regionUid') ?? undefined;
  const zoneUid = searchParams.get('zoneUid') ?? undefined;

  const columnsConfig: TableColumnsConfig = {
    Uid: { show: false },
    Uuid: { show: false },
    createAt: { show: false },
    createBy: { show: false },
    updateAt: { show: false },
    updateBy: { show: false },
    InstanceType: { show: false },
    RestrictState: { show: false },
    DefaultLoginUser: { show: false },
    DefaultLoginPort: { show: false },
    Image: { show: false },
    OsName: { show: false },
    DataDiskSet: { show: false },
    SecurityGroupSet: { show: false },
    CreatedTime: { show: false },
    Description: { show: false },
    CloudTagOptionSet: { show: false },
  };

  const columns: TableColumns<API.InstanceInfo> = [
    {
      title: 'Uid',
      key: 'Uid',
      dataIndex: 'Uid',
      width: TABLE_UID_WIDTH,
    },
    {
      title: 'Uuid',
      key: 'Uuid',
      dataIndex: 'Uuid',
      width: 280,
    },
    {
      title: '实例Id',
      key: 'InstanceId',
      dataIndex: 'InstanceId',
      copyable: true,

      width: 200,
    },
    {
      title: '实例名称',
      key: 'InstanceName',
      dataIndex: 'InstanceName',
      copyable: true,

      width: 280,
    },
    {
      title: 'IP地址',
      key: 'ip',
      render: (_, row) => {
        return (
          <div>
            {row.PublicIpAddresses?.map((ip) => (
              <CopyableText key={ip} text={`${ip}（公）`} copyText={ip} />
            ))}
            {row.PrivateIpAddresses?.map((ip) => (
              <CopyableText key={ip} text={`${ip}（私）`} copyText={ip} />
            ))}
          </div>
        );
      },
      width: 180,
    },
    {
      title: '实例配置',
      key: 'instance',
      width: 250,
      render: (_, row) => (
        <div>
          <div>
            <span>{row.Cpu}核</span> <span>{row.Memory}GB</span>
          </div>
          <div>
            系统盘：
            {diskTypeDict[row.SystemDisk.DiskType] ??
              row.SystemDisk.DiskType} - {row.SystemDisk.DiskSize}GB
          </div>
          <div className="flex items-start">
            网络：
            <div>{row.SubnetWithVpcSet?.map((item) => item.SubnetName)}</div>
          </div>
        </div>
      ),
    },
    {
      title: '数据盘',
      key: 'DataDiskSet',
      render: (_, row) => (
        <div>
          {row.DataDiskSet?.map((disk, index) => (
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
      title: '实例类型',
      key: 'InstanceType',
      dataIndex: 'InstanceType',
      ellipsis: true,
      width: 140,
    },
    {
      title: '实例状态',
      key: 'InstanceState',
      dataIndex: 'InstanceState',
      render: (_, row) => (
        <StatusTag content={row.InstanceState} positive="RUNNING" />
      ),
      width: 120,
    },
    {
      title: 'RestrictState',
      key: 'RestrictState',
      dataIndex: 'RestrictState',
      render: (_, row) => (
        <StatusTag content={row.RestrictState} positive="NORMAL" />
      ),
      width: 120,
    },
    {
      title: '可用区',
      key: 'zone',
      width: 120,
      renderText: (_, row) => row.Zone.ZoneName,
    },
    {
      title: '计费模式',
      key: 'instanceCharge',
      render: (_, row) => (
        <div>
          <div>
            {instanceChargeTypeDict[row.InstanceChargeType] ??
              row.InstanceChargeType}
          </div>
          <div>{renewFlagDict[row.RenewFlag] ?? row.RenewFlag}</div>
          <div>{toLocaleDateTimeString(row.ExpiredTime)}到期</div>
        </div>
      ),
      width: 160,
    },
    {
      title: '镜像',
      key: 'Image',
      dataIndex: 'Image',
      ellipsis: true,
      width: 160,
      render: (_, row) => row.Image.ImageName,
    },

    {
      title: '操作系统',
      key: 'OsName',
      dataIndex: 'OsName',
      ellipsis: true,
      width: 160,
    },
    {
      title: '默认用户',
      key: 'DefaultLoginUser',
      dataIndex: 'DefaultLoginUser',
      copyable: true,
      ellipsis: true,
      width: 140,
    },
    {
      title: '默认端口',
      key: 'DefaultLoginPort',
      dataIndex: 'DefaultLoginPort',
      copyable: true,
      ellipsis: true,
      width: 80,
    },
    {
      title: '安全组',
      key: 'SecurityGroupSet',
      render: (_, row) => (
        <div>
          {row.SecurityGroupSet?.map((item, index) => (
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
          {row.CloudTagOptionSet?.map((item, index) => (
            <div key={index}>
              {item.Key}:{item.Value}
            </div>
          )) ?? '-'}
        </div>
      ),
      width: 140,
    },
    {
      title: '新建时间',
      key: 'CreatedTime',
      dataIndex: 'CreatedTime',
      valueType: 'dateTime',
      width: TABLE_DATETIME_WIDTH,
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
      key: 'options',
      fixed: 'right',
      width: 100,
      render: (_, row) => {
        return (
          <div className="inline-flex flex-wrap gap-1.5">
            <Button
              type="link"
              onClick={() => setClickedInstance(row)}
              disabled={!(access as any).instanceReadOneApiCmdbInstancesByUid}
            >
              查看详情
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Table<API.InstanceInfo, API.instancePageListApiCmdbInstancesParams>
        title="hosts"
        actionRef={tableRef}
        rowKey="Uid"
        search="请输入主机名搜索"
        columns={columns}
        params={{
          CloudUid: cloudUid,
          RegionUid: regionUid,
          ZoneUid: zoneUid,
        }}
        request={instancePageListApiCmdbInstances}
        columnsConfig={columnsConfig}
        toolBarRender={() => [<HostSyncModalForm key="host-sync" />]}
      />
      <Modal
        open={clickedInstance !== undefined}
        title="实例详情"
        width="70%"
        onCancel={() => setClickedInstance(undefined)}
        footer={[
          <Button
            key="back"
            type="default"
            onClick={() => setClickedInstance(undefined)}
          >
            返回
          </Button>,
        ]}
      >
        {clickedInstance ? <InstanceInfo instance={clickedInstance} /> : null}
      </Modal>
    </>
  );
}
