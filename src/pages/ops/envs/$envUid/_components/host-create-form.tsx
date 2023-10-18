import { cloudSyncTargetMap } from '@/constants/cloud';
import {
  DEFAULT_DISK_SIZE,
  DEFAULT_DISK_TYPE,
  DEFAULT_INSTANCE_CHARGE_TYPE,
  DEFAULT_INSTANCE_RENEW_FLAG,
  DEFAULT_INTERNET_CHARGE_TYPE,
  diskTypeDict,
  instanceChargeTypeDict,
  internetChargeTypeDict,
  renewFlagDict,
} from '@/constants/dict';
import { usePersonOptions } from '@/lib/hooks';
import { appOptionsApiCmdbAppsOptions } from '@/services/cmdb/app';
import {
  cloudOptionsApiCmdbCloudsOptions,
  cloudSyncApiCmdbCloudsSync,
} from '@/services/cmdb/cloud';
import { cloudTagOptionsApiCmdbCloudtagsOptions } from '@/services/cmdb/cloudTag';
import { hosttypeOptionsApiCmdbHosttypesOptions } from '@/services/cmdb/hosttype';
import { imageOptionsApiCmdbImagesOptions } from '@/services/cmdb/image';
import { instanceTypeQuotaItemOptionsApiCmdbInstypesOptions } from '@/services/cmdb/instype';
import { projectOptionsApiCmdbProjectsOptions } from '@/services/cmdb/project';
import { regionOptionsApiCmdbRegionsOptions } from '@/services/cmdb/region';
import { securitygroupOptionsApiCmdbSecuritygroupsOptions } from '@/services/cmdb/securitygroup';
import { subnetOptionsApiCmdbSubnetsOptions } from '@/services/cmdb/subnet';
import { vpcOptionsApiCmdbVpcsOptions } from '@/services/cmdb/vpc';
import { zoneOptionsApiCmdbZonesOptions } from '@/services/cmdb/zone';
import { SyncOutlined } from '@ant-design/icons';
import {
  ProForm,
  ProFormDependency,
  ProFormDigit,
  ProFormList,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useQuery } from '@tanstack/react-query';
import { useParams } from '@umijs/max';
import { AutoComplete, Tooltip, message } from 'antd';
import { useWatch } from 'antd/es/form/Form';
import useModal from 'antd/es/modal/useModal';
import clsx from 'clsx';
import { useEffect } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { useHostCreateForm } from './host-create-form-provider';

export interface HostCreateFormData {
  uuid: string;
  envId: string;
  project?: CMDB.ProjectOption;
  hostType?: CMDB.HostTypeOption;
  opsIds?: string[];
  supportIds?: string[];
  description?: string;
  apps?: CMDB.AppOption[];
  count?: number;
  cloud?: CMDB.CloudOption;
  cloudTags?: CMDB.CloudTagOption[];
  instanceType?: CMDB.InstanceTypeQuotaItemOption;

  // AutoComplete need string value
  cpu?: string;
  memory?: string;
  instanceChargePeriod?: string;
  internetMaxBandwidthOut?: string;

  diskSize?: number;
  diskType?: string;
  dataDisks?: {
    diskSize?: number;
    diskType?: string;
  }[];
  region?: CMDB.RegionOption;
  zone?: CMDB.ZoneOption;
  vpcSubnets?: { vpc?: CMDB.VpcOption; subnet?: CMDB.SubnetOption }[];
  securityGroups?: CMDB.SecurityGroupOption[];
  image?: CMDB.ImageOption;
  password?: string;

  instanceChargeRenewFlag?: string;
  instanceChargeType?: string;
  internetChargeType?: string;
  publicIpAssigned?: boolean;
}

