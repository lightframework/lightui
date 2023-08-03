import FilterList from '@/components/FilterList';
import { regionPageListApiCmdbRegions } from '@/services/cmdb/region';
import { Button, List } from 'antd';
import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import RegionCreateModalForm from './RegionCreateModalForm';

export type RegionInfo = Required<API.RegionInfo>['data'];

export default function RegionList({
  cloudUid,
  selectedRegionUid,
  onRegionSelected,
}: {
  cloudUid: string;
  selectedRegionUid?: string;
  onRegionSelected?: (region: RegionInfo) => void;
}) {
  const [regions, setRegions] = useState<RegionInfo[]>([]);
  const [initialFetch, setInitialFetch] = useState(false);

  const fetchRegions = useCallback(async () => {
    const res = await regionPageListApiCmdbRegions({ CloudUid: cloudUid });
    if (res.msg === 'OK') {
      setRegions(res.data?.list ? (res.data.list as any) : []);
      if (res.data?.list && res.data.list.length !== 0) {
        onRegionSelected?.(res.data.list[0] as any);
      }
    }
  }, []);

  useEffect(() => {
    fetchRegions().then(() => setInitialFetch(true));
  }, []);

  return (
    <div className="w-[300px] shrink-0 space-y-4 p-5">
      <div className="-mr-4 flex items-center justify-between">
        <span className="text-base font-semibold">区域</span>
        <RegionCreateModalForm cloudUid={cloudUid} onFinish={fetchRegions} />
      </div>

      {initialFetch && (
        <FilterList
          items={regions}
          filterKey="RegionName"
          listProps={{
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
