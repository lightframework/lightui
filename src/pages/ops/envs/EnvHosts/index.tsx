import HostTypeFilterList from '@/components/host-types/HostTypeFilterList';
import { hosttypeOptionsApiCmdbHosttypesOptions } from '@/services/cmdb/hosttype';
import { useQuery } from '@tanstack/react-query';

export default function EnvHosts({ envUid }: { envUid: string }) {
  const { data: hostTypes } = useQuery({
    queryKey: ['env-projects-host-types', envUid],
    queryFn: () =>
      hosttypeOptionsApiCmdbHosttypesOptions({}).then((res) => res.data?.list),
  });

  return (
    <>
      {' '}
      <HostTypeFilterList title="项目列表" items={hostTypes || []} />
    </>
  );
}
