import CollapseDescriptions from '@/components/ui/CollapseDescriptions';
import { useEnvList } from '@/contexts/list-data-context';
import { envReadOneApiCmdbEnvsByUid } from '@/services/cmdb/env';
import { toLocaleDateTimeString } from '@/utils/func';
import { useQuery } from '@tanstack/react-query';
import { useParams } from '@umijs/max';
import EnvDeleteModalForm from '../../EnvDeleteModalForm';
import EnvUpdateModalForm from '../../EnvUpdateModalForm';

function concatPersons(persons: API.PersonOption[] | null | undefined) {
  if (persons) {
    return persons.map((person) => person.PersonName).join('，');
  }
}

export default function EnvSummary() {
  const params = useParams();
  const envUid = params.envUid!;

  const { data: env, refetch: refreshEnv } = useQuery({
    queryKey: ['env', envUid],
    queryFn: () =>
      envReadOneApiCmdbEnvsByUid({ uid: envUid }).then((res) => res.data),
  });

  const { refetchItems: refetchEnvs } = useEnvList();

  if (!env) return;

  const envInfo = env as API.EnvInfo;

  return (
    <CollapseDescriptions
      title={envInfo.EnvName}
      column={4}
      defaultShow
      toolBarRender={
        <>
          <EnvUpdateModalForm
            envUid={envUid}
            onFinish={() => {
              refreshEnv();
              refetchEnvs();
            }}
          />
          <EnvDeleteModalForm
            envUid={envUid}
            envId={envInfo.EnvId}
            envName={envInfo.EnvName}
            onFinish={refetchEnvs}
          />
        </>
      }
      items={[
        {
          label: '域名',
          children: envInfo.DomainName,
        },
        {
          label: 'API域名',
          children: envInfo.ApiDomainName,
        },
        {
          label: '备注',
          span: 2,
          children: envInfo.Description,
        },
        {
          label: '运维',
          children: concatPersons(envInfo.Ops),
        },
        {
          label: 'QA',
          children: concatPersons(envInfo.Qa),
          span: 2,
        },
        {
          label: '销售',
          children: concatPersons(envInfo.Sale),
        },
        {
          label: '技术支持',
          children: concatPersons(envInfo.Support),
          span: 2,
        },
        {
          label: '创建者',
          children: envInfo.createBy,
        },
        {
          label: '创建时间',
          children: toLocaleDateTimeString(envInfo.createAt),
        },

        {
          label: '更新者',
          children: envInfo.updateBy,
        },
        {
          label: '更新时间',
          children: toLocaleDateTimeString(envInfo.updateAt),
        },
      ]}
    />
  );
}
