import { alertAggrViewItemsApiArgusAlertAggrViews } from "@/services/argus/alertAggrView"
import { chatsTagListApiChatChatsTag } from "@/services/chat/chats"
import { appOptionsApiCmdbAppsOptions } from "@/services/cmdb/app"
import { cityPageListApiCmdbCitys } from "@/services/cmdb/city"
import {
  cloudOptionsApiCmdbCloudsOptions,
  cloudReadOneApiCmdbCloudsByUid,
} from "@/services/cmdb/cloud"
import { cloudTagOptionsApiCmdbCloudtagsOptions } from "@/services/cmdb/cloudTag"
import { continentOptionsApiCmdbContinentsOptions } from "@/services/cmdb/continent"
import {
  envListApiCmdbEnvsList,
  envOptionsApiCmdbEnvsOptions,
} from "@/services/cmdb/env"
import { secretApiCmdbHostsSecrets } from "@/services/cmdb/host"
import { hosttypeOptionsApiCmdbHostclassesOptions } from "@/services/cmdb/hostclasses"
import { hosttypeOptionsApiCmdbHosttypesOptions } from "@/services/cmdb/hosttype"
import { imageOptionsApiCmdbImagesOptions } from "@/services/cmdb/image"
import { instanceOptionsApiCmdbInstancesOptions } from "@/services/cmdb/instance"
import { instanceTypeQuotaItemOptionsApiCmdbInstypesOptions } from "@/services/cmdb/instype"
import { jumpAdminUserOptionsApiCmdbJumpserverAdminuseroptions } from "@/services/cmdb/jumpserver"
import { nodeRuleOptionsApiCmdbNoderulesOptions } from "@/services/cmdb/nodeRule"
import { personOptionsApiCmdbPersonsOptions } from "@/services/cmdb/person"
import { professionOptionsApiCmdbProfessionsOptions } from "@/services/cmdb/profession"
import { projectOptionsApiCmdbProjectsOptions } from "@/services/cmdb/project"
import {
  regionOptionsApiCmdbRegionsOptions,
  regionReadOneApiCmdbRegionsByUid,
} from "@/services/cmdb/region"
import { securitygroupOptionsApiCmdbSecuritygroupsOptions } from "@/services/cmdb/securitygroup"
import { subnetOptionsApiCmdbSubnetsOptions } from "@/services/cmdb/subnet"
import { vpcOptionsApiCmdbVpcsOptions } from "@/services/cmdb/vpc"
import { zoneOptionsApiCmdbZonesOptions } from "@/services/cmdb/zone"
import { taskAllEnvApiDepTasksAllenv } from "@/services/dep/task"
import { certListApiOpsCertsList } from "@/services/ops/cert"
import {
  domainsetAllVersionsApiOpsDomainsetsVersions,
  domainsetReadOneApiOpsDomainsetsById,
  domainsetVersionsApiOpsDomainsetsByIdversions,
} from "@/services/ops/domainset"
import {
  ipsetAllVersionsApiOpsIpsetsVersions,
  ipsetReadOneApiOpsIpsetsById,
  ipsetVersionsApiOpsIpsetsByIdversions,
} from "@/services/ops/ipset"
import { ispListApiOpsIpsetsTemplatesIsp } from "@/services/ops/ipsettemplate"

import { roleOptionsApiSysRolesOptions } from "@/services/sys/role"
import { userOptionsApiSysUsersOptions } from "@/services/sys/user"
import { useQuery } from "@tanstack/react-query"

export function useQueryCloud(cloudUid?: string) {
  return useQuery({
    queryKey: ["cloud", cloudUid],
    queryFn: async () =>
      cloudReadOneApiCmdbCloudsByUid({ uid: cloudUid! }).then(
        (res) => res.data as CMDB.CloudInfo,
      ),
    enabled: cloudUid !== undefined,
  })
}

export function useQueryRegion(regionUid?: string) {
  return useQuery({
    queryKey: ["region", regionUid],
    queryFn: async () =>
      regionReadOneApiCmdbRegionsByUid({ uid: regionUid! }).then(
        (res) => res.data as CMDB.RegionInfo,
      ),
    enabled: regionUid !== undefined,
  })
}

export function useQueryRegionOptions(cloudUid?: string) {
  return useQuery({
    queryKey: ["region-options", cloudUid],
    queryFn: () =>
      regionOptionsApiCmdbRegionsOptions({ CloudUid: cloudUid! }).then(
        (res) => res.data?.list ?? [],
      ),
    enabled: !!cloudUid,
  })
}

export function useQueryZoneOptions(regionUid?: string) {
  return useQuery({
    queryKey: ["zone-options", regionUid],
    queryFn: () =>
      zoneOptionsApiCmdbZonesOptions({ RegionUid: regionUid! }).then(
        (res) => res.data?.list ?? [],
      ),
    enabled: !!regionUid,
  })
}

