import { userResetPassApiSysUsersByIdpass } from '@/services/sys/user';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { AxiosError } from '@umijs/max';
import { Button, message } from 'antd';

export default function UserResetPasswordModalForm({
  userId,
  onFinish,
}: {
  userId: string;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalForm<API.ResetPassReq>
      title="重置密码"
      trigger={<Button type="link">重置密码</Button>}
      width={500}
      modalProps={{
        destroyOnClose: true,
      }}
      onFinish={async (data) => {
        try {
          const res = await userResetPassApiSysUsersByIdpass(
            { id: userId },
            data,
          );
          if (res.msg === 'OK') {
            message.success('更新成功');
            onFinish?.();
            return true;
          } else {
            message.error(res.msg);
          }
        } catch (e) {
          const data = (e as AxiosError).response?.data as any;
          const code = data.code;
          if (code === 5000) {
            message.error(data.msg);
          } else {
            message.error('服务器异常，添加失败');
          }
        }
      }}
    >
      <ProFormText name="id" initialValue={userId} hidden />
      <ProFormText.Password
        name="password"
        key="password"
        label="密码"
        placeholder=""
        rules={[
          {
            required: true,
            message: '请输入密码',
          },
        ]}
      />
      <ProFormText.Password
        name="confirm"
        key="confirm"
        label="确认密码"
        placeholder=""
        rules={[
          { required: true },
          (form) => {
            return {
              validateTrigger: ['onBlur', 'onChange'],
              message: '密码输入不一致，请重新输入',
              validator: (_, value) => {
                const p = form.getFieldValue('password');
                if (p !== value) {
                  return Promise.reject();
                }
                return Promise.resolve();
              },
            };
          },
        ]}
      />
    </ModalForm>
  );
}
