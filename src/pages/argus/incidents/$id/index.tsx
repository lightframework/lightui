import Loading from "@/components/loading"
import { incidentReadOneApiArgusIncidentsById } from "@/services/argus/incident"
import { useQuery } from "@tanstack/react-query"
import { Link, useAccess, useParams } from "@umijs/max"
import { Breadcrumb, Card, Result, Tabs } from "antd"
import Header from "./-components/header"
import IncidentAlertTable from "./-components/incident-alert-table"
import IncidentFlows from "./-components/incident-flows"

export default function Page() {
  const { id } = useParams()
  const access = useAccess()

  const { data: incident } = useQuery({
    queryKey: ["incident", id],
    queryFn: () =>
      incidentReadOneApiArgusIncidentsById({ id: id! }).then(
        (res) => res.data?.data,
      ),
    enabled: !!access.incidentReadOneApiArgusIncidentsById,
  })

  if (!access.incidentReadOneApiArgusIncidentsById) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="抱歉，你无权访问故障详情数据"
      />
    )
  }

  return (
    <Card
      className="h-full w-full overflow-auto"
      size="small"
      classNames={{ body: "flex h-full flex-col overflow-auto gap-3" }}
    >
      <Breadcrumb
        items={[
          {
            title: <Link to="/argus/incidents">故障列表</Link>,
          },
          {
            title: "故障详情",
          },
        ]}
      />

      {incident ? (
        <>
          <Header incident={incident} />
          <Tabs
            defaultActiveKey="flows"
            items={[
              {
                key: "flows",
                label: "时间线",
                children: access.incidentFlowsApiArgusIncidentsByIdflows ? (
                  <IncidentFlows incidentId={incident.id} />
                ) : (
                  <Result
                    status="403"
                    title="403"
                    subTitle="抱歉，你无权访问故障时间线数据"
                  />
                ),
              },
              {
                key: "alerts",
                label: "关联告警",
                children: access.incidentAlertsApiArgusIncidentsByIdalerts ? (
                  <IncidentAlertTable incidentId={incident.id} />
                ) : (
                  <Result
                    status="403"
                    title="403"
                    subTitle="抱歉，你无权访问故障关联告警数据"
                  />
                ),
              },
            ]}
          />
        </>
      ) : (
        <Loading />
      )}
    </Card>
  )
}
