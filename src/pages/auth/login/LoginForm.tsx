import { loginApiSysUserslogin } from '@/services/sys/user';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  ProConfigProvider,
  ProFormText,
  LoginForm as ProLoginForm,
} from '@ant-design/pro-components';
import { history, useModel, useSearchParams } from '@umijs/max';
import { message } from 'antd';
import { flushSync } from 'react-dom';

export default function LoginForm() {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [searchParams] = useSearchParams();

  const onFinish = async (value: API.LoginReq) => {
    const res = await loginApiSysUserslogin(value);
    if (res.msg === 'OK') {
      message.success('登录成功');
      localStorage.setItem('token', res.data!.accessToken!);

      const currentUser = await initialState?.fetchCurrentUser?.();
      if (currentUser) {
        flushSync(() => {
          setInitialState((prev) => ({
            ...prev,
            currentUser,
          }));
        });

        history.push(searchParams.get('redirect') || '/');
      }
    } else {
      message.error(res.msg);
    }
  };

  return (
    <div className="-mx-8 h-min xl:w-[35%]">
      <ProConfigProvider hashed={false}>
        <ProLoginForm<API.LoginReq>
          logo="/logo.svg"
          title="LightOPS"
          className="space-y-10"
          onFinish={onFinish}
        >
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined />,
            }}
            placeholder="请输入您的账号"
            rules={[
              {
                required: true,
                message: '请输入账号！',
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />,
            }}
            placeholder="请输入您的密码"
            rules={[{ required: true, message: '请输入密码！' }]}
          />
        </ProLoginForm>
      </ProConfigProvider>
    </div>
  );
}
