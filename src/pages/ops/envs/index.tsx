import ErrorPage from '@/components/ui/ErrorPage';
import FilterList from '@/components/ui/FilterList';
import LinkTabs from '@/components/ui/LinkTabs';
import PageContainer from '@/components/ui/PageContainer';
import {
  EnvListContextProvider,
  useAutoRouter,
  useEnvList,
} from '@/contexts/list-data-context';
import { history, useAccess, useParams } from '@umijs/max';
import { Button, Result } from 'antd';
import EnvCreateModalForm from './EnvCreateModalForm';

function EnvsDetails() {
  const access = useAccess();
  const { envUid } = useParams();

  const envListData = useEnvList();
  useAutoRouter({ ...envListData, key: 'Uid', slug: envUid, to: 'hosts' });

  const {
    items: envs,
    refetchItems: refetchEnvs,
    selectedItem: selectedEnv,
    setSelectedItem: setSelectedEnv,
  } = envListData;

  if (!(access as any).envOptionsApiCmdbEnvsOptions) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="抱歉，你无权访问环境数据"
        extra={
          <Button type="primary" onClick={() => history.replace('/')}>
            返回首页
          </Button>
        }
      />
    );
  }

  return (
    <PageContainer className="flex space-x-3">
      <FilterList<API.EnvOption>
        title="环境列表"
        filterKey="EnvName"
        rowKey="Uid"
        items={envs || []}
        selectedItem={selectedEnv}
        onItemSelected={setSelectedEnv}
        extras={<EnvCreateModalForm onFinish={() => refetchEnvs()} />}
      />

      <div className="w-full space-y-3 overflow-x-auto">
        {!envs || envs.length === 0 ? (
          <ErrorPage>请先新增环境后进行管理</ErrorPage>
        ) : selectedEnv !== undefined ? (
          <LinkTabs
            top
            withOutlet
            items={[
              { label: '环境概览', to: `${envUid}/summary` },
              { label: '主机列表', to: `${envUid}/hosts` },
              { label: '项目列表', to: `${envUid}/projects` },
            ]}
          />
        ) : null}
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
