import PageContainer from '@/components/ui/PageContainer';
import { appOptionsApiCmdbAppsOptions } from '@/services/cmdb/app';

export default function Home() {
  appOptionsApiCmdbAppsOptions({});
  return <PageContainer>Home</PageContainer>;
}
