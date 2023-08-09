import PageContainer from '@/components/ui/PageContainer';
import { envOptionsApiCmdbEnvsOptions } from '@/services/cmdb/env';
import { useRequest } from '@umijs/max';
import { Tabs, TabsProps } from 'antd';
import { useEffect, useState } from 'react';
import EnvHosts from './EnvHosts';
import EnvProjects from './EnvProjects';
import EnvSummary from './EnvSummary';
import EnvList from './EnvsList';

export default function Envs() {
  const [selectedEnv, setSelectedEnv] = useState<API.EnvOption>();

  const { data, refresh: refreshEnvs } = useRequest(
    envOptionsApiCmdbEnvsOptions,
  );

  const envs = data?.list;

  useEffect(() => {
    if (envs && !envs.find((item) => item.Uid === selectedEnv?.Uid)) {
      if (envs.length !== 0) {
        setSelectedEnv(envs[0]);
      } else {
        setSelectedEnv(undefined);
      }
    }
  }, [envs]);

  const items: TabsProps['items'] = [
    {
      key: 'summary',
      label: '环境概览',
      children: selectedEnv?.Uid && <EnvSummary envUid={selectedEnv.Uid} />,
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
    <PageContainer className="flex space-x-2">
      {/* <RegionList
        cloudUid={cloudUid!}
        items={regions || []}
        selectedRegion={selectedRegion}
        onRegionSelected={setSelectedRegion}
        onCreateFinish={refreshRegions}
      />

      <div className="w-full">
        {selectedRegion && (
          <>
            <RegionInfo
              regionUid={selectedRegion.Uid}l
              onUpdateFinish={refreshRegions}
              onDeleteFinish={() => {
                setSelectedRegion(undefined);
                refreshRegions();
              }}
            />

            <ZoneTable regionUid={selectedRegion.Uid} />
          </>
        )}
      </div> */}
      <EnvList
        items={envs || []}
        selectedEnv={selectedEnv}
        onEnvSelected={setSelectedEnv}
      />

      <div className="w-full">
        <Tabs className="-my-2" defaultActiveKey="summary" items={items} />
      </div>
    </PageContainer>
  );
}
