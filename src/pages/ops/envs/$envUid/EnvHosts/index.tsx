import {
  Outlet,
  history,
  useAccess,
  useLocation,
  useNavigate,
} from '@umijs/max';
import { Button, Radio, Result } from 'antd';
import './index.less';

function NavButtonGroup() {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const isGraphPage = pathname.endsWith('/graph');

  return (
    <Radio.Group value={isGraphPage ? 'graph' : 'list'}>
      <Radio.Button
        key="list"
        value="list"
        onClick={
          isGraphPage
            ? () => navigate(pathname.replace(`/graph`, '') + search)
            : undefined
        }
      >
        列表
      </Radio.Button>

      <Radio.Button
        key="graph"
        value="graph"
        onClick={
          !isGraphPage
            ? () => navigate(pathname + '/graph' + search)
            : undefined
        }
      >
        图示
      </Radio.Button>
    </Radio.Group>
  );
}

export default function EnvHosts() {
  const access = useAccess();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isAddPage = pathname.endsWith('/add');

  if (!(access as any).hostPageListApiCmdbHosts) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="抱歉，你无权访问主机数据"
        extra={
          <Button type="primary" onClick={() => history.replace('/')}>
            返回首页
          </Button>
        }
      />
    );
  }

  return (
    <div className="env-hosts">
      <div className=" flex flex-col gap-3 py-4 xl:flex-row xl:justify-between">
        {isAddPage ? (
          <div className="flex w-full justify-end">
            <Button onClick={() => navigate(-1)}>返回</Button>
          </div>
        ) : (
          <>
            {/* <HostTypeFilterList /> */}

            <NavButtonGroup key="nav-button-group" />
          </>
        )}
      </div>
      <Outlet />
    </div>
  );
}
