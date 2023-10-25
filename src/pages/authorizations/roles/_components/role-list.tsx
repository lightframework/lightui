import ResizableFilterList, {
  FilterListItem,
} from '@/components/resizable-filter-list';
import { roleDeleteApiSysRolesById } from '@/services/sys/role';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { useAccess, useLocation } from '@umijs/max';
import { message } from 'antd';
import useModal from 'antd/es/modal/useModal';
import { useState } from 'react';
import RoleCreateModalForm from './role-create-modal-form';
import RoleUpdateModalForm from './role-update-modal-form';

export default function RoleList({ roles }: { roles: SYS.RoleOption[] }) {
  const access = useAccess();
  const { pathname, search } = useLocation();
  const currentUrl = pathname + search;
  const [modal, contextHolder] = useModal();
  const queryClient = useQueryClient();

  const [selectedRoleToUpdate, setSelectedRoleToUpdate] = useState<
    SYS.RoleOption | undefined
  >();

  const refetchRoles = () =>
    queryClient.invalidateQueries({ queryKey: ['role-options'] });

  const showDeleteConfirm = (role: SYS.RoleOption) =>
    modal.confirm({
      title: '确定删除角色吗？',
      icon: <ExclamationCircleOutlined />,
      content: `删除角色 ${role.name}（${role.id}）`,
      onOk: async () => {
        await roleDeleteApiSysRolesById({ id: String(role.id) });
        message.success('删除成功');
        refetchRoles();
      },
    });

  const items: FilterListItem[] = roles.map((role) => ({
    label: role.name,
    key: role.id,
    to: currentUrl.replace(/\/roles\/.*\//, `/roles/${role.id}/`),
    onEditClick: access.roleUpdateApiSysRolesById
      ? () => setSelectedRoleToUpdate(role)
      : undefined,
    onRemoveClick: access.roleDeleteApiSysRolesById
      ? () => showDeleteConfirm(role)
      : undefined,
  }));

  return (
    <>
      {contextHolder}
      <ResizableFilterList
        name="role"
        title="角色列表"
        items={items}
        extras={<RoleCreateModalForm onFinish={refetchRoles} />}
      />
      <RoleUpdateModalForm
        open={selectedRoleToUpdate !== undefined}
        onCancel={() => setSelectedRoleToUpdate(undefined)}
        role={selectedRoleToUpdate}
        onFinish={refetchRoles}
      />
    </>
  );
}
