import { roleAuthListApiSysRolesByIdauth } from '@/services/sys/role';
import { useTitle } from '@/utils/hooks';

export default function RoleAuthorization({ roleId }: { roleId: number }) {
  useTitle('功能权限', { shift: true });

  roleAuthListApiSysRolesByIdauth({ id: String(roleId) });

  return <>RoleAuthorization</>;
}
