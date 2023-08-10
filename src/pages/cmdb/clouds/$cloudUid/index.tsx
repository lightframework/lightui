import FilterList from '@/components/ui/FilterList';
import PageContainer from '@/components/ui/PageContainer';
import { regionOptionsApiCmdbRegionsOptions } from '@/services/cmdb/region';
import { useParams, useRequest } from '@umijs/max';
import { useEffect, useState } from 'react';
import CloudsBreadcrumb from './CloudsBreadcrumb';
import RegionCreateModalForm from './RegionCreateModalForm';
import RegionInfo from './RegionInfo';
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
      setSelectedRegion(regions.at(0));
    }
  }, [regions]);

  return (
    <>
      <CloudsBreadcrumb cloudUid={cloudUid!} />

      <PageContainer className="mt-3 flex space-x-2">
        <FilterList<API.RegionOption>
          title="区域列表"
          rowKey="Uid"
          filterKey="RegionName"
          items={regions || []}
          selectedItem={selectedRegion}
          onItemSelected={setSelectedRegion}
          extras={
            <RegionCreateModalForm
              cloudUid={cloudUid!}
              onFinish={() => refreshRegions()}
            />
          }
        />

        <div className="w-full space-y-2">
          {selectedRegion && (
            <>
              <RegionInfo
                regionUid={selectedRegion.Uid}
                onUpdateFinish={() => refreshRegions()}
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
