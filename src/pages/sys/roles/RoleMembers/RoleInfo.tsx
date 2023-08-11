import { roleReadOneApiSysRolesById } from '@/services/sys/role';
import { ProDescriptions } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import RoleDeleteModalForm from '../RoleDeleteModalForm';
import RoleUpdateModalForm from '../RoleUpdateModalForm';

export default function RoleInfo({
  roleId,
  onUpdateFinish,
  onDeleteFinish,
}: {
  roleId: number;
  onUpdateFinish?: VoidFunction;
  onDeleteFinish?: VoidFunction;
}) {
  const { data: role, refresh: refreshRole } = useRequest(
    () => roleReadOneApiSysRolesById({ id: String(roleId) }),
    { refreshDeps: [roleId] },
  );

  if (!role) {
    return;
  }

  return (
    <ProDescriptions
      title={role.name}
      column={3}
      className="bg-[#fafafa] p-2"
      extra={
        <div>
          <RoleUpdateModalForm
            roleId={roleId}
            onFinish={() => {
              refreshRole();
              onUpdateFinish?.();
            }}
          />
          <RoleDeleteModalForm
            roleId={roleId}
            roleName={role.name}
            onFinish={onDeleteFinish}
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