export function generateEmptyHostFormData(envId: string): HostCreateFormData {
  return {
    uuid: uuidV4(),
    envId,
    vpcSubnets: [{}],
    count: 1,
    diskType: DEFAULT_DISK_TYPE,
    diskSize: DEFAULT_DISK_SIZE,
    instanceChargePeriod: '1',
    instanceChargeRenewFlag: DEFAULT_INSTANCE_RENEW_FLAG,
    instanceChargeType: DEFAULT_INSTANCE_CHARGE_TYPE,
    internetChargeType: DEFAULT_INTERNET_CHARGE_TYPE,
    internetMaxBandwidthOut: '200',
    publicIpAssigned: true,

    project: undefined,
    hostType: undefined,
    opsIds: undefined,
    supportIds: undefined,
    description: undefined,
    apps: undefined,
    cloud: undefined,
    cloudTags: undefined,
    instanceType: undefined,
    cpu: undefined,
    memory: undefined,
    dataDisks: undefined,
    region: undefined,
    zone: undefined,
    securityGroups: undefined,
    image: undefined,
    password: undefined,
  };
}

function HostNameDisplay() {
  const { form } = useHostCreateForm();

  const hostType = useWatch('hostType', form);
  const cloud = useWatch('cloud', form);
  const region = useWatch('region', form);
  const apps = useWatch('apps', form);
  const ruleRuleDefinition = hostType?.RuleDefinition;

  let hostName = ruleRuleDefinition ?? '-';

  if (ruleRuleDefinition) {
    if (cloud) {
      hostName = hostName.replaceAll('{{.Cloud}}', cloud.ResourceGroup);
    }
    if (region) {
      hostName = hostName.replaceAll('{{.Region}}', region?.Region);
    }
    if (apps) {
      hostName = hostName.replaceAll(
        '{{.Apps}}',
        apps.map((app) => app.App).join('-'),
      );
    }
  }

  return (
    <ProFormText
      label="主机名"
      readonly
      fieldProps={{
        value: hostName,
      }}
    />
  );
}

function ProjectSelect() {
  const { form } = useHostCreateForm();

  const { envUid } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['project-options', envUid],
    queryFn: () => projectOptionsApiCmdbProjectsOptions({ EnvUid: envUid! }),
  });

  const projects = data?.data?.list ?? [];

  return (
    <ProFormSelect
      label="所属项目"
      name="project"
      showSearch
      placeholder=""
      fieldProps={{ loading: isLoading }}
      options={projects.map((project) => ({
        ...project,
        label: project.ProjectName,
        value: project.Project,
      }))}
      onChange={(_, option) => form.setFieldValue('project', option)}
      rules={[{ required: true, message: '请选择所属项目' }]}
    />
  );
}

function HostTypeSelect() {
  const { form } = useHostCreateForm();

  const { data, isLoading } = useQuery({
    queryKey: ['host-type-options'],
    queryFn: () => hosttypeOptionsApiCmdbHosttypesOptions({}),
  });

  const hostTypes = data?.data?.list ?? [];

  return (
    <ProFormSelect
      label="主机类型"
      name="hostType"
      showSearch
      placeholder=""
      fieldProps={{ loading: isLoading }}
      options={hostTypes.map((hostType) => ({
        ...hostType,
        label: hostType.HostType,
        value: hostType.HostType,
      }))}
      onChange={(_, option) => form.setFieldValue('hostType', option)}
      rules={[{ required: true, message: '请选择主机类型' }]}
    />
  );
}

function OpsMultiSelect() {
  const opsPersons = usePersonOptions('运维');

  return (
    <ProFormSelect
      label="运维"
      name="opsIds"
      mode="multiple"
      showSearch
      placeholder=""
      options={opsPersons.map((ops) => ({
        label: ops.PersonName,
        value: ops.PersonId,
      }))}
      rules={[
        {
          required: true,
          message: '请选择至少一名运维人员',
        },
      ]}
    />
  );
}

function SupportMultiSelect() {
  const supportPersons = usePersonOptions('技术支持');

  return (
    <ProFormSelect
      label="技术支持"
      name="supportIds"
      mode="multiple"
      showSearch
      placeholder=""
      options={supportPersons.map((support) => ({
        label: support.PersonName,
        value: support.PersonId,
      }))}
    />
  );
}

function AppMultiSelect() {
  const { form } = useHostCreateForm();

  const { data, isLoading } = useQuery({
    queryKey: ['app-options'],
    queryFn: () => appOptionsApiCmdbAppsOptions({}),
  });

  const apps = data?.data?.list ?? [];

  return (
    <ProFormSelect
      label="应用"
      name="apps"
      mode="multiple"
      fieldProps={{ loading: isLoading }}
      showSearch
      placeholder=""
      options={apps.map((app) => ({
        ...app,
        label: `${app.App}:${app.Version}`,
        value: app.Uid,
      }))}
      onChange={(_, options) => form.setFieldValue('apps', options)}
    />
  );
}

