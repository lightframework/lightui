import { useAccess, useSearchParams } from "@umijs/max"
import { Result } from "antd"
import TacticTable from "./-components/tactic-table"

export default function Page() {
  const access = useAccess()
  const [searchParams] = useSearchParams()
  const id = Number.parseInt(searchParams.get("id") ?? "")

  if (!access.tacticItemsApiArgusTactics) {
    return (
      <Result status="403" title="403" subTitle="抱歉，你无权访问策略数据" />
    )
  }

  return <TacticTable initialTacticId={isNaN(id) ? undefined : id} />
}
