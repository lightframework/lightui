import { useEnvList } from '@/contexts/list-data-context';
import { envReadOneApiCmdbEnvsByUid } from '@/services/cmdb/env';
import { ProDescriptions } from '@ant-design/pro-components';
import { useParams, useRequest } from '@umijs/max';
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

  const { data, refresh: refreshEnv } = useRequest(
    () => envReadOneApiCmdbEnvsByUid({ uid: envUid }),
    {
      refreshDeps: [envUid],
    },
  );

  const { refreshItems: refreshEnvs } = useEnvList();

  if (!data) return;

  const envInfo = data as API.EnvInfo;

  return (
    <ProDescriptions
      column={3}
      title={envInfo.EnvName}
      className="bg-[#fafafa] p-3"
      extra={
        <div>
          <EnvUpdateModalForm
            envUid={envUid}
            onFinish={() => {
              refreshEnv();
              refreshEnvs();
            }}
          />
          <EnvDeleteModalForm
            envUid={envUid}
            envId={envInfo.EnvId}
            envName={envInfo.EnvName}
            onFinish={refreshEnvs}
          />
        </div>
      }
    >
      <ProDescriptions.Item label="域名" valueType="text">
        {envInfo.DomainName}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="API域名" valueType="text">
        {envInfo.ApiDomainName}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="创建时间">
        {new Date(envInfo.createAt).toLocaleString()}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="运维" valueType="text">
        {concatPersons(envInfo.Ops)}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="QA" valueType="text" span={2}>
        {concatPersons(envInfo.Qa)}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="销售" valueType="text">
        {concatPersons(envInfo.Sale)}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="技术支持" valueType="text" span={2}>
        {concatPersons(envInfo.Support)}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="描述" valueType="text" span={3}>
        {envInfo.Description}
      </ProDescriptions.Item>
    </ProDescriptions>
  );
}
