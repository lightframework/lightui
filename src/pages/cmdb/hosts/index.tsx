import { useAccess, useSearchParams } from "@umijs/max"
import { Result } from "antd"
import DimensionTreeList from "./_components/dimension-tree-list"
import HostTable from "./_components/host-table"

function Hosts() {
  const access = useAccess()
  const [searchParams] = useSearchParams()
  const hostType = searchParams.get("hostType") ?? undefined
  const envId = searchParams.get("envId") ?? undefined

  return (
    <div className="flex h-full w-full gap-x-3">
      <DimensionTreeList />

      <div className="h-full w-full overflow-x-auto">
        {access.hostPageListApiCmdbHosts ? (
          <HostTable hostType={hostType} envId={envId} />
        ) : (
          <Result
            status="403"
            title="403"
            subTitle="抱歉，你无权访问主机数据"
          />
        )}
      </div>
    </div>
  )
}

export default function AuthHosts() {
  const access = useAccess()

  if (
    !access.envHostTypeTreeApiCmdbHostsEnvhosttype ||
    !access.hostTypeEnvTreeApiCmdbHostsHosttypeenv
  ) {
    return (
      <Result status="403" title="403" subTitle="抱歉，你无权访问主机数据" />
    )
  }

  return <Hosts />
}
