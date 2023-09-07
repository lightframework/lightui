import PageContainer from '@/components/ui/PageContainer';
import { hostPageListApiCmdbHosts } from '@/services/cmdb/host';

export default function Home() {
  hostPageListApiCmdbHosts({ EnvId: '1', HostType: '11-proxy' });
  return <PageContainer>Home</PageContainer>;
}
