import FilterList from '@/components/ui/FilterList';
import LinkTabs from '@/components/ui/LinkTabs';
import PageContainer from '@/components/ui/PageContainer';
import {
  EnvListContextProvider,
  useAutoRouter,
  useEnvList,
} from '@/contexts/list-data-context';
import { useParams } from '@umijs/max';
import EnvCreateModalForm from './EnvCreateModalForm';

function EnvsDetails() {
  const { envUid } = useParams();

  const envListData = useEnvList();
  useAutoRouter({ ...envListData, key: 'Uid', slug: envUid, to: 'summary' });

  const {
    items: envs,
    refreshItems: refreshEnvs,
    selectedItem: selectedEnv,
    setSelectedItem: setSelectedEnv,
  } = envListData;

  return (
    <PageContainer className="flex space-x-3">
      <FilterList<API.EnvOption>
        title="环境列表"
        filterKey="EnvName"
        rowKey="Uid"
        items={envs || []}
        selectedItem={selectedEnv}
        onItemSelected={setSelectedEnv}
        extras={<EnvCreateModalForm onFinish={() => refreshEnvs()} />}
      />

      <div className="w-full">
        <LinkTabs
          top
          withOutlet
          items={[
            { label: '环境概览', to: `${envUid}/summary` },
            { label: '主机列表', to: `${envUid}/hosts` },
            { label: '项目列表', to: `${envUid}/projects` },
          ]}
        />
      </div>
    </PageContainer>
  );
}

export default function Page() {
  return (
    <EnvListContextProvider params={{}}>
      <EnvsDetails />
    </EnvListContextProvider>
  );
}
