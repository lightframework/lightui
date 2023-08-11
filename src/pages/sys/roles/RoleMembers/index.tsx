import { useTitle } from '@/utils/hooks';
import RoleInfo from './RoleInfo';
import RoleMemberTable from './RoleMemberTable';

export default function RoleMembers({
  roleId,
  onRoleUpdateFinish,
  onRoleDeleteFinish,
}: {
  roleId: number;
  onRoleUpdateFinish?: VoidFunction;
  onRoleDeleteFinish?: VoidFunction;
}) {
  useTitle('角色成员', { shift: true });

  return (
    <div className="space-y-2">
      <RoleInfo
        roleId={roleId}
        onUpdateFinish={onRoleUpdateFinish}
        onDeleteFinish={onRoleDeleteFinish}
      />
      <RoleMemberTable roleId={roleId} />
    </div>
  );
}
