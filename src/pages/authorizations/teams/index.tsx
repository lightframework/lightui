import Centered from "@/components/centered"
import { useQueryTeamList } from "@/lib/hooks/data"
import { Outlet, history, useAccess, useLocation, useParams } from "@umijs/max"
import { Result, Segmented, Spin } from "antd"
import { useEffect } from "react"
import TeamList from "./_components/team-list"

function Teams() {
  const { teamId } = useParams()
  const { pathname } = useLocation()

  const { data: teamOptions, status: teamOptionsFetchStatus } =
    useQueryTeamList()

  useEffect(() => {
    if (
      pathname.endsWith("/teams") &&
      teamOptions &&
      teamOptions.length !== 0
    ) {
      history.replace(`/authorizations/teams/${teamOptions[0].id}/members`)
    }
  }, [teamOptions, pathname])

  if (teamOptionsFetchStatus === "pending") {
    return (
      <Centered>
        <Spin />
      </Centered>
    )
  }

  if (teamOptionsFetchStatus === "error") {
    return <Result status="500" title="抱歉，请求团队资源失败" />
  }

  return (
    <div className="flex h-full w-full gap-x-3">
      <TeamList teams={teamOptions} />

      {teamOptions.length === 0 ? (
        <Result title="暂无任何团队信息" subTitle="请先添加团队" />
      ) : teamId ? (
        teamOptions.find((team) => String(team.id) === teamId) ? (
          <div className="h-full w-full space-y-3 overflow-x-auto">
            <Segmented
              block
              defaultValue={pathname.split("/").at(-1)}
              options={[
                { label: "团队成员", value: "members" },
                { label: "环境列表", value: "envs" },
                { label: "主机列表", value: "hosts" },
              ]}
              onChange={(v) => {
                const segments = pathname.split("/")
                segments[segments.length - 1] = String(v)
                history.replace(segments.join("/"))
              }}
            />

            <Outlet />
          </div>
        ) : (
          <Result
            status="404"
            title="404"
            subTitle={`抱歉，未找到团队：${teamId}`}
          />
        )
      ) : null}
    </div>
  )
}

export default function AuthTeam() {
  const access = useAccess()

  if (!access.teamListApiSysTeams) {
    return (
      <Result status="403" title="403" subTitle="抱歉，你无权访问团队数据" />
    )
  }

  return <Teams />
}
