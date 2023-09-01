import ModalCreateForm from '@/components/ui/form/modal-form/ModalCreateForm';
import { hostCreateApiOpsHosts } from '@/services/ops/host';
import { Button, message } from 'antd';
import { StagedHost } from './HostCreateModal';

type AppOption = {
  App: string;
  Version: string;
};

type DataDisk = {
  DiskSize: number;
  DiskType: string;
};

type SystemDisk = {
  DiskSize: number;
  DiskType: string;
};

type VpcSubnet = {
  SubnetId: string;
  VpcId: string;
};

type CloudTagOption = {
  Key: string;
  Value: string;
};

type Instance = {
  Cloud: string;
  CloudTags?: CloudTagOption[];
  Cpu: number;
  DataDisks: DataDisk[];
  ImageId: string;
  InstanceChargePeriod: number;
  InstanceChargeRenewFlag: string;
  InstanceChargeType: string;
  InstanceType: string;
  InternetMaxBandwidthOut: number;
  Memory: number;
  Password: string;
  Region: string;
  SecurityGroupIds: string[];
  SystemDisk: SystemDisk;
  VpcSubnetIds: VpcSubnet[];
  Zone: string;
};

type Host = {
  Apps?: AppOption[];
  Count: number;
  Description?: string;
  EnvId: string;
  HostType: string;
  Instance: Instance;
  OpsIds: string[];
  Project: string;
};

export default function HostCreateSubmitModal({
  hosts,
  onFinish,
}: {
  hosts: StagedHost[];
  onFinish?: VoidFunction;
}) {
  if (hosts.length === 0) {
    return (
      <Button
        type="primary"
        onClick={() => message.warning('请先配置并添加主机')}
      >
        提交
      </Button>
    );
  }

  return (
    <ModalCreateForm<API.HostCreateReq>
      title="提交添加主机任务"
      trigger={<Button type="primary">提交</Button>}
      request={(data) =>
        hostCreateApiOpsHosts({
          ...data,
          hosts: hosts.map((item) => {
            const host: Host = {
              Apps: item.apps.map((item) => ({
                App: item.App,
                Version: item.Version,
              })),
              Count: item.count,
              Description: item.description,
              EnvId: item.env.EnvId,
              Project: item.project.Project,
              HostType: item.hostType.HostType,
              OpsIds: item.ops.map((item) => item.Uid),
              Instance: {
                Cloud: item.cloud.Cloud,
                CloudTags: item.cloudTags.map((item) => ({
                  Key: item.Key,
                  Value: item.Value,
                })),
                Cpu: item.cpu,
                DataDisks: item.dataDisks.map((item) => ({
                  DiskSize: item.diskSize,
                  DiskType: item.diskType,
                })),
                SystemDisk: {
                  DiskSize: item.diskSize,
                  DiskType: item.diskType,
                },
                ImageId: item.image.ImageId,
                InstanceChargePeriod: item.instanceChargePeriod,
                InstanceChargeRenewFlag: item.instanceChargeRenewFlag,
                InstanceChargeType: item.instanceChargeType,
                InstanceType: item.instanceType.InstanceType,
                InternetMaxBandwidthOut: item.internetMaxBandwidthOut,
                Memory: item.memory,
                Password: item.password,
                Region: item.region.Region,
                SecurityGroupIds: item.securityGroups.map(
                  (item) => item.SecurityGroupId,
                ),
                VpcSubnetIds: item.vpcSubnets.map((item) => ({
                  VpcId: item.vpc.VpcId,
                  SubnetId: item.subnetId,
                })),
                Zone: item.zone.Zone,
              },
            };

            return host as any;
          }),
        })
      }
      onFinish={onFinish}
      fields={[
        {
          fieldType: 'text',
          label: '任务名称',
          name: 'topic',
          required: true,
        },
        {
          fieldType: 'radio',
          label: 'dryRun',
          name: 'dryRun',
          initialValue: true,
          options: [
            {
              label: '是',
              value: true,
            },
            {
              label: '否',
              value: false,
            },
          ],
        },
      ]}
    />
  );
}
