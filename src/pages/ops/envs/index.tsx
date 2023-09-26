import Centered from '@/components/centered';
import { envOptionsApiCmdbEnvsOptions } from '@/services/cmdb/env';
import { useQuery } from '@tanstack/react-query';
import { Outlet, history, useAccess, useLocation, useParams } from '@umijs/max';
import { Result, Segmented, Spin } from 'antd';
import { useEffect } from 'react';
import EnvList from './_components/env-list';

function Envs() {
  const { envUid } = useParams();
  const { pathname } = useLocation();

  const { data: envOptions, status: envOptionsFetchStatus } = useQuery({
    queryKey: ['env-options'],
    queryFn: () =>
      envOptionsApiCmdbEnvsOptions({}).then((res) => res.data?.list ?? []),
  });

  useEffect(() => {
    if (pathname.endsWith('/envs') && envOptions && envOptions.length !== 0) {
      history.replace(`/ops/envs/${envOptions[0].Uid}/hosts`);
    }
  }, [envOptions, pathname]);

  if (envOptionsFetchStatus === 'loading') {
    return (
      <Centered>
        <Spin />
      </Centered>
    );
  }

  if (envOptionsFetchStatus === 'error') {
    return <Result status="500" title="抱歉，请求环境资源失败" />;
  }

  return (
    <div className="flex h-full w-full gap-x-3">
      <EnvList envs={envOptions} />

      {envOptions.length === 0 ? (
        <Result title="暂无任何环境信息" subTitle="请先添加环境" />
      ) : envUid ? (
        envOptions.find((env) => env.Uid === envUid) ? (
          <div className="h-full w-full space-y-3 overflow-x-auto">
            <Segmented
              block
              defaultValue={pathname.split('/').at(-1)}
              options={[
                {
                  label: '环境概览',
                  value: 'summary',
                },
                { label: '主机列表', value: 'hosts' },
                { label: '项目列表', value: 'projects' },
              ]}
              onChange={(v) => {
                const segments = pathname.split('/');
                segments[segments.length - 1] = String(v);
                history.replace(segments.join('/'));
              }}
            />

            <Outlet />
          </div>
        ) : (
          <Result
            status="404"
            title="404"
            subTitle={`抱歉，未找到环境：${envUid}`}
          />
        )
      ) : null}
    </div>
  );
}

export default function AuthEnvs() {
  const access = useAccess();

  if (!access.envOptionsApiCmdbEnvsOptions) {
    return (
      <Result status="403" title="403" subTitle="抱歉，你无权访问环境数据" />
    );
  }

  return <Envs />;
}
