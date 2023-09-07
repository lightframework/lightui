import { appOptionsApiCmdbAppsOptions } from '@/services/cmdb/app';
import { cloudOptionsApiCmdbCloudsOptions } from '@/services/cmdb/cloud';
import { cloudTagOptionsApiCmdbCloudtagsOptions } from '@/services/cmdb/cloudTag';
import { envOptionsApiCmdbEnvsOptions } from '@/services/cmdb/env';
import { hosttypeOptionsApiCmdbHosttypesOptions } from '@/services/cmdb/hosttype';
import { imageOptionsApiCmdbImagesOptions } from '@/services/cmdb/image';
import { instanceTypeQuotaItemOptionsApiCmdbInstypesOptions } from '@/services/cmdb/instype';
import { personPageListApiCmdbPersons } from '@/services/cmdb/person';
import { professionOptionsApiCmdbProfessionsOptions } from '@/services/cmdb/profession';
import { projectOptionsApiCmdbProjectsOptions } from '@/services/cmdb/project';
import { regionOptionsApiCmdbRegionsOptions } from '@/services/cmdb/region';
import { securitygroupOptionsApiCmdbSecuritygroupsOptions } from '@/services/cmdb/securitygroup';
import { subnetOptionsApiCmdbSubnetsOptions } from '@/services/cmdb/subnet';
import { vpcOptionsApiCmdbVpcsOptions } from '@/services/cmdb/vpc';
import { zoneOptionsApiCmdbZonesOptions } from '@/services/cmdb/zone';
import { roleOptionsApiSysRolesOptions } from '@/services/sys/role';
import { userOptionsApiSysUsersOptions } from '@/services/sys/user';
import { useQuery } from '@tanstack/react-query';

export function generateOptions<DataType extends Record<string, any>>(
  data: { data?: { list?: DataType[] } } | undefined,
  config: {
    valueKey: keyof DataType;
    labelKey: keyof DataType;
    filterFn?: (value: DataType, index: number, array: DataType[]) => boolean;
  },
): { options: DataType[]; selectOptions: { label: string; value: string }[] } {
  if (!data?.data?.list) {
    return { options: [], selectOptions: [] };
  }

  const options = config.filterFn
    ? data.data.list.filter(config.filterFn)
    : data.data.list;

  const selectOptions = options.map((item) => ({
    label: item[config.labelKey],
    value: item[config.valueKey],
  }));

  return { options, selectOptions };
}

export function usePersonOptions(professionName?: string) {
  const { data } = useQuery({
    queryKey: ['person-options', professionName],
    queryFn: async () => {
      let professionUid: string | undefined = undefined;

      if (professionName) {
        const res = await professionOptionsApiCmdbProfessionsOptions({
          keywords: professionName,
        });
        if (res.data?.list && res.data.list.length !== 0) {
          professionUid = res.data.list[0].Uid;
        }
      }

      return personPageListApiCmdbPersons({ ProfessionUid: professionUid });
    },
  });

  return generateOptions(data, {
    labelKey: 'PersonName',
    valueKey: 'Uid',
    filterFn: (person) => person.Enabled,
  });
}

export function useCloudOptions(options?: { valueKey: keyof API.CloudOption }) {
  const { data } = useQuery({
    queryKey: ['cloud-options'],
    queryFn: () => cloudOptionsApiCmdbCloudsOptions({}),
  });
  return generateOptions(data, {
    labelKey: 'CloudName',
    valueKey: options?.valueKey ?? 'Uid',
  });
}

export function useCloudTagOptions(
  cloudUid?: string,
  options?: { valueKey: keyof API.CloudTagOption },
) {
  const { data } = useQuery({
    queryKey: ['cloud-tag-options', cloudUid],
    queryFn: () =>
      cloudTagOptionsApiCmdbCloudtagsOptions({ CloudUid: cloudUid! }),
    enabled: cloudUid !== undefined,
  });

  return generateOptions(data, {
    labelKey: 'Value',
    valueKey: options?.valueKey ?? 'Uid',
  });
}

export function useRegionOptions(
  cloudUid?: string,
  options?: { valueKey: keyof API.RegionOption },
) {
  const { data } = useQuery({
    queryKey: ['region-options', cloudUid],
    queryFn: () => regionOptionsApiCmdbRegionsOptions({ CloudUid: cloudUid! }),
    enabled: cloudUid !== undefined,
  });
  return generateOptions(data, {
    labelKey: 'RegionName',
    valueKey: options?.valueKey ?? 'Uid',
    filterFn: (item) => item.RegionState === 'AVAILABLE',
  });
}

export function useZoneOptions(
  regionUid?: string,
  options?: { valueKey: keyof API.ZoneOption },
) {
  const { data } = useQuery({
    queryKey: ['zone-options', regionUid],
    queryFn: () => zoneOptionsApiCmdbZonesOptions({ RegionUid: regionUid! }),
    enabled: regionUid !== undefined,
  });
  return generateOptions(data, {
    labelKey: 'ZoneName',
    valueKey: options?.valueKey ?? 'Uid',
    filterFn: (item) => item.ZoneState === 'AVAILABLE',
  });
}

