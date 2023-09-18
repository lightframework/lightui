import ModalUpdateForm from '@/components/ui/form/modal-form/ModalUpdateForm';
import {
  roleReadOneApiSysRolesById,
  roleUpdateApiSysRolesById,
} from '@/services/sys/role';
import { EditOutlined } from '@ant-design/icons';
import { useAccess } from '@umijs/max';
import { Button } from 'antd';

export default function RoleUpdateModalForm({
  roleId,
  onFinish,
}: {
  roleId: number;
  onFinish?: VoidFunction;
}) {
  const access = useAccess();

  return (
    <ModalUpdateForm<
      API.RoleUpdateReq,
      API.roleUpdateApiSysRolesByIdParams,
      API.roleReadOneApiSysRolesByIdParams
    >
      title="编辑角色"
      trigger={
        <Button
          type="text"
          shape="circle"
          disabled={!(access as any).roleUpdateApiSysRolesById}
          icon={
            <EditOutlined
              className={
                (access as any).roleUpdateApiSysRolesById
                  ? 'text-green-400'
                  : 'text-black/25'
              }
            />
          }
        />
      }
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
