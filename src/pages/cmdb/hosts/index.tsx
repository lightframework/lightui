import { useAccess, useSearchParams } from "@umijs/max"
import { Result } from "antd"
import HostCategoriesTreeList from "./_components/host-categories-tree-list"
import HostTable from "./_components/host-table"

function Hosts() {
  const access = useAccess()
  const [searchParams] = useSearchParams()
  const path = searchParams.get("path") ?? undefined

  return (
    <div className="flex h-full w-full gap-x-3">
      <HostCategoriesTreeList />

      <div className="h-full w-full overflow-x-auto">
        {access.hostPageListApiCmdbHosts ? (
          <HostTable path={path} />
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

  if (!access.nodeRuleOptionsApiCmdbNoderulesOptions) {
    return (
      <Result status="403" title="403" subTitle="抱歉，你无权访问主机数据" />
    )
  }

  return <Hosts />
}
