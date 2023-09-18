import PageContainer from '@/components/ui/PageContainer';
import { history, useAccess } from '@umijs/max';
import { Button, Result } from 'antd';
import CloudTreeSelectList from './CloudTreeSelectList';
import InstanceTable from './InstanceTable';

export type PlacementInfo = {
  cloudUid?: string;
  regionUid?: string;
  zoneUid?: string;
};

export default function Page() {
  const access = useAccess();

  if (!(access as any).cloudPlacementApiCmdbCloudsPlaces) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="抱歉，你无权访问云商区域数据"
        extra={
          <Button type="primary" onClick={() => history.replace('/')}>
            返回首页
          </Button>
        }
      />
    );
  }

  return (
    <PageContainer className="flex gap-x-3">
      <CloudTreeSelectList />

      <div className="w-full overflow-x-auto">
        {(access as any).instancePageListApiCmdbInstances ? (
          <InstanceTable />
        ) : (
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
        )}
      </div>
    </PageContainer>
  );
}