export function useQueryRoleOptions() {
  return useQuery({
    queryKey: ["role-options"],
    queryFn: () =>
      roleOptionsApiSysRolesOptions({}).then((res) => res.data?.list ?? []),
  })
}

export function useQueryUserOptions() {
  return useQuery({
    queryKey: ["user-options"],
    queryFn: () =>
      userOptionsApiSysUsersOptions({}).then((res) => res.data?.list ?? []),
  })
}

export function useQueryEnvOptions() {
  return useQuery({
    queryKey: ["env-options"],
    queryFn: () =>
      envOptionsApiCmdbEnvsOptions({}).then((res) => res.data?.list ?? []),
  })
}

export function useQueryDeployedEnvOptions() {
  return useQuery({
    queryKey: ["deployed-env-options"],
    queryFn: () =>
      taskAllEnvApiDepTasksAllenv({}).then((res) => res.data?.data ?? []),
  })
}

export function useQueryIpsetEnvOptions() {
  return useQuery({
    queryKey: ["ipset-env-options"],
    queryFn: () =>
      envListApiCmdbEnvsList({}).then((res) => res.data?.list ?? []),
  })
}

export function useQueryDomainsetEnvOptions() {
  return useQuery({
    queryKey: ["domainset-env-options"],
    queryFn: () =>
      envListApiCmdbEnvsList({}).then((res) => res.data?.list ?? []),
  })
}

export function useQueryCertOptions() {
  return useQuery({
    queryKey: ["cert-options"],
    queryFn: () =>
      certListApiOpsCertsList().then((res) => res.data?.list ?? []),
  })
}

export function useQueryIpsetVersionOptions() {
  return useQuery({
    queryKey: ["ipset-version-options"],
    queryFn: () =>
      ipsetAllVersionsApiOpsIpsetsVersions({}).then(
        (res) => res.data?.list ?? [],
      ),
  })
}

export function useQueryDomainsetVersionOptions() {
  return useQuery({
    queryKey: ["domainset-version-options"],
    queryFn: () =>
      domainsetAllVersionsApiOpsDomainsetsVersions({}).then(
        (res) => res.data?.list ?? [],
      ),
  })
}

export function useQueryCloudOptions() {
  return useQuery({
    queryKey: ["cloud-options"],
    queryFn: () =>
      cloudOptionsApiCmdbCloudsOptions({}).then((res) => res.data?.list ?? []),
  })
}

export function useQueryProjectOptions() {
  return useQuery({
    queryKey: ["project-options"],
    queryFn: () =>
      projectOptionsApiCmdbProjectsOptions({}).then(
        (res) => res.data?.list ?? [],
      ),
  })
}

export function useQueryHostTypeOptions() {
  return useQuery({
    queryKey: ["host-type-options"],
    queryFn: () =>
      hosttypeOptionsApiCmdbHosttypesOptions({}).then(
        (res) => res.data?.list ?? [],
      ),
  })
}

export function useQueryAppOptions() {
  return useQuery({
    queryKey: ["app-options"],
    queryFn: () =>
      appOptionsApiCmdbAppsOptions({}).then((res) => res.data?.list ?? []),
  })
}

export function useQueryImageOptions(
  regionUid: string | undefined,
  keywords?: string,
) {
  return useQuery({
    queryKey: ["image-options", regionUid, keywords],
    queryFn: () =>
      imageOptionsApiCmdbImagesOptions({
        RegionUid: regionUid!,
        keywords,
      }).then((res) => res.data?.list ?? []),
    enabled: regionUid !== undefined,
  })
}

export function useQueryInstanceTypeOptions(zoneUid?: string) {
  return useQuery({
    queryKey: ["instance-type-options", zoneUid],
    queryFn: () =>
      instanceTypeQuotaItemOptionsApiCmdbInstypesOptions({
        ZoneUid: zoneUid!,
      }).then((res) => res.data?.list ?? []),
    enabled: zoneUid !== undefined,
  })
}

export function useQueryVpcOptions(
  regionUid: string | undefined,
  keywords?: string,
) {
  return useQuery({
    queryKey: ["vpc-options", regionUid, keywords],
    queryFn: () =>
      vpcOptionsApiCmdbVpcsOptions({
        RegionUid: regionUid!,
        keywords,
      }).then((res) => res.data?.list ?? []),
    enabled: regionUid !== undefined,
  })
}

export function useQuerySubnetOptions(vpcUid?: string) {
  return useQuery({
    queryKey: ["vpc-options", vpcUid],
    queryFn: () =>
      subnetOptionsApiCmdbSubnetsOptions({
        VpcUid: vpcUid!,
      }).then((res) => res.data?.list ?? []),
    enabled: vpcUid !== undefined,
  })
}

export function useQuerySecurityGroupOptions(
  regionUid: string | undefined,
  keywords?: string,
) {
  return useQuery({
    queryKey: ["security-group-options", regionUid, keywords],
    queryFn: () =>
      securitygroupOptionsApiCmdbSecuritygroupsOptions({
        RegionUid: regionUid!,
        keywords,
      }).then((res) => res.data?.list ?? []),
    enabled: regionUid !== undefined,
  })
}