function DescriptionTextArea() {
  return (
    <ProFormTextArea
      label="备注"
      name="description"
      placeholder=""
      fieldProps={{ rows: 1 }}
    />
  );
}

function CloudSelect() {
  const { form, isInitial } = useHostCreateForm();

  const cloud = useWatch('cloud', form);

  useEffect(() => {
    if (!isInitial) {
      form.resetFields(['region', 'cloudTags']);
    }
  }, [cloud]);

  const { data, isLoading } = useQuery({
    queryKey: ['cloud-options'],
    queryFn: () => cloudOptionsApiCmdbCloudsOptions({}),
  });

  const clouds = data?.data?.list ?? [];

  return (
    <ProFormSelect
      label="资源组"
      name="cloud"
      showSearch
      placeholder=""
      fieldProps={{ loading: isLoading }}
      options={clouds.map((cloud) => ({
        ...cloud,
        label: cloud.ResourceGroup,
        value: cloud.ResourceGroup,
      }))}
      onChange={(_, option) => form.setFieldValue('cloud', option)}
      rules={[{ required: true, message: '请选择资源组' }]}
    />
  );
}

function RegionSelect() {
  const { form, isInitial } = useHostCreateForm();

  const cloud = useWatch('cloud', form);
  const region = useWatch('region', form);

  useEffect(() => {
    if (!isInitial) {
      form.resetFields(['zone', 'securityGroups', 'image']);
      form.setFieldValue('vpcSubnets', [{}]);
    }
  }, [region]);

  const { data, isLoading } = useQuery({
    queryKey: ['region-options', cloud?.Uid],
    queryFn: () => regionOptionsApiCmdbRegionsOptions({ CloudUid: cloud!.Uid }),
    enabled: cloud !== undefined,
  });

  const regions = (data?.data?.list ?? []).filter(
    (region) => region.RegionState === 'AVAILABLE',
  );

  return (
    <ProFormSelect
      label="区域"
      name="region"
      showSearch
      placeholder=""
      fieldProps={{ loading: isLoading }}
      options={regions.map((region) => ({
        ...region,
        label: region.RegionName,
        value: region.Region,
      }))}
      onChange={(_, option) => form.setFieldValue('region', option)}
      rules={[{ required: true, message: '请选择区域' }]}
    />
  );
}

function ZoneSelect() {
  const { form, isInitial } = useHostCreateForm();

  const region = useWatch('region', form);
  const zone = useWatch('zone', form);

  useEffect(() => {
    if (!isInitial) {
      form.resetFields(['instanceType']);
    }
  }, [zone]);

  const { data, isLoading } = useQuery({
    queryKey: ['zone-options', region?.Uid],
    queryFn: () => zoneOptionsApiCmdbZonesOptions({ RegionUid: region!.Uid }),
    enabled: region !== undefined,
  });

  const zones = (data?.data?.list ?? []).filter(
    (zone) => zone.ZoneState === 'AVAILABLE',
  );

  useEffect(() => {
    const vpcSubnets = form.getFieldValue(
      'vpcSubnets',
    ) as HostCreateFormData['vpcSubnets'];
    if (vpcSubnets) {
      const newVpcSubnets = vpcSubnets.filter(
        (vpcSubnet) =>
          !vpcSubnet.subnet ||
          !vpcSubnet.subnet.Zone ||
          vpcSubnet.subnet.Zone === zone?.Zone,
      );
      form.setFieldValue(
        'vpcSubnets',
        newVpcSubnets.length === 0 ? [{}] : newVpcSubnets,
      );
      form.validateFields(['vpcSubnets']);
    }
  }, [zone]);

  return (
    <ProFormSelect
      label="可用区"
      name="zone"
      showSearch
      placeholder=""
      fieldProps={{ loading: isLoading }}
      options={zones.map((zone) => ({
        ...zone,
        label: zone.ZoneName,
        value: zone.Zone,
      }))}
      onChange={(_, option) => form.setFieldValue('zone', option)}
      rules={[{ required: true, message: '请选择可用区' }]}
    />
  );
}

