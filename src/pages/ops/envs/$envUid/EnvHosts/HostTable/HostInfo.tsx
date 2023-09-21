import VerticalDividedContent from '@/components/ui/VerticalDividedContent';
import {
  diskTypeDict,
  instanceChargeTypeDict,
  renewFlagDict,
} from '@/constants/enums';
import { toLocaleDateTimeString } from '@/utils/func';
import { ProDescriptions } from '@ant-design/pro-components';

export default function HostInfo({ host }: { host: API.HostInfo }) {
  const instance = host.Instance;

  return (
    <div className="py-2">
      <ProDescriptions title="基本信息" className="space-y-3" column={4}>
        <ProDescriptions.Item
          label="主机名称"
          copyable
          span={2}
          valueType="text"
        >
          {host.HostName}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="主机类型" span={2} valueType="text">
          {host.HostType.HostType}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="所属环境" valueType="text">
          {host.Env.EnvName}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="所属项目" valueType="text">
          {host.ProjectSet?.map((project) => project.ProjectName) ?? '-'}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="状态" valueType="text">
          {host.State}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="运维" span={2}>
          <VerticalDividedContent
            items={host.OpsSet}
            itemRender={(ops) => ops.PersonName}
          />
        </ProDescriptions.Item>
        <ProDescriptions.Item label="应用" span={2}>
          <VerticalDividedContent
            items={host.AppSet}
            itemRender={(app) => `${app.App}:${app.Version}`}
          />
        </ProDescriptions.Item>
        <ProDescriptions.Item label="创建者" valueType="text">
          {host.createBy}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="创建时间" valueType="dateTime">
          {toLocaleDateTimeString(host.createAt)}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="更新者" valueType="text">
          {host.updateBy}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="更新时间" valueType="dateTime">
          {host.updateAt}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="备注" span={4}>
          {host.Description}
        </ProDescriptions.Item>
      </ProDescriptions>
      <ProDescriptions title="实例信息" className="space-y-3" column={4}>
        <ProDescriptions.Item label="实例名称" valueType="text">
          {instance.InstanceName}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="实例Id" valueType="text">
          {instance.InstanceId}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="实例状态" valueType="text">
          {instance.InstanceState}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="RestrictState" valueType="text">
          {instance.RestrictState}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="实例类型" valueType="text">
          {instance.InstanceType}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="可用区" valueType="text">
          {instance.Zone.ZoneName}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="CPU（核）" valueType="text">
          {instance.Cpu}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="内存（GB）" valueType="text">
          {instance.Memory}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="付费方式" valueType="text">
          {instanceChargeTypeDict[instance.InstanceChargeType] ??
            instance.InstanceChargeType}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="续费模式" valueType="text" span={3}>
          {renewFlagDict[instance.RenewFlag] ?? instance.RenewFlag}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="公网IP" span={2}>
          <VerticalDividedContent items={instance.PublicIpAddresses} />
        </ProDescriptions.Item>
        <ProDescriptions.Item label="私网IP" span={2}>
          <VerticalDividedContent items={instance.PrivateIpAddresses} />
        </ProDescriptions.Item>
        <ProDescriptions.Item label="镜像" valueType="text">
          {instance.Image.ImageName}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="操作系统" valueType="text">
          {instance.OsName}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="默认用户" valueType="text">
          {instance.DefaultLoginUser}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="默认端口" valueType="text">
          {instance.DefaultLoginPort}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="安全组" span={4}>
          <VerticalDividedContent
            items={instance.SecurityGroupSet}
            itemRender={(item) => item.SecurityGroupName}
          />
        </ProDescriptions.Item>
        <ProDescriptions.Item label="VPC" span={4}>
          <VerticalDividedContent
            items={instance.SubnetWithVpcSet}
            itemRender={(item) => `${item.Vpc}:${item.SubnetName}`}
          />
        </ProDescriptions.Item>
        <ProDescriptions.Item label="系统盘" valueType="text">
          {diskTypeDict[instance.SystemDisk.DiskType] ??
            instance.SystemDisk.DiskType}{' '}
          - {instance.SystemDisk.DiskSize}G
        </ProDescriptions.Item>
        <ProDescriptions.Item label="数据盘" span={3}>
          <VerticalDividedContent
            items={instance.DataDiskSet}
            itemRender={(item) =>
              `${diskTypeDict[item.DiskType] ?? item.DiskType} - ${
                item.DiskSize
              }G`
            }
          />
        </ProDescriptions.Item>
        <ProDescriptions.Item label="云商标签" span={4}>
          <VerticalDividedContent
            items={instance.CloudTagOptionSet}
            itemRender={(item) => `${item.Key}:${item.Value}`}
          />
        </ProDescriptions.Item>
        <ProDescriptions.Item label="创建时间" valueType="dateTime">
          {instance.CreatedTime}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="释放时间" valueType="dateTime">
          {instance.ExpiredTime}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="备注" valueType="text" span={4}>
          {instance.Description}
        </ProDescriptions.Item>
      </ProDescriptions>
    </div>
  );
}
