import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { history, useIntl, useModel } from '@umijs/max';
import { Alert, message, Form, Button, Input } from 'antd';
import React, { useEffect } from 'react';
import { flushSync } from 'react-dom';
import { createUseStyles } from 'react-jss';
import * as userApi from '@/services/sys/user';
import './index.less';
import bgImg from '@/../public/bg.png';
import lgImg from '@/../public/lg.jpeg';

const useStyle = createUseStyles({
  body: {
    width: '100%',
    aspectRatio: '16 / 6.5',
    paddingTop: 200,
    backgroundColor: 'rgba(2,3,3,.2)',
    backgroundImage: `url(${lgImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPositionY: -200,
  },
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: '10%',
  },
  bg: {
    width: 800,
    padding: 20,
    backgroundColor: '#fff',
    backgroundImage: `url(${bgImg})`,
    backgroundSize: 1100,
    backgroundRepeat: 'no-repeat',
    backgroundPositionX: -450,
    backgroundPositionY: -10,
    display: 'flex',
    justifyContent: 'flex-end',
    borderRadius: 20,
  },
  content: {
    width: '35%',
    padding: 40,
    height: 'auto',
    // backgroundColor: 'rgba(10,10,10,0.1)',
    borderRadius: 10,
  },

  form: {},
  title: {
    display: 'inline-flex',
    justifyContent: 'center',
    marginBottom: 60,
    fontWeight: 700,
    color: 'rgba(0,0,0, .65)',
    fontSize: 30,
    width: '100%',
  },
  button: {
    width: '100%',
    borderRadius: '16px',
    marginTop: 40,
  },
  icon: {},
  prefixIcon: {
    color: 'blue',
  },
  input: {
    border: 0,
    borderBottom: '1px solid rgba(217,217,217,0.8)',
    borderRadius: 0,
    fontSize: 16,
    '&:hover': {
      borderBottom: '1px solid rgba(217,217,217,0.8)',
    },

    '&::placeholder': {
      color: 'red',
    },
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
  const handleKeydown = (e: any) => {
    console.log(e);
    if (e.key === 'Enter') {
      formRef?.submit();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

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
    <div className={classes.body}>
      <div className={classes.container}>
        <div className={classes.bg}>
          <div className={classes.content}>
            <div className={classes.title}>
              <span>欢迎登录</span>
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
                <Form.Item name="usename">
                  <Input
                    className={classes.input}
                    placeholder="请输入您的账号"
                    size="large"
                    bordered={false}
                    prefix={<UserOutlined className={classes.prefixIcon} />}
                  />
                </Form.Item>
                <Form.Item name="password" style={{ marginTop: 40 }}>
                  <Input.Password
                    className={classes.input}
                    placeholder="请输入您的密码"
                    size="large"
                    bordered={false}
                    prefix={<LockOutlined className={classes.prefixIcon} />}
                  />
                </Form.Item>
              </>
            </Form>
            {/* <div>
          <a href="">忘记密码</a>
        </div> */}
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
      </div>
    </div>
  );
};

export default Login;
