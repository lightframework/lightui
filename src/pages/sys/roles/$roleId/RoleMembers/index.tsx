import { history, useAccess } from '@umijs/max';
import { Button, Result } from 'antd';
import RoleInfo from './RoleInfo';
import RoleMemberTable from './RoleMemberTable';

export default function RoleMembers() {
  const access = useAccess();

  return (
    <div className="space-y-3">
      {(access as any).roleReadOneApiSysRolesById && <RoleInfo />}
      {(access as any).roleMemListApiSysRolesByIdusers ? (
        <RoleMemberTable />
      ) : (
        <Result
          status="403"
          title="403"
          subTitle="抱歉，你无权访问角色成员数据"
          extra={
            <Button type="primary" onClick={() => history.replace('/')}>
              返回首页
            </Button>
          }
        />
      )}
    </div>
  );
}
