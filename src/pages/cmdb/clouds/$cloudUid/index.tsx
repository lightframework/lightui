import FilterList from '@/components/ui/FilterList';
import LinkTabs from '@/components/ui/LinkTabs';
import PageContainer from '@/components/ui/PageContainer';

import {
  RegionListContextProvider,
  useAutoRouter,
  useRegionList,
} from '@/contexts/list-data-context';
import { useParams } from '@umijs/max';
import CloudSyncModalForm from '../CloudSyncModalForm';
import CloudsBreadcrumb from './CloudsBreadcrumb';
import RegionCreateModalForm from './RegionCreateModalForm';
import RegionInfo from './RegionInfo';
import { CloudContextProvider, useCloud } from './contexts/cloud-context';

function RegionsDetails() {
  const params = useParams();
  const cloudUid = params.cloudUid!;
  const regionUid = params.regionUid;

  const regionListData = useRegionList();
  useAutoRouter({
    ...regionListData,
    key: 'Uid',
    slug: regionUid,
    to: 'zones',
  });

  const {
    items: regions,
    refreshItems: refreshRegions,
    selectedItem: selectedRegion,
    setSelectedItem: setSelectedRegion,
  } = regionListData;

  const { cloud } = useCloud();

  if (!regions || !cloud) {
    return;
  }

  return (
    <>
      <CloudsBreadcrumb cloudUid={cloudUid} />

      <PageContainer className="mt-3 flex space-x-3">
        <FilterList<API.RegionOption>
          title="区域列表"
          rowKey="Uid"
          filterKey="RegionName"
          items={regions || []}
          selectedItem={selectedRegion}
          onItemSelected={setSelectedRegion}
          extras={
            cloud ? (
              <div>
                <CloudSyncModalForm
                  cloudUid={cloud.Uid!}
                  cloudName={cloud.CloudName!}
                />

                <RegionCreateModalForm
                  cloudUid={cloudUid!}
                  disabled={cloud.SupportApi}
                  onFinish={() => refreshRegions()}
                />
              </div>
            ) : null
          }
        />

        <div className="w-full space-y-3">
          {selectedRegion && (
            <>
              <RegionInfo
                regionUid={selectedRegion.Uid}
                disabled={cloud.SupportApi}
                onUpdateFinish={() => refreshRegions()}
                onDeleteFinish={() => {
                  setSelectedRegion(undefined);
                  refreshRegions();
                }}
              />

              <LinkTabs
                top
                withOutlet
                items={[
                  {
                    label: '可用区（机型）',
                    to: `${regionUid}/zones`,
                  },
                  {
                    label: 'VPC（Subnet）',
                    to: `${regionUid}/vpcs`,
                  },
                  {
                    label: '安全组',
                    to: `${regionUid}/security-groups`,
                  },
                  {
                    label: '镜像',
                    to: `${regionUid}/images`,
                  },
                ]}
              />
            </>
          )}
        </div>
      </PageContainer>
    </>
  );
}

export default function Page() {
  const params = useParams();
  const cloudUid = params.cloudUid!;

  return (
    <RegionListContextProvider params={{ CloudUid: cloudUid }}>
      <CloudContextProvider cloudUid={cloudUid}>
        <RegionsDetails />
      </CloudContextProvider>
    </RegionListContextProvider>
  );
}
