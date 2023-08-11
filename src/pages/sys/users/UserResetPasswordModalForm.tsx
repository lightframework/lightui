import ModalUpdateForm from '@/components/ui/form/modal-form/ModalUpdateForm';
import { userResetPassApiSysUsersByIdpass } from '@/services/sys/user';
import { Button } from 'antd';

export default function UserResetPasswordModalForm({
  userId,
  onFinish,
}: {
  userId: string;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalUpdateForm<
      API.ResetPassReq,
      API.userResetPassApiSysUsersByIdpassParams
    >
      title="重置密码"
      trigger={<Button type="link">重置密码</Button>}
      onFinish={onFinish}
      requestParams={{
        id: userId,
      }}
      request={userResetPassApiSysUsersByIdpass}
      fields={[
        {
          fieldType: 'text',
          name: 'id',
          initialValue: userId,
          hidden: true,
        },
        {
          fieldType: 'password',
          label: '密码',
          name: 'password',
          required: true,
        },
        {
          fieldType: 'password',
          label: '确认密码',
          name: 'confirm',
          required: true,
          rules: [
            (form) => {
              return {
                validateTrigger: ['onBlur', 'onChange'],
                message: '密码输入不一致，请重新输入',
                validator: (_, value) => {
                  console.log(value);
                  const p = form.getFieldValue('password');
                  if (p !== value) {
                    return Promise.reject();
                  }
                  return Promise.resolve();
                },
              };
            },
          ],
        },
      ]}
    />
  );
}
