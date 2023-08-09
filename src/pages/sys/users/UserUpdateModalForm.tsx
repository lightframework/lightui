import ModalUpdateForm from '@/components/ui/form/modal-form/ModalUpdateForm';
import {
  userReadOneApiSysUsersById,
  userUpdateApiSysUsersById,
} from '@/services/sys/user';
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

  console.log(roleIds);

  return (
    <ModalUpdateForm<
      API.UserUpdateReq,
      API.userUpdateApiSysUsersByIdParams,
      API.userReadOneApiSysUsersByIdParams
    >
      title="用户"
      onFinish={onFinish}
      initialParams={{
        id: userId,
      }}
      initialRequest={async (params) => {
        const res = await userReadOneApiSysUsersById(params);

        const roles = res.data?.roles?.split(',');
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

        return res;
      }}
      requestParams={{
        id: userId,
      }}
      request={userUpdateApiSysUsersById}
      fields={[
        {
          fieldType: 'text',
          label: '登录名',
          name: 'username',
          required: true,
        },
        {
          fieldType: 'text',
          label: '姓名',
          name: 'nickname',
          required: true,
        },
        {
          fieldType: 'text',
          label: '电话',
          name: 'mobile',
        },
        {
          fieldType: 'text',
          label: '邮箱',
          name: 'email',
        },
        {
          fieldType: 'select',
          label: '角色',
          name: 'roleIds',
          options: roleOptions,
          initialValue: roleIds,
        },
        {
          fieldType: 'textarea',
          label: '介绍',
          name: 'info',
          transform: (value) => ({ info: value === '' ? undefined : value }),
        },
      ]}
    />
  );
}
