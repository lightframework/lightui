import PageContainer from '@/components/ui/PageContainer';
import { cloudTagReadOneApiCmdbCloudtagsByUid } from '@/services/cmdb/cloudTag';

export default function Home() {
  cloudTagReadOneApiCmdbCloudtagsByUid({ uid: '0xb8' });
  return <PageContainer></PageContainer>;
}
