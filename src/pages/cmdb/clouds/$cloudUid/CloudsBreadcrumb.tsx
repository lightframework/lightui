import { cloudReadOneApiCmdbCloudsByUid } from '@/services/cmdb/cloud';
import { Link, useParams } from '@umijs/max';
import { Breadcrumb } from 'antd';
import { useEffect, useState } from 'react';

export default function CloudsBreadcrumb() {
  const { cloudUid } = useParams();
  const [cloudName, setCloudName] = useState<string>();

  useEffect(() => {
    const fetchCloudName = async () => {
      const res = await cloudReadOneApiCmdbCloudsByUid({ uid: cloudUid! });
      if (res.msg === 'OK') {
        setCloudName(res.data?.CloudName);
      }
    };

    fetchCloudName();
  }, []);

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
          title: cloudName,
        },
      ]}
    />
  );
}
