import ModalDeleteForm from '@/components/ui/form/modal-form/ModalDeleteForm';
import { appDeleteApiCmdbAppsByUid } from '@/services/cmdb/app';

export default function AppDeleteModalForm({
  appUid,
  appName,
  onFinish,
}: {
  appUid: string;
  appName: string;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalDeleteForm<API.appDeleteApiCmdbAppsByUidParams>
      title="删除应用"
      onFinish={onFinish}
      params={{ uid: appUid }}
      request={appDeleteApiCmdbAppsByUid}
      hint={appName}
    />
  );
}