function ImageSelect() {
  const { form } = useHostCreateForm();

  const region = useWatch('region', form);

  const { data, isLoading } = useQuery({
    queryKey: ['image-options', region?.Uid],
    queryFn: () => imageOptionsApiCmdbImagesOptions({ RegionUid: region!.Uid }),
    enabled: region !== undefined,
  });

  const images = (data?.data?.list ?? []).filter(
    (image) => image.ImageState === 'NORMAL',
  );

  return (
    <ProFormSelect
      label="镜像"
      name="image"
      showSearch
      placeholder=""
      fieldProps={{ loading: isLoading }}
      options={images.map((image) => ({
        ...image,
        label: image.ImageName,
        value: image.ImageId,
      }))}
      onChange={(_, option) => form.setFieldValue('image', option)}
      rules={[{ required: true, message: '请选择镜像' }]}
    />
  );
}

function InstanceTypeSelect() {
  const { form } = useHostCreateForm();

  const zone = useWatch('zone', form);

  const { data, isLoading } = useQuery({
    queryKey: ['instance-type-options', zone?.Uid],
    queryFn: () =>
      instanceTypeQuotaItemOptionsApiCmdbInstypesOptions({
        ZoneUid: zone!.Uid,
      }),
    enabled: zone !== undefined,
  });

  const instanceTypes = (data?.data?.list ?? []).filter(
    (instanceType) => instanceType.Status === 'SELL',
  );

  return (
    <ProFormSelect
      label="资源规格"
      name="instanceType"
      showSearch
      placeholder=""
      fieldProps={{ loading: isLoading }}
      options={instanceTypes.map((instanceType) => ({
        ...instanceType,
        label:
          instanceType.Cpu && instanceType.Memory
            ? `${instanceType.InstanceType}_${instanceType.Cpu}C${instanceType.Memory}G`
            : instanceType.InstanceType,
        value: instanceType.InstanceType,
      }))}
      onChange={(_, option) => form.setFieldValue('instanceType', option)}
      rules={[{ required: true, message: '请选择资源规格' }]}
    />
  );
}

function CpuSelect() {
  const { form } = useHostCreateForm();

  const instanceType = useWatch('instanceType', form);

  const disabled =
    instanceType && instanceType.Cpu > 0 && instanceType.Memory > 0;

  useEffect(() => {
    if (disabled) {
      form.setFieldValue('cpu', instanceType.Cpu);
      form.validateFields(['cpu']);
    }
  }, [instanceType]);

  return (
    <ProForm.Item
      label="CPU"
      name="cpu"
      rules={[
        {
          required: true,
          message: '请选择CPU核心数',
        },
        {
          pattern: /^[1-9]\d*$/,
          message: '请输入正整数',
        },
      ]}
    >
      <AutoComplete
        disabled={disabled}
        suffixIcon="核心"
        options={[
          {
            value: '1',
          },
          {
            value: '2',
          },
          {
            value: '4',
          },
          {
            value: '6',
          },
          {
            value: '8',
          },
          {
            value: '16',
          },
          {
            value: '24',
          },
          {
            value: '32',
          },
        ]}
      />
    </ProForm.Item>
  );
}

function MemorySelect() {
  const { form } = useHostCreateForm();

  const instanceType = useWatch('instanceType', form);

  const disabled =
    instanceType && instanceType.Cpu > 0 && instanceType.Memory > 0;

  useEffect(() => {
    if (disabled) {
      form.setFieldValue('memory', instanceType.Memory);
      form.validateFields(['memory']);
    }
  }, [instanceType]);

  return (
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
        disabled={disabled}
        suffixIcon="GB"
        options={[
          {
            value: '1',
          },
          {
            value: '2',
          },
          {
            value: '4',
          },
          {
            value: '6',
          },
          {
            value: '8',
          },
          {
            value: '16',
          },
          {
            value: '24',
          },
          {
            value: '32',
          },
        ]}
      />
    </ProForm.Item>
  );
}

