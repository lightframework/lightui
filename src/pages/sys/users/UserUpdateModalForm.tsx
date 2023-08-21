import ModalUpdateForm from '@/components/ui/form/modal-form/ModalUpdateForm';
import {
  userReadOneApiSysUsersById,
  userUpdateApiSysUsersById,
} from '@/services/sys/user';

export default function UserUpdateModalForm({
  userId,
  roleOptions,
  onFinish,
}: {
  userId: string;
  roleOptions: { label: string; value: API.RoleOption['id'] }[];
  onFinish?: VoidFunction;
}) {
  return (
    <ModalUpdateForm<
      API.UserUpdateReq,
      API.userUpdateApiSysUsersByIdParams,
      API.userReadOneApiSysUsersByIdParams
    >
      title="编辑用户"
      onFinish={onFinish}
      initialParams={{
        id: userId,
      }}
      initialRequest={async (params) => {
        const res = await userReadOneApiSysUsersById(params);

        const roles = res.data?.roles?.split(',') ?? [];
        const roleIds: number[] = [];

        roles.forEach((role) => {
          const findRole = roleOptions.find((item) => item.label === role);
          if (findRole) {
            roleIds.push(findRole.value);
          }
        });

        return { ...res, data: { ...res.data, roleIds } };
      }}
      requestParams={{
        id: userId,
      }}
      request={userUpdateApiSysUsersById}
      fields={[
        {
          fieldType: 'text',
          label: '用户名',
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
          rules: [
            {
              pattern: /^1[3-9]\d{9}$/,
              message: '请输入正确的手机号',
            },
          ],
        },
        {
          fieldType: 'text',
          label: '邮箱',
          name: 'email',
          rules: [
            {
              type: 'email',
              message: '请输入正确的邮箱',
            },
          ],
        },
        {
          fieldType: 'select',
          label: '角色',
          name: 'roleIds',
          options: roleOptions,
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
