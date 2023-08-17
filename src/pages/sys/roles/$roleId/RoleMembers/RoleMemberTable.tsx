import Table, { TableColumns, TableColumnsConfig } from '@/components/ui/Table';
import { roleMemListApiSysRolesByIdusers } from '@/services/sys/role';
import { userChangeStatusApiSysUsersByIdstatus } from '@/services/sys/user';
import { sorter } from '@/utils/sorter';
import { ActionType } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import { Switch, message } from 'antd';
import { useRef } from 'react';
import MemberAddModalForm from './MemberAddModalForm';
import MemberDeleteModalForm from './MemberDeleteModalForm';

export default function RoleMemberTable() {
  const params = useParams();
  const roleId = Number.parseInt(params.roleId!);

  const tableRef = useRef<ActionType>();
  const columnsConfig: TableColumnsConfig<API.UserInfo> = {
    id: { show: false },
    createBy: { show: false },
    updateBy: { show: false },
    updatedAt: { show: false },
    enabled: { show: false },
    info: { show: false },
  };

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
      title: '创建日期',
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
      title: '更新日期',
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
      className: 'xl:w-[80px]',
      render: (_, row) => {
        return (
          <div className="inline-flex flex-wrap gap-1.5">
            <MemberDeleteModalForm
              roleId={roleId}
              memberName={row.username}
              memberNickname={row.nickname}
              onFinish={() => tableRef.current?.reload(false)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <Table<API.UserInfo, API.roleMemListApiSysRolesByIdusersParams>
      title="role-members"
      actionRef={tableRef}
      key={roleId}
      rowKey="id"
      columns={columns}
      params={{ id: String(roleId) }}
      request={roleMemListApiSysRolesByIdusers}
      columnsConfig={columnsConfig}
      toolBarRender={() => [
        <MemberAddModalForm
          key="role-member-add"
          roleId={roleId}
          onFinish={() => tableRef.current?.reload(true)}
        />,
      ]}
    />
  );
}
