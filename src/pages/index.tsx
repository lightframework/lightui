import PageContainer from '@/components/ui/PageContainer';
import { instanceTypeQuotaItemReadOneApiCmdbInstypesByUid } from '@/services/cmdb/instype';

export default function Home() {
  instanceTypeQuotaItemReadOneApiCmdbInstypesByUid({ uid: '0x197c' });
  return <PageContainer>Home</PageContainer>;
}
