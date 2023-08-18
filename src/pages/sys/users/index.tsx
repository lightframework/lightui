import PageContainer from '@/components/ui/PageContainer';
import Table, { TableColumns, TableColumnsConfig } from '@/components/ui/Table';
import { roleOptionsApiSysRolesOptions } from '@/services/sys/role';
import {
  userChangeStatusApiSysUsersByIdstatus,
  userPageListApiSysUsers,
} from '@/services/sys/user';
import { sorter } from '@/utils/sorter';
import { ActionType } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Switch, message } from 'antd';
import { useRef } from 'react';
import UserCreateModalForm from './UserCreateModalForm';
import UserDeleteModalForm from './UserDeleteModalForm';
import UserResetPasswordModalForm from './UserResetPasswordModalForm';
import UserUpdateModalForm from './UserUpdateModalForm';

export default function Users() {
  const tableRef = useRef<ActionType>();
  const columnsConfig: TableColumnsConfig<API.UserInfo> = {
    id: { show: false },
    createBy: { show: false },
    updateBy: { show: false },
    updatedAt: { show: false },
    info: { show: false },
  };

  const { data } = useRequest(roleOptionsApiSysRolesOptions);

  if (!data || !data.list) {
    return;
  }

  const roleOptions = data.list.map((role) => ({
    label: role.name,
    value: role.id,
  }));

  const columns: TableColumns<API.UserInfo> = [
    {
      title: 'Id',
      key: 'id',
      dataIndex: 'id',
      ellipsis: true,
      copyable: true,
    },
    {
      title: '用户名',
      key: 'username',
      dataIndex: 'username',
      ellipsis: true,
      copyable: true,
      sorter: (a, b) => sorter(a, b, 'username'),
    },
    {
      title: '姓名',
      key: 'nickname',
      dataIndex: 'nickname',
      ellipsis: true,
      copyable: true,
      sorter: (a, b) => sorter(a, b, 'nickname'),
    },
    {
      title: '角色',
      key: 'roles',
      dataIndex: 'roles',
      ellipsis: true,
    },
    {
      title: '邮箱',
      key: 'email',
      dataIndex: 'email',
      ellipsis: true,
      copyable: true,
    },
    {
      title: '联系电话',
      key: 'mobile',
      dataIndex: 'mobile',
      ellipsis: true,
      copyable: true,
    },

    {
      title: '创建者',
      key: 'createBy',
      dataIndex: 'createBy',
      ellipsis: true,
    },
    {
      title: '创建时间',
      key: 'createdAt',
      dataIndex: 'createdAt',
      ellipsis: true,
      sorter: (a, b) => sorter(a, b, 'createdAt', { valueType: 'dateTime' }),
    },
    {
      title: '更新者',
      key: 'updateBy',
      dataIndex: 'updateBy',
      ellipsis: true,
    },
    {
      title: '更新时间',
      key: 'updatedAt',
      dataIndex: 'updatedAt',
      ellipsis: true,
      sorter: (a, b) => sorter(a, b, 'updatedAt', { valueType: 'dateTime' }),
    },
    {
      title: '备注',
      key: 'info',
      dataIndex: 'info',
      ellipsis: true,
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
      className: 'xl:w-[220px]',
      render: (_, row) => {
        return (
          <div className="inline-flex flex-wrap gap-1.5">
            <UserUpdateModalForm
              userId={String(row.id)}
              roleOptions={roleOptions}
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
        toolBarRender={() => [
          <UserCreateModalForm key="user-create" roleOptions={roleOptions} />,
        ]}
        columnsConfig={columnsConfig}
      />
    </PageContainer>
  );
}
