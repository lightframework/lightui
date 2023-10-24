import { MODAL_FORM_WIDTH } from '@/constants/modal';
import { hostCreateApiOpsHosts } from '@/services/ops/host';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { HostCreateFormData } from './host-create-form';

export default function HostCreateSubmitModalForm({
  hosts,
  disabled,
  onFinish,
}: {
  hosts: HostCreateFormData[];
  disabled?: boolean;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalForm<OPS.HostCreateReq>
      title="创建主机任务"
      width={MODAL_FORM_WIDTH}
      trigger={
        <Button type="primary" disabled={disabled}>
          提交
        </Button>
      }
      autoFocusFirstInput
      layout="horizontal"
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        const hostsData: OPS.Host[] = hosts.map((host) => ({
          EnvId: host.envId!,
          Project: host.project!.Project,
          Description: host.description,
          Apps: host.apps?.map((app) => ({
            App: app.App,
            Version: app.Version,
          })),
          Count: host.count!,
          OpsIds: host.opsIds!,
          SupportIds: host.supportIds,
          HostType: host.hostType!.HostType,
          Instance: {
            CloudTags: host.cloudTags?.map((tag) => ({
              Key: tag.Key,
              Value: tag.Value,
            })),
            Cpu: Number.parseInt(host.cpu!),
            DataDisks:
              host.dataDisks?.map((disk) => ({
                DiskSize: disk.diskSize!,
                DiskType: disk.diskType!,
              })) ?? [],
            ImageId: host.image!.ImageId,
            InstanceChargePrepaid: {
              Period: Number.parseInt(host.instanceChargePeriod!),
              RenewFlag: host.instanceChargeRenewFlag!,
            },
            InstanceChargeType: host.instanceChargeType!,
            InstanceType: host.instanceType!.InstanceType,
            InternetAccessible: {
              InternetChargeType: host.internetChargeType,
              InternetMaxBandwidthOut: host.internetMaxBandwidthOut
                ? Number.parseInt(host.internetMaxBandwidthOut)
                : undefined,
              PublicIpAssigned: host.publicIpAssigned!,
            },
            Memory: Number.parseInt(host.memory!),
            Password: host.password!,
            Region: host.region!.Region,
            ResourceGroup: host.cloud!.ResourceGroup,
            SecurityGroupIds:
              host.securityGroups?.map((item) => item.SecurityGroupId) ?? [],
            SystemDisk: { DiskSize: host.diskSize!, DiskType: host.diskType! },
            VirtualPrivateClouds: host.vpcSubnets!.map((vpcSubnet) => ({
              VpcId: vpcSubnet.vpc!.VpcId,
              SubnetId: vpcSubnet.subnet!.SubnetId,
            })),
            Zone: host.zone!.Zone,
          },
        }));
        await hostCreateApiOpsHosts({
          ...formData,
          hosts: hostsData,
        });
        message.success('创建成功');
        onFinish?.();
        return true;
      }}
    >
      <ProFormText
        label="任务名称"
        name="topic"
        placeholder=""
        rules={[{ required: true, message: '请输入任务名称' }]}
      />
      <ProFormTextArea label="备注" placeholder="" />
    </ModalForm>
  );
}
