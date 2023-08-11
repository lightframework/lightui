import ModalDeleteForm from '@/components/ui/form/modal-form/ModalDeleteForm';
import { hosttypeDeleteApiCmdbHosttypesByUid } from '@/services/cmdb/hosttype';

export default function HostTypeDeleteModalForm({
  hostTypeUid,
  hostTypeName,
  onFinish,
}: {
  hostTypeUid: string;
  hostTypeName: string;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalDeleteForm<API.hosttypeDeleteApiCmdbHosttypesByUidParams>
      title="删除主机类型"
      onFinish={onFinish}
      params={{
        uid: hostTypeUid,
      }}
      request={hosttypeDeleteApiCmdbHosttypesByUid}
      hint={hostTypeName}
    />
  );
}
