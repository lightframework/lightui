import {
  userReadOneApiSysUsersById,
  userUpdateApiSysUsersById,
} from '@/services/sys/user';
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { AxiosError } from '@umijs/max';
import { Button, message } from 'antd';
import { useState } from 'react';
import { flushSync } from 'react-dom';

export default function UserUpdateModalForm({
  userId,
  roleOptions,
  onFinish,
}: {
  userId: string;
  roleOptions: { label: string; value: API.RoleOption['id'] }[];
  onFinish?: VoidFunction;
}) {
  const [roleIds, setRoleIds] = useState<API.RoleOption['id'][]>([]);

  return (
    <ModalForm<API.UserUpdateReq, API.userReadOneApiSysUsersByIdParams>
      title="编辑用户"
      trigger={<Button type="link">编辑</Button>}
      width={500}
      modalProps={{
        destroyOnClose: true,
      }}
      params={{ id: userId }}
      request={async (params) => {
        const res = await userReadOneApiSysUsersById(params);

        const roles = res.data?.roles?.split(',');
        console.log(roles);
        if (roles) {
          const tmpRoleIds: typeof roleIds = [];
          roles.forEach((role) => {
            const findRole = roleOptions.find((item) => item.label === role);

            if (findRole) {
              tmpRoleIds.push(findRole.value);
            }
          });
          flushSync(() => setRoleIds(tmpRoleIds));
        }
        return res.data!;
      }}
      onFinish={async (data) => {
        try {
          const res = await userUpdateApiSysUsersById({ id: userId }, data);
          if (res.msg === 'OK') {
            message.success('更新成功');
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
        initialValue={roleIds}
      />
      <ProFormTextArea name="info" key="info" label="介绍" placeholder="" />
    </ModalForm>
  );
}
