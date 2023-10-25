import Centered from '@/components/centered';
import { useQueryProfessionOptions } from '@/lib/hooks/data';
import { Outlet, history, useAccess, useLocation, useParams } from '@umijs/max';
import { Result, Spin } from 'antd';
import { useEffect } from 'react';
import ProfessionList from './_components/profession-list';

function Professions() {
  const { professionUid } = useParams();
  const { pathname } = useLocation();

  const { data: professionOptions, status: professionOptionsFetchStatus } =
    useQueryProfessionOptions();

  useEffect(() => {
    if (
      pathname.endsWith('/professions') &&
      professionOptions &&
      professionOptions.length !== 0
    ) {
      history.replace(`/cmdb-cfg/professions/${professionOptions[0].Uid}`);
    }
  }, [professionOptions, pathname]);

  if (professionOptionsFetchStatus === 'loading') {
    return (
      <Centered>
        <Spin />
      </Centered>
    );
  }

  if (professionOptionsFetchStatus === 'error') {
    return <Result status="500" title="抱歉，请求部门资源失败" />;
  }

  return (
    <div className="flex h-full w-full gap-x-3">
      <ProfessionList professions={professionOptions} />

      {professionOptions.length === 0 ? (
        <Result title="暂无任何部门信息" subTitle="请先添加部门" />
      ) : professionUid ? (
        <div className="h-full w-full overflow-x-auto">
          {professionOptions.find(
            (profession) => profession.Uid === professionUid,
          ) ? (
            <Outlet />
          ) : (
            <Result
              status="404"
              title="404"
              subTitle={`抱歉，未找到部门：${professionUid}`}
            />
          )}
        </div>
      ) : null}
    </div>
  );
}

export default function AuthProfessions() {
  const access = useAccess();

  if (!access.professionOptionsApiCmdbProfessionsOptions) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="抱歉，你无权访问人员类型数据"
      />
    );
  }

  return <Professions />;
}
