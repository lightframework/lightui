import ModalDeleteForm from '@/components/ui/form/modal-form/ModalDeleteForm';
import { projectDeleteApiCmdbProjectsByUid } from '@/services/cmdb/project';
import { useAccess } from '@umijs/max';
import { Button } from 'antd';

export default function ProjectDeleteModalForm({
  projectUid,
  projectName,
  projectId,
  onFinish,
}: {
  projectUid: string;
  projectName?: string;
  projectId?: string;
  onFinish?: VoidFunction;
}) {
  const access = useAccess();
  return (
    <ModalDeleteForm<API.projectDeleteApiCmdbProjectsByUidParams>
      title="删除项目"
      trigger={
        <Button
          type="link"
          danger
          disabled={!(access as any).projectDeleteApiCmdbProjectsByUid}
        >
          删除
        </Button>
      }
      onFinish={onFinish}
      params={{ uid: projectUid }}
      request={projectDeleteApiCmdbProjectsByUid}
      hint={`${projectName}（${projectId}）`}
    />
  );
}
