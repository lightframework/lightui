import Loading from "@/components/loading"
import { incidentPageListApiArgusIncidents } from "@/services/argus/incident"
import { useQuery } from "@tanstack/react-query"
import { Link, useParams } from "@umijs/max"
import { Breadcrumb, Card, Tabs } from "antd"
import Header from "./-components/header"
import IncidentAlertTable from "./-components/incident-alert-table"
import IncidentFlows from "./-components/incident-flows"

export default function Page() {
  const { id } = useParams()

  const { data: incident } = useQuery({
    queryKey: ["incident", id],
    queryFn: () =>
      incidentPageListApiArgusIncidents({ p: 1, limit: 99 }).then((res) =>
        res.data?.items?.find((item) => item.id === Number.parseInt(id!)),
      ),
  })

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
                children: <IncidentFlows incidentId={incident.id} />,
              },
              {
                key: "alerts",
                label: "关联告警",
                children: <IncidentAlertTable incidentId={incident.id} />,
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
