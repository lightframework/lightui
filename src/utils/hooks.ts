import { personPageListApiCmdbPersons } from '@/services/cmdb/person';
import { professionOptionsApiCmdbProfessionsOptions } from '@/services/cmdb/profession';
import { useRequest } from '@umijs/max';
import { BaseOptionType } from 'antd/es/select';
import { DependencyList, useEffect } from 'react';

export function useTitle(
  title: string,
  options?: {
    shift?: boolean;
    refreshDeps?: DependencyList;
  },
) {
  useEffect(() => {
    const prevTitle = document.title;

    document.title = options?.shift ? `${title} - ${prevTitle}` : title;
    return () => {
      document.title = prevTitle;
    };
  }, options?.refreshDeps ?? []);
}

export function usePersons(
  professionName: string,
  options?: {
    refreshDeps?: DependencyList;
  },
) {
  const { data: professionsData } = useRequest(
    () =>
      professionOptionsApiCmdbProfessionsOptions({ keywords: professionName }),
    {
      refreshDeps: options?.refreshDeps,
    },
  );
  const profession = professionsData?.list
    ? professionsData.list.at(0)
    : undefined;

  return useRequest(
    () => {
      if (profession) {
        return personPageListApiCmdbPersons({
          ProfessionUid: profession?.Uid,
        }).then((res) => ({
          ...res,
          data: res.data?.list?.filter((person) => person.Enabled),
        }));
      } else {
        return [];
      }
    },
    {
      refreshDeps: [profession],
    },
  );
}

export function usePersonOptions(
  professionName: string,
  options?: {
    refreshDeps?: DependencyList;
  },
): BaseOptionType[] {
  const { data } = usePersons(professionName, options);

  return data
    ? data.map((person) => ({ label: person.PersonName, value: person.Uid }))
    : [];
}
