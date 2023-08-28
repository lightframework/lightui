import PageContainer from '@/components/ui/PageContainer';
import Table, { TableColumns, TableColumnsConfig } from '@/components/ui/Table';
import {
  TABLE_DATETIME_WIDTH,
  TABLE_DESC_WIDTH,
  TABLE_EMAIL_WIDTH,
  TABLE_MOBILE_WIDTH,
  TABLE_USERNAME_WIDTH,
} from '@/constants/table';
import {
  userChangeStatusApiSysUsersByIdstatus,
  userPageListApiSysUsers,
} from '@/services/sys/user';
import { ActionType } from '@ant-design/pro-components';
import { Switch, message } from 'antd';
import { useRef } from 'react';
import UserCreateModalForm from './UserCreateModalForm';
import UserDeleteModalForm from './UserDeleteModalForm';
import UserResetPasswordModalForm from './UserResetPasswordModalForm';
import UserUpdateModalForm from './UserUpdateModalForm';

export default function Users() {
  const tableRef = useRef<ActionType>();

  const columnsConfig: TableColumnsConfig = {
    id: { show: false },
    createBy: { show: false },
    updateBy: { show: false },
    updatedAt: { show: false },
    info: { show: false },
  };

  const columns: TableColumns<API.UserInfo> = [
    {
      title: 'Id',
      key: 'id',
      dataIndex: 'id',
      ellipsis: true,
      copyable: true,
      width: 100,
    },
    {
      title: '用户名',
      key: 'username',
      dataIndex: 'username',
      ellipsis: true,
      copyable: true,
      width: 140,
    },
    {
      title: '姓名',
      key: 'nickname',
      dataIndex: 'nickname',
      ellipsis: true,
      copyable: true,
      width: 140,
    },
    {
      title: '角色',
      key: 'roles',
      dataIndex: 'roles',
      ellipsis: true,
      width: 220,
    },
    {
      title: '邮箱',
      key: 'email',
      dataIndex: 'email',
      ellipsis: true,
      copyable: true,
      width: TABLE_EMAIL_WIDTH,
    },
    {
      title: '联系电话',
      key: 'mobile',
      dataIndex: 'mobile',
      ellipsis: true,
      copyable: true,
      width: TABLE_MOBILE_WIDTH,
    },
    {
      title: '创建者',
      key: 'createBy',
      dataIndex: 'createBy',
      ellipsis: true,
      width: TABLE_USERNAME_WIDTH,
    },
    {
      title: '创建时间',
      key: 'createdAt',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
      width: TABLE_DATETIME_WIDTH,
    },
    {
      title: '更新者',
      key: 'updateBy',
      dataIndex: 'updateBy',
      ellipsis: true,
      width: TABLE_USERNAME_WIDTH,
    },
    {
      title: '更新时间',
      key: 'updatedAt',
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      width: TABLE_DATETIME_WIDTH,
    },
    {
      title: '备注',
      key: 'info',
      dataIndex: 'info',
      ellipsis: true,
      width: TABLE_DESC_WIDTH,
    },
    {
      title: '状态',
      key: 'enabled',
      dataIndex: 'enabled',
      width: 80,
      render(_, record) {
        return (
          <Switch
            checked={record.enabled}
            checkedChildren="启用"
            unCheckedChildren="禁用"
            onChange={async (c) => {
              const res = await userChangeStatusApiSysUsersByIdstatus(
                { id: String(record.id) },
                {
                  enabled: c,
                  id: record.id,
                },
              );
              if (res.msg === 'OK') {
                message.success(`${!!c ? '启用' : '禁用'}成功！`);
                tableRef?.current?.reload(false);
              } else {
                message.error(res.msg);
              }
            }}
          />
        );
      },
    },
    {
      title: '操作',
      key: 'option',
      width: 220,
      render: (_, row) => {
        return (
          <div className="inline-flex flex-wrap gap-1.5">
            <UserUpdateModalForm
              userId={String(row.id)}
              onFinish={() => tableRef.current?.reload(false)}
            />
            <UserResetPasswordModalForm
              userId={String(row.id)}
              onFinish={() => tableRef.current?.reload(false)}
            />
            <UserDeleteModalForm
              userId={String(row.id)}
              username={row.username}
              nickname={row.nickname}
              onFinish={() => tableRef.current?.reload(false)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <Table<API.UserInfo>
        title="users"
        actionRef={tableRef}
        rowKey="id"
        columns={columns}
        search="请输入用户名/姓名/邮箱/电话搜索"
        request={userPageListApiSysUsers}
        toolBarRender={() => [<UserCreateModalForm key="user-create" />]}
        columnsConfig={columnsConfig}
      />
    </PageContainer>
  );
}
