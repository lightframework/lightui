import FilterList from '@/components/FilterList';
import { regionOptionsApiCmdbRegionsOptions } from '@/services/cmdb/region';
import { useQuery } from '@tanstack/react-query';
import { Button, List } from 'antd';
import clsx from 'clsx';
import { useCallback } from 'react';
import RegionCreateModalForm from './RegionCreateModalForm';

export default function RegionList({
  cloudUid,
  selectedRegionUid,
  onRegionSelected,
}: {
  cloudUid: string;
  selectedRegionUid?: string;
  onRegionSelected?: (region: API.RegionOption) => void;
}) {
  const fetchRegions = useCallback(async () => {
    const res = await regionOptionsApiCmdbRegionsOptions({
      CloudUid: cloudUid,
    });
    if (res.msg === 'OK') {
      if (res.data?.list && res.data.list.length !== 0) {
        onRegionSelected?.(res.data.list[0]);
      }

      return res.data?.list || [];
    }
  }, []);

  const { data: regions } = useQuery({
    queryKey: ['region-list', cloudUid],
    queryFn: fetchRegions,
  });

  return (
    <div className="w-[300px] shrink-0 space-y-4 p-5">
      <div className="-mr-4 flex items-center justify-between">
        <span className="text-base font-semibold">区域列表</span>
        <RegionCreateModalForm cloudUid={cloudUid} onFinish={fetchRegions} />
      </div>

      {regions && (
        <FilterList
          items={regions}
          filterKey="RegionName"
          listProps={{
            rowKey: 'Uid',
            renderItem: (region) => (
              <List.Item>
                <Button
                  type="text"
                  className={clsx(
                    'w-full rounded-none text-left',
                    selectedRegionUid === region.Uid && 'bg-blue-50',
                  )}
                  onClick={() => onRegionSelected?.(region)}
                >
                  {region.RegionName}
                </Button>
              </List.Item>
            ),
          }}
        />
      )}
    </div>
  );
}
