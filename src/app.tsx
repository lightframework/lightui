// 运行时配置
import { LinkOutlined } from '@ant-design/icons';
import {
  AxiosError,
  Link,
  RequestConfig,
  RuntimeConfig,
  history,
} from '@umijs/max';
import { message } from 'antd';
import CurrentUser from './components/root-layout/CurrentUser';
import { userCurrentInfoApiSysUsersCurrent } from './services/sys/user';

import { RequestOptions } from '@umijs/max';
import AppContainer from './components/AppContainer';
import './globals.less';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate

const LOGIN_PATH = '/auth/login';

export type InitialData = {
  currentUser?: API.UserCurrentInfoResp['data'];
  fetchCurrentUser?: () => Promise<InitialData['currentUser']>;
};

export async function getInitialState(): Promise<InitialData> {
  const fetchCurrentUser = async () => {
    try {
      const res = await userCurrentInfoApiSysUsersCurrent();
      if (res.msg === 'OK') {
        return res.data;
      }
    } catch (_) {
      history.push(LOGIN_PATH);
    }
  };

  if (history.location.pathname !== LOGIN_PATH) {
    const currentUser = await fetchCurrentUser();
    return {
      fetchCurrentUser,
      currentUser,
    };
  }

  return { fetchCurrentUser };
}

export const layout: RuntimeConfig['layout'] = ({ initialState }) => {
  return {
    layout: 'mix',
    title: 'LightOPS',
    logo: '/logo.svg',
    siderWidth: 200,
    menu: {
      locale: false,
    },
    rightContentRender: () => <CurrentUser />,
    links: [
      process.env.NODE_ENV === 'development' ? (
        <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
          <LinkOutlined />
          <span>OpenAPI 文档</span>
        </Link>
      ) : undefined,
    ],
    onPageChange: () => {
      const { location } = history;

      // 如果未登录，跳转到登录页面
      if (!initialState?.currentUser && location.pathname !== LOGIN_PATH) {
        history.push(`${LOGIN_PATH}?redirect=${location.pathname}`);
      }

      // 首次加载时，跳转到上次退出时的路由
      if (localStorage.getItem('isInitial') === 'true') {
        localStorage.setItem('isInitial', 'false');
        if (location.pathname === '/') {
          history.push(localStorage.getItem('pathname') ?? '/');
        } else {
          localStorage.setItem('pathname', location.pathname);
        }
      } else {
        localStorage.setItem('pathname', location.pathname);
      }
    },
    token: {
      sider: {
        colorMenuBackground: '#7b4df9',
        colorTextMenu: '#cfccfc',
        colorTextMenuSelected: '#ffffff',
        colorTextMenuItemHover: '#ffffff',
      },
    },
  };
};

export const rootContainer: RuntimeConfig['rootContainer'] = (root) => {
  return <AppContainer>{root}</AppContainer>;
};

export const request: RequestConfig = {
  requestInterceptors: [
    (config: RequestOptions) => {
      const url = config.url;
      if (!url?.includes(LOGIN_PATH)) {
        const token = localStorage.getItem('token');
        return {
          ...config,
          headers: { ...config.headers, Authorization: token },
        };
      }
    },
  ],
  responseInterceptors: [
    [
      (response) => {
        return response;
      },
      (error) => {
        const { location } = history;
        if ((error as AxiosError).isAxiosError) {
          const axiosError = error as AxiosError<{
            msg?: string;
            code?: number;
            data?: any;
          }>;

          if (axiosError.response?.status === 401) {
            message.error('身份认证已过期，请重新登录');
            setTimeout(
              () => history.push(`${LOGIN_PATH}?redirect=${location.pathname}`),
              2000,
            );
          } else {
            const msg = axiosError.response?.data.msg;
            message.error(msg ?? '服务器异常，请求失败');
          }
        }

        return Promise.reject(error);
      },
    ],
  ],
};
