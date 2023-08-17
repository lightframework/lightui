import { roleAuthListApiSysRolesByIdauth } from '@/services/sys/role';
import { useParams } from '@umijs/max';

export default function RoleAuthorization() {
  const params = useParams();
  const roleId = Number.parseInt(params.roleId!);

  roleAuthListApiSysRolesByIdauth({ id: String(roleId) });

  return <>RoleAuthorization</>;
}
