import InstanceTable from '@/components/instance-table';
import { TABLE_REGION_HEIGHT } from '@/constants/table';
import { useParams } from '@umijs/max';

export default function Instances() {
  const { cloudUid, regionUid } = useParams();

  return (
    <InstanceTable
      cloudUid={cloudUid}
      regionUid={regionUid}
      height={TABLE_REGION_HEIGHT}
    />
  );
}
