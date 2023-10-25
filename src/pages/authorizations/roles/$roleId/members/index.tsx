import { useAccess, useParams } from "@umijs/max"
import { Result } from "antd"
import RoleMemberTable from "./_components/role-member-table"

export default function RoleMembers() {
  const access = useAccess()
  const { roleId } = useParams()

  if (!access.roleMemListApiSysRolesByIdusers) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="抱歉，你无权访问角色成员数据"
      />
    )
  }

  return <RoleMemberTable roleId={Number.parseInt(roleId!)} />
}
