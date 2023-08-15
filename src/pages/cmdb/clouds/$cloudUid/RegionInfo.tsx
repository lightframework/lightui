import { regionReadOneApiCmdbRegionsByUid } from '@/services/cmdb/region';
import { ProDescriptions } from '@ant-design/pro-components';
import { useParams, useRequest } from '@umijs/max';
import RegionDeleteModalForm from './RegionDeleteModalForm';
import RegionUpdateModalForm from './RegionUpdateModalForm';

export default function RegionInfo({
  regionUid,
  disabled = false,
  onUpdateFinish,
  onDeleteFinish,
}: {
  regionUid: string;
  disabled?: boolean;
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
      column={4}
      className="bg-[#fafafa] p-3"
      extra={
        <div>
          <RegionUpdateModalForm
            cloudUid={cloudUid!}
            regionUid={region.Uid!}
            disabled={disabled}
            onFinish={() => {
              refreshRegion();
              onUpdateFinish?.();
            }}
          />
          <RegionDeleteModalForm
            regionUid={region.Uid!}
            region={region.Region}
            regionName={region.RegionName}
            disabled={disabled}
            onFinish={onDeleteFinish}
          />
        </div>
      }
    >
      <ProDescriptions.Item label="区域ID" valueType="text">
        {region.Region}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="区域状态" valueType="text">
        {region.RegionState}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="创建时间" valueType="text">
        {region.createAt}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="创建人" valueType="text">
        {region.createBy}
      </ProDescriptions.Item>
    </ProDescriptions>
  );
}
