import HostTypeFilterList from '@/components/host-types/HostTypeFilterList';
import { Outlet, useLocation, useNavigate } from '@umijs/max';
import { Button, Radio } from 'antd';
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
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isAddPage = pathname.endsWith('/add');

  return (
    <div className="env-hosts">
      <div className=" flex flex-col gap-3 py-4 xl:flex-row xl:justify-between">
        {isAddPage ? (
          <div className="flex w-full justify-end">
            <Button onClick={() => navigate(-1)}>返回</Button>
          </div>
        ) : (
          <>
            <HostTypeFilterList />
            <NavButtonGroup key="nav-button-group" />
          </>
        )}
      </div>
      <Outlet />
    </div>
  );
}
