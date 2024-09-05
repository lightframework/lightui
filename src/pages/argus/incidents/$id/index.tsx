import Loading from "@/components/loading"
import { incidentReadOneApiArgusIncidentsById } from "@/services/argus/incident"
import { SyncOutlined } from "@ant-design/icons"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Link, useAccess, useParams } from "@umijs/max"
import {
  Breadcrumb,
  Button,
  Card,
  Result,
  Select,
  Space,
  Spin,
  Tabs,
  Tooltip,
} from "antd"
import { useAtom } from "jotai"
import { refetchIntervalAtom } from "./-atoms"
import Header from "./-components/header"
import IncidentAlertTable from "./-components/incident-alert-table"
import IncidentFlows from "./-components/incident-flows"

export default function Page() {
  const { id } = useParams()
  const access = useAccess()
  const queryClient = useQueryClient()
  const [refetchInterval, setRefetchInterval] = useAtom(refetchIntervalAtom)

  const { data: incident, isFetching } = useQuery({
    queryKey: ["incident", id],
    queryFn: () =>
      incidentReadOneApiArgusIncidentsById({ id: id! }).then(
        (res) => res.data?.data,
      ),
    enabled: !!access.incidentReadOneApiArgusIncidentsById,
    refetchInterval,
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
      classNames={{
        body: "flex h-full w-full flex-col overflow-auto gap-3 relative",
      }}
    >
      <div className="flex justify-between">
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
        <Space.Compact key="refetch-interval">
          <Tooltip title="手动刷新">
            <Button
              icon={<SyncOutlined />}
              onClick={() => {
                queryClient.invalidateQueries({ queryKey: ["incident"] })
                queryClient.invalidateQueries({ queryKey: ["incident-alerts"] })
                queryClient.invalidateQueries({ queryKey: ["incident-flows"] })
              }}
            />
          </Tooltip>
          <Select
            value={refetchInterval}
            style={{ width: 56 }}
            onChange={(value) => setRefetchInterval(value)}
            options={[
              {
                label: "off",
                value: false,
              },

              {
                label: "5s",
                value: 5 * 1000,
              },
              {
                label: "10s",
                value: 10 * 1000,
              },
              {
                label: "30s",
                value: 30 * 1000,
              },
              {
                label: "60s",
                value: 60 * 1000,
              },
            ]}
          />
        </Space.Compact>
      </div>

      {isFetching && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spin />
        </div>
      )}

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
                  <IncidentFlows incidentId={Number(id)} />
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
                  <IncidentAlertTable
                    incidentId={Number(id)}
                    refetchInterval={refetchInterval}
                  />
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
