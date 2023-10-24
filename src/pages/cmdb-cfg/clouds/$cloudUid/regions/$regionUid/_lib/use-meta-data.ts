import { useCloud } from '@/lib/hooks/data';
import { useParams } from '@umijs/max';

export function useMetaData() {
  const { cloudUid, regionUid } = useParams();

  const { data } = useCloud(cloudUid!);

  return { cloud: data, regionUid: regionUid! };
}
