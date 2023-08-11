import ModalDeleteForm from '@/components/ui/form/modal-form/ModalDeleteForm';
import { projectDeleteApiCmdbProjectsByUid } from '@/services/cmdb/project';

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
  return (
    <ModalDeleteForm<API.projectDeleteApiCmdbProjectsByUidParams>
      title="删除项目"
      onFinish={onFinish}
      params={{ uid: projectUid }}
      request={projectDeleteApiCmdbProjectsByUid}
      hint={`${projectName}（${projectId}）`}
    />
  );
}
