import ErrorPage from '@/components/ui/ErrorPage';
import { useLocation } from '@umijs/max';
import { Link } from 'react-router-dom';

export default function NotFound() {
  const { state } = useLocation();

  return (
    <ErrorPage>
      云商{(state as any)?.cloudUid}不存在
      <Link to="/cmdb/clouds" className="mx-4">
        返回
      </Link>
    </ErrorPage>
  );
}
