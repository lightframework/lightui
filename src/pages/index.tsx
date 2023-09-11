import PageContainer from '@/components/ui/PageContainer';
import { cloudOptionsApiCmdbCloudsOptions } from '@/services/cmdb/cloud';

export default function Home() {
  cloudOptionsApiCmdbCloudsOptions({});
  return <PageContainer>Home</PageContainer>;
}
