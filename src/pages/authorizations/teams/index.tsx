import { Outlet, history, useAccess, useLocation, useParams } from "@umijs/max"
import { Result, Segmented } from "antd"
import TeamTree from "./_components/team-tree"

function Teams() {
  const { teamId } = useParams()
  const { pathname } = useLocation()

  return (
    <div className="flex h-full w-full gap-x-3">
      <TeamTree />

      {teamId && (
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
      )}
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
