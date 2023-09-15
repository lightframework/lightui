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
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { AutoComplete, Button } from 'antd';
import { FormInstance, useWatch } from 'antd/es/form/Form';
import clsx from 'clsx';
import { useEffect } from 'react';
import { StagedHost } from './HostCreateModal';

function DiskSelectGroup({ label }: { label?: string }) {
  return (
    <div className={clsx('flex', label && 'gap-x-[104px]')}>
      <ProFormSelect
        fieldProps={{
          style: { width: 200 },
        }}
        label={label}
        name="diskType"
        initialValue="CLOUD_PREMIUM"
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

function SubnetSelect({
  form,
  vpcUid,
  zone,
}: {
  form: FormInstance<StagedHost>;
  vpcUid?: string;
  zone: string;
}) {
  const subnetOptions = useSubnetOptions(vpcUid, { valueKey: 'SubnetId' });

  return (
    <ProFormSelect
      name="subnetId"
      showSearch
      style={{ minWidth: 250 }}
      placeholder={'子网'}
      options={subnetOptions.options
        .filter(
          (subnet) =>
            !subnet.Zone || subnet.Zone === '0' || subnet.Zone === zone,
        )
        .map((subnet) => ({
          label: subnet.SubnetName,
          value: subnet.SubnetId,
        }))}
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
  form,
  isSetForm,
}: {
  form: FormInstance<StagedHost>;
  isSetForm?: boolean;
}) {
  const { selectedItem: env } = useEnvList();

  const projectOptions = useProjectOptions(env?.Uid, { valueKey: 'Project' });
  const hostTypeOptions = useHostTypeOptions({ valueKey: 'HostType' });
  const opsPersonOptions = usePersonOptions('运维');
  const supportPersonOptions = usePersonOptions('技术支持');
  const cloudOptions = useCloudOptions({ valueKey: 'Cloud' });

  const resourceGroup = useWatch('resourceGroup', form);
  const cloudUid = cloudOptions.options.find(
    (option) => option.ResourceGroup === resourceGroup,
  )?.Uid;

  const cloudTagOptions = useCloudTagOptions(cloudUid);

  const regionOptions = useRegionOptions(cloudUid, { valueKey: 'Region' });

  const region = useWatch('region', form);
  const regionUid = regionOptions.options.find(
    (option) => option.Region === region,
  )?.Uid;

  const zoneOptions = useZoneOptions(regionUid, { valueKey: 'Zone' });

  const zone = useWatch('zone', form);
  const zoneUid = zoneOptions.options.find(
    (option) => option.Zone === zone,
  )?.Uid;

  const securityGroupOptions = useSecurityGroupOptions(regionUid, {
    valueKey: 'SecurityGroupId',
  });
  const imageOptions = useImageOptions(regionUid, { valueKey: 'ImageId' });
  const instanceTypeOptions = useInstanceTypeOptions(zoneUid, {
    valueKey: 'InstanceType',
  });

  const vpcOptions = useVpcOptions(regionUid, { valueKey: 'VpcId' });
  const appOptions = useAppOptions();

  const instanceChargeType = useWatch('instanceChargeType', form);
  const instanceType = useWatch('instanceType', form);

  const selectedInstanceType = instanceTypeOptions.options.find(
    (option) => option.InstanceType === instanceType,
  );
  const disableEditInstance =
    selectedInstanceType &&
    typeof selectedInstanceType.Cpu === 'number' &&
    selectedInstanceType.Cpu > 0 &&
    typeof selectedInstanceType.Memory === 'number' &&
    selectedInstanceType.Memory > 0;

  useEffect(() => {
    if (disableEditInstance) {
      form.setFieldValue('cpu', selectedInstanceType.Cpu);
      form.setFieldValue('memory', selectedInstanceType.Memory);
    }
  }, [selectedInstanceType]);

  const hostType = useWatch('hostType', form);

  const selectedHostType = hostTypeOptions.options.find(
    (option) => option.HostType === hostType,
  );

  const publicIpAssigned = useWatch('publicIpAssigned', form);

  useEffect(() => {
    if (!isSetForm) {
      form.resetFields(['region', 'cloudTagUids']);
    }
  }, [resourceGroup]);

  useEffect(() => {
    if (!isSetForm) {
      form.resetFields(['zone', 'securityGroupIds', 'vpcSubnetIds', 'imageId']);
    }
  }, [region]);

  useEffect(() => {
    if (!isSetForm) {
      form.resetFields(['instanceType']);
    }
  }, [zone]);

  if (!env) return;

  return (
    <div className="w-7/12 space-y-3 overflow-y-auto border border-solid border-[rgba(0,0,0,.08)] p-3">
      <ProForm<StagedHost>
        className="env-add-host-form"
        form={form}
        layout="horizontal"
        submitter={{
          searchConfig: {
            resetText: '重置',
            submitText: '添加',
          },
          render: () => [],
        }}
      >
        <div className="xl:grid xl:grid-cols-3">
          <div className="mb-3 flex items-center justify-between xl:col-span-3">
            <h3 className="text-sm font-semibold">管理信息</h3>
            <Button type="primary" danger onClick={() => form.resetFields()}>
              清除
            </Button>
          </div>

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
                value: (() => {
                  let name = selectedHostType?.RuleDefinition ?? '-';

                  if (resourceGroup)
                    name = name.replaceAll(
                      '{{.Cloud}}',
                      cloudOptions.options.find(
                        (option) => option.ResourceGroup === resourceGroup,
                      )?.Cloud ?? '{{.Cloud}}',
                    );
                  if (region) name = name.replaceAll('{{.Region}}', region);
                  if (zone) name = name.replaceAll('{{.Zone}}', zone);

                  return name;
                })(),
                bordered: false,
                allowClear: false,
              }}
            />
          </div>

          <ProFormText label="uuid" name="uuid" hidden />

          <ProFormSelect
            label="项目"
            name="project"
            showSearch
            options={projectOptions.selectOptions}
            rules={[
              {
                required: true,
                message: '请选择项目',
              },
            ]}
          />

          <ProFormSelect
            label="主机类型"
            name="hostType"
            showSearch
            options={hostTypeOptions.selectOptions}
            rules={[
              {
                required: true,
                message: '请选择主机类型',
              },
            ]}
          />

          <div className="col-span-3">
            <ProFormSelect
              mode="multiple"
              label="运维"
              name="opsUids"
              options={opsPersonOptions.selectOptions}
              rules={[
                () => ({
                  validateTrigger: ['onBlur', 'onChange'],
                  message: '请选择至少一名运维人员',
                  validator(_, value) {
                    const persons: string[] = value ?? [];
                    if (persons.length === 0) {
                      return Promise.reject();
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            />
          </div>

          <div className="col-span-3">
            <ProFormSelect
              mode="multiple"
              label="技术支持"
              name="supportUids"
              options={supportPersonOptions.selectOptions}
            />
          </div>

          <div className="col-span-3">
            <ProFormSelect
              label="应用（多选）"
              mode="multiple"
              name="appUids"
              options={appOptions.options.map((item) => ({
                value: item.Uid,
                label: `${item.App}:${item.Version}`,
              }))}
            />
          </div>

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

          <div className="col-span-3 xl:grid xl:grid-cols-2">
            <ProFormSelect
              label="资源组"
              name="resourceGroup"
              showSearch
              options={cloudOptions.options.map((option) => ({
                label: option.ResourceGroup,
                value: option.ResourceGroup,
              }))}
              rules={[
                {
                  required: true,
                  message: '请选择资源组',
                },
              ]}
            />

            <ProFormSelect
              label="区域"
              name="region"
              showSearch
              options={regionOptions.selectOptions}
              rules={[
                {
                  required: true,
                  message: '请选择区域',
                },
              ]}
            />
          </div>

          <div className="col-span-3 xl:grid xl:grid-cols-2">
            <ProFormSelect
              label="可用区"
              name="zone"
              showSearch
              options={zoneOptions.selectOptions}
              rules={[
                {
                  required: true,
                  message: '请选择可用区',
                },
              ]}
            />
            <ProFormSelect
              label="镜像"
              name="imageId"
              showSearch
              options={imageOptions.selectOptions}
              rules={[
                {
                  required: true,
                  message: '请选择镜像',
                },
              ]}
            />
          </div>

          <div className="col-span-3">
            <ProFormSelect
              label="资源规格"
              name="instanceType"
              showSearch
              options={instanceTypeOptions.options.map((option) => ({
                value: option.InstanceType,
                label:
                  option.Cpu !== 0 && option.Memory !== 0
                    ? `${option.InstanceType}_${option.Cpu}C${option.Memory}G`
                    : option.InstanceType,
              }))}
              rules={[
                {
                  required: true,
                  message: '请选择资源规格',
                },
              ]}
            />
          </div>

          <ProForm.Item
            label="CPU"
            name="cpu"
            rules={[
              {
                required: true,
                message: '请选择CPU核数',
              },
              {
                pattern: /^[1-9]\d*$/,
                message: '请输入正整数',
              },
            ]}
          >
            <AutoComplete
              disabled={disableEditInstance}
              suffixIcon={<span className="text-black/[0.88]">核</span>}
              options={[
                {
                  value: 1,
                },
                {
                  value: 2,
                },
                {
                  value: 4,
                },
                {
                  value: 6,
                },
                {
                  value: 8,
                },
                {
                  value: 16,
                },
                {
                  value: 24,
                },
                {
                  value: 32,
                },
              ]}
            />
          </ProForm.Item>

          <ProForm.Item
            label="内存"
            name="memory"
            rules={[
              {
                required: true,
                message: '请选择内存大小',
              },
              {
                pattern: /^[1-9]\d*$/,
                message: '请输入正整数',
              },
            ]}
          >
            <AutoComplete
              disabled={disableEditInstance}
              suffixIcon={<span className="text-black/[0.88]">GB</span>}
              options={[
                {
                  value: 1,
                },
                {
                  value: 2,
                },
                {
                  value: 4,
                },
                {
                  value: 6,
                },
                {
                  value: 8,
                },
                {
                  value: 16,
                },
                {
                  value: 24,
                },
                {
                  value: 32,
                },
              ]}
            />
          </ProForm.Item>

          <div />

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

          <ProForm.Item
            label="时长"
            hidden={instanceChargeType !== 'POSTPAID_BY_HOUR'}
            name="instanceChargePeriod"
            rules={[
              {
                required: true,
                message: '请选择开通时长',
              },
              {
                pattern: /^[1-9]\d*$/,
                message: '请输入正整数',
              },
            ]}
          >
            <AutoComplete
              suffixIcon={<span className="text-black/[0.88]">月</span>}
              options={[
                {
                  value: 1,
                },
                {
                  value: 2,
                },
                {
                  value: 3,
                },
                {
                  value: 4,
                },
                {
                  value: 5,
                },
                {
                  value: 6,
                },
                {
                  value: 7,
                },
                {
                  value: 8,
                },
                {
                  value: 9,
                },
                {
                  value: 10,
                },
                {
                  value: 11,
                },
                {
                  value: 12,
                },
                {
                  value: 24,
                },
                {
                  value: 36,
                },
                {
                  value: 48,
                },
                {
                  value: 64,
                },
              ]}
            />
          </ProForm.Item>

          <ProFormSelect
            label="续费模式"
            hidden={instanceChargeType !== 'PREPAID'}
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

          <div className="col-span-3 xl:grid xl:grid-cols-3">
            <ProFormRadio.Group
              name="publicIpAssigned"
              label="绑定公网ip"
              initialValue={true}
              options={[
                {
                  label: '是',
                  value: true,
                },
                {
                  label: '否',
                  value: false,
                },
              ]}
            />

            {publicIpAssigned ? (
              <ProForm.Item
                label="带宽"
                name="internetMaxBandwidthOut"
                rules={[
                  {
                    required: true,
                    message: '请选择带宽大小',
                  },
                  {
                    pattern: /^[1-9]\d*$/,
                    message: '请输入正整数',
                  },
                ]}
              >
                <AutoComplete
                  suffixIcon={<span className="text-black/[0.88]">MB</span>}
                  options={[
                    {
                      value: 50,
                    },
                    {
                      value: 100,
                    },
                    {
                      value: 200,
                    },
                  ]}
                />
              </ProForm.Item>
            ) : null}

            {publicIpAssigned ? (
              <ProFormSelect
                label="付费类型"
                name="internetChargeType"
                options={[
                  // {
                  //   label: '预付费按带宽结算',
                  //   value: 'BANDWIDTH_PREPAID',
                  // },
                  {
                    label: '流量按小时后付费',
                    value: 'TRAFFIC_POSTPAID_BY_HOUR',
                  },
                  // {
                  //   label: '带宽按小时后付费',
                  //   value: 'BANDWIDTH_POSTPAID_BY_HOUR',
                  // },
                  // {
                  //   label: '带宽包用户',
                  //   value: 'BANDWIDTH_PACKAGE',
                  // },
                ]}
                rules={[
                  {
                    required: true,
                    message: '请选择付费方式',
                  },
                ]}
              />
            ) : null}
          </div>

          <div className="col-span-3">
            <DiskSelectGroup label="系统盘" />

            <ProFormList label="数据盘（多选）" name="dataDisks">
              <DiskSelectGroup />
            </ProFormList>
          </div>

          <div className="col-span-3">
            <ProFormList label="网络（多选）" name="vpcSubnetIds">
              <div className="flex">
                <ProFormSelect
                  name="vpcId"
                  showSearch
                  style={{ minWidth: 200 }}
                  placeholder={'VPC'}
                  options={vpcOptions.selectOptions}
                  rules={[
                    {
                      required: true,
                      message: '请选择VPC',
                    },
                  ]}
                />

                <ProFormDependency name={['vpcId']}>
                  {({ vpcId }) => {
                    const vpcUid = vpcOptions.options.find(
                      (option) => option.VpcId === vpcId,
                    )?.Uid;

                    return (
                      <SubnetSelect form={form} vpcUid={vpcUid} zone={zone} />
                    );
                  }}
                </ProFormDependency>
              </div>
            </ProFormList>
          </div>

          <div className="col-span-3">
            <ProFormSelect
              mode="multiple"
              label="安全组（多选）"
              name="securityGroupIds"
              options={securityGroupOptions.selectOptions}
            />
          </div>

          <div className="col-span-3">
            <ProFormSelect
              label="标签（多选）"
              mode="multiple"
              name="cloudTagUids"
              options={cloudTagOptions.options.map((option) => ({
                label: `${option.Key}:${option.Value}`,
                value: option.Uid,
              }))}
              rules={[
                () => {
                  return {
                    validateTrigger: ['onBlur', 'onChange'],
                    message: '不能选择拥有相同Key的云商标签',
                    validator: (_, value) => {
                      const tagUids: string[] = value ?? [];

                      const tagSet = new Set<string>();

                      for (const uid of tagUids) {
                        const find = cloudTagOptions.options.find(
                          (option) => option.Uid === uid,
                        );
                        if (find) {
                          if (tagSet.has(find.Key)) {
                            return Promise.reject();
                          } else {
                            tagSet.add(find.Key);
                          }
                        }
                      }

                      return Promise.resolve();
                    },
                  };
                },
                // () => ({
                //   validateTrigger: ['onBlur', 'onChange'],
                //   message: '请选择至少一个云商标签',
                //   validator(_, value) {
                //     const tags: string[] = value ?? [];
                //     if (tags.length === 0) {
                //       return Promise.reject();
                //     }
                //     return Promise.resolve();
                //   },
                // }),
              ]}
            />
          </div>

          <div className="col-span-3">
            <ProFormText.Password
              label="登录密码"
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入登录密码',
                },
                {
                  pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&+=!]).{8,}$/,
                  message:
                    '不少于8个字符，至少包含数字、字母、特殊字符三种类型',
                },
              ]}
            />
          </div>

          <div className="col-span-3">
            <ProFormDigit
              label="数量"
              name="count"
              min={1}
              fieldProps={{ precision: 0 }}
              rules={[
                {
                  required: true,
                  message: '请输入机器数量',
                },
                {
                  pattern: /^[1-9]\d*$/,
                  message: '请输入正整数',
                },
              ]}
            />
          </div>
        </div>
      </ProForm>
    </div>
  );
}