export function useQueryCloudTagOptions(cloudUid?: string) {
  return useQuery({
    queryKey: ["cloud-tag-options", cloudUid],
    queryFn: () =>
      cloudTagOptionsApiCmdbCloudtagsOptions({
        CloudUid: cloudUid!,
      }).then((res) => res.data?.list ?? []),
    enabled: cloudUid !== undefined,
  })
}

export function useQueryContinentOptions() {
  return useQuery({
    queryKey: ["continent-options"],
    queryFn: () =>
      continentOptionsApiCmdbContinentsOptions({}).then(
        (res) => res.data?.list ?? [],
      ),
  })
}

export function useQueryProfessionOptions() {
  return useQuery({
    queryKey: ["profession-options"],
    queryFn: () =>
      professionOptionsApiCmdbProfessionsOptions({}).then(
        (res) => res.data?.list ?? [],
      ),
  })
}

export function useQueryPersonOptions() {
  return useQuery({
    queryKey: ["person-options"],
    queryFn: () =>
      personOptionsApiCmdbPersonsOptions({}).then(
        (res) => res.data?.list ?? [],
      ),
  })
}

export function useQueryAggrViewsOptions() {
  return useQuery({
    queryKey: ["alert-aggr-views"],
    queryFn: () =>
      alertAggrViewItemsApiArgusAlertAggrViews({}).then(
        (res) => res.data?.items ?? [],
      ),
  })
}

export function useQueryCityPage() {
  return useQuery({
    queryKey: ["city-page"],
    queryFn: () =>
      cityPageListApiCmdbCitys({}).then((res) => res.data?.list ?? []),
  })
}

export function useQueryJumpserverAdminUsers() {
  return useQuery({
    queryKey: ["jumpserver-admin-users"],
    queryFn: () =>
      jumpAdminUserOptionsApiCmdbJumpserverAdminuseroptions().then(
        (res) => res.data,
      ),
  })
}

export function useQueryIpsetVersions(id?: number) {
  return useQuery({
    queryKey: ["ipset-versions", id],
    queryFn: () =>
      ipsetVersionsApiOpsIpsetsByIdversions({ id: String(id) }).then(
        (res) => res.data?.list ?? [],
      ),
    enabled: !!id,
  })
}

export function useQueryDomainsetVersions(id?: number) {
  return useQuery({
    queryKey: ["domainset-versions", id],
    queryFn: () =>
      domainsetVersionsApiOpsDomainsetsByIdversions({ id: String(id) }).then(
        (res) => res.data?.list ?? [],
      ),
    enabled: !!id,
  })
}

export function useQueryIpsetInfo(id?: number, versionId?: number) {
  return useQuery({
    queryKey: ["ipset", id, versionId],
    queryFn: () =>
      ipsetReadOneApiOpsIpsetsById({ id: String(id), versionId }).then(
        (res) => res.data,
      ),
    enabled: !!id,
  })
}

export function useQueryDomainsetInfo(id?: number, versionId?: number) {
  return useQuery({
    queryKey: ["domainset", id, versionId],
    queryFn: () =>
      domainsetReadOneApiOpsDomainsetsById({ id: String(id), versionId }).then(
        (res) => res.data,
      ),
    enabled: !!id,
  })
}

export function useQueryIpsetTemplateIspOptions(keywords?: string) {
  return useQuery({
    queryKey: ["ipset-template-isp-options", keywords],
    queryFn: () =>
      ispListApiOpsIpsetsTemplatesIsp({ keywords }).then(
        (res) => res.data?.list ?? [],
      ),
    enabled: !!keywords,
  })
}

export function useQueryHostClassesOptions() {
  return useQuery({
    queryKey: ["host-classes-options"],
    queryFn: () =>
      hosttypeOptionsApiCmdbHostclassesOptions({}).then(
        (res) => res.data?.list ?? [],
      ),
  })
}

export function useQueryNodeRuleOptions() {
  return useQuery({
    queryKey: ["node-rule-options"],
    queryFn: () =>
      nodeRuleOptionsApiCmdbNoderulesOptions().then(
        (res) => res.data?.list ?? [],
      ),
  })
}

export function useQueryInstanceOptions() {
  return useQuery({
    queryKey: ["instance-options"],
    queryFn: () =>
      instanceOptionsApiCmdbInstancesOptions({}).then(
        (res) => res.data?.list ?? [],
      ),
  })
}

export function useQueryHostUpdateSecretOptions() {
  return useQuery({
    queryKey: ["host-update-secret-options"],
    queryFn: () =>
      secretApiCmdbHostsSecrets({}).then((res) => res.data?.Items ?? []),
  })
}

export function useChatTagOptions() {
  return useQuery({
    queryKey: ["chat-tags"],
    queryFn: chatsTagListApiChatChatsTag,
    select: (res) => res.data?.tag ?? [],
  })
}
