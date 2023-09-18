import { ModalCreateFormWithParams } from '@/components/ui/form/modal-form/ModalCreateForm';
import { useUserOptions } from '@/hooks/options';
import { roleMemAddApiSysRolesByIdusers } from '@/services/sys/role';
import { useAccess } from '@umijs/max';
import { Button } from 'antd';

export default function MemberAddModalForm({
  roleId,
  onFinish,
}: {
  roleId: number;
  onFinish?: VoidFunction;
}) {
  const access = useAccess();
  const userOptions = useUserOptions();

  return (
    <ModalCreateFormWithParams<
      API.RoleMemAddReq,
      API.roleMemAddApiSysRolesByIdusersParams
    >
      title="添加成员"
      onFinish={onFinish}
      trigger={
        <Button
          type="primary"
          disabled={!(access as any).roleMemAddApiSysRolesByIdusers}
        >
          添加成员
        </Button>
      }
      requestParams={{ id: String(roleId) }}
      request={roleMemAddApiSysRolesByIdusers}
      fields={[
        {
          fieldType: 'select',
          label: '成员用户名',
          name: 'usernames',
          options: userOptions.selectOptions,
        },
      ]}
    />
  );
}
