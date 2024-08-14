import { useAccess } from "@umijs/max"
import { Result } from "antd"
import TplTable from "./_components/tpl-table"

export default function Tpls() {
  const access = useAccess()

  if (!access.tplListApiIbexTpls) {
    return (
      <Result status="403" title="403" subTitle="抱歉，你无权访问脚本数据" />
    )
  }

  return <TplTable />
}
