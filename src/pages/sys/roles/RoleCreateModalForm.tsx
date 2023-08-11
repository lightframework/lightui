import ModalCreateForm from '@/components/ui/form/modal-form/ModalCreateForm';
import { RoleCreateApiSysRoles } from '@/services/sys/role';
import { Button } from 'antd';

export default function RoleCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction;
}) {
  return (
    <ModalCreateForm<API.RoleCreateReq>
      title="创建角色"
      trigger={<Button type="link">新增</Button>}
      request={RoleCreateApiSysRoles}
      onFinish={onFinish}
      fields={[
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
