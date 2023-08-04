import { Tabs, TabsProps } from 'antd';
import { useState } from 'react';
import EnvHosts from './EnvHosts';
import EnvProjects from './EnvProjects';
import EnvSummary from './EnvSummary';
import EnvsList, { EnvOption } from './EnvsList';

export default function Envs() {
  const [env, setEnv] = useState<EnvOption>();

  const items: TabsProps['items'] = [
    {
      key: 'summary',
      label: '环境概览',
      children: env?.Uid && <EnvSummary uid={env.Uid} />,
    },
    {
      key: '2',
      label: '主机列表',
      children: env?.Uid && <EnvHosts uid={env.Uid} />,
    },
    {
      key: '3',
      label: '项目列表',
      children: env?.Uid && <EnvProjects uid={env.Uid} />,
    },
  ];

  return (
    <div className="flex bg-white">
      <EnvsList selectedEnvUid={env?.Uid} onEnvSelected={setEnv} />

      <div className="w-full">
        <Tabs defaultActiveKey="1" items={items} className="m-5" />
      </div>
    </div>
  );
}