function InstanceChargeTypeSelect() {
  return (
    <ProFormSelect
      label="付费方式"
      name="instanceChargeType"
      options={Object.entries(instanceChargeTypeDict).map(([key, value]) => ({
        label: value,
        value: key,
      }))}
      placeholder=""
      rules={[
        {
          required: true,
          message: '请选择付费方式',
        },
      ]}
    />
  );
}

function InstanceChargePeriodSelect() {
  const { form } = useHostCreateForm();
  const instanceChargeType = useWatch('instanceChargeType', form);

  return (
    <ProForm.Item
      label="时长"
      hidden={instanceChargeType !== 'PREPAID'}
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
        suffixIcon="月"
        options={[
          {
            value: '1',
          },
          {
            value: '2',
          },
          {
            value: '3',
          },
          {
            value: '4',
          },
          {
            value: '5',
          },
          {
            value: '6',
          },
          {
            value: '7',
          },
          {
            value: '8',
          },
          {
            value: '9',
          },
          {
            value: '10',
          },
          {
            value: '11',
          },
          {
            value: '12',
          },
          {
            value: '24',
          },
          {
            value: '36',
          },
          {
            value: '48',
          },
          {
            value: '64',
          },
        ]}
      />
    </ProForm.Item>
  );
}

function InstanceChargeRenewFlagSelect() {
  const { form } = useHostCreateForm();
  const instanceChargeType = useWatch('instanceChargeType', form);

  return (
    <ProFormSelect
      label="续费模式"
      name="instanceChargeRenewFlag"
      placeholder=""
      hidden={instanceChargeType !== 'PREPAID'}
      options={Object.entries(renewFlagDict).map(([key, value]) => ({
        label: value,
        value: key,
      }))}
      rules={[{ required: true, message: '请选择续费模式' }]}
    />
  );
}

function PublicIpAssignedSwitch() {
  return <ProFormSwitch label="绑定公网IP" name="publicIpAssigned" />;
}

function InternetMaxBandwidthOutSelect() {
  const { form } = useHostCreateForm();
  const publicIpAssigned = useWatch('publicIpAssigned', form);

  return (
    <ProForm.Item
      label="带宽"
      hidden={!publicIpAssigned}
      name="internetMaxBandwidthOut"
      rules={[
        {
          required: true,
          message: '请选择或者输入带宽大小',
        },
        {
          pattern: /^[1-9]\d*$/,
          message: '请输入正整数',
        },
      ]}
    >
      <AutoComplete
        suffixIcon="MB"
        options={[
          {
            value: '50',
          },
          {
            value: '100',
          },
          {
            value: '200',
          },
        ]}
      />
    </ProForm.Item>
  );
}

function InternetChargeTypeSelect() {
  const { form } = useHostCreateForm();
  const publicIpAssigned = useWatch('publicIpAssigned', form);

  return (
    <ProFormSelect
      label="付费类型"
      name="internetChargeType"
      placeholder=""
      hidden={!publicIpAssigned}
      options={Object.entries(internetChargeTypeDict).map(([key, value]) => ({
        label: value,
        value: key,
      }))}
      rules={[
        {
          required: true,
          message: '请选择付费类型',
        },
      ]}
    />
  );
}

function SystemDiskSelect() {
  return (
    <div className="flex">
      <ProFormSelect
        label="系统盘"
        name="diskType"
        placeholder=""
        width={160}
        options={Object.entries(diskTypeDict).map(([key, value]) => ({
          label: value,
          value: key,
        }))}
        rules={[
          {
            required: true,
            message: '请选择硬盘类型',
          },
        ]}
      />

      <ProFormDigit
        name="diskSize"
        min={10}
        max={2000}
        placeholder=""
        fieldProps={{
          step: 10,
          addonAfter: 'GB',
        }}
        width={110}
        rules={[
          {
            required: true,
            message: '请输入硬盘大小',
          },
        ]}
      />
    </div>
  );
}

