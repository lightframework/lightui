import { taskReadOneApiIbexByTasksid } from "@/services/ibex/tpl"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "@umijs/max"
import { Card, Divider, Typography } from "antd"
import ScriptInput from "../../_components/script-input"
import HostTable from "../_components/host-table"
import TaskDetails from "../_components/task-details"

export default function TaskDetailPage() {
  const { id } = useParams()

  const { data } = useQuery({
    queryKey: ["ibex-task", id],
    queryFn: () =>
      taskReadOneApiIbexByTasksid({ id: id! }).then((res) => res.data),
    refetchInterval: 3000,
  })

  return (
    <Card title={data?.meta?.title} classNames={{ body: "!pt-0" }}>
      {data && (
        <div className="mt-6">
          {[
            {
              key: "base",
              label: "基础信息",
              children: <TaskDetails task={data} />,
            },
            {
              key: "script",
              label: "脚本",
              children: <ScriptInput value={data.meta?.script} disabled />,
            },
            {
              key: "hosts",
              label: "主机",
              children: <HostTable hosts={data.hosts} />,
            },
          ].map((section, index) => (
            <>
              <div key={section.label} className="mt-3">
                <Typography.Title level={5} style={{ marginBottom: 20 }}>
                  {section.label}
                </Typography.Title>
                {section.children}
              </div>
              {index !== 2 && <Divider />}
            </>
          ))}
        </div>
      )}
    </Card>
  )
}
