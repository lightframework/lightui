import ModalDeleteForm from '@/components/ui/form/modal-form/ModalDeleteForm';
import { personDeleteApiCmdbPersonsByUid } from '@/services/cmdb/person';
import { useAccess } from '@umijs/max';
import { Button } from 'antd';

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
  const access = useAccess();
  return (
    <ModalDeleteForm<API.personDeleteApiCmdbPersonsByUidParams>
      title="删除人员"
      trigger={
        <Button
          type="link"
          danger
          disabled={!(access as any).personDeleteApiCmdbPersonsByUid}
        >
          删除
        </Button>
      }
      params={{
        uid: personUid,
      }}
      request={personDeleteApiCmdbPersonsByUid}
      onFinish={onFinish}
      hint={`${personName}（${personId}）`}
    />
  );
}
