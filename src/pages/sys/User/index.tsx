import React, { useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { UserActionType, UserType } from '@/store/manageInterface';
import type { ActionType } from '@ant-design/pro-components';
// import { useTranslation } from 'react-i18next';
import type { LightFormColumn, LightOption } from '@/components/LightModalForm';
import LightModalForm from '@/components/LightModalForm';
import type { LightColumnsType, LightTableAction } from '@/components/LightTable';
import LightTable from '@/components/LightTable';
import type { QueryColumn } from '@/components/QueryHeader';
import { useLightApi } from '@/components/hooks';
import * as roleApi from '@/services/sys/role';
import * as userApi from '@/services/sys/user';
import { Button, Form, Input, Select, message } from 'antd';

const Item = Form.Item;

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
  const [open, setOpen] = useState<boolean>(false);
  const [roleOptions, setRoleOptions] = useState<LightOption[]>([]);
  const [userAddForm] = Form.useForm<API.UserAddReq>();
  const tableRef = useRef<LightTableAction>();

  useLightApi(
    () => {
      return roleApi.roleListApiSysRolesList({});
    },
    {
      onSuccess: (dt) => {
        const tmp = dt?.list?.map((r) => {
          return {
            label: r.name,
            value: r.id,
          };
        });
        setRoleOptions(tmp);
      },
    },
  );

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

  const addUserColumns: LightFormColumn<API.UserAddReq>[] = [
    {
      label: '登录名',
      name: 'username',
      key: 'username',
      required: true,
      labelCol: { span: 4 },
      itemChildren: <Input />,
    },
    {
      label: '姓名',
      name: 'nickname',
      required: true,
      key: 'nickname',
      labelCol: { span: 4 },
      itemChildren: <Input />,
    },
    {
      label: '电话',
      name: 'mobile',
      key: 'mobile',
      labelCol: { span: 4 },
      itemChildren: <Input type="tel" />,
    },
    {
      label: '邮箱',
      name: 'email',
      key: 'email',
      labelCol: { span: 4 },
      itemChildren: <Input />,
    },
    {
      label: '密码',
      name: 'password',
      required: true,
      key: 'password',
      labelCol: { span: 4 },
      itemChildren: <Input.Password />,
    },
    {
      label: '确认密码',
      name: 'confirm',
      required: true,
      key: 'confirm',
      rules: [
        (form) => {
          return {
            validateTrigger: ['onBlur', 'onChange'],
            message: '密码输入不一致，请重新输入',
            validator: (_, value) => {
              const p = form.getFieldValue('password');
              if (p !== value) {
                return Promise.reject();
              }
              return Promise.resolve();
            },
          };
        },
      ],
      labelCol: { span: 4 },
      itemChildren: <Input.Password />,
    },
    {
      label: '角色',
      name: 'roleIds',
      key: 'roleIds',
      labelCol: { span: 4 },

      itemChildren: <Select options={roleOptions} mode="multiple" maxTagCount={2} />,
    },
    {
      label: '介绍',
      name: 'info',
      key: 'info',
      labelCol: { span: 4 },
      itemChildren: <Input.TextArea />,
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
        actionRef={tableRef}
        buttonRender={() => {
          return (
            <div>
              <Button
                type="primary"
                onClick={() => {
                  setOpen(true);
                }}
              >
                添加用户
              </Button>
            </div>
          );
        }}
        request={userApi.userPageListApiSysUsers}
        queryColumns={queryColumns}
        pagination={{
          showQuickJumper: true,
          showSizeChanger: true,
          defaultPageSize: 10,
        }}
      />
      <LightModalForm<API.UserAddReq, API.UserAddResp>
        open={open}
        columns={addUserColumns}
        onSuccess={() => {
          setOpen(false);
          tableRef?.current?.reload();
        }}
        width="30%"
        title="新增用户"
        form={userAddForm}
        messageRender={(r) => {
          if (r?.resp?.success) {
            message.success('创建成功！');
          } else {
            message.error('创建失败，' + r?.resp?.msg);
          }
        }}
        request={userApi.userAddApiSysUsers}
        onCancel={() => {
          setOpen(false);
          userAddForm?.resetFields();
        }}
      />
    </div>
  );
};

export default UserList;
