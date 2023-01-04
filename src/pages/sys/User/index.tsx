import React, { useRef, useState } from 'react';
import * as userApi from '@/services/sys/user';
import { createUseStyles } from 'react-jss';

import { ProTable, TableDropdown } from '@ant-design/pro-components';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { Button } from 'antd';
import UserInfoModal from '../compontents/createModal';
import { UserActionType } from '@/store/manageInterface';
import { UserType } from '@/store/manageInterface';
// import { useTranslation } from 'react-i18next';

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

  const handleClick = (type: UserActionType, id?: number) => {
    if (id) {
      setUserId(id);
    } else {
      setUserId(0);
    }

    setAction(type);
    setVisible(true);
  };

  // 弹窗关闭回调
  const handleClose = () => {
    setVisible(false);
    actionRef.current?.reload();
  };

  const columns: ProColumns<API.User>[] = [
    {
      dataIndex: 'id',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '登录名',
      disable: true,
      dataIndex: 'username',
      copyable: true,
      ellipsis: true,
      tip: '登录用户名',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '姓名',
      disable: true,
      dataIndex: 'nickname',
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '部门',
      dataIndex: 'nickname',
      search: false,
    },
    {
      title: '角色',
      dataIndex: 'nickname',
      search: false,
      renderFormItem: (_, { defaultRender }) => {
        return defaultRender(_);
      },
      // render: (_, record) => (
      //   <Space>
      //     {record.labels.map(({ name, color }) => (
      //       <Tag color={color} key={name}>
      //         {name}
      //       </Tag>
      //     ))}
      //   </Space>
      // ),
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      copyable: true,
      ellipsis: true,
      search: false,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '联系电话',
      dataIndex: 'mobile',
      copyable: true,
      search: false,
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    // {
    //   title: '状态',
    //   dataIndex: 'state',
    //   filters: true,
    //   onFilter: true,
    //   ellipsis: true,
    //   valueType: 'select',
    //   search: false,
    //   valueEnum: {
    //     all: { text: '超长'.repeat(50) },
    //     open: {
    //       text: '未解决',
    //       status: 'Error',
    //     },
    //     closed: {
    //       text: '已解决',
    //       status: 'Success',
    //       disabled: true,
    //     },
    //     processing: {
    //       text: '解决中',
    //       status: 'Processing',
    //     },
    //   },
    // },
    // {
    //   title: '创建时间',
    //   key: 'showTime',
    //   dataIndex: 'created_at',
    //   valueType: 'date',
    //   sorter: true,
    //   search: false,
    //   hideInSearch: true,
    // },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      valueType: 'dateRange',
      hideInTable: true,
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 150,
      render: (_, row) => [
        <a
          key="editable"
          onClick={() => {
            handleClick(UserActionType.EditUser, row.id);
          }}
        >
          编辑
        </a>,
        <a
          onClick={() => handleClick(UserActionType.EditUser, row.id)}
          target="_blank"
          rel="noopener noreferrer"
          key="view"
        >
          配置角色
        </a>,
        <TableDropdown
          key="actionGroup"
          // onSelect={() => action?.reload()}
          menus={[
            {
              key: 'delete',
              name: '删除',
              onClick: () => {
                // confirm({
                //   title: t('是否删除该用户'),
                //   onOk: () => {
                //     deleteUser(record.id).then((_) => {
                //       message.success(t('用户删除成功'));
                //       handleClose();
                //     });
                //   },
                //   onCancel: () => {},
                // });
              },
            },
            {
              key: 'resetPass',
              name: '重置密码',
              onClick: () => handleClick(UserActionType.Reset, row.id),
            },
          ]}
        />,
      ],
    },
  ];

  return (
    <div className={classes.container}>
      <ProTable<API.User>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        rowKey="query"
        search={false}
        toolBarRender={() => [
          <Button type="primary" key="add" onClick={() => handleClick(UserActionType.CreateUser)}>
            创建用户
          </Button>,
        ]}
        request={async (params = { current: 1, pageSize: 10 }, sort, filter) => {
          console.log(sort, filter);
          const resp = await userApi.list(params);
          return {
            data: resp.list,
            total: resp.total,
            success: true,
          };
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        options={{
          search: true,
        }}
        pagination={{
          showQuickJumper: true,
          showSizeChanger: true,
          defaultPageSize: 10,
        }}
        dateFormatter="string"
        headerTitle="用户列表"
      />
      <UserInfoModal
        visible={visible}
        action={action as UserActionType}
        width={activeKey === UserType.User ? 500 : 700}
        userType={activeKey}
        onClose={handleClose}
        userId={userId}
        // teamId={teamId}
        // memberId={memberId}
      />
    </div>
  );
};

export default UserList;
