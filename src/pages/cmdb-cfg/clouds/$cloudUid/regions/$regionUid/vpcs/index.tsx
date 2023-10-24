import { useAccess, useParams } from '@umijs/max';
import { Result } from 'antd';
import VpcTable from './_components/vpc-table';

export default function VPCS() {
  const access = useAccess();
  const { regionUid } = useParams();

  if (!access.vpcPageListApiCmdbVpcs) {
    return (
      <Result status="403" title="403" subTitle="抱歉，你无权访问云商VPC数据" />
    );
  }

  return <VpcTable regionUid={regionUid!} />;
}
