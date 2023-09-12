import SliderVerify from '@/components/SliderVerify';
import { loginApiSysUserslogin } from '@/services/sys/user';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  ProConfigProvider,
  ProFormText,
  LoginForm as ProLoginForm,
} from '@ant-design/pro-components';
import { history, useModel, useSearchParams } from '@umijs/max';
import { Modal, message } from 'antd';
import { useState } from 'react';
import { flushSync } from 'react-dom';

export default function LoginForm() {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [searchParams] = useSearchParams();
  const [isVerify, setIsVerify] = useState(false);
  const [formData, setFormData] = useState<API.LoginReq | undefined>(undefined);

  const onFinish = async (value: API.LoginReq) => {
    setIsVerify(true);
    setFormData(value);
  };

  const login = async () => {
    setIsVerify(false);

    if (!formData) return;

    const res = await loginApiSysUserslogin(formData);
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
          <Modal
            open={isVerify}
            onCancel={() => setIsVerify(false)}
            footer={null}
            width="max-content"
            centered
            closeIcon={null}
            destroyOnClose
          >
            <SliderVerify
              width={320}
              height={160}
              visible={true}
              onSuccess={login}
              onFail={() => message.error('验证失败')}
            />
          </Modal>
        </ProLoginForm>
      </ProConfigProvider>
    </div>
  );
}
