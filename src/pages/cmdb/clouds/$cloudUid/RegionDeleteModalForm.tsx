import ModalDeleteForm from '@/components/ui/form/modal-form/ModalDeleteForm';
import { regionDeleteApiCmdbRegionsByUid } from '@/services/cmdb/region';
import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export default function RegionDeleteModalForm({
  regionUid,
  region,
  regionName,
  onFinish,
}: {
  regionUid: string;
  region?: string;
  regionName?: string;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalDeleteForm<API.regionDeleteApiCmdbRegionsByUidParams>
      title="区域"
      trigger={
        <Button type="text" shape="circle" danger icon={<DeleteOutlined />} />
      }
      onFinish={onFinish}
      params={{
        uid: regionUid,
      }}
      request={regionDeleteApiCmdbRegionsByUid}
      hint={`${regionName}（${region}）`}
    />
  );
}
