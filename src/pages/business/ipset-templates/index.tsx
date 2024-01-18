import { useAccess } from "@umijs/max"
import { Result } from "antd"
import IpsetTemplateTable from "./_components/ipset-template-table"

export default function Page() {
  const access = useAccess()

  if (!access.ipsetTemplatePageListApiOpsIpsetsTemplates) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="抱歉，你无权访问ipset模板数据"
      />
    )
  }

  return <IpsetTemplateTable />
}
