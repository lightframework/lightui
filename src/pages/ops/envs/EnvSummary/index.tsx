import { envReadOneApiCmdbEnvsByUid } from '@/services/cmdb/env';
import { ProDescriptions } from '@ant-design/pro-components';
import { useQuery } from '@tanstack/react-query';

function concatPersons(persons: API.PersonOption[] | null | undefined) {
  if (persons) {
    return persons.map((person) => person.PersonName).join('，');
  }
}

export default function EnvSummary({ envUid }: { envUid: string }) {
  const { data } = useQuery({
    queryKey: ['env', envUid],
    queryFn: () => envReadOneApiCmdbEnvsByUid({ uid: envUid }),
  });

  if (!data) return;

  const envInfo = data.data as API.EnvInfo;

  return (
    <ProDescriptions column={3} title="基本信息">
      <ProDescriptions.Item label="项目名称" valueType="text">
        {envInfo.EnvName}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="域名" valueType="text">
        {envInfo.DomainName}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="API域名" valueType="text">
        {envInfo.ApiDomainName}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="销售" valueType="text">
        {concatPersons(envInfo.Sale)}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="技术支持" valueType="text">
        {concatPersons(envInfo.Support)}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="运维" valueType="text">
        {concatPersons(envInfo.Ops)}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="QA" valueType="text" span={3}>
        {concatPersons(envInfo.Qa)}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="创建时间" valueType="dateTime" span={3}>
        {envInfo.createAt}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="描述" valueType="text" span={3}>
        {envInfo.Description}
      </ProDescriptions.Item>
    </ProDescriptions>
  );
}
