import ModalDeleteForm from '@/components/ui/form/modal-form/ModalDeleteForm';
import { userDeleteApiSysUsersById } from '@/services/sys/user';
import { useAccess } from '@umijs/max';
import { Button } from 'antd';

export default function UserDeleteModalForm({
  userId,
  username,
  nickname,
  onFinish,
}: {
  userId: string;
  username: string;
  nickname: string;
  onFinish?: VoidFunction;
}) {
  const access = useAccess();

  return (
    <ModalDeleteForm<API.userDeleteApiSysUsersByIdParams>
      title="删除用户"
      trigger={
        <Button
          type="link"
          danger
          disabled={!(access as any).userDeleteApiSysUsersById}
        >
          删除
        </Button>
      }
      onFinish={onFinish}
      params={{
        id: userId,
      }}
      request={userDeleteApiSysUsersById}
      hint={`${username}（${nickname}）`}
    />
  );
}
