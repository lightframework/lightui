import { useAccess } from "@umijs/max"
import { Result } from "antd"
import CertTable from "./_components/cert-table"

export default function Page() {
  const access = useAccess()

  if (!access.certPageListApiOpsCerts) {
    return (
      <Result status="403" title="403" subTitle="抱歉，你无权访问证书数据" />
    )
  }

  return <CertTable />
}
