import { ProDescriptions } from '@ant-design/pro-components';

export default function InstanceInfo({
  instance,
}: {
  instance: API.InstanceInfo;
}) {
  return (
    <ProDescriptions<API.InstanceInfo>
      title=""
      className="space-y-3"
      column={4}
    >
      <ProDescriptions.Item label="实例名称" copyable>
        {instance.InstanceName}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="实例Id" copyable>
        {instance.InstanceId}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="可用区">
        {instance.Zone.ZoneName}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="实例类型">
        {instance.InstanceType}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="实例状态">
        {instance.InstanceState}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="RestrictState">
        {instance.RestrictState}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="公网IP" copyable>
        {instance.PublicIpAddresses}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="私网IP" copyable>
        {instance.PrivateIpAddresses}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="默认用户" copyable>
        {instance.DefaultLoginUser}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="默认端口" copyable>
        {instance.DefaultLoginPort}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="收费方式">
        {(() => {
          switch (instance.InstanceChargeType) {
            case 'PREPAID': {
              return '包年包月';
            }
            case 'POSTPAID_BY_HOUR': {
              return '按时付费';
            }
            default: {
              return instance.InstanceChargeType;
            }
          }
        })()}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="续费模式">
        {(() => {
          switch (instance.RenewFlag) {
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
              return instance.InstanceChargeType;
            }
          }
        })()}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="镜像">
        {instance.Image.ImageName}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="操作系统">
        {instance.OsName}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="CPU数">{instance.Cpu}</ProDescriptions.Item>
      <ProDescriptions.Item label="内存">
        {instance.Memory}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="系统盘">
        {instance.SystemDisk.DiskType +
          ' ' +
          instance.SystemDisk.DiskSize +
          'G'}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="数据盘" span={3}>
        {instance.DataDiskSet
          ? instance.DataDiskSet.map(
              (item) => item.DiskType + ' ' + item.DiskSize + 'G',
            ).join('/')
          : '-'}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="安全组" span={2}>
        {instance.SecurityGroupSet
          ? instance.SecurityGroupSet.map(
              (item) => item.SecurityGroupName,
            ).join('/')
          : '-'}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="VPC网段" span={2}>
        {instance.SubnetWithVpcSet
          ? instance.SubnetWithVpcSet.map(
              (item) => item.Vpc + item.SubnetName,
            ).join('/')
          : '-'}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="新建时间" valueType="dateTime">
        {instance.CreatedTime}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="释放时间" valueType="dateTime">
        {instance.ExpiredTime}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="备注">
        {instance.Description}
      </ProDescriptions.Item>
    </ProDescriptions>
  );
}
