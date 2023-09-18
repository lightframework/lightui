import ModalDeleteForm from '@/components/ui/form/modal-form/ModalDeleteForm';
import { hosttypeDeleteApiCmdbHosttypesByUid } from '@/services/cmdb/hosttype';
import { useAccess } from '@umijs/max';
import { Button } from 'antd';

export default function HostTypeDeleteModalForm({
  hostTypeUid,
  hostTypeName,
  onFinish,
}: {
  hostTypeUid: string;
  hostTypeName: string;
  onFinish?: VoidFunction;
}) {
  const access = useAccess();

  return (
    <ModalDeleteForm<API.hosttypeDeleteApiCmdbHosttypesByUidParams>
      title="删除主机类型"
      trigger={
        <Button
          type="link"
          danger
          disabled={!(access as any).hosttypeDeleteApiCmdbHosttypesByUid}
        >
          删除
        </Button>
      }
      onFinish={onFinish}
      params={{
        uid: hostTypeUid,
      }}
      request={hosttypeDeleteApiCmdbHosttypesByUid}
      hint={hostTypeName}
    />
  );
}
