import { useEnvList } from '@/contexts/list-data-context';
import {
  useAppOptions,
  useCloudOptions,
  useCloudTagOptions,
  useHostTypeOptions,
  useImageOptions,
  useInstanceTypeOptions,
  usePersonOptions,
  useProjectOptions,
  useRegionOptions,
  useSecurityGroupOptions,
  useSubnetOptions,
  useVpcOptions,
  useZoneOptions,
} from '@/hooks/options';
import {
  ProForm,
  ProFormDependency,
  ProFormDigit,
  ProFormList,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Form } from 'antd';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { StagedHost } from './HostCreateModal';

export type FormData = {
  projectUid: string;
  hostTypeUid: string;
  opsUids?: string[];
  description?: string;
  appUids?: string[];
  count: number;
  cloudUid: string;
  cloudTagUids?: string[];
  cpu: number;
  dataDisks?: {
    diskSize: number;
    diskType: string;
  }[];
  diskSize: number;
  diskType: string;
  imageUid: string;
  instanceChargePeriod?: number;
  instanceChargeRenewFlag?: string;
  instanceChargeType: string;
  instanceTypeUid: string;
  internetMaxBandwidthOut: number;
  memory: number;
  password: string;
  regionUid: string;
  securityGroupUids?: string[];
  vpcSubnetUids?: { vpcUid: string; subnetId: string }[];
  zoneUid: string;
};

function DiskSelectGroup({ label }: { label?: string }) {
  return (
    <div className={clsx('flex', label && 'gap-x-[104px]')}>
      <ProFormSelect
        fieldProps={{
          style: { width: 200 },
        }}
        label={label}
        name="diskType"
        options={[
          {
            label: 'SSD云硬盘',
            value: 'CLOUD_SSD',
          },
          {
            label: '高性能云硬盘',
            value: 'CLOUD_PREMIUM',
          },
        ]}
        rules={[
          {
            required: true,
            message: '请选择硬盘类型',
          },
        ]}
      />

      <ProFormDigit
        className="disk-size-input"
        initialValue={50}
        name="diskSize"
        min={50}
        max={2000}
        placeholder=""
        fieldProps={{
          step: 50,
          addonAfter: 'GB',
          style: { width: 110 },
        }}
      />
    </div>
  );
}

function SubnetSelect({ vpcUid }: { vpcUid?: string }) {
  const subnetOptions = useSubnetOptions(vpcUid, { valueKey: 'SubnetId' });

  return (
    <ProFormSelect
      name="subnetId"
      placeholder={'子网'}
      options={subnetOptions.selectOptions}
      rules={[
        {
          required: true,
          message: '请选择子网',
        },
      ]}
    />
  );
}

