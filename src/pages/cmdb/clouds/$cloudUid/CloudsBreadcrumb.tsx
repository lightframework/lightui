import { cloudReadOneApiCmdbCloudsByUid } from '@/services/cmdb/cloud';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@umijs/max';
import { Breadcrumb } from 'antd';

export default function CloudsBreadcrumb({ cloudUid }: { cloudUid: string }) {
  const { data } = useQuery({
    queryKey: [cloudUid],
    queryFn: () => cloudReadOneApiCmdbCloudsByUid({ uid: cloudUid! }),
  });

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
          title: data?.data?.CloudName,
        },
      ]}
    />
  );
}
