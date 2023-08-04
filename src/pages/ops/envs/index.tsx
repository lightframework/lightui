import { envOptionsApiCmdbEnvsOptions } from '@/services/cmdb/env';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsProps } from 'antd';
import { useEffect, useState } from 'react';
import EnvHosts from './EnvHosts';
import EnvProjects from './EnvProjects';
import EnvSummary from './EnvSummary';
import EnvsList from './EnvsList';

export default function Envs() {
  const [selectedEnv, setSelectedEnv] = useState<API.EnvOption>();

  const { data: envs, refetch: refetchEnvs } = useQuery({
    queryKey: ['env-list'],
    queryFn: () =>
      envOptionsApiCmdbEnvsOptions({}).then((res) => res.data?.list),
  });

  useEffect(() => {
    if (envs) {
      if (!selectedEnv && envs.length !== 0) {
        setSelectedEnv(envs[0]);
      }
      if (!envs.find((item) => item.Uid === selectedEnv?.Uid)) {
        if (envs.length !== 0) {
          setSelectedEnv(envs[0]);
        } else {
          setSelectedEnv(undefined);
        }
      }
    }
  }, [envs]);

  const items: TabsProps['items'] = [
    {
      key: 'summary',
      label: '环境概览',
      children: selectedEnv?.Uid && <EnvSummary uid={selectedEnv.Uid} />,
    },
    {
      key: '2',
      label: '主机列表',
      children: selectedEnv?.Uid && <EnvHosts uid={selectedEnv.Uid} />,
    },
    {
      key: '3',
      label: '项目列表',
      children: selectedEnv?.Uid && <EnvProjects uid={selectedEnv.Uid} />,
    },
  ];

  return (
    <div className="flex bg-white">
      <EnvsList
        items={envs || []}
        selectedEnv={selectedEnv}
        onEnvSelected={setSelectedEnv}
        onCreateFinish={refetchEnvs}
      />

      <div className="w-full">
        <Tabs defaultActiveKey="1" items={items} className="m-5" />
      </div>
    </div>
  );
}
