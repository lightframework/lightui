import ModalDeleteForm from '@/components/ui/form/modal-form/ModalDeleteForm';
import { roleDeleteApiSysRolesById } from '@/services/sys/role';

export default function RoleDeleteModalForm({
  roleId,
  roleName,
  onFinish,
}: {
  roleId: number;
  roleName?: string;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalDeleteForm<API.roleDeleteApiSysRolesByIdParams>
      title="删除角色"
      onFinish={onFinish}
      params={{ id: String(roleId) }}
      request={roleDeleteApiSysRolesById}
      hint={`${roleName}(${roleId})`}
    />
  );
}
