import { envReadOneApiCmdbEnvsByUid } from '@/services/cmdb/env';
import { ProDescriptions } from '@ant-design/pro-components';
import { useQuery } from '@tanstack/react-query';

type EnvInfo = Required<API.EnvReadOneResp>['data'] & {
  ApiDomainName?: string;
  DomainName?: string;
  EnvName?: string;
  Description?: string;
};

type BasePerson = Required<API.BasePerson>['data'];

function concatPersons(persons: BasePerson[] | null | undefined) {
  if (persons) {
    return persons.map((person) => person.PersonName).join('，');
  }
}

export default function EnvSummary({ uid }: { uid: string }) {
  const { data } = useQuery({
    queryKey: ['env', uid],
    queryFn: () => envReadOneApiCmdbEnvsByUid({ uid }),
  });

  if (!data) return;

  const envInfo = data.data as EnvInfo;

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
        {concatPersons(envInfo.Sale as any)}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="技术支持" valueType="text">
        {concatPersons(envInfo.Support as any)}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="运维" valueType="text">
        {concatPersons(envInfo.Ops as any)}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="QA" valueType="text" span={3}>
        {concatPersons(envInfo.Qa as any)}
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
