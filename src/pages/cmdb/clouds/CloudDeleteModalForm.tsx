import ModalDeleteForm from '@/components/ui/form/modal-form/ModalDeleteForm';
import { cloudDeleteApiCmdbCloudsByUid } from '@/services/cmdb/cloud';

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
  return (
    <ModalDeleteForm<API.cloudDeleteApiCmdbCloudsByUidParams>
      title="删除云商"
      onFinish={onFinish}
      params={{
        uid: cloudUid,
      }}
      request={cloudDeleteApiCmdbCloudsByUid}
      hint={`${cloudName}（${cloud}）`}
    />
  );
}
