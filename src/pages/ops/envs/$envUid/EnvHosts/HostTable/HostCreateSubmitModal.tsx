import { useEnvList } from '@/contexts/list-data-context';
import { appReadOneApiCmdbAppsByUid } from '@/services/cmdb/app';
import { cloudOptionsApiCmdbCloudsOptions } from '@/services/cmdb/cloud';
import { cloudTagOptionsApiCmdbCloudtagsOptions } from '@/services/cmdb/cloudTag';
import { hostCreateApiOpsHosts } from '@/services/ops/host';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { StagedHost } from './HostCreateModal';

export default function HostCreateSubmitModal({
  hosts,
  onFinish,
  onError,
}: {
  hosts: StagedHost[];
  onFinish?: VoidFunction;
  onError?: VoidFunction;
}) {
  const { selectedItem: env } = useEnvList();

  if (!env) return;

  return (
    <ModalForm<OPS.HostCreateReq>
      title={'提交添加主机任务'}
      trigger={<Button type="primary">提交</Button>}
      width={500}
      layout="horizontal"
      labelCol={{ span: 4 }}
      autoFocusFirstInput
      onFinish={async (data) => {
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
            await cloudOptionsApiCmdbCloudsOptions({})
          ).data?.list?.find(
            (cloud) => cloud.ResourceGroup === host.resourceGroup,
          )?.Uid;

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
              ResourceGroup: host.resourceGroup,
              CloudTags: tags,
              Cpu: Number.parseInt(host.cpu as any),
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
                Period: Number.parseInt(host.instanceChargePeriod as any),
                RenewFlag: host.instanceChargeRenewFlag,
              },
              InstanceChargeType: host.instanceChargeType,
              InstanceType: host.instanceType,
              InternetAccessible: {
                InternetChargeType: host.publicIpAssigned
                  ? host.internetChargeType
                  : undefined,
                InternetMaxBandwidthOut: host.publicIpAssigned
                  ? Number.parseInt(host.internetMaxBandwidthOut as any)
                  : undefined,
                PublicIpAssigned: host.publicIpAssigned,
              },
              Memory: Number.parseInt(host.memory as any),
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

        try {
          await hostCreateApiOpsHosts({
            ...data,
            hosts: hostsData,
          });
          message.success('创建成功');
          onFinish?.();
        } catch (error) {
          onError?.();
        }

        return true;
      }}
    >
      <ProFormText
        label="任务名称"
        name="topic"
        rules={[
          {
            required: true,
            message: '请输入任务名称',
          },
        ]}
      />
      <ProFormTextArea label="备注" name="remark" />
    </ModalForm>
  );
}
