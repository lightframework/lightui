import ModalDeleteForm from '@/components/ui/form/modal-form/ModalDeleteForm';
import { regionDeleteApiCmdbRegionsByUid } from '@/services/cmdb/region';
import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useCloud } from './contexts/cloud-context';

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
  const { cloud } = useCloud();

  return (
    <ModalDeleteForm<API.regionDeleteApiCmdbRegionsByUidParams>
      title="删除区域"
      trigger={
        <Button
          type="text"
          shape="circle"
          disabled={cloud?.SupportApi}
          danger
          icon={<DeleteOutlined />}
        />
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
