import { cloudReadOneApiCmdbCloudsByUid } from '@/services/cmdb/cloud';
import { useQuery } from '@tanstack/react-query';

export function useCloud(cloudUid: string) {
  return useQuery({
    queryKey: ['cloud', cloudUid],
    queryFn: async () =>
      cloudReadOneApiCmdbCloudsByUid({ uid: cloudUid }).then(
        (res) => res.data as CMDB.CloudInfo,
      ),
  });
}
