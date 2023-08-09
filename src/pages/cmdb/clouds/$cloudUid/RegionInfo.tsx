import { regionReadOneApiCmdbRegionsByUid } from '@/services/cmdb/region';
import { ProDescriptions } from '@ant-design/pro-components';
import { useParams, useRequest } from '@umijs/max';
import RegionDeleteModalForm from './RegionDeleteModalForm';
import RegionUpdateModalForm from './RegionUpdateModalForm';

export default function RegionInfo({
  regionUid,
  onUpdateFinish,
  onDeleteFinish,
}: {
  regionUid: string;
  onUpdateFinish?: VoidFunction;
  onDeleteFinish?: VoidFunction;
}) {
  const { cloudUid } = useParams();

  const { data: region, refresh: refreshRegion } = useRequest(
    () => regionReadOneApiCmdbRegionsByUid({ uid: regionUid }),
    {
      refreshDeps: [regionUid],
    },
  );

  if (!region) {
    return;
  }

  return (
    <ProDescriptions
      title={region.RegionName}
      column={3}
      className="bg-[#fafafa] p-2"
      extra={
        <div>
          <RegionUpdateModalForm
            cloudUid={cloudUid!}
            regionUid={region.Uid!}
            onFinish={() => {
              refreshRegion();
              onUpdateFinish?.();
            }}
          />
          <RegionDeleteModalForm
            regionUid={region.Uid!}
            region={region.Region}
            regionName={region.RegionName}
            onFinish={onDeleteFinish}
          />
        </div>
      }
    >
      <ProDescriptions.Item label="区域ID" valueType="text">
        {region.Region}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="区域状态" valueType="text" span={2}>
        {region.RegionState}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="创建时间" valueType="text">
        {region.createAt}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="创建人" valueType="text" span={2}>
        {region.createBy}
      </ProDescriptions.Item>
    </ProDescriptions>
  );
}
