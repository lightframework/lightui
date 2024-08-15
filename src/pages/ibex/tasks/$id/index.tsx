import { useLocalStorageState } from "@/lib/hooks/use-local-storage-state"
import { taskReadOneApiIbexByTasksid } from "@/services/ibex/tpl"
import { RollbackOutlined, SyncOutlined } from "@ant-design/icons"
import { useQuery } from "@tanstack/react-query"
import { history, useParams } from "@umijs/max"
import { Button, Card, Divider, Select, Space, Tooltip, Typography } from "antd"
import ScriptInput from "../../_components/script-input"
import HostTable from "../_components/host-table"
import TaskDetails from "../_components/task-details"

export default function TaskDetailPage() {
  const { id } = useParams()

  const [refetchInterval, setRefetchInterval] = useLocalStorageState<
    false | number
  >("tpl-task-fetch-interval", false)

  const { data, refetch } = useQuery({
    queryKey: ["ibex-task", id],
    queryFn: () =>
      taskReadOneApiIbexByTasksid({ id: id! }).then((res) => res.data),
    refetchInterval,
  })

  return (
    <Card
      title={
        <div className="flex items-center gap-2">
          <Button
            type="text"
            icon={<RollbackOutlined />}
            onClick={() => history.replace("/ibex/tasks")}
          />
          {data?.meta?.title}
          <Space.Compact className="ml-auto">
            <Tooltip title="手动刷新">
              <Button icon={<SyncOutlined />} onClick={() => refetch()} />
            </Tooltip>
            <Select
              value={refetchInterval}
              style={{ width: 56 }}
              onChange={(value) => setRefetchInterval(value)}
              options={[
                {
                  label: "off",
                  value: false,
                },
                {
                  label: "3s",
                  value: 3 * 1000,
                },
                {
                  label: "5s",
                  value: 5 * 1000,
                },
                {
                  label: "10s",
                  value: 10 * 1000,
                },
                {
                  label: "30s",
                  value: 30 * 1000,
                },
                {
                  label: "60s",
                  value: 60 * 1000,
                },
              ]}
            />
          </Space.Compact>
        </div>
      }
      classNames={{ body: "!pt-0" }}
    >
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
