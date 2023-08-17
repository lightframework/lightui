import HostTypeFilterList from '@/components/host-types/HostTypeFilterList';
import { hosttypeOptionsApiCmdbHosttypesOptions } from '@/services/cmdb/hosttype';
import { useParams, useRequest } from '@umijs/max';

export default function EnvHosts() {
  const params = useParams();
  const envUid = params.envUid!;

  const { data } = useRequest(hosttypeOptionsApiCmdbHosttypesOptions, {
    refreshDeps: [envUid],
  });

  return (
    <>
      <HostTypeFilterList items={data?.list || []} />
    </>
  );
}
