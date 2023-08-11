import ModalDeleteForm from '@/components/ui/form/modal-form/ModalDeleteForm';
import { roleMemDelApiSysRolesByIdusers } from '@/services/sys/role';

export default function MemberDeleteModalForm({
  roleId,
  memberName,
  memberNickname,
  onFinish,
}: {
  roleId: number;
  memberName: string;
  memberNickname: string;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalDeleteForm<API.roleMemDelApiSysRolesByIdusersParams>
      title="移除成员"
      onFinish={onFinish}
      params={{ id: String(roleId) }}
      request={async (params) =>
        roleMemDelApiSysRolesByIdusers(params, { usernames: [memberName] })
      }
      hint={`${memberName}（${memberNickname}）`}
    />
  );
}
