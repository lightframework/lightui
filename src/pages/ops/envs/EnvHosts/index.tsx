import HostTypeFilterList from '@/components/host-types/HostTypeFilterList';
import { hosttypeOptionsApiCmdbHosttypesOptions } from '@/services/cmdb/hosttype';
import { useRequest } from '@umijs/max';

export default function EnvHosts({ envUid }: { envUid: string }) {
  const { data } = useRequest(hosttypeOptionsApiCmdbHosttypesOptions, {
    refreshDeps: [envUid],
  });

  return (
    <>
      <HostTypeFilterList items={data?.list || []} />
    </>
  );
}
