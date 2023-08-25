import PageContainer from '@/components/ui/PageContainer';
import CloudTreeSelectList from './CloudTreeSelectList';
import HostTable from './HostTable';

export default function Page() {
  return (
    <PageContainer className="flex gap-x-3">
      <CloudTreeSelectList />

      <div className="w-full">
        <HostTable />
      </div>
    </PageContainer>
  );
}
