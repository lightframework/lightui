import { useAccess } from "@umijs/max"
import { Result } from "antd"
import ProjectTable from "./_components/project-table"

export default function Projects() {
  const access = useAccess()

  if (!access.projectPageListApiCmdbProjects) {
    return (
      <Result status="403" title="403" subTitle="抱歉，你无权访问项目数据" />
    )
  }

  return <ProjectTable />
}
