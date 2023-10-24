import Centered from '@/components/centered';
import { cloudReadOneApiCmdbCloudsByUid } from '@/services/cmdb/cloud';
import { regionOptionsApiCmdbRegionsOptions } from '@/services/cmdb/region';
import { useQuery } from '@tanstack/react-query';
import { Outlet, history, useAccess, useLocation, useParams } from '@umijs/max';
import { Button, Result, Segmented, Spin } from 'antd';
import { useEffect } from 'react';
import CloudBreadcrumb from './_components/cloud-breadcrumb';
import RegionList from './_components/region-list';

function Regions() {
  const { cloudUid, regionUid } = useParams();
  const { pathname } = useLocation();

  if (!cloudUid) {
    throw new Error('Regions must be used with param: `cloudUid`.');
  }

  const { data: cloud, status: cloudFetchStatus } = useQuery({
    queryKey: ['cloud', cloudUid],
    queryFn: async () =>
      cloudReadOneApiCmdbCloudsByUid({ uid: cloudUid }).then(
        (res) => res.data as CMDB.CloudInfo,
      ),
  });

  const { data: regionOptions, status: regionOptionsFetchStatus } = useQuery({
    queryKey: ['region-options', cloudUid],
    queryFn: () =>
      regionOptionsApiCmdbRegionsOptions({ CloudUid: cloudUid }).then(
        (res) => res.data?.list ?? [],
      ),
  });

  useEffect(() => {
    if (
      pathname.endsWith('/regions') &&
      regionOptions &&
      regionOptions.length !== 0
    ) {
      history.replace(
        `/cmdb/clouds/${cloudUid}/regions/${regionOptions[0].Uid}/zones`,
      );
    }
  }, [regionOptions, pathname]);

  if (
    cloudFetchStatus === 'loading' ||
    regionOptionsFetchStatus === 'loading'
  ) {
    return (
      <Centered>
        <Spin />
      </Centered>
    );
  }

  if (cloudFetchStatus === 'error' || regionOptionsFetchStatus === 'error') {
    return (
      <Result
        status="404"
        title="404"
        subTitle={`抱歉，未找到云商：${cloudUid}`}
        extra={
          <Button
            type="primary"
            onClick={() => history.replace('/cmdb/clouds')}
          >
            返回
          </Button>
        }
      />
    );
  }

  return (
    <div className="flex h-full w-full gap-x-3">
      <RegionList regions={regionOptions} />

      <div className="h-full w-full space-y-3 overflow-x-auto">
        {regionOptions.length === 0 ? (
          <Result
            title="该云商暂无任何区域信息"
            subTitle="请先进行同步或者手动添加"
          />
        ) : regionUid ? (
          regionOptions.find((region) => region.Uid === regionUid) ? (
            <>
              <CloudBreadcrumb cloudName={cloud.CloudName} />

              <Segmented
                block
                defaultValue={pathname.split('/').at(-1)}
                options={[
                  {
                    label: '可用区（机型）',
                    value: 'zones',
                  },
                  { label: 'VPC（子网）', value: 'vpcs' },
                  { label: '安全组', value: 'security-groups' },
                  { label: '镜像', value: 'images' },
                  {
                    label: '实例',
                    value: 'instances',
                  },
                ]}
                onChange={(v) => {
                  const segments = pathname.split('/');
                  segments[segments.length - 1] = String(v);
                  history.replace(segments.join('/'));
                }}
              />

              <Outlet />
            </>
          ) : (
            <Result
              status="404"
              title="404"
              subTitle={`抱歉，未找到区域：${regionUid}`}
            />
          )
        ) : null}
      </div>
    </div>
  );
}

export default function AuthRegions() {
  const access = useAccess();

  if (!access.regionOptionsApiCmdbRegionsOptions) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="抱歉，你无权访问云商区域数据"
      />
    );
  }

  return <Regions />;
}
