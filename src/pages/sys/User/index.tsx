import React, { useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';

// import { useTranslation } from 'react-i18next';
import type { LightFormColumn, LightOption } from '@/components/LightModalForm';
import LightModalForm from '@/components/LightModalForm';
import type { LightColumnsType, LightTableAction } from '@/components/LightTable';
import LightTable from '@/components/LightTable';
import type { QueryColumn } from '@/components/QueryHeader';
import { useLightApi } from '@/components/hooks';
import * as roleApi from '@/services/sys/role';
import * as userApi from '@/services/sys/user';
import { Button, Form, Input, Select, Switch, message } from 'antd';

const useStyle = createUseStyles({
  container: {},
});

const UserList: React.FC = () => {
  // const { t } = useTranslation();
  const classes = useStyle();
  const [open, setOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [resetPsdOpen, setPsdOpen] = useState<boolean>(false);
  const [roleOptions, setRoleOptions] = useState<LightOption[]>([]);
  const [userCreateForm] = Form.useForm<API.UserCreateReq>();
  const [userEditForm] = Form.useForm<API.UserUpdateReq>();
  const [resetForm] = Form.useForm<API.ResetPassReq>();
  const tableRef = useRef<LightTableAction>();

  useLightApi(
    () => {
      return roleApi.roleOptionsApiSysRolesOptions({});
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

  const getUserDetail = (id: string) => {
    userApi.userReadOneApiSysUsersById({ id }).then((d) => {
      if (d.msg === 'OK') {
        userEditForm?.setFieldsValue(d.data);
      } else {
        message.error(d?.msg);
      }
    });
  };

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
      title: '用户状态',
      dataIndex: 'enabled',
      render(value, record) {
        return (
          <Switch
            checked={value}
            checkedChildren="启用"
            unCheckedChildren="禁用"
            onChange={(c) => {
              userApi
                .userChangeStatusApiSysUsersByIdstatus(
                  { id: String(record.id) },
                  {
                    enabled: c,
                    id: record.id as number,
                  },
                )
                .then((d) => {
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
    },
    {
      title: '操作',
      key: 'option',
      width: 150,
      render: (_, row) => {
        return (
          <div style={{ display: 'inline-flex', gap: 5 }}>
            <a
              key="editable"
              onClick={() => {
                getUserDetail(String(row.id));
                setEditOpen(true);
              }}
            >
              编辑
            </a>
            <a
              key="editable"
              onClick={() => {
                resetForm.setFieldsValue({ id: row.id });
                setPsdOpen(true);
              }}
            >
              重置密码
            </a>
          </div>
        );
      },
    },
  ];

  const addUserColumns: LightFormColumn<API.UserCreateReq>[] = [
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

  const resetPsdColumns: LightFormColumn<API.ResetPassReq>[] = [
    {
      name: 'id',
      noStyle: true,
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
  ];

  const editUserColumns: LightFormColumn<API.UserUpdateReq>[] = [
    {
      name: 'id',
      noStyle: true,
    },
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
      <LightTable<API.UserPageListResp, API.UserPageListReq>
        columns={columns}
        rowKey="id"
        search
        ref={tableRef}
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
      <LightModalForm<API.UserCreateReq, API.UserCreateResp>
        open={open}
        columns={addUserColumns}
        onSuccess={() => {
          setOpen(false);
          userCreateForm?.resetFields();
          tableRef?.current?.reload();
        }}
        width="30%"
        title="新增用户"
        form={userCreateForm}
        messageRender={(r) => {
          if (r.msg === 'OK') {
            message.success('创建成功！');
          } else {
            message.error('创建失败，' + r?.msg);
          }
        }}
        request={userApi.UserCreateApiSysUsers}
        onCancel={() => {
          setOpen(false);
          userCreateForm?.resetFields();
        }}
      />

      <LightModalForm<API.UserUpdateReq, API.UserUpdateResp>
        open={editOpen}
        columns={editUserColumns}
        onSuccess={() => {
          setEditOpen(false);
          userEditForm?.resetFields();
          tableRef?.current?.reload();
        }}
        width="30%"
        title="编辑用户"
        form={userEditForm}
        messageRender={(r) => {
          if (r.msg === 'OK') {
            message.success('修改成功！');
          } else {
            message.error('修改失败，' + r?.msg);
          }
        }}
        withIDRequest={userApi.userUpdateApiSysUsersById}
        onCancel={() => {
          setEditOpen(false);
          userEditForm?.resetFields();
        }}
      />

      <LightModalForm<API.ResetPassReq, API.ResetPassResp>
        open={resetPsdOpen}
        columns={resetPsdColumns}
        onSuccess={() => {
          setPsdOpen(false);
          resetForm?.resetFields();
        }}
        width="30%"
        title="重置密码"
        form={resetForm}
        messageRender={(r) => {
          if (r.msg === 'OK') {
            message.success('修改成功！');
          } else {
            message.error('修改失败，' + r?.msg);
          }
        }}
        withIDRequest={userApi.userResetPassApiSysUsersByIdpass}
        onCancel={() => {
          setPsdOpen(false);
          resetForm?.resetFields();
        }}
      />
    </div>
  );
};

export default UserList;
