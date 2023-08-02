// 运行时配置

import { LinkOutlined } from '@ant-design/icons';
import {
  Link,
  RequestConfig,
  RequestOptions,
  RuntimeConfig,
  history,
} from '@umijs/max';
import CurrentUser from './components/root-layout/CurrentUser';
import { userCurrentInfoApiSysUsersCurrent } from './services/sys/user';

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
      if (!initialState?.currentUser && location.pathname !== LOGIN_PATH) {
        history.push(LOGIN_PATH);
      }
    },
  };
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
};
