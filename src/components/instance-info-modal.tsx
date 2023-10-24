import CopyableText from '@/components/copyable-text';
import VerticalDataList from '@/components/vertical-data-list';
import {
  dictDisplay,
  diskTypeDict,
  instanceChargeTypeDict,
  renewFlagDict,
} from '@/constants/dict';
import { ProDescriptions } from '@ant-design/pro-components';
import { Button, Modal } from 'antd';

export default function InstanceInfoModal({
  open,
  onCancel,
  instance,
}: {
  open: boolean;
  onCancel: VoidFunction;
  instance?: CMDB.InstanceInfo;
}) {
  return (
    <Modal
      title="主机详情"
      open={open}
      onCancel={onCancel}
      footer={<Button onClick={onCancel}>返回</Button>}
      width="60%"
    >
      <div className="max-h-[600px] overflow-y-auto">
        {instance && (
          <ProDescriptions title={instance.InstanceName} column={4}>
            <ProDescriptions.Item label="实例ID" span={2}>
              {instance.InstanceId}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="实例状态">
              {instance.InstanceState}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="可用区">
              {instance.Zone.ZoneName}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="资源规格">
              {instance.InstanceType}_{instance.Cpu}C{instance.Memory}G
            </ProDescriptions.Item>
            <ProDescriptions.Item label="系统盘">
              {dictDisplay(instance.SystemDisk.DiskType, diskTypeDict)} -{' '}
              {instance.SystemDisk.DiskSize}GB
            </ProDescriptions.Item>
            <ProDescriptions.Item label="数据盘">
              <VerticalDataList
                items={instance.DataDiskSet}
                renderItem={(item, index) =>
                  `${index + 1}：${dictDisplay(
                    item.DiskType,
                    diskTypeDict,
                  )} - ${item.DiskSize}GB`
                }
              />
            </ProDescriptions.Item>
            <ProDescriptions.Item label="操作系统">
              {instance.OsName}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="默认用户">
              {instance.DefaultLoginUser}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="默认端口">
              {instance.DefaultLoginPort}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="镜像">
              {instance.Image.ImageName}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="付费方式">
              {dictDisplay(instance.InstanceChargeType, instanceChargeTypeDict)}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="续费模式">
              {dictDisplay(instance.RenewFlag, renewFlagDict)}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="IP地址">
              <div>
                <VerticalDataList
                  items={instance.PublicIpAddresses}
                  renderItem={(ip) =>
                    ip ? (
                      <CopyableText text={`${ip}（公）`} copyText={ip} />
                    ) : null
                  }
                  empty={null}
                />
                <VerticalDataList
                  items={instance.PrivateIpAddresses}
                  renderItem={(ip) =>
                    ip ? (
                      <CopyableText text={`${ip}（私）`} copyText={ip} />
                    ) : null
                  }
                  empty={null}
                />
              </div>
            </ProDescriptions.Item>
            <ProDescriptions.Item label="创建时间" valueType="dateTime">
              {instance.CreatedTime}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="释放时间" valueType="dateTime">
              {instance.ExpiredTime}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="网络" span={2}>
              <VerticalDataList
                items={instance.SubnetWithVpcSet}
                renderItem={(item) =>
                  `${item.Vpc.VpcName} : ${item.SubnetName}`
                }
              />
            </ProDescriptions.Item>
            <ProDescriptions.Item label="云商标签" span={2}>
              <VerticalDataList
                items={instance.CloudTagOptionSet}
                renderItem={(item) => `${item.Key}:${item.Value}`}
              />
            </ProDescriptions.Item>
            <ProDescriptions.Item label="安全组" span={2}>
              <VerticalDataList
                items={instance.SecurityGroupSet}
                renderItem={(item) => item.SecurityGroupName}
              />
            </ProDescriptions.Item>
            <ProDescriptions.Item label="备注">
              {instance.Description}
            </ProDescriptions.Item>
          </ProDescriptions>
        )}
      </div>
    </Modal>
  );
}
