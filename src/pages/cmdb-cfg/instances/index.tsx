import Centered from '@/components/centered';
import InstanceTable from '@/components/instance-table';
import { cloudPlacementApiCmdbCloudsPlaces } from '@/services/cmdb/cloud';
import { useQuery } from '@tanstack/react-query';
import { useAccess, useSearchParams } from '@umijs/max';
import { Result, Spin } from 'antd';
import CloudTreeList from './_components/cloud-tree-list';

function Instances() {
  const access = useAccess();
  const [searchParams] = useSearchParams();
  const cloudUid = searchParams.get('cloudUid') ?? undefined;
  const regionUid = searchParams.get('regionUid') ?? undefined;
  const zoneUid = searchParams.get('zoneUid') ?? undefined;

  const { data: cloudPlacement, status: cloudPlacementFetchStatus } = useQuery({
    queryKey: ['cloud-placement'],
    queryFn: () =>
      cloudPlacementApiCmdbCloudsPlaces({}).then((res) => res.data?.Tree ?? []),
  });

  if (cloudPlacementFetchStatus === 'loading') {
    return (
      <Centered>
        <Spin />
      </Centered>
    );
  }

  if (cloudPlacementFetchStatus === 'error') {
    return <Result status="500" title="抱歉，请求云商资源失败" />;
  }

  return (
    <div className="flex h-full w-full gap-x-3">
      <CloudTreeList clouds={cloudPlacement} />

      {cloudPlacement.length === 0 ? (
        <Result title="暂无任何云商信息" />
      ) : (
        <div className="h-full w-full overflow-x-auto">
          {access.instancePageListApiCmdbInstances ? (
            <InstanceTable
              cloudUid={cloudUid}
              regionUid={regionUid}
              zoneUid={zoneUid}
            />
          ) : (
            <Result
              status="403"
              title="403"
              subTitle="抱歉，你无权访问主机实例数据"
            />
          )}
        </div>
      )}
    </div>
  );
}

export default function AuthInstances() {
  const access = useAccess();

  if (!access.cloudPlacementApiCmdbCloudsPlaces) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="抱歉，你无权访问云商区域数据"
      />
    );
  }

  return <Instances />;
}
