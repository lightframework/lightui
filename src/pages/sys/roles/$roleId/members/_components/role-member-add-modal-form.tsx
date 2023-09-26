import { MODAL_FORM_WIDTH } from '@/constants/modal';
import { roleMemAddApiSysRolesByIdusers } from '@/services/sys/role';
import { userOptionsApiSysUsersOptions } from '@/services/sys/user';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormSelect } from '@ant-design/pro-components';
import { useQuery } from '@tanstack/react-query';
import { useAccess } from '@umijs/max';
import { Button, message } from 'antd';

export default function RoleMemberAddModalForm({
  roleId,
  onFinish,
}: {
  roleId: number;
  onFinish?: VoidFunction;
}) {
  const access = useAccess();

  const { data: userOptions, isLoading } = useQuery({
    queryKey: ['user-options'],
    queryFn: () =>
      userOptionsApiSysUsersOptions({}).then((res) => res.data?.list ?? []),
  });

  return (
    <ModalForm<SYS.RoleMemAddReq>
      title="添加角色成员"
      name="role-member-add"
      width={MODAL_FORM_WIDTH}
      trigger={
        <Button
          type="primary"
          disabled={!access.roleMemAddApiSysRolesByIdusers}
        >
          <PlusOutlined />
          添加
        </Button>
      }
      autoFocusFirstInput
      layout="horizontal"
      modalProps={{
        destroyOnClose: true,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        await roleMemAddApiSysRolesByIdusers({ id: String(roleId) }, formData);
        message.success('添加成功');
        onFinish?.();
        return true;
      }}
    >
      <ProFormSelect
        label="用户"
        name="usernames"
        placeholder=""
        mode="multiple"
        showSearch
        fieldProps={{ loading: isLoading }}
        options={userOptions?.map((user) => ({
          label: user.username,
          value: user.username,
        }))}
        rules={[
          {
            required: true,
            message: '请选择用户',
          },
        ]}
      />
    </ModalForm>
  );
}
