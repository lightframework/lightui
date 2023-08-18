import { cloudOptionsApiCmdbCloudsOptions } from '@/services/cmdb/cloud';
import { regionOptionsApiCmdbRegionsOptions } from '@/services/cmdb/region';
import { zoneOptionsApiCmdbZonesOptions } from '@/services/cmdb/zone';
import { useRequest } from '@umijs/max';

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
