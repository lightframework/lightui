import { regionReadOneApiCmdbRegionsByUid } from '@/services/cmdb/region';
import { ProDescriptions } from '@ant-design/pro-components';
import { useQuery } from '@tanstack/react-query';
import { useParams } from '@umijs/max';
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

  const { data: region, refetch: refetchRegion } = useQuery({
    queryKey: ['region-info', regionUid],
    queryFn: () =>
      regionReadOneApiCmdbRegionsByUid({ uid: regionUid }).then(
        (res) => res.data,
      ),
  });

  if (!region) {
    return;
  }

  return (
    <ProDescriptions
      title={region.RegionName}
      column={3}
      className="p-5"
      extra={
        <div>
          <RegionUpdateModalForm
            regionUid={region.Uid!}
            initialValues={{ ...region, CloudUid: cloudUid! }}
            onFinish={() => {
              refetchRegion();
              onUpdateFinish?.();
            }}
          />
          <RegionDeleteModalForm
            uid={region.Uid!}
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
        {region.RegionState !== '0' ? '可用' : '不可用'}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="创建时间" valueType="dateTime">
        {region.createAt}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="创建人" valueType="text" span={2}>
        {region.createBy}
      </ProDescriptions.Item>
    </ProDescriptions>
  );
}
