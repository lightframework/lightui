import { useParams } from '@umijs/max';
import RegionDeleteModalForm from './RegionDeleteModalForm';
import RegionUpdateModalForm from './RegionUpdateModalForm';

export default function RegionInfo({ region }: { region: API.RegionOption }) {
  const { cloudUid } = useParams();

  return (
    <div className="p-5">
      <div className="flex items-center gap-2">
        <span className="text-base font-semibold">{region.RegionName}</span>

        <RegionUpdateModalForm
          uid={region.Uid}
          initialValues={{ ...region, CloudUid: cloudUid! }}
        />
        <RegionDeleteModalForm
          uid={region.Uid}
          region={region.Region}
          regionName={region.RegionName}
        />
      </div>
      <div className="mt-4 flex flex-wrap gap-4">
        <label htmlFor="region-id">
          区域ID：<span id="region-id">{region.Region}</span>
        </label>
        <label htmlFor="region-state">
          区域状态：
          <span id="region-state">
            {region.RegionState !== '0' ? '可用' : '不可用'}
          </span>
        </label>
      </div>
    </div>
  );
}
