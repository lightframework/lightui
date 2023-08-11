import ModalDeleteForm from '@/components/ui/form/modal-form/ModalDeleteForm';
import { personDeleteApiCmdbPersonsByUid } from '@/services/cmdb/person';

export default function PersonDeleteModalForm({
  personUid,
  personName,
  personId,
  onFinish,
}: {
  personUid: string;
  personName?: string;
  personId?: string;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalDeleteForm<API.personDeleteApiCmdbPersonsByUidParams>
      title="删除人员"
      params={{
        uid: personUid,
      }}
      request={personDeleteApiCmdbPersonsByUid}
      onFinish={onFinish}
      hint={`${personName}（${personId}）`}
    />
  );
}
