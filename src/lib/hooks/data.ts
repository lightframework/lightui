import { appOptionsApiCmdbAppsOptions } from '@/services/cmdb/app';
import { cloudReadOneApiCmdbCloudsByUid } from '@/services/cmdb/cloud';
import { cloudTagOptionsApiCmdbCloudtagsOptions } from '@/services/cmdb/cloudTag';
import { continentOptionsApiCmdbContinentsOptions } from '@/services/cmdb/continent';
import { envOptionsApiCmdbEnvsOptions } from '@/services/cmdb/env';
import { hosttypeOptionsApiCmdbHosttypesOptions } from '@/services/cmdb/hosttype';
import { imageOptionsApiCmdbImagesOptions } from '@/services/cmdb/image';
import { instanceTypeQuotaItemOptionsApiCmdbInstypesOptions } from '@/services/cmdb/instype';
import { personOptionsApiCmdbPersonsOptions } from '@/services/cmdb/person';
import { professionOptionsApiCmdbProfessionsOptions } from '@/services/cmdb/profession';
import { projectOptionsApiCmdbProjectsOptions } from '@/services/cmdb/project';
import {
  regionOptionsApiCmdbRegionsOptions,
  regionReadOneApiCmdbRegionsByUid,
} from '@/services/cmdb/region';
import { securitygroupOptionsApiCmdbSecuritygroupsOptions } from '@/services/cmdb/securitygroup';
import { subnetOptionsApiCmdbSubnetsOptions } from '@/services/cmdb/subnet';
import { vpcOptionsApiCmdbVpcsOptions } from '@/services/cmdb/vpc';
import { roleOptionsApiSysRolesOptions } from '@/services/sys/role';
import { userOptionsApiSysUsersOptions } from '@/services/sys/user';
import { useQuery } from '@tanstack/react-query';

export function useQueryCloud(cloudUid?: string) {
  return useQuery({
    queryKey: ['cloud', cloudUid],
    queryFn: async () =>
      cloudReadOneApiCmdbCloudsByUid({ uid: cloudUid! }).then(
        (res) => res.data as CMDB.CloudInfo,
      ),
    enabled: cloudUid !== undefined,
  });
}

export function useQueryRegion(regionUid?: string) {
  return useQuery({
    queryKey: ['region', regionUid],
    queryFn: async () =>
      regionReadOneApiCmdbRegionsByUid({ uid: regionUid! }).then(
        (res) => res.data as CMDB.RegionInfo,
      ),
    enabled: regionUid !== undefined,
  });
}

export function useQueryRegionOptions(cloudUid?: string) {
  return useQuery({
    queryKey: ['region-options', cloudUid],
    queryFn: () =>
      regionOptionsApiCmdbRegionsOptions({ CloudUid: cloudUid! }).then(
        (res) => res.data?.list ?? [],
      ),
    enabled: cloudUid !== undefined,
  });
}

export function useQueryRoleOptions() {
  return useQuery({
    queryKey: ['role-options'],
    queryFn: () =>
      roleOptionsApiSysRolesOptions({}).then((res) => res.data?.list ?? []),
  });
}

export function useQueryUserOptions() {
  return useQuery({
    queryKey: ['user-options'],
    queryFn: () =>
      userOptionsApiSysUsersOptions({}).then((res) => res.data?.list ?? []),
  });
}

export function useQueryEnvOptions() {
  return useQuery({
    queryKey: ['env-options'],
    queryFn: () =>
      envOptionsApiCmdbEnvsOptions({}).then((res) => res.data?.list ?? []),
  });
}

export function useQueryProjectOptions() {
  return useQuery({
    queryKey: ['project-options'],
    queryFn: () =>
      projectOptionsApiCmdbProjectsOptions({}).then(
        (res) => res.data?.list ?? [],
      ),
  });
}

export function useQueryHostTypeOptions() {
  return useQuery({
    queryKey: ['host-type-options'],
    queryFn: () =>
      hosttypeOptionsApiCmdbHosttypesOptions({}).then(
        (res) => res.data?.list ?? [],
      ),
  });
}

export function useQueryAppOptions() {
  return useQuery({
    queryKey: ['app-options'],
    queryFn: () =>
      appOptionsApiCmdbAppsOptions({}).then((res) => res.data?.list ?? []),
  });
}

export function useQueryImageOptions(
  regionUid: string | undefined,
  keywords?: string,
) {
  return useQuery({
    queryKey: ['image-options', regionUid, keywords],
    queryFn: () =>
      imageOptionsApiCmdbImagesOptions({
        RegionUid: regionUid!,
        keywords,
      }).then((res) => res.data?.list ?? []),
    enabled: regionUid !== undefined,
  });
}

export function useQueryInstanceTypeOptions(zoneUid?: string) {
  return useQuery({
    queryKey: ['instance-type-options', zoneUid],
    queryFn: () =>
      instanceTypeQuotaItemOptionsApiCmdbInstypesOptions({
        ZoneUid: zoneUid!,
      }).then((res) => res.data?.list ?? []),
    enabled: zoneUid !== undefined,
  });
}

export function useQueryVpcOptions(
  regionUid: string | undefined,
  keywords?: string,
) {
  return useQuery({
    queryKey: ['vpc-options', regionUid, keywords],
    queryFn: () =>
      vpcOptionsApiCmdbVpcsOptions({
        RegionUid: regionUid!,
        keywords,
      }).then((res) => res.data?.list ?? []),
    enabled: regionUid !== undefined,
  });
}

export function useQuerySubnetOptions(vpcUid?: string) {
  return useQuery({
    queryKey: ['vpc-options', vpcUid],
    queryFn: () =>
      subnetOptionsApiCmdbSubnetsOptions({
        VpcUid: vpcUid!,
      }).then((res) => res.data?.list ?? []),
    enabled: vpcUid !== undefined,
  });
}

export function useQuerySecurityGroupOptions(
  regionUid: string | undefined,
  keywords?: string,
) {
  return useQuery({
    queryKey: ['security-group-options', regionUid, keywords],
    queryFn: () =>
      securitygroupOptionsApiCmdbSecuritygroupsOptions({
        RegionUid: regionUid!,
        keywords,
      }).then((res) => res.data?.list ?? []),
    enabled: regionUid !== undefined,
  });
}

export function useQueryCloudTagOptions(cloudUid?: string) {
  return useQuery({
    queryKey: ['cloud-tag-options', cloudUid],
    queryFn: () =>
      cloudTagOptionsApiCmdbCloudtagsOptions({
        CloudUid: cloudUid!,
      }).then((res) => res.data?.list ?? []),
    enabled: cloudUid !== undefined,
  });
}

export function useQueryContinentOptions() {
  return useQuery({
    queryKey: ['continent-options'],
    queryFn: () =>
      continentOptionsApiCmdbContinentsOptions({}).then(
        (res) => res.data?.list ?? [],
      ),
  });
}

export function useQueryProfessionOptions() {
  return useQuery({
    queryKey: ['profession-options'],
    queryFn: () =>
      professionOptionsApiCmdbProfessionsOptions({}).then(
        (res) => res.data?.list ?? [],
      ),
  });
}

export function useQueryPersonOptions() {
  return useQuery({
    queryKey: ['person-options'],
    queryFn: () =>
      personOptionsApiCmdbPersonsOptions({}).then(
        (res) => res.data?.list ?? [],
      ),
  });
}
