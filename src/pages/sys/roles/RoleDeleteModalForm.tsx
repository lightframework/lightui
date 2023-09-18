import ModalDeleteForm from '@/components/ui/form/modal-form/ModalDeleteForm';
import { roleDeleteApiSysRolesById } from '@/services/sys/role';
import { DeleteOutlined } from '@ant-design/icons';
import { useAccess } from '@umijs/max';
import { Button } from 'antd';

export default function RoleDeleteModalForm({
  roleId,
  roleName,
  onFinish,
}: {
  roleId: number;
  roleName?: string;
  onFinish?: VoidFunction;
}) {
  const access = useAccess();

  return (
    <ModalDeleteForm<API.roleDeleteApiSysRolesByIdParams>
      title="删除角色"
      trigger={
        <Button
          type="text"
          shape="circle"
          danger
          disabled={!(access as any).roleDeleteApiSysRolesById}
          icon={<DeleteOutlined />}
        />
      }
      onFinish={onFinish}
      params={{ id: String(roleId) }}
      request={roleDeleteApiSysRolesById}
      hint={`${roleName}(${roleId})`}
    />
  );
}
