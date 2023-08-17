import HostTypeFilterList from '@/components/host-types/HostTypeFilterList';
import { hosttypeOptionsApiCmdbHosttypesOptions } from '@/services/cmdb/hosttype';
import {
  Outlet,
  useLocation,
  useNavigate,
  useParams,
  useRequest,
} from '@umijs/max';
import { Radio } from 'antd';

function NavButtonGroup() {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const isGraphPage = pathname.includes('/graph');

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
  const params = useParams();
  const envUid = params.envUid!;

  const { data } = useRequest(hosttypeOptionsApiCmdbHosttypesOptions, {
    refreshDeps: [envUid],
  });

  return (
    <div>
      <div className="flex flex-col gap-3 py-4 xl:flex-row xl:justify-between">
        {data?.list ? <HostTypeFilterList items={data.list} /> : null}

        <NavButtonGroup key="nav-button-group" />
      </div>
      <Outlet />
    </div>
  );
}
