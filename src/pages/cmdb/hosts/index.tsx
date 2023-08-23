import HostTypeFilterList from '@/components/host-types/HostTypeFilterList';
import PageContainer from '@/components/ui/PageContainer';
import { Outlet, useLocation, useNavigate } from '@umijs/max';
import { Button, Radio } from 'antd';

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

export default function Hosts() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isAddPage = pathname.endsWith('/add');

  return (
    <PageContainer className="space-y-3">
      <div className="flex flex-col gap-3 xl:flex-row xl:justify-between">
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
    </PageContainer>
  );
}
