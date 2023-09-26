import { personPageListApiCmdbPersons } from '@/services/cmdb/person';
import { professionOptionsApiCmdbProfessionsOptions } from '@/services/cmdb/profession';
import { useQuery } from '@tanstack/react-query';

export function usePersonOptions(professionName: string): CMDB.PersonOption[] {
  // 如果将professName作为依赖，当同时查询多个部门的人员时，无法利用React Query的去重
  const { data: professionOptions } = useQuery({
    queryKey: ['profession-options'],
    queryFn: () =>
      professionOptionsApiCmdbProfessionsOptions({}).then(
        (res) => res.data?.list ?? [],
      ),
  });

  const profession = professionOptions?.find(
    (profession) => profession.ProfessionName === professionName,
  );

  const { data: personOptions } = useQuery({
    queryKey: ['person-options', professionName],
    queryFn: () =>
      personPageListApiCmdbPersons({ ProfessionUid: profession?.Uid }).then(
        (res) =>
          (res.data?.list ?? [])
            .filter((person) => person.Enabled)
            .map((person) => ({
              Uid: person.Uid,
              PersonName: person.PersonName,
              PersonId: person.PersonId,
            })),
      ),
    enabled: profession !== undefined,
  });

  return personOptions ?? [];
}
