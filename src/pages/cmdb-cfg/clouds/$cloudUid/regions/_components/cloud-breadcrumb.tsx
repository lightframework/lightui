import { Link } from "@umijs/max"
import { Breadcrumb } from "antd"

export default function CloudBreadcrumb({ cloudName }: { cloudName: string }) {
  return (
    <Breadcrumb
      items={[
        {
          title: "资源管理",
        },
        {
          title: <Link to="/cmdb-cfg/clouds">云商管理</Link>,
        },
        {
          title: cloudName,
        },
      ]}
    />
  )
}
