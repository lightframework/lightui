import CloudSyncButton from '@/components/cloud-sync-button';
import ResizableFilterList from '@/components/resizable-filter-list';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation } from '@umijs/max';

export default function RegionList({
  regions,
}: {
  regions: CMDB.RegionOption[];
}) {
  const { pathname, search } = useLocation();
  const currentUrl = pathname + search;
  const queryClient = useQueryClient();

  const items = regions.map((region) => ({
    label: region.RegionName,
    key: region.Uid,
    to: currentUrl.replace(/\/regions\/.*\//, `/regions/${region.Uid}/`),
  }));

  return (
    <ResizableFilterList
      name="region"
      title="区域列表"
      items={items}
      extras={
        <CloudSyncButton
          type="region"
          buttonProps={{ type: 'link', children: '同步' }}
          onFinish={() => queryClient.invalidateQueries(['region-options'])}
        />
      }
    />
  );
}
