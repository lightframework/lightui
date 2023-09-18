import ModalUpdateForm from '@/components/ui/form/modal-form/ModalUpdateForm';
import { useRoleOptions } from '@/hooks/options';
import {
  userReadOneApiSysUsersById,
  userUpdateApiSysUsersById,
} from '@/services/sys/user';
import { useAccess } from '@umijs/max';
import { Button } from 'antd';

export default function UserUpdateModalForm({
  userId,
  onFinish,
}: {
  userId: string;
  onFinish?: VoidFunction;
}) {
  const access = useAccess();
  const roleOptions = useRoleOptions();

  return (
    <ModalUpdateForm<
      API.UserUpdateReq,
      API.userUpdateApiSysUsersByIdParams,
      API.userReadOneApiSysUsersByIdParams
    >
      title="编辑用户"
      onFinish={onFinish}
      trigger={
        <Button
          type="link"
          disabled={!(access as any).userUpdateApiSysUsersById}
        >
          编辑
        </Button>
      }
      initialParams={{
        id: userId,
      }}
      initialRequest={async (params) => {
        const res = await userReadOneApiSysUsersById(params);

        const roles = res.data?.roles?.split(',') ?? [];
        const roleIds: number[] = [];

        roles.forEach((role) => {
          const findRole = roleOptions.selectOptions.find(
            (item) => item.label === role,
          );
          if (findRole) {
            roleIds.push(Number.parseInt(findRole.value));
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
          fieldType: 'select',
          label: '角色',
          name: 'roleIds',
          options: roleOptions.selectOptions,
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
