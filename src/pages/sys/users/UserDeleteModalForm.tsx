import { userDeleteApiSysUsersById } from '@/services/sys/user';
import { ModalForm } from '@ant-design/pro-components';
import { Button, Typography, message } from 'antd';

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
    <ModalForm
      title="删除用户"
      trigger={
        <Button type="link" danger>
          删除
        </Button>
      }
      width={500}
      onFinish={async () => {
        try {
          const res = await userDeleteApiSysUsersById({ id: userId });
          if (res.msg === 'OK') {
            message.success('删除成功');
            onFinish?.();
            return true;
          } else {
            message.error(res.msg);
          }
        } catch (e) {
          message.error('服务器异常，删除失败');
        }
      }}
    >
      <Typography.Paragraph style={{ marginTop: 36 }}>
        您确定删除用户{' '}
        <span
          style={{ color: 'red', fontWeight: 700 }}
        >{`${username}（${nickname}）`}</span>{' '}
        ？
      </Typography.Paragraph>
    </ModalForm>
  );
}
