import { useAccess, useParams } from '@umijs/max';
import { Result } from 'antd';
import AuthorizationTable from './_components/authorization-table';

export default function RoleAuthorizations() {
  const access = useAccess();
  const { roleId } = useParams();

  if (!access.roleAuthListApiSysRolesByIdauth) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="抱歉，你无权访问角色权限数据"
      />
    );
  }

  return <AuthorizationTable roleId={Number.parseInt(roleId!)} />;
}