function DataDiskMultiSelect() {
  return (
    <ProFormList label="数据盘" name="dataDisks">
      <div className="flex">
        <ProFormSelect
          name="diskType"
          placeholder=""
          width={160}
          options={Object.entries(diskTypeDict).map(([key, value]) => ({
            label: value,
            value: key,
          }))}
          initialValue={DEFAULT_DISK_TYPE}
          rules={[
            {
              required: true,
              message: '请选择硬盘类型',
            },
          ]}
        />

        <ProFormDigit
          name="diskSize"
          min={10}
          max={2000}
          placeholder=""
          fieldProps={{
            step: 10,
            addonAfter: 'GB',
          }}
          width={110}
          initialValue={DEFAULT_DISK_SIZE}
          rules={[
            {
              required: true,
              message: '请输入硬盘大小',
            },
          ]}
        />
      </div>
    </ProFormList>
  );
}

function CloudSyncIconButton({
  className,
  onClick,
}: {
  className?: string;
  onClick: VoidFunction;
}) {
  return (
    <Tooltip className={clsx('mb-6', className)} title="同步">
      <SyncOutlined
        width={12}
        height={12}
        className="cursor-pointer hover:text-blue-400"
        onClick={onClick}
      />
    </Tooltip>
  );
}

function SubnetSelect({ index, vpc }: { index: number; vpc?: CMDB.VpcOption }) {
  const { form, isInitial } = useHostCreateForm();
  const zone = useWatch('zone', form);

  const { data, isLoading } = useQuery({
    queryKey: ['vpc-options', vpc?.Uid],
    queryFn: () =>
      subnetOptionsApiCmdbSubnetsOptions({
        VpcUid: vpc!.Uid,
      }),
    enabled: vpc !== undefined,
  });

  useEffect(() => {
    if (!isInitial) {
      form.resetFields([['vpcSubnets', index, 'subnet']]);
    }
  }, [vpc?.Uid]);

  const subnets = (data?.data?.list ?? []).filter(
    (subnet) => !subnet.Zone || subnet.Zone === zone?.Zone,
  );

  return (
    <ProFormSelect
      name="subnet"
      showSearch
      width={250}
      fieldProps={{
        loading: isLoading,
      }}
      placeholder="子网"
      options={subnets.map((subnet) => ({
        ...subnet,
        label: subnet.SubnetName,
        value: subnet.SubnetId,
      }))}
      rules={[
        {
          required: true,
          message: '请选择子网',
        },
      ]}
      onChange={(_, option) =>
        form.setFieldValue(['vpcSubnets', index, 'subnet'], option)
      }
    />
  );
}

function VpcSubnetMultiSelect() {
  const [modal, contextHolder] = useModal();
  const { form } = useHostCreateForm();

  const cloud = useWatch('cloud', form);
  const region = useWatch('region', form);
  const vpcSubnets = useWatch('vpcSubnets', form);
  const vpcIds = vpcSubnets?.map((vpcSubnet) => vpcSubnet.vpc?.VpcId) ?? [];

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['vpc-options', region?.Uid],
    queryFn: () =>
      vpcOptionsApiCmdbVpcsOptions({
        RegionUid: region!.Uid,
      }),
    enabled: region !== undefined,
  });

  const vpcs = data?.data?.list ?? [];

  useEffect(() => {
    const securityGroups = form.getFieldValue(
      'securityGroups',
    ) as HostCreateFormData['securityGroups'];
    if (securityGroups) {
      const newGroups = securityGroups.filter(
        (sg) => !sg.VpcId || vpcIds.includes(sg.VpcId),
      );
      form.setFieldValue('securityGroups', newGroups);
      form.validateFields(['securityGroups']);
    }
  }, [vpcIds]);

  const sync = () => {
    if (cloud && region) {
      modal.confirm({
        title: '确定要同步网络吗？',
        content: `所选资源组：${cloud?.ResourceGroup}，所选区域：${region.RegionName}`,
        onOk: async () => {
          await cloudSyncApiCmdbCloudsSync({
            CloudUid: cloud.Uid,
            RegionUid: region.Uid,
            target: cloudSyncTargetMap['vpc'],
          });
          refetch();
          message.success('同步成功');
        },
      });
    } else {
      message.warning('请先选择资源组和区域');
    }
  };

  return (
    <ProFormList
      label="网络"
      name="vpcSubnets"
      rules={[
        {
          required: true,
          message: '请选择网络',
          validator: (_, value) => {
            if (!value || value.length === 0) {
              return Promise.reject();
            } else {
              return Promise.resolve();
            }
          },
        },
      ]}
    >
      {(_, index) => (
        <div className="flex">
          {contextHolder}
          <ProFormSelect
            name="vpc"
            showSearch
            width={250}
            fieldProps={{
              loading: isLoading,
            }}
            placeholder={'VPC'}
            options={vpcs.map((vpc) => ({
              ...vpc,
              label: vpc.VpcName,
              value: vpc.VpcId,
            }))}
            rules={[
              {
                required: true,
                message: '请选择VPC',
              },
            ]}
            onChange={(_, option) =>
              form.setFieldValue(['vpcSubnets', index, 'vpc'], option)
            }
          />

          <ProFormDependency name={['vpc']}>
            {({ vpc }) => <SubnetSelect index={index} vpc={vpc} />}
          </ProFormDependency>

          <CloudSyncIconButton className="ml-2 mt-px" onClick={sync} />
        </div>
      )}
    </ProFormList>
  );
}

