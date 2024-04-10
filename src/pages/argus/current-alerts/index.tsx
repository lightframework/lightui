import Centered from "@/components/centered"
import { useQueryAggrViewsOptions } from "@/lib/hooks/data"
import { Outlet, history, useAccess, useLocation, useParams } from "@umijs/max"
import { Result, Spin } from "antd"
import { useEffect } from "react"
import AggrViewList from "./_components/aggr-view-list"

function CurrentAlerts() {
  const { rule } = useParams()

  const { pathname } = useLocation()

  const { data: aggrViews, status: AggrViewsFetchStatus } =
    useQueryAggrViewsOptions()

  useEffect(() => {
    if (
      pathname.endsWith("/current-alerts") &&
      aggrViews &&
      aggrViews.length !== 0
    ) {
      history.replace(`/argus/current-alerts/${aggrViews[0].rule}`)
    }
  }, [aggrViews, pathname])

  if (AggrViewsFetchStatus === "pending") {
    return (
      <Centered>
        <Spin />
      </Centered>
    )
  }

  if (AggrViewsFetchStatus === "error") {
    return <Result status="500" title="抱歉，请求部门资源失败" />
  }

  return (
    <div className="flex h-full w-full gap-x-3">
      <AggrViewList views={aggrViews} />

      {aggrViews.length === 0 ? (
        <Result title="暂无任何聚合规则" subTitle="请先添加规则" />
      ) : rule ? (
        aggrViews.find((view) => view.rule === rule) ? (
          <Outlet />
        ) : (
          <Result
            status="404"
            title="404"
            subTitle={`抱歉，未找到规则：${rule}`}
          />
        )
      ) : null}
    </div>
  )
}

export default function AuthCurrentAlerts() {
  const access = useAccess()

  if (!access["alertAggrViewItemsApiArgusAlert-aggr-views"]) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="抱歉，你无权访问活跃告警数据"
      />
    )
  }

  return <CurrentAlerts />
}
