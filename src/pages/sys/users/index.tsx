import React, { useState, useEffect } from 'react';
import { Space, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useRequest } from '@umijs/max';

import * as userApi from '@/services/sys/user';

const columns: ColumnsType<API.User> = [
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '用户名',
    dataIndex: 'nickname',
    key: 'username',
  },
  {
    title: '描述',
    dataIndex: 'info',
    key: 'info',
  },
  {
    title: '手机',
    dataIndex: 'mobile',
    key: 'mobile',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.nickname}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const UserList: React.FC = () => {
  const [ds, setDS] = useState<API.User[]>([]);
  const [pageQuery, setPageQuery] = useState<Record<string, number>>({ current: 1, pageSize: 5 });
  const [total, setTotal] = useState<number>();

  const { loading, run } = useRequest(async () => {
    try {
      const res = await userApi.list({ ...pageQuery });
      setDS(res.list || []);
      setTotal(res.total || 0);
    } catch (error) {
      message.error('获取用户列表失败！');
    }
  });

  useEffect(() => {
    run();
  }, [pageQuery, run]);

  return (
    <Table
      columns={columns}
      loading={loading}
      dataSource={ds}
      pagination={{
        total: total,
        defaultPageSize: 5,

        onChange(page, pageSize) {
          setPageQuery({ current: page, pageSize });
        },
      }}
    />
  );
};

export default UserList;
