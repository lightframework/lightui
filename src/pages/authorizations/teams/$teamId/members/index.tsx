import { useAccess, useParams } from "@umijs/max"
import { Result } from "antd"
import TeamMemberTable from "./_components/team-member-table"

export default function TeamMembers() {
  const access = useAccess()
  const { teamId } = useParams()

  if (!access.teamMemListApiSysTeamsByIdusers) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="抱歉，你无权访问角色成员数据"
      />
    )
  }

  return <TeamMemberTable teamId={Number.parseInt(teamId!)} />
}
