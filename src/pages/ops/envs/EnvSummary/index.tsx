import { envReadOneApiCmdbEnvsByUid } from '@/services/cmdb/env';
import { ProDescriptions } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import EnvDeleteModalForm from '../EnvDeleteModalForm';
import EnvUpdateModalForm from '../EnvUpdateModalForm';

function concatPersons(persons: API.PersonOption[] | null | undefined) {
  if (persons) {
    return persons.map((person) => person.PersonName).join('，');
  }
}

export default function EnvSummary({
  envUid,
  onUpdateFinish,
  onDeleteFinish,
}: {
  envUid: string;
  onUpdateFinish?: VoidFunction;
  onDeleteFinish?: VoidFunction;
}) {
  const { data, refresh: refreshEnv } = useRequest(
    () => envReadOneApiCmdbEnvsByUid({ uid: envUid }),
    {
      refreshDeps: [envUid],
    },
  );

  if (!data) return;

  const envInfo = data as API.EnvInfo;

  return (
    <ProDescriptions
      column={3}
      title={envInfo.EnvName}
      className="bg-[#fafafa] p-2"
      extra={
        <div>
          <EnvUpdateModalForm
            envUid={envUid}
            onFinish={() => {
              refreshEnv();
              onUpdateFinish?.();
            }}
          />
          <EnvDeleteModalForm
            envUid={envUid}
            envId={envInfo.EnvId}
            envName={envInfo.EnvName}
            onFinish={onDeleteFinish}
          />
        </div>
      }
    >
      <ProDescriptions.Item label="域名" valueType="text">
        {envInfo.DomainName}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="API域名" valueType="text" span={2}>
        {envInfo.ApiDomainName}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="运维" valueType="text">
        {concatPersons(envInfo.Ops)}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="QA" valueType="text">
        {concatPersons(envInfo.Qa)}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="销售" valueType="text">
        {concatPersons(envInfo.Sale)}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="技术支持" valueType="text" span={3}>
        {concatPersons(envInfo.Support)}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="创建时间" span={3}>
        {envInfo.createAt}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="描述" valueType="text" span={3}>
        {envInfo.Description}
      </ProDescriptions.Item>
    </ProDescriptions>
  );
}
