import CollapseDescriptions from '@/components/ui/CollapseDescriptions';
import { useRoleList } from '@/contexts/list-data-context';
import { roleReadOneApiSysRolesById } from '@/services/sys/role';
import { toLocaleDateTimeString } from '@/utils/func';
import { useParams, useRequest } from '@umijs/max';
import RoleDeleteModalForm from '../../RoleDeleteModalForm';
import RoleUpdateModalForm from '../../RoleUpdateModalForm';

export default function RoleInfo() {
  const params = useParams();
  const roleId = Number.parseInt(params.roleId!);

  const { data: role, refresh: refreshRole } = useRequest(
    () => roleReadOneApiSysRolesById({ id: String(roleId) }),
    { refreshDeps: [roleId] },
  );

  const { refreshItems: refreshRoles } = useRoleList();

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
              refreshRole();
              refreshRoles();
            }}
          />
          <RoleDeleteModalForm
            roleId={roleId}
            roleName={role.name}
            onFinish={refreshRoles}
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
