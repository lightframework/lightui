import { useModel } from '@umijs/max';
import { Space } from 'antd';
import React from 'react';
import Avatar from './AvatarDropdown';

import { createUseStyles } from 'react-jss';

const useStyle = createUseStyles({
  right: {},
  dark: {},
  action: {},
  search: {},
});

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const classes = useStyle();

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;

  let className = classes.right;

  if ((navTheme === 'realDark' && layout === 'top') || layout === 'mix') {
    className = `${classes.right}  ${classes.dark}`;
  }
  return (
    <Space className={className}>
      <Avatar />
      {/* <SelectLang className={classes.action} /> */}
    </Space>
  );
};
export default GlobalHeaderRight;
