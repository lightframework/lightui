import ModalDeleteForm from '@/components/ui/form/modal-form/ModalDeleteForm';
import { cloudDeleteApiCmdbCloudsByUid } from '@/services/cmdb/cloud';
import { useAccess } from '@umijs/max';
import { Button } from 'antd';

export default function CloudDeleteModalForm({
  cloudUid,
  cloud,
  cloudName,
  onFinish,
}: {
  cloudUid: string;
  cloud: string;
  cloudName: string;
  onFinish?: VoidFunction;
}) {
  const access = useAccess();

  return (
    <ModalDeleteForm<API.cloudDeleteApiCmdbCloudsByUidParams>
      title="删除云商"
      trigger={
        <Button
          type="link"
          danger
          disabled={!(access as any).cloudDeleteApiCmdbCloudsByUid}
        >
          删除
        </Button>
      }
      onFinish={onFinish}
      params={{
        uid: cloudUid,
      }}
      request={cloudDeleteApiCmdbCloudsByUid}
      hint={`${cloudName}（${cloud}）`}
    />
  );
}
