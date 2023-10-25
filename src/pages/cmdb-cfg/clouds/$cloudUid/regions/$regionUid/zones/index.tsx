import { useAccess, useParams } from "@umijs/max"
import { Result } from "antd"
import ZoneTable from "./_components/zone-table"

export default function Zones() {
  const access = useAccess()
  const { regionUid } = useParams()

  if (!access.zonePageListApiCmdbZones) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="抱歉，你无权访问云商可用区数据"
      />
    )
  }

  return <ZoneTable regionUid={regionUid!} />
}