export default function HostItemForm({
  initialData,
  onFinish,
}: {
  initialData?: FormData;
  onFinish?: (host: StagedHost) => void;
}) {
  const [isInitialData, setIsInitialData] = useState(false);
  const { selectedItem: env } = useEnvList();
  const [hostname, setHostname] = useState('');

  const [form] = Form.useForm<FormData>();

  useEffect(() => {
    if (initialData) {
      setIsInitialData(true);
      form.setFieldsValue(initialData);
      new Promise((r) => {
        setTimeout(r, 500);
      }).then(() => {
        setIsInitialData(false);
      });
    }
  }, [initialData]);

  const cloudUid = Form.useWatch('cloudUid', form);
  const regionUid = Form.useWatch('regionUid', form);
  const zoneUid = Form.useWatch('zoneUid', form);
  const instanceChargeType = Form.useWatch('instanceChargeType', form);
  const hostTypeUid = Form.useWatch('hostTypeUid', form);

  const projectOptions = useProjectOptions(env?.Uid);
  const hostTypeOptions = useHostTypeOptions();
  const opsPersonOptions = usePersonOptions('运维');
  const cloudOptions = useCloudOptions();
  const cloudTagOptions = useCloudTagOptions(cloudUid);
  const regionOptions = useRegionOptions(cloudUid);
  const zoneOptions = useZoneOptions(regionUid);
  const securityGroupOptions = useSecurityGroupOptions(regionUid);
  const imageOptions = useImageOptions(regionUid);
  const instanceTypeOptions = useInstanceTypeOptions(zoneUid);
  const vpcOptions = useVpcOptions(regionUid);
  const appOptions = useAppOptions();

  useEffect(() => {
    const selectedHostType = hostTypeOptions.options.find(
      (item) => item.Uid === hostTypeUid,
    );
    if (selectedHostType) {
      let ruleDefinition = selectedHostType.RuleDefinition;

      const cloud = cloudOptions.options.find((item) => item.Uid === cloudUid);
      if (cloud) {
        ruleDefinition = ruleDefinition.replace('{{.Cloud}}', cloud.Cloud);
      }
      const region = regionOptions.options.find(
        (item) => item.Uid === regionUid,
      );
      if (region) {
        ruleDefinition = ruleDefinition.replace('{{.Region}}', region.Region);
      }
      const zone = zoneOptions.options.find((item) => item.Uid === zoneUid);
      if (zone) {
        ruleDefinition = ruleDefinition.replace('{{.Zone}}', zone.Zone);
      }

      setHostname(ruleDefinition);
    }
  }, [hostTypeUid, cloudUid, regionUid, zoneUid, env, env]);

  useEffect(() => {
    if (!isInitialData) {
      form.resetFields(['regionUid', 'cloudTagUids']);
    }
  }, [cloudUid]);

  useEffect(() => {
    if (!isInitialData) {
      form.resetFields(['zoneUid', 'vpcUid', 'imageUid', 'securityGroupUids']);
    }
  }, [regionUid]);

  useEffect(() => {
    if (!isInitialData) {
      form.resetFields(['instanceTypeUid']);
    }
  }, [zoneUid]);

  if (!env) return;

  return (
    <div className="w-7/12 space-y-3 overflow-y-auto border border-solid border-[rgba(0,0,0,.08)] p-3">
      <ProForm<FormData>
        className="env-add-host-form"
        form={form}
        layout="horizontal"
        submitter={{
          searchConfig: {
            resetText: '重置',
            submitText: '添加',
          },
          render: (_, dom) => [<div key="space" className="w-full" />, ...dom],
        }}
        onFinish={async (data) => {
          console.log(data);

          const host: StagedHost = {
            uuid: uuidv4(),
            env,
            project: projectOptions.options.find(
              (item) => item.Uid === data.projectUid,
            )!,
            hostType: hostTypeOptions.options.find(
              (item) => item.Uid === data.hostTypeUid,
            )!,
            ops:
              data.opsUids?.map(
                (uid) =>
                  opsPersonOptions.options.find((item) => item.Uid === uid)!,
              ) ?? [],
            description: data.description ?? '',
            apps:
              data.appUids?.map(
                (uid) => appOptions.options.find((item) => item.Uid === uid)!,
              ) ?? [],
            count: data.count,
            cloud: cloudOptions.options.find(
              (item) => item.Uid === data.cloudUid,
            )!,
            cloudTags:
              data.cloudTagUids?.map(
                (uid) =>
                  cloudTagOptions.options.find((item) => item.Uid === uid)!,
              ) ?? [],
            cpu: data.cpu,
            dataDisks: data.dataDisks ?? [],
            diskSize: data.diskSize,
            diskType: data.diskType,
            image: imageOptions.options.find(
              (item) => item.Uid === data.imageUid,
            )!,
            instanceType: instanceTypeOptions.options.find(
              (item) => item.Uid === data.instanceTypeUid,
            )!,
            instanceChargePeriod: data.instanceChargePeriod ?? 1,
            instanceChargeRenewFlag:
              data.instanceChargeRenewFlag ?? 'NOTIFY_AND_MANUAL_RENEW',
            instanceChargeType: data.instanceChargeType,
            internetMaxBandwidthOut: data.internetMaxBandwidthOut,
            memory: data.memory,
            password: data.password,
            region: regionOptions.options.find(
              (item) => item.Uid === data.regionUid,
            )!,
            securityGroups:
              data.securityGroupUids?.map(
                (uid) =>
                  securityGroupOptions.options.find(
                    (item) => item.Uid === uid,
                  )!,
              ) ?? [],
            vpcSubnets:
              data.vpcSubnetUids?.map((pair) => ({
                vpc: vpcOptions.options.find(
                  (item) => item.Uid === pair.vpcUid,
                )!,
                subnetId: pair.subnetId,
              })) ?? [],
            zone: zoneOptions.options.find(
              (item) => item.Uid === data.zoneUid,
            )!,
          };

          console.log(host);
          onFinish?.(host);
        }}
      >
        <div className="xl:grid xl:grid-cols-3">
          <h3 className="mb-3 text-sm font-semibold xl:col-span-3">管理信息</h3>
          <ProFormText
            label="所属环境"
            placeholder=""
            fieldProps={{
              value: env.EnvName,
              bordered: false,
              allowClear: false,
            }}
          />

          <div className="col-span-2">
            <ProFormText
              label="主机名"
              placeholder=""
              fieldProps={{
                value: hostname,
                bordered: false,
                allowClear: false,
              }}
            />
          </div>

          <ProFormSelect
            label="项目"
            name="projectUid"
            options={projectOptions.selectOptions}
            rules={[
              {
                required: true,
                message: '请选择项目',
              },
            ]}
          />

          <ProFormSelect
            mode="multiple"
            label="运维"
            name="opsUids"
            options={opsPersonOptions.selectOptions}
          />

          <ProFormSelect
            label="主机类型"
            name="hostTypeUid"
            options={hostTypeOptions.selectOptions}
            rules={[
              {
                required: true,
                message: '请选择主机类型',
              },
            ]}
          />

          <div className="col-span-3">
            <ProFormTextArea
              label="备注"
              name="description"
              fieldProps={{ rows: 1 }}
            />
          </div>
        </div>

        <div className="xl:grid xl:grid-cols-3">
          <h3 className="col-span-3 mb-3 text-sm font-semibold">配置信息</h3>

          <ProFormSelect
            label="云商"
            name="cloudUid"
            options={cloudOptions.selectOptions}
            rules={[
              {
                required: true,
                message: '请选择云商',
              },
            ]}
          />

          <ProFormSelect
            label="区域"
            name="regionUid"
            options={regionOptions.selectOptions}
            rules={[
              {
                required: true,
                message: '请选择区域',
              },
            ]}
          />

          <ProFormSelect
            label="可用区"
            name="zoneUid"
            options={zoneOptions.selectOptions}
            rules={[
              {
                required: true,
                message: '请选择可用区',
              },
            ]}
          />

          <ProFormSelect
            label="付费方式"
            name="instanceChargeType"
            options={[
              {
                label: '包年包月',
                value: 'PREPAID',
              },
              { label: '按时付费', value: 'POSTPAID_BY_HOUR' },
            ]}
            rules={[
              {
                required: true,
                message: '请选择付费方式',
              },
            ]}
          />
          {instanceChargeType === 'POSTPAID_BY_HOUR' ? (
            <ProFormSelect
              label="时长（月）"
              name="instanceChargePeriod"
              initialValue={1}
              options={[
                {
                  label: '1',
                  value: 1,
                },
                {
                  label: '2',
                  value: 2,
                },
                {
                  label: '3',
                  value: 3,
                },
                {
                  label: '4',
                  value: 4,
                },
                {
                  label: '5',
                  value: 5,
                },
                {
                  label: '6',
                  value: 6,
                },
                {
                  label: '7',
                  value: 7,
                },
                {
                  label: '8',
                  value: 8,
                },
                {
                  label: '9',
                  value: 9,
                },
                {
                  label: '10',
                  value: 10,
                },
                {
                  label: '11',
                  value: 11,
                },
                {
                  label: '12',
                  value: 12,
                },
                {
                  label: '24',
                  value: 24,
                },
                {
                  label: '36',
                  value: 36,
                },
                {
                  label: '48',
                  value: 48,
                },
                {
                  label: '60',
                  value: 60,
                },
              ]}
              rules={[
                {
                  required: true,
                  message: '请选择释放时间',
                },
              ]}
            />
          ) : instanceChargeType === 'PREPAID' ? (
            <ProFormSelect
              label="续费模式"
              name="instanceChargeRenewFlag"
              initialValue="NOTIFY_AND_MANUAL_RENEW"
              options={[
                {
                  label: '通知过期且自动续费',
                  value: 'NOTIFY_AND_AUTO_RENEW',
                },
                {
                  label: '通知过期不自动续费',
                  value: 'NOTIFY_AND_MANUAL_RENEW',
                },
                {
                  label: '不通知过期不自动续费',
                  value: 'DISABLE_NOTIFY_AND_MANUAL_RENEW',
                },
              ]}
            />
          ) : (
            <div />
          )}

          <div />

          <ProFormSelect
            label="资源规格"
            name="instanceTypeUid"
            options={instanceTypeOptions.selectOptions}
            rules={[
              {
                required: true,
                message: '请选择资源规格',
              },
            ]}
          />

          <ProFormSelect
            label="镜像名称"
            name="imageUid"
            options={imageOptions.selectOptions}
            rules={[
              {
                required: true,
                message: '请选择镜像',
              },
            ]}
          />

          <ProFormSelect
            label="CPU"
            name="cpu"
            options={[
              {
                label: '2核',
                value: 2,
              },
              {
                label: '4核',
                value: 4,
              },
              {
                label: '8核',
                value: 8,
              },
            ]}
            rules={[
              {
                required: true,
                message: '请选择CPU',
              },
            ]}
          />

          <ProFormSelect
            label="内存"
            name="memory"
            options={[
              {
                label: '8G',
                value: 8,
              },
              {
                label: '16G',
                value: 16,
              },
              {
                label: '32G',
                value: 32,
              },
            ]}
            rules={[
              {
                required: true,
                message: '请选择内存',
              },
            ]}
          />

          <div className="col-span-3">
            <DiskSelectGroup label="系统盘" />

            <ProFormList label="数据盘（多选）" name="dataDisks">
              <DiskSelectGroup />
            </ProFormList>
          </div>

          <ProFormSelect
            label="带宽"
            name="internetMaxBandwidthOut"
            options={[
              {
                label: '2M',
                value: 2,
              },
              {
                label: '10M',
                value: 10,
              },
            ]}
            rules={[
              {
                required: true,
                message: '请选择带宽',
              },
            ]}
          />

          <div className="col-span-3">
            <ProFormList label="VPC（多选）" name="vpcSubnetUids">
              <div className="flex">
                <ProFormSelect
                  name="vpcUid"
                  placeholder={'VPC'}
                  options={vpcOptions.selectOptions}
                  rules={[
                    {
                      required: true,
                      message: '请选择VPC',
                    },
                  ]}
                />

                <ProFormDependency name={['vpcUid']}>
                  {({ vpcUid }) => <SubnetSelect vpcUid={vpcUid} />}
                </ProFormDependency>
              </div>
            </ProFormList>
          </div>

          <div className="col-span-3">
            <ProFormSelect
              mode="multiple"
              label="安全组（多选）"
              name="securityGroupUids"
              options={securityGroupOptions.selectOptions}
            />
          </div>

          <div className="col-span-3">
            <ProFormSelect
              label="应用（多选）"
              mode="multiple"
              name="appUids"
              options={appOptions.options.map((item) => ({
                value: item.Uid,
                label: `${item.App} ${item.Version}`,
              }))}
            />
          </div>

          <div className="col-span-3">
            <ProFormSelect
              label="标签（多选）"
              mode="multiple"
              name="cloudTagUids"
              options={cloudTagOptions.selectOptions}
            />
          </div>

          <ProFormText.Password
            label="登录密码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入登录密码',
              },
            ]}
          />

          <div className="col-span-3">
            <ProFormDigit
              label="数量"
              name="count"
              min={1}
              initialValue={1}
              fieldProps={{ precision: 0 }}
            />
          </div>
        </div>
      </ProForm>
    </div>
  );
}
