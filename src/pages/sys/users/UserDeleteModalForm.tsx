import ModalDeleteForm from '@/components/ui/form/modal-form/ModalDeleteForm';
import { userDeleteApiSysUsersById } from '@/services/sys/user';

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
  return (
    <ModalDeleteForm<API.userDeleteApiSysUsersByIdParams>
      title="删除用户"
      onFinish={onFinish}
      params={{
        id: userId,
      }}
      request={userDeleteApiSysUsersById}
      hint={`${username}（${nickname}）`}
    />
  );
}
