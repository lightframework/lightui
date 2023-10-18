import { useAccess, useParams } from '@umijs/max';
import { Result } from 'antd';
import HostTable from './_components/host-table';

export default function Hosts() {
  const access = useAccess();
  const { envUid } = useParams();

  if (!access.hostPageListApiCmdbHosts) {
    return (
      <Result status="403" title="403" subTitle="抱歉，你无权访问主机数据" />
    );
  }

  return <HostTable envUid={envUid!} />;
}
