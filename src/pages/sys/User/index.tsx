import React, { useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { UserActionType, UserType } from '@/store/manageInterface';
import type { ActionType } from '@ant-design/pro-components';
// import { useTranslation } from 'react-i18next';
import type { LightColumnsType } from '@/components/LightTable';
import LightTable from '@/components/LightTable';
import type { QueryColumn } from '@/components/QueryHeader';
import * as userApi from '@/services/sys/user';

const useStyle = createUseStyles({
  container: {},
});

const UserList: React.FC = () => {
  // const { t } = useTranslation();
  const classes = useStyle();
  const actionRef = useRef<ActionType>();
  const [activeKey] = useState<UserType>(UserType.User);
  const [action, setAction] = useState<UserActionType>();
  const [userId, setUserId] = useState<number>();
  const [visible, setVisible] = useState<boolean>(false);

  const columns: LightColumnsType<API.UserListInfo> = [
    {
      key: 'id',
      width: 48,
    },
    {
      title: '登录名',
      dataIndex: 'username',
      ellipsis: true,
    },
    {
      title: '姓名',
      dataIndex: 'nickname',
      ellipsis: true,
      search: {
        type: 'text',
        itemWidth: 200,
      },
    },
    {
      title: '角色',
      dataIndex: 'nickname',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      ellipsis: true,
    },
    {
      title: '联系电话',
      dataIndex: 'mobile',
      ellipsis: true,
    },

    {
      title: '创建时间',
      dataIndex: 'created_at',
    },
    {
      title: '操作',
      key: 'option',
      width: 150,
      render: (_, row) => [
        <a key="editable" onClick={() => {}}>
          编辑
        </a>,
        <a onClick={() => {}} target="_blank" rel="noopener noreferrer" key="view">
          配置角色
        </a>,
      ],
    },
  ];

  const queryColumns: QueryColumn[] = [
    {
      type: 'text',
      name: 'keywords',
      itemWidth: 300,
      placeholder: '请输入登录名/姓名/邮箱/电话搜索',
    },
  ];

  return (
    <div className={classes.container}>
      <LightTable<API.UserListInfo, API.UserPageListReq>
        columns={columns}
        rowKey="id"
        search
        request={userApi.userPageListApiSysUsers}
        queryColumns={queryColumns}
        pagination={{
          showQuickJumper: true,
          showSizeChanger: true,
          defaultPageSize: 10,
        }}
      />
    </div>
  );
};

export default UserList;
