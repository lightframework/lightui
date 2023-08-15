import FilterList from '@/components/ui/FilterList';
import PageContainer from '@/components/ui/PageContainer';
import { cloudReadOneApiCmdbCloudsByUid } from '@/services/cmdb/cloud';
import { regionOptionsApiCmdbRegionsOptions } from '@/services/cmdb/region';
import { useTitle } from '@/utils/hooks';
import { useParams, useRequest } from '@umijs/max';
import { Tabs, TabsProps } from 'antd';
import { useEffect, useState } from 'react';
import CloudSyncModalForm from '../CloudSyncModalForm';
import CloudNotFound from './CloudNotFound';
import CloudsBreadcrumb from './CloudsBreadcrumb';
import Images from './Images';
import RegionCreateModalForm from './RegionCreateModalForm';
import RegionInfo from './RegionInfo';
import SecurityGroup from './SecurityGroup';
import VPC from './VPC';
import Zones from './Zones';

export default function RegionDetail() {
  const { cloudUid } = useParams();

  const [selectedRegion, setSelectedRegion] = useState<API.RegionOption>();

  const { data: cloud, loading } = useRequest(
    () => cloudReadOneApiCmdbCloudsByUid({ uid: cloudUid! }),
    {
      refreshDeps: [cloudUid],
    },
  );

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

  useTitle(`${cloud?.CloudName} - 云商管理 - LightOPS`, {
    refreshDeps: [cloud],
  });

  if (!loading && !cloud) {
    return <CloudNotFound />;
  }

  const items: TabsProps['items'] = [
    {
      key: 'zone',
      label: '可用区（机型）',
      children: selectedRegion ? (
        <Zones
          regionUid={selectedRegion.Uid}
          regionName={selectedRegion.RegionName}
          cloudName={cloud?.CloudName}
          disableCreate={cloud?.SupportApi}
        />
      ) : null,
    },
    {
      key: 'VPC',
      label: 'VPC（Subnet）',
      children: selectedRegion ? <VPC regionUid={selectedRegion.Uid} /> : null,
    },
    {
      key: 'security-group',
      label: '安全组',
      children: selectedRegion ? (
        <SecurityGroup regionUid={selectedRegion.Uid} />
      ) : null,
    },
    {
      key: 'mirror',
      label: '镜像',
      children: selectedRegion ? (
        <Images regionUid={selectedRegion.Uid} />
      ) : null,
    },
  ];

  return (
    <>
      <CloudsBreadcrumb cloudUid={cloudUid!} />

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
                disabled={cloud?.SupportApi}
                onUpdateFinish={() => refreshRegions()}
                onDeleteFinish={() => {
                  setSelectedRegion(undefined);
                  refreshRegions();
                }}
              />

              <Tabs
                defaultActiveKey="zone"
                items={items}
                destroyInactiveTabPane
              />
            </>
          )}
        </div>
      </PageContainer>
    </>
  );
}
