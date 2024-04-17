import { useAccess } from "@umijs/max"
import { Result } from "antd"
import IncidentTable from "./-components/incident-table"

export default function Page() {
  const access = useAccess()

  if (!access.incidentPageListApiArgusIncidents) {
    return (
      <Result status="403" title="403" subTitle="抱歉，你无权访问故障数据" />
    )
  }

  return <IncidentTable />
}
