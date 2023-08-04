import FilterList from '@/components/FilterList';
import { Button, List } from 'antd';
import clsx from 'clsx';
import RegionCreateModalForm from './RegionCreateModalForm';

export default function RegionList({
  cloudUid,
  items,
  selectedRegion,
  onRegionSelected,
  onCreateFinish,
}: {
  cloudUid: string;
  items: API.RegionOption[];
  selectedRegion?: API.RegionOption;
  onRegionSelected?: (region: API.RegionOption) => void;
  onCreateFinish?: VoidFunction;
}) {
  return (
    <div className="w-[300px] shrink-0 space-y-4 p-5">
      <div className="-mr-4 flex items-center justify-between">
        <span className="text-base font-semibold">人员类型</span>
        <RegionCreateModalForm cloudUid={cloudUid} onFinish={onCreateFinish} />
      </div>

      <FilterList
        items={items}
        filterKey="RegionName"
        listProps={{
          rowKey: 'Uid',
          renderItem: (region) => (
            <List.Item>
              <Button
                type="text"
                className={clsx(
                  'w-full rounded-none text-left',
                  selectedRegion?.Uid === region.Uid && 'bg-blue-50',
                )}
                onClick={() => onRegionSelected?.(region)}
              >
                {region.RegionName}
              </Button>
            </List.Item>
          ),
        }}
      />
    </div>
  );
}
