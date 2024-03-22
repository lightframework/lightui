import { useAccess } from "@umijs/max"
import { Result } from "antd"
import TacticGrid from "./-components/tactic-grid"

export default function Page() {
  const access = useAccess()

  if (!access.tacticItemsApiArgusTactics) {
    return (
      <Result status="403" title="403" subTitle="抱歉，你无权访问策略数据" />
    )
  }

  return <TacticGrid />
}
