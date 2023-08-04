import { regionOptionsApiCmdbRegionsOptions } from '@/services/cmdb/region';
import { useQuery } from '@tanstack/react-query';
import { useParams } from '@umijs/max';
import { useEffect, useState } from 'react';
import CloudsBreadcrumb from './CloudsBreadcrumb';
import RegionInfo from './RegionInfo';
import RegionList from './RegionList';
import ZoneTable from './ZoneTable';

export default function RegionDetail() {
  const { cloudUid } = useParams();
  const [selectedRegion, setSelectedRegion] = useState<API.RegionOption>();

  const { data: regions, refetch: refetchRegions } = useQuery({
    queryKey: ['region-list'],
    queryFn: () =>
      regionOptionsApiCmdbRegionsOptions({ CloudUid: cloudUid! }).then(
        (res) => res.data?.list,
      ),
  });

  useEffect(() => {
    if (regions && !regions.find((item) => item.Uid === selectedRegion?.Uid)) {
      if (regions.length !== 0) {
        setSelectedRegion(regions[0]);
      } else {
        setSelectedRegion(undefined);
      }
    }
  }, [regions]);

  return (
    <div>
      <CloudsBreadcrumb cloudUid={cloudUid!} />

      <div className="mt-5 flex bg-white">
        <RegionList
          cloudUid={cloudUid!}
          items={regions || []}
          selectedRegion={selectedRegion}
          onRegionSelected={setSelectedRegion}
          onCreateFinish={refetchRegions}
        />

        <div className="w-full">
          {selectedRegion && (
            <>
              <RegionInfo
                regionUid={selectedRegion.Uid}
                onUpdateFinish={refetchRegions}
                onDeleteFinish={() => {
                  setSelectedRegion(undefined);
                  refetchRegions();
                }}
              />

              <ZoneTable regionUid={selectedRegion?.Uid} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
