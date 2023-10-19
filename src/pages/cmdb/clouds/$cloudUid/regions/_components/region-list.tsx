import CloudSyncButton from '@/components/cloud-sync-button';
import ResizableFilterList from '@/components/resizable-filter-list';
import { SyncOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation } from '@umijs/max';
import RegionCreateModalForm from './region-create-modal-form';

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
        <div className="flex items-center gap-x-px">
          <RegionCreateModalForm />
          <CloudSyncButton
            type="region"
            buttonProps={{
              type: 'text',
              icon: <SyncOutlined />,
              shape: 'circle',
            }}
            onFinish={() => queryClient.invalidateQueries(['region-options'])}
          />
        </div>
      }
    />
  );
}
