import StatusTag from '@/components/ui/StatusTag';
import Table, { TableColumns, TableColumnsConfig } from '@/components/ui/Table';
import {
  TABLE_DATETIME_WIDTH,
  TABLE_DESC_WIDTH,
  TABLE_UID_WIDTH,
  TABLE_USERNAME_WIDTH,
} from '@/constants/table';
import { useCloudTagOptions } from '@/hooks/options';
import { instancePageListApiCmdbInstances } from '@/services/cmdb/instance';
import { ActionType } from '@ant-design/pro-components';
import { useSearchParams } from '@umijs/max';
import { Button, Select, message } from 'antd';
import { useRef, useState } from 'react';
import HostSyncModalForm from './HostSyncModalForm';

function CloudTagSelect({
  cloudUid,
  onSubmit,
}: {
  cloudUid?: string;
  onSubmit: (cloudTagUids: string[]) => void;
}) {
  const cloudTagOptions = useCloudTagOptions(cloudUid);
  const [value, setValue] = useState<string[]>([]);

  return (
    <div className="flex">
      <Select
        mode="multiple"
        value={value}
        placeholder="选择标签进行搜索"
        className="w-[500px]"
        onChange={(value) => setValue(value)}
        disabled={cloudUid === undefined}
        options={cloudTagOptions.selectOptions}
      />
      <Button onClick={() => onSubmit(value)}>搜索</Button>
    </div>
  );
}

export default function InstanceTable() {
  const tableRef = useRef<ActionType>();
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
      ellipsis: true,
      width: 150,
    },
    {
      title: '实例名称',
      key: 'InstanceName',
      dataIndex: 'InstanceName',
      copyable: true,
      ellipsis: true,
      width: 270,
    },
    {
      title: '可用区',
      key: 'Zone',
      dataIndex: 'Zone',
      ellipsis: true,
      width: 140,
      render: (_, row) => row.Zone.ZoneName,
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
      title: '公网IP',
      key: 'PublicIpAddresses',
      dataIndex: 'PublicIpAddresses',
      ellipsis: true,
      copyable: true,
      width: 140,
    },
    {
      title: '私网IP',
      key: 'PrivateIpAddresses',
      dataIndex: 'PrivateIpAddresses',
      ellipsis: true,
      copyable: true,
      width: 140,
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
      title: '收费方式',
      key: 'InstanceChargeType',
      dataIndex: 'InstanceChargeType',
      ellipsis: true,
      width: 100,
      render: (_, row) => {
        switch (row.InstanceChargeType) {
          case 'PREPAID': {
            return '包年包月';
          }
          case 'POSTPAID_BY_HOUR': {
            return '按时付费';
          }
          default: {
            return row.InstanceChargeType;
          }
        }
      },
    },
    {
      title: '续费模式',
      key: 'RenewFlag',
      dataIndex: 'RenewFlag',
      ellipsis: true,
      width: 160,
      render: (_, row) => {
        switch (row.RenewFlag) {
          case 'NOTIFY_AND_AUTO_RENEW': {
            return '通知过期且自动续费';
          }
          case 'NOTIFY_AND_MANUAL_RENEW': {
            return '通知过期不自动续费';
          }
          case 'DISABLE_NOTIFY_AND_MANUAL_RENEW': {
            return '不通知过期不自动续费';
          }
          default: {
            return row.InstanceChargeType;
          }
        }
      },
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
      title: 'CPU数',
      key: 'Cpu',
      dataIndex: 'Cpu',
      ellipsis: true,
      width: 80,
    },
    {
      title: '内存',
      key: 'Memory',
      dataIndex: 'Memory',
      ellipsis: true,
      width: 80,
    },
    {
      title: '系统盘',
      key: 'SystemDisk',
      dataIndex: 'SystemDisk',
      ellipsis: true,
      width: 200,
      render: (_, row) => {
        let type = row.SystemDisk.DiskType;
        if (row.SystemDisk.DiskType === 'CLOUD_SSD') {
          type = 'SSD云硬盘';
        } else if (row.SystemDisk.DiskType === 'CLOUD_PREMIUM') {
          type = '高性能云硬盘';
        }

        return `${type}/${row.SystemDisk.DiskSize}G`;
      },
    },
    {
      title: '数据盘',
      key: 'DataDiskSet',
      dataIndex: 'DataDiskSet',
      ellipsis: true,
      width: 200,
      render: (_, row) => {
        if (row.DataDiskSet === null) return '-';

        const dataDisks: string[] = [];

        for (const dataDisk of row.DataDiskSet) {
          let type = dataDisk.DiskType;
          if (dataDisk.DiskType === 'CLOUD_SSD') {
            type = 'SSD云硬盘';
          } else if (dataDisk.DiskType === 'CLOUD_PREMIUM') {
            type = '高性能云硬盘';
          }

          dataDisks.push(`${type}/${dataDisk.DiskSize}G`);
        }

        return dataDisks.join('</br>');
      },
    },
    {
      title: '安全组',
      key: 'SecurityGroupSet',
      dataIndex: 'SecurityGroupSet',
      width: 200,
      render: (_, row) =>
        row.SecurityGroupSet !== null
          ? row.SecurityGroupSet.map((item) => item.SecurityGroupName).join('/')
          : '-',
    },
    {
      title: 'VPC网段',
      key: 'SubnetWithVpcSet',
      dataIndex: 'SubnetWithVpcSet',
      width: 200,
      render: (_, row) =>
        row.SubnetWithVpcSet !== null
          ? row.SubnetWithVpcSet.map((item) => item.SubnetName).join('/')
          : '-',
    },
    {
      title: '新建时间',
      key: 'CreatedTime',
      dataIndex: 'CreatedTime',
      valueType: 'dateTime',
      width: TABLE_DATETIME_WIDTH,
    },
    {
      title: '释放时间',
      key: 'ExpiredTime',
      dataIndex: 'ExpiredTime',
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
      className: 'xl:w-[90px]',
      render: () => {
        return (
          <div className="inline-flex flex-wrap gap-1.5">
            <Button type="link">查看详情</Button>
          </div>
        );
      },
    },
  ];

  return (
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
      extraSearchRender={
        <CloudTagSelect
          cloudUid={cloudUid}
          onSubmit={() => {
            message.info('暂未实现');
          }}
        />
      }
      toolBarRender={() => [<HostSyncModalForm key="host-sync" />]}
    />
  );
}
