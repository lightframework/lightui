import React from 'react';

import LeftTreeLayout from '@/components/layouts/LeftTreeLayout';
import type { LightColumnsType } from '@/components/LightTable';
import LightTable from '@/components/LightTable';
import * as roleApi from '@/services/sys/role';

const Page: React.FC = () => {
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
      copyAble: true,
      search: {
        type: 'text',
        itemWidth: 200,
      },
    },
    {
      title: '角色',
      dataIndex: 'roles',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      copyAble: true,
      ellipsis: true,
    },
    {
      title: '联系电话',
      dataIndex: 'mobile',
      copyAble: true,
      ellipsis: true,
    },

    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
    {
      title: '操作',
      key: 'option',
      width: 150,
      render: (_, row) => {
        return (
          <div style={{ display: 'inline-flex', gap: 5 }}>
            <a key="editable" onClick={() => {}}>
              编辑
            </a>
            <a key="editable" onClick={() => {}}>
              重置密码
            </a>
          </div>
        );
      },
    },
  ];

  return (
    <LeftTreeLayout>
      <LightTable
        columns={columns}
        request={roleApi.roleMemListApiSysRolesByIdusers}
        initQuery={{ query: { id: 1 }, required: true }}
      />
    </LeftTreeLayout>
  );
};

export default Page;
