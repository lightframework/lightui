import ModalDeleteForm from '@/components/ui/form/modal-form/ModalDeleteForm';
import { roleDeleteApiSysRolesById } from '@/services/sys/role';
import { DeleteOutlined } from '@ant-design/icons';
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
  return (
    <ModalDeleteForm<API.roleDeleteApiSysRolesByIdParams>
      title="删除角色"
      trigger={
        <Button type="text" shape="circle" danger icon={<DeleteOutlined />} />
      }
      onFinish={onFinish}
      params={{ id: String(roleId) }}
      request={roleDeleteApiSysRolesById}
      hint={`${roleName}(${roleId})`}
    />
  );
}
