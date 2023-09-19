import ModalDeleteForm from '@/components/ui/form/modal-form/ModalDeleteForm';
import { appDeleteApiCmdbAppsByUid } from '@/services/cmdb/app';
import { useAccess } from '@umijs/max';
import { Button } from 'antd';

export default function AppDeleteModalForm({
  appUid,
  appName,
  onFinish,
}: {
  appUid: string;
  appName: string;
  onFinish?: VoidFunction;
}) {
  const access = useAccess();
  return (
    <ModalDeleteForm<API.appDeleteApiCmdbAppsByUidParams>
      title="删除应用"
      trigger={
        <Button
          type="link"
          danger
          disabled={!(access as any).appDeleteApiCmdbAppsByUid}
        >
          删除
        </Button>
      }
      onFinish={onFinish}
      params={{ uid: appUid }}
      request={appDeleteApiCmdbAppsByUid}
      hint={appName}
    />
  );
}