export function useVpcOptions(
  regionUid?: string,
  options?: { valueKey: keyof API.VpcOption },
) {
  const { data } = useQuery({
    queryKey: ['vpc-options', regionUid],
    queryFn: () => vpcOptionsApiCmdbVpcsOptions({ RegionUid: regionUid! }),
    enabled: regionUid !== undefined,
  });
  return generateOptions(data, {
    labelKey: 'VpcName',
    valueKey: options?.valueKey ?? 'Uid',
  });
}

export function useSecurityGroupOptions(
  regionUid?: string,
  options?: { valueKey: keyof API.SecurityGroupOption },
) {
  const { data } = useQuery({
    queryKey: ['security-group-options', regionUid],
    queryFn: () =>
      securitygroupOptionsApiCmdbSecuritygroupsOptions({
        RegionUid: regionUid!,
      }),
    enabled: regionUid !== undefined,
  });
  return generateOptions(data, {
    labelKey: 'SecurityGroupName',
    valueKey: options?.valueKey ?? 'Uid',
  });
}

export function useImageOptions(
  regionUid?: string,
  options?: { valueKey: keyof API.ImageOption },
) {
  const { data } = useQuery({
    queryKey: ['image-options', regionUid],
    queryFn: () => imageOptionsApiCmdbImagesOptions({ RegionUid: regionUid! }),
    enabled: regionUid !== undefined,
  });
  return generateOptions(data, {
    labelKey: 'ImageName',
    valueKey: options?.valueKey ?? 'Uid',
  });
}

export function useSubnetOptions(
  vpcUid?: string,
  options?: { valueKey: keyof API.SubnetOption },
) {
  const { data } = useQuery({
    queryKey: ['subnet-options', vpcUid],
    queryFn: () => subnetOptionsApiCmdbSubnetsOptions({ VpcUid: vpcUid! }),
    enabled: vpcUid !== undefined,
  });

  return generateOptions(data, {
    labelKey: 'SubnetName',
    valueKey: options?.valueKey ?? 'Uid',
  });
}

export function useProjectOptions(
  envUid?: string,
  options?: { valueKey: keyof API.ProjectOption },
) {
  const { data } = useQuery({
    queryKey: ['project-options', envUid],
    queryFn: () => projectOptionsApiCmdbProjectsOptions({ EnvUid: envUid! }),
    enabled: envUid !== undefined,
  });

  return generateOptions(data, {
    labelKey: 'ProjectName',
    valueKey: options?.valueKey ?? 'Uid',
  });
}

export function useHostTypeOptions(options?: {
  valueKey: keyof API.HostTypeOption;
}) {
  const { data } = useQuery({
    queryKey: ['host-type-options'],
    queryFn: () => hosttypeOptionsApiCmdbHosttypesOptions({}),
  });

  return generateOptions(data, {
    labelKey: 'HostType',
    valueKey: options?.valueKey ?? 'Uid',
  });
}

export function useEnvOptions() {
  const { data } = useQuery({
    queryKey: ['env-options'],
    queryFn: () => envOptionsApiCmdbEnvsOptions({}),
  });

  return generateOptions(data, { labelKey: 'EnvName', valueKey: 'Uid' });
}

export function useInstanceTypeOptions(
  zoneUid?: string,
  options?: {
    valueKey: keyof API.InstanceTypeQuotaItemOption;
  },
) {
  const { data } = useQuery({
    queryKey: ['instance-type-options'],
    queryFn: () =>
      instanceTypeQuotaItemOptionsApiCmdbInstypesOptions({ ZoneUid: zoneUid! }),
    enabled: zoneUid !== undefined,
  });

  return generateOptions(data, {
    labelKey: 'InstanceType',
    valueKey: options?.valueKey ?? 'Uid',
    filterFn: (item) => item.Status === 'SELL',
  });
}

export function useRoleOptions() {
  const { data } = useQuery({
    queryKey: ['role-options'],
    queryFn: () => roleOptionsApiSysRolesOptions({}),
  });

  return generateOptions(data, { labelKey: 'name', valueKey: 'id' });
}

export function useUserOptions() {
  const { data } = useQuery({
    queryKey: ['user-options'],
    queryFn: () => userOptionsApiSysUsersOptions({}),
  });

  return generateOptions(data, { labelKey: 'username', valueKey: 'username' });
}

export function useAppOptions(options?: { valueKey: keyof API.AppOption }) {
  const { data } = useQuery({
    queryKey: ['app-options'],
    queryFn: () => appOptionsApiCmdbAppsOptions({}),
  });

  return generateOptions(data, {
    labelKey: 'App',
    valueKey: options?.valueKey ?? 'Uid',
  });
}
