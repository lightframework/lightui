import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, history, useIntl, useModel } from '@umijs/max';
import { Alert, message, Form, Button } from 'antd';
import React from 'react';
import { flushSync } from 'react-dom';
import { createUseStyles } from 'react-jss';
import * as userApi from '@/services/sys/user';

const useStyle = createUseStyles({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: '20%',
    marginTop: 200,
  },
  lang: {},
  content: {
    padding: 40,
    height: 'auto',
    backgroundColor: 'rgba(10,10,10,0.1)',
    borderRadius: 10,
  },
  prefixIcon: {},
  icon: {},
  form: {},
  title: {
    display: 'inline-flex',
    justifyContent: 'center',
    marginBottom: 20,
    width: '100%',
  },
  button: {
    width: '100%',
  },
});

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Login: React.FC = () => {
  // const [userLoginState, setUserLoginState] = useState<string>();
  const { initialState, setInitialState } = useModel('@@initialState');
  const classes = useStyle();

  const [formRef] = Form.useForm();

  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const handleSubmit = async (values: API.LoginReq) => {
    try {
      // 登录
      const msg = await userApi.login(values);
      if (msg.accessToken) {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！',
        });
        message.success(defaultLoginSuccessMessage);
        localStorage.setItem('token', msg.accessToken);
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }
      console.log(msg);
      // 如果失败去设置用户错误信息
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.title}>
          <span>登录</span>
        </div>
        <Form
          initialValues={{
            autoLogin: true,
          }}
          form={formRef}
          className={classes.form}
          style={{}}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginReq);
          }}
        >
          {status === 'error' && (
            <LoginMessage
              content={intl.formatMessage({
                id: 'pages.login.accountLogin.errorMessage',
                defaultMessage: '账户或密码错误(admin/ant.design)',
              })}
            />
          )}
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={classes.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.username.placeholder',
                defaultMessage: '用户名: admin or user',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="请输入用户名!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={classes.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.password.placeholder',
                defaultMessage: '密码: ant.design',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="请输入密码！"
                    />
                  ),
                },
              ]}
            />
          </>
        </Form>
        <div>
          <Button
            type="primary"
            className={classes.button}
            onClick={() => {
              formRef?.submit();
            }}
          >
            登录
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
