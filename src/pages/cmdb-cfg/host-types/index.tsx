import { useAccess } from '@umijs/max';
import { Result } from 'antd';
import HostTypeTable from './_components/host-type-table';

export default function HostTypes() {
  const access = useAccess();

  if (!access.hosttypePageListApiCmdbHosttypes) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="抱歉，你无权访问主机类型数据"
      />
    );
  }

  return <HostTypeTable />;
}
