import React, { useRef } from 'react';
import { createUseStyles } from 'react-jss';

import * as userApi from '@/services/sys/user';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProTable,
  TableDropdown,
} from '@ant-design/pro-components';
import { Button, Form, message } from 'antd';

const useStyle = createUseStyles({
  container: {},
});

const Table: React.FC = () => {
  const [form] = Form.useForm<{
    username: string;
    nickname: string;
    email: string;
    mobile: string;
    info: string;
  }>();
  const classes = useStyle();
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<API.UserInfo>[] = [
    {
      dataIndex: 'id',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '登录名',
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
    {
      disable: true,
      title: '状态',
      dataIndex: 'state',
      filters: true,
      onFilter: true,
      ellipsis: true,
      valueType: 'select',
      search: false,
      valueEnum: {
        all: { text: '超长'.repeat(50) },
        open: {
          text: '未解决',
          status: 'Error',
        },
        closed: {
          text: '已解决',
          status: 'Success',
          disabled: true,
        },
        processing: {
          text: '解决中',
          status: 'Processing',
        },
      },
    },

    {
      title: '创建时间',
      key: 'showTime',
      dataIndex: 'created_at',
      valueType: 'date',
      sorter: true,
      search: false,
      hideInSearch: true,
    },
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
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a href={record.id} target="_blank" rel="noopener noreferrer" key="view">
          查看
        </a>,
        <TableDropdown
          key="actionGroup"
          onSelect={() => action?.reload()}
          menus={[
            { key: 'copy', name: '复制' },
            { key: 'delete', name: '删除' },
          ]}
        />,
      ],
    },
  ];
  return (
    <div className={classes.container}>
      <ProTable<API.UserInfo>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        // toolbar={true}
        toolBarRender={() => [
          <ModalForm<{
            username: string;
            nickname: string;
            mobile: string;
            email: string;
            info: string;
          }>
            key="add"
            title="添加用户"
            // width={450}
            trigger={
              <Button type="primary">
                <PlusOutlined />
                添加用户
              </Button>
            }
            form={form}
            autoFocusFirstInput
            modalProps={{
              destroyOnClose: true,
              onCancel: () => console.log('run'),
            }}
            submitTimeout={2000}
            onFinish={async (values) => {
              // await waitTime(2000);
              console.log(values.username);
              message.success('提交成功');
              return true;
            }}
          >
            <ProFormText
              width="md"
              name="name"
              label="登录名"
              tooltip="登录系统账号"
              placeholder="请输入登录名"
            />
            <ProFormText width="md" name="nickname" label="姓名" placeholder="请输入姓名" />
            <ProFormText width="md" name="email" label="邮箱" placeholder="请输入邮箱" />
            <ProFormText width="md" name="mobile" label="联系电话" placeholder="请输入联系电话" />
            <ProFormTextArea width="md" name="email" label="简介" placeholder="请输入简要介绍" />
          </ModalForm>,
        ]}
        request={(params = { current: 1, pageSize: 10 }, sort, filter) => {
          console.log(sort, filter);
          return userApi.listSysUsers(params);
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 5,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="高级表格"
      />
    </div>
  );
};

export default Table;
