import CollapseDescriptions from '@/components/ui/CollapseDescriptions';
import { regionReadOneApiCmdbRegionsByUid } from '@/services/cmdb/region';
import { toLocaleDateTimeString } from '@/utils/func';
import { useRequest } from '@umijs/max';
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
    <CollapseDescriptions
      title={region.RegionName}
      toolBarRender={
        <>
          <RegionUpdateModalForm
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
        </>
      }
      column={4}
      items={[
        {
          label: '区域ID',
          children: region.Region,
        },
        {
          label: '状态',
          children: region.RegionState,
        },
        {
          label: '备注',
          span: 2,
          children: region.Description,
        },
        {
          label: '创建者',
          children: region.createBy,
        },
        {
          label: '创建时间',
          children: toLocaleDateTimeString(region.createAt),
        },

        {
          label: '更新者',
          children: region.updateBy,
        },
        {
          label: '更新时间',
          children: toLocaleDateTimeString(region.updateAt),
        },
      ]}
    />
  );
}
