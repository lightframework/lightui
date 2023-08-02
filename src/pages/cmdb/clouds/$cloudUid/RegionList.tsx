import { regionPageListApiCmdbRegions } from '@/services/cmdb/region';
import { Button } from 'antd';
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

  const fetchRegions = useCallback(() => {
    regionPageListApiCmdbRegions({ CloudUid: cloudUid }).then((res) => {
      if (res.msg === 'OK') {
        setRegions(res.data?.list ? (res.data.list as any) : []);
        if (res.data?.list && res.data.list.length !== 0) {
          onRegionSelected?.(res.data.list[0] as any);
        }
      }
    });
  }, []);

  useEffect(() => {
    fetchRegions();
  }, []);

  return (
    <div className="w-[300px] shrink-0 p-5">
      <div className="-mr-4 flex items-center justify-between">
        <span className="text-base font-semibold">区域</span>
        <RegionCreateModalForm cloudUid={cloudUid} onFinish={fetchRegions} />
      </div>
      <div className="mt-5 flex flex-col border border-solid border-gray-100">
        {regions.map((region) => (
          <Button
            key={region.Uid}
            type="text"
            className={clsx(
              'rounded-none text-left',
              selectedRegionUid === region.Uid && 'bg-blue-50',
            )}
            onClick={() => onRegionSelected?.(region)}
          >
            {region.RegionName}
          </Button>
        ))}
      </div>
    </div>
  );
}
