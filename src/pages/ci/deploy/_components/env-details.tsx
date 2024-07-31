import { Descriptions, Divider } from "antd"
import clsx from "clsx"

export interface EnvDetailsProps {
  env: CMDB.EnvInfo
  padding?: boolean
}

export default function EnvDetails({ env, padding = true }: EnvDetailsProps) {
  return (
    <>
      <Descriptions
        items={[
          {
            key: "name",
            label: "环境名称",
            children: env.EnvName,
          },
          {
            key: "id",
            label: "环境ID",
            children: env.EnvId,
          },
          {
            key: "key",
            label: "环境Key",
            children: env.EnvKey,
          },
          {
            key: "osType",
            label: "Orch处理器架构",
            children: env.OsType,
          },
          {
            key: "envType",
            label: "Orch部署架构",
            children: env.EnvType,
          },
          {
            key: "language",
            label: "Orch语言",
            children: env.EnvLanguage,
          },
        ]}
        className={clsx("mt-2", padding && "ml-8")}
        contentStyle={{ fontWeight: 700, color: "red" }}
      />
      <Divider />
    </>
  )
}
