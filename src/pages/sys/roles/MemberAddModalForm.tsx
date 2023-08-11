import DebounceSelect from '@/components/ui/form/DebounceSelect';
import { ModalCreateFormWithParams } from '@/components/ui/form/modal-form/ModalCreateForm';
import { roleMemAddApiSysRolesByIdusers } from '@/services/sys/role';
import { userOptionsApiSysUsersOptions } from '@/services/sys/user';
import { Button, Form } from 'antd';

export default function MemberAddModalForm({
  roleId,
  onFinish,
}: {
  roleId: number;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalCreateFormWithParams<
      API.RoleMemAddReq,
      API.roleMemAddApiSysRolesByIdusersParams
    >
      title="添加成员"
      onFinish={onFinish}
      trigger={<Button type="primary">添加成员</Button>}
      requestParams={{ id: String(roleId) }}
      request={roleMemAddApiSysRolesByIdusers}
    >
      <Form.Item label="成员用户名" name="usernames">
        <DebounceSelect<{
          label: string;
          value: string;
        }>
          mode="multiple"
          placeholder="请输入用户名搜索"
          fetchOptions={async (username) => {
            const res = await userOptionsApiSysUsersOptions({
              keywords: username,
            });

            const userOptions = res.data?.list
              ? res.data.list
                  .filter((user) => user.username.includes(username))
                  .map((user) => ({
                    label: user.username,
                    value: user.username,
                  }))
              : [];

            return userOptions;
          }}
        />
      </Form.Item>
    </ModalCreateFormWithParams>
  );
}
