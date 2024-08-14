import SyntaxHighlighter from "@/components/syntax-highlighter"
import { taskReadOneApiIbexByTasksid } from "@/services/ibex/tpl"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "@umijs/max"
import { Card, Tabs } from "antd"
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
        <Tabs
          items={[
            {
              key: "base",
              label: "基础信息",
              children: <TaskDetails task={data} />,
            },
            {
              key: "script",
              label: "脚本",
              children: (
                <SyntaxHighlighter language="bash" wrapLongLines allowCopy>
                  {data.meta?.script ?? ""}
                </SyntaxHighlighter>
              ),
            },
            {
              key: "hosts",
              label: "主机",
              children: <HostTable hosts={data.hosts} />,
            },
          ]}
        />
      )}
    </Card>
  )
}
