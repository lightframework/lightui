import FilterList from '@/components/ui/FilterList';
import PageContainer from '@/components/ui/PageContainer';
import { envOptionsApiCmdbEnvsOptions } from '@/services/cmdb/env';
import { useRequest } from '@umijs/max';
import { Tabs, TabsProps } from 'antd';
import { useEffect, useState } from 'react';
import EnvCreateModalForm from './EnvCreateModalForm';
import EnvHosts from './EnvHosts';
import EnvProjects from './EnvProjects';
import EnvSummary from './EnvSummary';

export default function Envs() {
  const [selectedEnv, setSelectedEnv] = useState<API.EnvOption>();

  const { data, refresh: refreshEnvs } = useRequest(
    envOptionsApiCmdbEnvsOptions,
  );

  const envs = data?.list;

  useEffect(() => {
    if (envs && !envs.find((item) => item.Uid === selectedEnv?.Uid)) {
      setSelectedEnv(envs.at(0));
    }
  }, [envs]);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '环境概览',
      children: selectedEnv?.Uid && (
        <EnvSummary
          envUid={selectedEnv.Uid}
          onUpdateFinish={() => refreshEnvs()}
          onDeleteFinish={() => refreshEnvs()}
        />
      ),
    },
    {
      key: '2',
      label: '主机列表',
      children: selectedEnv?.Uid && <EnvHosts envUid={selectedEnv.Uid} />,
    },
    {
      key: '3',
      label: '项目列表',
      children: selectedEnv?.Uid && <EnvProjects envUid={selectedEnv.Uid} />,
    },
  ];

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
        <Tabs
          className="-my-3"
          defaultActiveKey="1"
          items={items}
          destroyInactiveTabPane
        />
      </div>
    </PageContainer>
  );
}
