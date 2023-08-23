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

export function useCloudOptions() {
  const { data } = useQuery({
    queryKey: ['cloud-options'],
    queryFn: () => cloudOptionsApiCmdbCloudsOptions({}),
  });
  return generateOptions(data, { labelKey: 'CloudName', valueKey: 'Uid' });
}

export function useCloudTagOptions(cloudUid?: string) {
  const { data } = useQuery({
    queryKey: ['cloud-tag-options', cloudUid],
    queryFn: () =>
      cloudTagOptionsApiCmdbCloudtagsOptions({ CloudUid: cloudUid! }),
    enabled: cloudUid !== undefined,
  });

  return generateOptions(data, { labelKey: 'Value', valueKey: 'Uid' });
}

export function useRegionOptions(cloudUid?: string) {
  const { data } = useQuery({
    queryKey: ['region-options', cloudUid],
    queryFn: () => regionOptionsApiCmdbRegionsOptions({ CloudUid: cloudUid! }),
    enabled: cloudUid !== undefined,
  });
  return generateOptions(data, {
    labelKey: 'RegionName',
    valueKey: 'Uid',
    filterFn: (item) => item.RegionState === 'AVAILABLE',
  });
}

export function useZoneOptions(regionUid?: string) {
  const { data } = useQuery({
    queryKey: ['zone-options', regionUid],
    queryFn: () => zoneOptionsApiCmdbZonesOptions({ RegionUid: regionUid! }),
    enabled: regionUid !== undefined,
  });
  return generateOptions(data, {
    labelKey: 'ZoneName',
    valueKey: 'Uid',
    filterFn: (item) => item.ZoneState === 'AVAILABLE',
  });
}

export function useVpcOptions(regionUid?: string) {
  const { data } = useQuery({
    queryKey: ['vpc-options', regionUid],
    queryFn: () => vpcOptionsApiCmdbVpcsOptions({ RegionUid: regionUid! }),
    enabled: regionUid !== undefined,
  });
  return generateOptions(data, { labelKey: 'VpcName', valueKey: 'Uid' });
}

export function useSecurityGroupOptions(regionUid?: string) {
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
    valueKey: 'Uid',
  });
}

export function useImageOptions(regionUid?: string) {
  const { data } = useQuery({
    queryKey: ['image-options', regionUid],
    queryFn: () => imageOptionsApiCmdbImagesOptions({ RegionUid: regionUid! }),
    enabled: regionUid !== undefined,
  });
  return generateOptions(data, {
    labelKey: 'ImageName',
    valueKey: 'Uid',
  });
}

export function useSubnetOptions(vpcUid?: string) {
  const { data } = useQuery({
    queryKey: ['subnet-options', vpcUid],
    queryFn: () => subnetOptionsApiCmdbSubnetsOptions({ VpcUid: vpcUid! }),
    enabled: vpcUid !== undefined,
  });

  return generateOptions(data, { labelKey: 'SubnetName', valueKey: 'Uid' });
}

export function useProjectOptions(envUid?: string) {
  const { data } = useQuery({
    queryKey: ['project-options', envUid],
    queryFn: () => projectOptionsApiCmdbProjectsOptions({ EnvUid: envUid! }),
    enabled: envUid !== undefined,
  });

  return generateOptions(data, { labelKey: 'ProjectName', valueKey: 'Uid' });
}

export function useHostTypeOptions() {
  const { data } = useQuery({
    queryKey: ['host-type-options'],
    queryFn: () => hosttypeOptionsApiCmdbHosttypesOptions({}),
  });

  return generateOptions(data, { labelKey: 'HostTypeName', valueKey: 'Uid' });
}

export function useEnvOptions() {
  const { data } = useQuery({
    queryKey: ['env-options'],
    queryFn: () => envOptionsApiCmdbEnvsOptions({}),
  });

  return generateOptions(data, { labelKey: 'EnvName', valueKey: 'Uid' });
}

export function useInstanceTypeOptions(zoneUid?: string) {
  const { data } = useQuery({
    queryKey: ['instance-type-options'],
    queryFn: () =>
      instanceTypeQuotaItemOptionsApiCmdbInstypesOptions({ ZoneUid: zoneUid! }),
    enabled: zoneUid !== undefined,
  });

  return generateOptions(data, {
    labelKey: 'TypeName',
    valueKey: 'Uid',
    filterFn: (item) => item.Status === 'SELL',
  });
}
