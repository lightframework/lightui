import ModalCreateForm from '@/components/ui/form/modal-form/ModalCreateForm';
import { useEnvList } from '@/contexts/list-data-context';
import { appReadOneApiCmdbAppsByUid } from '@/services/cmdb/app';
import { cloudPageListApiCmdbClouds } from '@/services/cmdb/cloud';
import { cloudTagOptionsApiCmdbCloudtagsOptions } from '@/services/cmdb/cloudTag';
import { hostCreateApiOpsHosts } from '@/services/ops/host';
import { Button } from 'antd';
import { StagedHost } from './HostCreateModal';

export default function HostCreateSubmitModal({
  hosts,
  onFinish,
}: {
  hosts: StagedHost[];
  onFinish?: VoidFunction;
}) {
  const { selectedItem: env } = useEnvList();

  if (!env) return;

  return (
    <ModalCreateForm<OPS.HostCreateReq>
      title="提交添加主机任务"
      trigger={<Button type="primary">提交</Button>}
      request={async (data) => {
        console.log(hosts);

        const hostsData: OPS.Host[] = [];

        for (const host of hosts) {
          const apps: OPS.AppOption[] = [];

          for (const uid of host.appUids) {
            const app = (await appReadOneApiCmdbAppsByUid({ uid })).data;
            if (app) {
              apps.push({ App: app.App ?? '', Version: app.Version ?? '' });
            }
          }

          const cloudUid = (
            await cloudPageListApiCmdbClouds({ keywords: host.cloud })
          ).data?.list?.find((cloud) => cloud.Cloud === host.cloud)?.Uid;

          const tagsData =
            (
              await cloudTagOptionsApiCmdbCloudtagsOptions({
                CloudUid: cloudUid!,
              })
            ).data?.list ?? [];

          const tags: OPS.CloudTagOption[] = [];

          for (const uid of host.cloudTagUids) {
            const tag = tagsData.find((item) => item.Uid === uid);
            if (tag) {
              tags.push({ Key: tag.Key, Value: tag.Value });
            }
          }

          hostsData.push({
            Apps: apps,
            Count: host.count,
            Description: host.description,
            EnvId: env.EnvId,
            Project: host.project,
            HostType: host.hostType,
            OpsIds: host.opsUids,
            Instance: {
              Cloud: host.cloud,
              CloudTags: tags,
              Cpu: host.cpu,
              DataDisks: host.dataDisks.map((item) => ({
                DiskSize: item.diskSize,
                DiskType: item.diskType,
              })),
              SystemDisk: {
                DiskSize: host.diskSize,
                DiskType: host.diskType,
              },
              ImageId: host.imageId,
              InstanceChargePrepaid: {
                Period: host.instanceChargePeriod,
                RenewFlag: host.instanceChargeRenewFlag,
              },
              InstanceChargeType: host.instanceChargeType,
              InstanceType: host.instanceType,
              InternetAccessible: {
                InternetChargeType: host.internetChargeType,
                InternetMaxBandwidthOut: host.internetMaxBandwidthOut,
                PublicIpAssigned: host.publicIpAssigned,
              },
              Memory: host.memory,
              Password: host.password,
              Region: host.region,
              SecurityGroupIds: host.securityGroupIds,
              VirtualPrivateClouds: host.vpcSubnetIds.map((item) => ({
                VpcId: item.vpcId,
                SubnetId: item.subnetId,
              })),
              Zone: host.zone,
            },
          });
        }

        return hostCreateApiOpsHosts({
          ...data,
          hosts: hostsData,
        });
      }}
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
