import PageContainer from '@/components/ui/PageContainer';
import { useParams } from '@umijs/max';
import { Typography } from 'antd';

export default function CloudNotFound() {
  const { cloudUid } = useParams();

  return (
    <PageContainer>
      <Typography.Title level={2} className="my-10 text-center">
        无效的云商Uid {cloudUid}！
      </Typography.Title>
    </PageContainer>
  );
}
