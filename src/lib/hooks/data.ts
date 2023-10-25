import { cloudReadOneApiCmdbCloudsByUid } from '@/services/cmdb/cloud';
import { envOptionsApiCmdbEnvsOptions } from '@/services/cmdb/env';
import { projectOptionsApiCmdbProjectsOptions } from '@/services/cmdb/project';
import { regionOptionsApiCmdbRegionsOptions } from '@/services/cmdb/region';
import { roleOptionsApiSysRolesOptions } from '@/services/sys/role';
import { userOptionsApiSysUsersOptions } from '@/services/sys/user';
import { useQuery } from '@tanstack/react-query';

export function useQueryCloud(cloudUid: string) {
  return useQuery({
    queryKey: ['cloud', cloudUid],
    queryFn: async () =>
      cloudReadOneApiCmdbCloudsByUid({ uid: cloudUid }).then(
        (res) => res.data as CMDB.CloudInfo,
      ),
  });
}

export function useQueryRegionOptions(cloudUid: string) {
  return useQuery({
    queryKey: ['region-options', cloudUid],
    queryFn: () =>
      regionOptionsApiCmdbRegionsOptions({ CloudUid: cloudUid }).then(
        (res) => res.data?.list ?? [],
      ),
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
