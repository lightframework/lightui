import CollapseDescriptions from '@/components/ui/CollapseDescriptions';
import { useRoleList } from '@/contexts/list-data-context';
import { roleReadOneApiSysRolesById } from '@/services/sys/role';
import { toLocaleDateTimeString } from '@/utils/func';
import { useQuery } from '@tanstack/react-query';
import { useParams } from '@umijs/max';
import RoleDeleteModalForm from '../../RoleDeleteModalForm';
import RoleUpdateModalForm from '../../RoleUpdateModalForm';

export default function RoleInfo() {
  const params = useParams();
  const roleId = Number.parseInt(params.roleId!);

  const { data: role, refetch: refetchRole } = useQuery({
    queryKey: ['role', roleId],
    queryFn: () =>
      roleReadOneApiSysRolesById({ id: String(roleId) }).then(
        (res) => res.data,
      ),
  });

  const { refetchItems: refetchRoles } = useRoleList();

  if (!role) {
    return;
  }

  return (
    <CollapseDescriptions
      title="角色名称"
      column={4}
      toolBarRender={
        <>
          <RoleUpdateModalForm
            roleId={roleId}
            onFinish={() => {
              refetchRole();
              refetchRoles();
            }}
          />
          <RoleDeleteModalForm
            roleId={roleId}
            roleName={role.name}
            onFinish={refetchRoles}
          />
        </>
      }
      items={[
        { label: 'id', children: role.id },
        { label: '备注', children: role.info, span: 3 },
        {
          label: '创建者',
          children: role.createBy,
        },
        {
          label: '创建时间',
          children: toLocaleDateTimeString(role.createdAt),
        },
        {
          label: '更新者',
          children: role.updateBy,
        },
        {
          label: '创建时间',
          children: toLocaleDateTimeString(role.updatedAt),
        },
      ]}
    />
  );
}
