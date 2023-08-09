import ModalDeleteForm from '@/components/ui/form/modal-form/ModalDeleteForm';
import { cloudDeleteApiCmdbCloudsByUid } from '@/services/cmdb/cloud';

export default function CloudDeleteModalForm({
  cloudUid,
  cloudKey,
  cloudName,
  onFinish,
}: {
  cloudUid: string;
  cloudKey: string;
  cloudName: string;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalDeleteForm<API.cloudDeleteApiCmdbCloudsByUidParams>
      title="云商"
      onFinish={onFinish}
      params={{
        uid: cloudUid,
      }}
      request={cloudDeleteApiCmdbCloudsByUid}
      hint={`${cloudName}（${cloudKey}）`}
    />
  );
}
