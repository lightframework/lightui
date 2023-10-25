import Centered from "@/components/centered"
import { useQueryEnvOptions } from "@/lib/hooks/data"
import { Outlet, history, useAccess, useLocation, useParams } from "@umijs/max"
import { Result, Spin } from "antd"
import { useEffect } from "react"
import EnvList from "./_components/env-list"

function Envs() {
  const { envUid } = useParams()
  const { pathname } = useLocation()

  const { data: envOptions, status: envOptionsFetchStatus } =
    useQueryEnvOptions()

  useEffect(() => {
    if (pathname.endsWith("/envs") && envOptions && envOptions.length !== 0) {
      history.replace(`/ops/envs/${envOptions[0].Uid}`)
    }
  }, [envOptions, pathname])

  if (envOptionsFetchStatus === "pending") {
    return (
      <Centered>
        <Spin />
      </Centered>
    )
  }

  if (envOptionsFetchStatus === "error") {
    return <Result status="500" title="抱歉，请求环境资源失败" />
  }

  return (
    <div className="flex h-full w-full gap-x-3">
      <EnvList envs={envOptions} />

      {envOptions.length === 0 ? (
        <Result title="暂无任何环境信息" subTitle="请先添加环境" />
      ) : envUid ? (
        <div className="h-full w-full overflow-x-auto">
          {envOptions.find((env) => env.Uid === envUid) ? (
            <Outlet />
          ) : (
            <Result
              status="404"
              title="404"
              subTitle={`抱歉，未找到环境：${envUid}`}
            />
          )}
        </div>
      ) : null}
    </div>
  )
}

export default function AuthEnvs() {
  const access = useAccess()

  if (!access.envOptionsApiCmdbEnvsOptions) {
    return (
      <Result status="403" title="403" subTitle="抱歉，你无权访问环境数据" />
    )
  }

  return <Envs />
}
