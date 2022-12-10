import { QuestionCircleOutlined } from '@ant-design/icons';
import { SelectLang, useModel } from '@umijs/max';
import { Space } from 'antd';
import React from 'react';
import HeaderSearch from '../HeaderSearch';
import Avatar from './AvatarDropdown';

import {createUseStyles}  from 'react-jss'

 
const useStyle = createUseStyles({
  right: {
  },
  dark: {
  },
  action: {
  },
  search: {
  },
 
})

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const classes = useStyle()

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
      <HeaderSearch
        className={`${classes.action} ${classes.search}`}
        placeholder="站内搜索"
        defaultValue="umi ui"
        options={[
          { label: <a href="https://umijs.org/zh/guide/umi-ui.html">umi ui</a>, value: 'umi ui' },
          {
            label: <a href="next.ant.design">Ant Design</a>,
            value: 'Ant Design',
          },
          {
            label: <a href="https://protable.ant.design/">Pro Table</a>,
            value: 'Pro Table',
          },
          {
            label: <a href="https://prolayout.ant.design/">Pro Layout</a>,
            value: 'Pro Layout',
          },
        ]}
        // onSearch={value => {
        //   console.log('input', value);
        // }}
      />
      <span
        className={classes.action}
        onClick={() => {
          window.open('https://pro.ant.design/docs/getting-started');
        }}
      >
        <QuestionCircleOutlined />
      </span>
      <Avatar />
      <SelectLang className={classes.action} />
    </Space>
  );
};
export default GlobalHeaderRight;
