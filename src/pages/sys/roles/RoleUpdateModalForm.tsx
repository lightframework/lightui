import ModalUpdateForm from '@/components/ui/form/modal-form/ModalUpdateForm';
import {
  roleReadOneApiSysRolesById,
  roleUpdateApiSysRolesById,
} from '@/services/sys/role';

export default function RoleUpdateModalForm({
  roleId,
  onFinish,
}: {
  roleId: number;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalUpdateForm<
      API.RoleUpdateReq,
      API.roleUpdateApiSysRolesByIdParams,
      API.roleReadOneApiSysRolesByIdParams
    >
      title="角色"
      onFinish={onFinish}
      initialParams={{ id: String(roleId) }}
      initialRequest={roleReadOneApiSysRolesById}
      requestParams={{ id: String(roleId) }}
      request={roleUpdateApiSysRolesById}
      fields={[
        {
          fieldType: 'text',
          name: 'id',
          hidden: true,
          transform: (value) => ({ id: String(value) }),
        },
        {
          fieldType: 'text',
          name: 'name',
          label: '角色名称',
          required: true,
        },
        {
          fieldType: 'textarea',
          name: 'info',
          label: '描述',
        },
      ]}
    />
  );
}
