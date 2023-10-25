import { useAccess, useParams } from "@umijs/max"
import { Result } from "antd"
import SecurityGroupTable from "./_components/security-group-table"

export default function SecurityGroups() {
  const access = useAccess()
  const { regionUid } = useParams()

  if (!access.securitygroupPageListApiCmdbSecuritygroups) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="抱歉，你无权访问云商安全组数据"
      />
    )
  }

  return <SecurityGroupTable regionUid={regionUid!} />
}
