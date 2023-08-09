import { cloudReadOneApiCmdbCloudsByUid } from '@/services/cmdb/cloud';
import { useTitle } from '@/utils/hooks';
import { Link, useRequest } from '@umijs/max';
import { Breadcrumb } from 'antd';

export default function CloudsBreadcrumb({ cloudUid }: { cloudUid: string }) {
  const { data } = useRequest(() =>
    cloudReadOneApiCmdbCloudsByUid({ uid: cloudUid }),
  );

  useTitle(`${data?.CloudName}-云商管理 - LightOPS`);

  return (
    <Breadcrumb
      items={[
        {
          title: '资源管理',
        },
        {
          title: <Link to="/cmdb/clouds">云商管理</Link>,
        },
        {
          title: data?.CloudName,
        },
      ]}
    />
  );
}
