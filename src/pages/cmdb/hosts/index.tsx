import PageContainer from '@/components/ui/PageContainer';
import CloudTreeSelectList from './CloudTreeSelectList';
import InstanceTable from './InstanceTable';

export type PlacementInfo = {
  cloudUid?: string;
  regionUid?: string;
  zoneUid?: string;
};

export default function Page() {
  return (
    <PageContainer className="flex gap-x-3">
      <CloudTreeSelectList />

      <div className="w-full overflow-x-auto">
        <InstanceTable />
      </div>
    </PageContainer>
  );
}