function SecurityGroupMultiSelect() {
  const [modal, contextHolder] = useModal();
  const { form } = useHostCreateForm();

  const cloud = useWatch('cloud', form);
  const region = useWatch('region', form);
  const vpcSubnets = useWatch('vpcSubnets', form);
  const vpcIds = vpcSubnets?.map((item) => item.vpc?.VpcId) ?? [];

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['security-group-options', region?.Uid],
    queryFn: () =>
      securitygroupOptionsApiCmdbSecuritygroupsOptions({
        RegionUid: region!.Uid,
      }),
    enabled: region !== undefined,
  });

  const securityGroups = (data?.data?.list ?? []).filter(
    (securityGroup) =>
      !securityGroup.VpcId || vpcIds.includes(securityGroup.VpcId),
  );

  const sync = () => {
    if (cloud && region) {
      modal.confirm({
        title: '确定要同步安全组吗？',
        content: `所选资源组：${cloud?.ResourceGroup}，所选区域：${region.RegionName}`,
        onOk: async () => {
          await cloudSyncApiCmdbCloudsSync({
            CloudUid: cloud.Uid,
            RegionUid: region.Uid,
            target: cloudSyncTargetMap['security-group'],
          });
          refetch();
          message.success('同步成功');
        },
      });
    } else {
      message.warning('请先选择资源组和区域');
    }
  };

  return (
    <div className="flex gap-x-2">
      {contextHolder}
      <div className="w-full">
        <ProFormSelect
          label="安全组"
          name="securityGroups"
          mode="multiple"
          showSearch
          placeholder=""
          fieldProps={{ loading: isLoading }}
          options={securityGroups.map((securityGroup) => ({
            ...securityGroup,
            label: securityGroup.SecurityGroupName,
            value: securityGroup.SecurityGroupId,
          }))}
          onChange={(_, options) =>
            form.setFieldValue('securityGroups', options)
          }
        />
      </div>
      <CloudSyncIconButton onClick={sync} />
    </div>
  );
}

