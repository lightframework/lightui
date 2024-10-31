import { useAccess, useParams } from "@umijs/max"
import { Result } from "antd"
import TeamHostsTable from "./_components/team-hosts-table"

export default function TeamHosts() {
  const access = useAccess()
  const { teamId } = useParams()

  if (!access.getHostsByTeamApiCmdbHostsTeamable) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="抱歉，你无权访问角色成员数据"
      />
    )
  }

  return <TeamHostsTable teamId={Number.parseInt(teamId!)} />
}
