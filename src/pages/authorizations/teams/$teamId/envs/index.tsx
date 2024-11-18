import { useAccess, useParams } from "@umijs/max"
import { Result } from "antd"
import TeamHostsTable from "./_components/team-envs-table"

export default function TeamHosts() {
  const access = useAccess()
  const { teamId } = useParams()

  if (!access.TeamPermUpdateApiSysTeamsByIdperms) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="抱歉，你无权访问团队环境资源"
      />
    )
  }

  return <TeamHostsTable teamId={Number.parseInt(teamId!)} />
}
