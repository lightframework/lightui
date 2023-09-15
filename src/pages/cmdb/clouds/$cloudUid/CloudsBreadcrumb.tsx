import { Link } from '@umijs/max';
import { Breadcrumb } from 'antd';
import { useCloud } from './contexts/cloud-context';

export default function CloudsBreadcrumb() {
  const { cloud } = useCloud();

  return (
    <div className="ml-4">
      <Breadcrumb
        items={[
          {
            title: '资源管理',
          },
          {
            title: <Link to="/cmdb/clouds">云商管理</Link>,
          },
          {
            title: cloud?.CloudName,
          },
        ]}
      />
    </div>
  );
}
