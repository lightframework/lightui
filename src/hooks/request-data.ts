import { cloudOptionsApiCmdbCloudsOptions } from '@/services/cmdb/cloud';
import { cloudTagOptionsApiCmdbCloudtagsOptions } from '@/services/cmdb/cloudTag';
import { regionOptionsApiCmdbRegionsOptions } from '@/services/cmdb/region';
import { securitygroupOptionsApiCmdbSecuritygroupsOptions } from '@/services/cmdb/securitygroup';
import { subnetOptionsApiCmdbSubnetsOptions } from '@/services/cmdb/subnet';
import { vpcOptionsApiCmdbVpcsOptions } from '@/services/cmdb/vpc';
import { zoneOptionsApiCmdbZonesOptions } from '@/services/cmdb/zone';
import { useRequest } from '@umijs/max';

// export function useOptions<
//   DataType extends Record<string, any>,
//   Params extends Record<string, any> = Record<string, any>,
// >(
//   request: (params: Params) => Promise<{
//     msg?: string;
//     code?: number;
//     data?: { list?: DataType[]; total?: number };
//   }>,
//   labelKey: keyof DataType,
//   params?: Params,
// ) {
//   const { data } = useRequest(
//     () => {
//       if (params) {
//         if (JSON.stringify(params) !== '{}') {
//           return request(params);
//         }
//       } else {
//         return request({} as any);
//       }
//     },
//     { refreshDeps: [params] },
//   );

//   const options = data?.list?.map((item) => ({
//     label: item[labelKey],
//     value: '1',
//   }));

//   return options;
// }

export function useCloudOptions() {
  const { data } = useRequest(cloudOptionsApiCmdbCloudsOptions);

  const cloudOptions = data?.list?.map((item) => ({
    label: item.CloudName,
    value: item.Uid,
  }));

  return cloudOptions;
}

export function useRegionOptions(cloudUid?: string) {
  const { data } = useRequest(
    () => {
      if (cloudUid) {
        return regionOptionsApiCmdbRegionsOptions({ CloudUid: cloudUid });
      }
    },
    { refreshDeps: [cloudUid] },
  );

  const regionOptions = data?.list?.map((item) => ({
    label: item.RegionName,
    value: item.Uid,
  }));

  return regionOptions;
}

export function useZoneOptions(regionUid?: string) {
  const { data } = useRequest(
    () => {
      if (regionUid) {
        return zoneOptionsApiCmdbZonesOptions({ RegionUid: regionUid });
      }
    },
    { refreshDeps: [regionUid] },
  );

  const zoneOptions = data?.list?.map((item) => ({
    label: item.ZoneName,
    value: item.Uid,
  }));

  return zoneOptions;
}

export function useVpcOptions(regionUid?: string) {
  const { data } = useRequest(
    () => {
      if (regionUid) {
        return vpcOptionsApiCmdbVpcsOptions({ RegionUid: regionUid });
      }
    },
    { refreshDeps: [regionUid] },
  );

  const vpcOptions = data?.list?.map((item) => ({
    label: item.VpcName,
    value: item.Uid,
  }));

  return vpcOptions;
}

export function useSubnetOptions(vpcUid?: string) {
  const { data } = useRequest(
    () => {
      if (vpcUid) {
        return subnetOptionsApiCmdbSubnetsOptions({ VpcUid: vpcUid });
      }
    },
    { refreshDeps: [vpcUid] },
  );

  const subnetOptions = data?.list?.map((item) => ({
    label: item.SubnetName,
    value: item.Uid,
  }));

  return subnetOptions;
}

export function useSecurityGroupOptions(regionUid?: string) {
  const { data } = useRequest(
    () => {
      if (regionUid) {
        return securitygroupOptionsApiCmdbSecuritygroupsOptions({
          RegionUid: regionUid,
        });
      }
    },
    { refreshDeps: [regionUid] },
  );

  const securityGroupOptions = data?.list?.map((item) => ({
    label: item.SecurityGroupName,
    value: item.Uid,
  }));

  return securityGroupOptions;
}

export function useCloudTagOptions(cloudUid?: string) {
  const { data } = useRequest(
    () => {
      if (cloudUid) {
        return cloudTagOptionsApiCmdbCloudtagsOptions({
          CloudUid: cloudUid,
        });
      }
    },
    { refreshDeps: [cloudUid] },
  );

  const cloudTagOptions = data?.list?.map((item) => ({
    label: item.Key,
    value: item.Uid,
  }));

  return cloudTagOptions;
}
