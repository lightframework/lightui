import { useRoleList } from '@/contexts/list-data-context';
import { roleReadOneApiSysRolesById } from '@/services/sys/role';
import { ProDescriptions } from '@ant-design/pro-components';
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
    <ProDescriptions
      title={role.name}
      column={3}
      className="bg-[#fafafa] p-3"
      extra={
        <div>
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
        </div>
      }
    >
      <ProDescriptions.Item label="角色ID" valueType="text" span={3}>
        {role.id}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="创建时间" valueType="text">
        {role.createdAt}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="创建者" valueType="text" span={2}>
        {role.createBy}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="更新时间" valueType="text">
        {role.updatedAt}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="更新者" valueType="text" span={2}>
        {role.updateBy}
      </ProDescriptions.Item>
    </ProDescriptions>
  );
}