function CloudTagMultiSelect() {
  const [modal, contextHolder] = useModal();
  const { form } = useHostCreateForm();

  const cloud = useWatch('cloud', form);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['cloud-tag-options', cloud?.Uid],
    queryFn: () =>
      cloudTagOptionsApiCmdbCloudtagsOptions({
        CloudUid: cloud!.Uid,
      }),
    enabled: cloud !== undefined,
  });

  const cloudTags = data?.data?.list ?? [];

  const sync = () => {
    if (cloud) {
      modal.confirm({
        title: '确定要同步云商标签吗？',
        content: `所选资源组：${cloud?.ResourceGroup}`,
        onOk: async () => {
          await cloudSyncApiCmdbCloudsSync({
            CloudUid: cloud.Uid,
            target: cloudSyncTargetMap['tag'],
          });
          refetch();
          message.success('同步成功');
        },
      });
    } else {
      message.warning('请先选择资源组');
    }
  };

  return (
    <div className="flex gap-x-2">
      {contextHolder}
      <div className="w-full">
        <ProFormSelect
          label="云商标签"
          name="cloudTags"
          mode="multiple"
          showSearch
          placeholder=""
          fieldProps={{ loading: isLoading }}
          options={cloudTags.map((tag) => ({
            ...tag,
            label: `${tag.Key}:${tag.Value}`,
            value: `${tag.Key}:${tag.Value}`,
          }))}
          onChange={(_, options) => form.setFieldValue('cloudTags', options)}
          rules={[
            {
              validateTrigger: ['onBlur', 'onChange'],
              message: '不能选择拥有相同Key的云商标签',
              validator: (_, value) => {
                const tags: any[] = value ?? [];
                const tagKeySet = new Set<string>();
                for (const tag of tags) {
                  const key =
                    typeof tag === 'string' ? tag.split(':')[0] : tag.Key;
                  if (tagKeySet.has(key)) {
                    return Promise.reject();
                  } else {
                    tagKeySet.add(key);
                  }
                }
                return Promise.resolve();
              },
            },
          ]}
        />
      </div>
      <CloudSyncIconButton onClick={sync} />
    </div>
  );
}

function PasswordInput() {
  return (
    <ProFormText.Password
      label="登录密码"
      name="password"
      placeholder=""
      rules={[
        {
          required: true,
          message: '请输入登录密码',
        },
        {
          pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&+=!]).{8,}$/,
          message: '不少于8个字符，至少包含数字、字母、特殊字符三种类型',
        },
      ]}
    />
  );
}

function CountInput() {
  return (
    <ProFormDigit
      label="数量"
      name="count"
      placeholder=""
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
  );
}

export default function HostCreateForm({
  env,
  onValuesChange,
}: {
  env: CMDB.EnvInfo;
  onValuesChange: VoidFunction;
}) {
  const { form } = useHostCreateForm();

  return (
    <ProForm
      form={form}
      name="host-create"
      layout="horizontal"
      labelCol={{ style: { width: 80 } }}
      submitter={{ render: false }}
      onValuesChange={onValuesChange}
    >
      <section>
        <h3 className="mb-4 text-sm font-semibold">管理信息</h3>
        <ProFormText name="uuid" hidden />
        <ProFormText name="envId" hidden />
        <div className="gap-2 xl:grid xl:grid-cols-2">
          <ProFormText
            label="所属环境"
            fieldProps={{ value: env.EnvName }}
            readonly
          />
          <HostNameDisplay />
        </div>
        <div className="gap-2 xl:grid xl:grid-cols-2">
          <ProjectSelect />
          <HostTypeSelect />
        </div>
        <OpsMultiSelect />
        <SupportMultiSelect />
        <AppMultiSelect />
        <DescriptionTextArea />
      </section>

      <section>
        <h3 className="mb-4 text-sm font-semibold">配置信息</h3>
        <div className="gap-2 xl:grid xl:grid-cols-2">
          <CloudSelect />
          <RegionSelect />
        </div>
        <div className="gap-2 xl:grid xl:grid-cols-2">
          <ZoneSelect />
          <ImageSelect />
        </div>
        <div className="gap-2 xl:grid xl:grid-cols-2">
          <InstanceTypeSelect />
          <div className="gap-2 xl:grid xl:grid-cols-2">
            <CpuSelect />
            <MemorySelect />
          </div>
        </div>
        <div className="gap-2 xl:grid xl:grid-cols-3">
          <InstanceChargeTypeSelect />
          <InstanceChargePeriodSelect />
          <InstanceChargeRenewFlagSelect />
        </div>
        <div className="gap-2 xl:grid xl:grid-cols-3">
          <PublicIpAssignedSwitch />
          <InternetMaxBandwidthOutSelect />
          <InternetChargeTypeSelect />
        </div>
        <div className="gap-2 xl:grid xl:grid-cols-2">
          <SystemDiskSelect />
          <DataDiskMultiSelect />
        </div>
        <VpcSubnetMultiSelect />
        <SecurityGroupMultiSelect />
        <CloudTagMultiSelect />
        <div className="gap-2 xl:grid xl:grid-cols-2">
          <PasswordInput />
          <CountInput />
        </div>
      </section>
    </ProForm>
  );
}
