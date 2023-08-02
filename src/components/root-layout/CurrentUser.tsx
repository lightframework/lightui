import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Avatar, Dropdown, MenuProps, message } from 'antd';
import { flushSync } from 'react-dom';

const DEFAULT_AVATAR =
  'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png';

function logout() {
  localStorage.clear();
  const { search, pathname } = window.location;
  const urlParams = new URL(window.location.href).searchParams;
  const redirect = urlParams.get('redirect');
  if (window.location.pathname !== '/auth/login' && !redirect) {
    history.replace(`/auth/login?redirect=${pathname + search}`);
  }
}

export default function CurrentUser() {
  const { initialState, setInitialState } = useModel('@@initialState');

  const currentUser = initialState?.currentUser;

  if (!currentUser) {
    history.push('/auth/login');
    return;
  }

  const avatarSrc = currentUser.avatar || DEFAULT_AVATAR;

  const items: MenuProps['items'] = [
    {
      key: 'user-center',
      label: '个人中心',
      icon: <UserOutlined />,
      onClick: () => message.info('未实现'),
    },
    {
      key: 'user-settings',
      label: '个人设置',
      icon: <SettingOutlined />,
      onClick: () => message.info('未实现'),
    },
    {
      type: 'divider',
    },
    {
      key: 'user-logout',
      label: '退出登录',
      icon: <LogoutOutlined />,
      onClick: () => {
        flushSync(() => {
          setInitialState((prev) => ({ ...prev, currentUser: undefined }));
        });
        logout();
      },
    },
  ];

  return (
    <Dropdown menu={{ items }} arrow placement="bottomRight">
      <span className="flex items-center gap-1">
        <Avatar size="small" src={avatarSrc} alt="current user avatar" />
        <span>{currentUser.nickname}</span>
      </span>
    </Dropdown>
  );
}
