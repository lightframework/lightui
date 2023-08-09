import PageContainer from '@/components/ui/PageContainer';
import { regionOptionsApiCmdbRegionsOptions } from '@/services/cmdb/region';
import { useParams, useRequest } from '@umijs/max';
import { useEffect, useState } from 'react';
import CloudsBreadcrumb from './CloudsBreadcrumb';
import RegionInfo from './RegionInfo';
import RegionList from './RegionList';
import ZoneTable from './ZoneTable';

export default function RegionDetail() {
  const { cloudUid } = useParams();
  const [selectedRegion, setSelectedRegion] = useState<API.RegionOption>();

  const { data, refresh: refreshRegions } = useRequest(
    () => regionOptionsApiCmdbRegionsOptions({ CloudUid: cloudUid! }),
    { refreshDeps: [cloudUid] },
  );

  const regions = data?.list;

  useEffect(() => {
    if (regions && !regions.find((item) => item.Uid === selectedRegion?.Uid)) {
      if (regions.length !== 0) {
        setSelectedRegion(regions[0]);
      } else {
        setSelectedRegion(undefined);
      }
    }
  }, [regions]);

  console.log(selectedRegion);

  return (
    <>
      <CloudsBreadcrumb cloudUid={cloudUid!} />

      <PageContainer className="shadow-base mt-3 flex h-full space-x-2 bg-white p-2">
        <RegionList
          cloudUid={cloudUid!}
          items={regions || []}
          selectedRegion={selectedRegion}
          onRegionSelected={setSelectedRegion}
          onCreateFinish={refreshRegions}
        />

        <div className="w-full space-y-2">
          {selectedRegion && (
            <>
              <RegionInfo
                regionUid={selectedRegion.Uid}
                onUpdateFinish={refreshRegions}
                onDeleteFinish={() => {
                  setSelectedRegion(undefined);
                  refreshRegions();
                }}
              />

              <ZoneTable regionUid={selectedRegion.Uid} />
            </>
          )}
        </div>
      </PageContainer>
    </>
  );
}
