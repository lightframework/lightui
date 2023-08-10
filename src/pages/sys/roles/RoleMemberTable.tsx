import LightTable, {
  LightColumnsType,
  LightTableAction,
} from '@/components/ui/LightTable';
import { QueryColumn } from '@/components/ui/QueryHeader';
import { roleMemListApiSysRolesByIdusers } from '@/services/sys/role';
import { userChangeStatusApiSysUsersByIdstatus } from '@/services/sys/user';
import { sorter } from '@/utils/sorter';
import { Switch, message } from 'antd';
import { useRef } from 'react';
import MemberAddModalForm from './MemberAddModalForm';

export default function RoleMemberTable({ roleId }: { roleId: number }) {
  const tableRef = useRef<LightTableAction>();

  const columns: LightColumnsType<API.UserInfo> = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      ellipsis: true,
      copyAble: true,
      sorter: (a, b) => sorter(a, b, 'username'),
    },
    {
      title: '姓名',
      dataIndex: 'nickname',
      key: 'nickname',
      ellipsis: true,
      copyAble: true,
      search: {
        type: 'text',
        itemWidth: 200,
      },
      sorter: (a, b) => sorter(a, b, 'nickname'),
    },
    {
      title: '角色',
      dataIndex: 'roles',
      key: 'roles',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      copyAble: true,
      ellipsis: true,
      width: '10%',
    },
    {
      title: '联系电话',
      dataIndex: 'mobile',
      key: 'mobile',
      copyAble: true,
      ellipsis: true,
      width: '10%',
    },
    {
      title: '用户状态',
      dataIndex: 'enabled',
      key: 'enabled',
      width: 100,
      render(value, record) {
        return (
          <Switch
            checked={value}
            checkedChildren="启用"
            unCheckedChildren="禁用"
            onChange={(c) => {
              userChangeStatusApiSysUsersByIdstatus(
                { id: String(record.id) },
                {
                  enabled: c,
                  id: record.id,
                },
              ).then((d) => {
                if (d.msg === 'OK') {
                  message.success(`${!!c ? '启用' : '禁用'}成功！`);
                  tableRef?.current?.reload(false);
                } else {
                  message.error(d.msg);
                }
              });
            }}
          />
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      ellipsis: true,
      sorter: (a, b) =>
        sorter(a, b, 'createdAt', {
          valueType: 'dateTime',
        }),
    },
    {
      title: '操作',
      key: 'option',
      render: (_, row) => {
        return (
          <div className="inline-flex flex-wrap gap-1.5">
            {/* <UserUpdateModalForm
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
            /> */}
          </div>
        );
      },
    },
  ];

  const queryColumns: QueryColumn[] = [
    {
      type: 'text',
      name: 'keywords',
      itemWidth: 300,
      placeholder: '请输入用户名/姓名搜索',
    },
  ];

  return (
    <LightTable<API.UserInfo, API.roleMemListApiSysRolesByIdusersParams>
      ref={tableRef}
      key={roleId}
      columns={columns}
      rowKey="id"
      search
      params={{ id: String(roleId) }}
      request={roleMemListApiSysRolesByIdusers}
      queryColumns={queryColumns}
      buttonRender={<MemberAddModalForm roleId={roleId} />}
    />
  );
}
