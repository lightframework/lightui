import { UserCreateApiSysUsers } from '@/services/sys/user';
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { AxiosError } from '@umijs/max';
import { Button, message } from 'antd';

export default function UserCreateModalForm({
  roleOptions,
  onFinish,
}: {
  roleOptions: { label: string; value: API.RoleOption['id'] }[];
  onFinish?: VoidFunction;
}) {
  return (
    <ModalForm<API.UserCreateReq>
      title="创建用户"
      trigger={<Button type="primary">新增</Button>}
      width={500}
      labelCol={{ span: 4 }}
      modalProps={{
        destroyOnClose: true,
      }}
      autoFocusFirstInput
      onFinish={async (data) => {
        try {
          const res = await UserCreateApiSysUsers(data);
          if (res.msg === 'OK') {
            message.success('添加成功');
            onFinish?.();
            return true;
          } else {
            message.error(res.msg);
          }
        } catch (e) {
          const data = (e as AxiosError).response?.data as any;
          const code = data.code;
          if (code === 5000) {
            message.error(data.msg);
          } else {
            message.error('服务器异常，添加失败');
          }
        }
      }}
    >
      <ProFormText
        name="username"
        key="username"
        label="登录名"
        placeholder=""
        rules={[
          {
            required: true,
            message: '请输入登录名',
          },
        ]}
      />
      <ProFormText
        name="nickname"
        key="nickname"
        label="姓名"
        placeholder=""
        rules={[
          {
            required: true,
            message: '请输入姓名',
          },
        ]}
      />
      <ProFormText.Password
        name="password"
        key="password"
        label="密码"
        placeholder=""
        rules={[
          {
            required: true,
            message: '请输入密码',
          },
        ]}
      />
      <ProFormText.Password
        name="confirm"
        key="confirm"
        label="确认密码"
        placeholder=""
        rules={[
          {
            required: true,
          },
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
        ]}
      />
      <ProFormText name="mobile" key="mobile" label="电话" placeholder="" />
      <ProFormText name="email" key="email" label="邮箱" placeholder="" />
      <ProFormSelect
        name="roleIds"
        key="roleIds"
        label="角色"
        mode="multiple"
        allowClear
        options={roleOptions}
        placeholder=""
      />
      <ProFormTextArea name="info" key="info" label="介绍" placeholder="" />
    </ModalForm>
  );
}
