import ModalDeleteForm from '@/components/ui/form/modal-form/ModalDeleteForm';
import { roleMemDelApiSysRolesByIdusers } from '@/services/sys/role';
import { useAccess } from '@umijs/max';
import { Button } from 'antd';

export default function MemberDeleteModalForm({
  roleId,
  memberName,
  memberNickname,
  onFinish,
}: {
  roleId: number;
  memberName: string;
  memberNickname: string;
  onFinish?: VoidFunction;
}) {
  const access = useAccess();

  return (
    <ModalDeleteForm<API.roleMemDelApiSysRolesByIdusersParams>
      title="移除成员"
      trigger={
        <Button
          type="link"
          danger
          disabled={!(access as any).roleMemDelApiSysRolesByIdusers}
        >
          移除
        </Button>
      }
      onFinish={onFinish}
      params={{ id: String(roleId) }}
      request={async (params) =>
        roleMemDelApiSysRolesByIdusers(params, { usernames: [memberName] })
      }
      hint={`${memberName}（${memberNickname}）`}
    />
  );
}
