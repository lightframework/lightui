import FilterList from '@/components/ui/FilterList';
import LinkTabs from '@/components/ui/LinkTabs';
import PageContainer from '@/components/ui/PageContainer';

import {
  RegionListContextProvider,
  useAutoRouter,
  useRegionList,
} from '@/contexts/list-data-context';
import { useParams } from '@umijs/max';
import CloudSyncButton from '../CloudSyncButton';
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
                <CloudSyncButton
                  title="区域同步"
                  type="region"
                  cloudUid={cloud.Uid!}
                  buttonType="link"
                  onFinish={refreshRegions}
                  hint={
                    <div>
                      您确定要同步{' '}
                      <span className="text-red-400">{cloud.CloudName}</span>{' '}
                      的区域吗？
                    </div>
                  }
                />

                <RegionCreateModalForm
                  cloudUid={cloudUid!}
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
                onUpdateFinish={() => refreshRegions()}
                onDeleteFinish={() => {
                  setSelectedRegion(undefined);
                  refreshRegions();
                }}
              />

              <LinkTabs
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
