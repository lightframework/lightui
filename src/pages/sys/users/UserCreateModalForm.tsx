import ModalCreateForm from '@/components/ui/form/modal-form/ModalCreateForm';
import { UserCreateApiSysUsers } from '@/services/sys/user';

export default function UserCreateModalForm({
  roleOptions,
  onFinish,
}: {
  roleOptions: { label: string; value: API.RoleOption['id'] }[];
  onFinish?: VoidFunction;
}) {
  return (
    <ModalCreateForm<API.UserCreateReq>
      title="创建用户"
      request={UserCreateApiSysUsers}
      onFinish={onFinish}
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
          fieldType: 'password',
          label: '密码',
          name: 'password',
          required: true,
        },
        {
          fieldType: 'password',
          label: '确认密码',
          name: 'confirm',
          required: true,
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
          options: roleOptions,
        },
        {
          fieldType: 'textarea',
          label: '介绍',
          name: 'info',
        },
      ]}
    />
  );
}
