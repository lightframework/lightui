import {
  taskCreateApiIbexTasks,
  tplReadOneApiIbexByTplsid,
} from "@/services/ibex/tpl"
import { RollbackOutlined } from "@ant-design/icons"
import { useQuery } from "@tanstack/react-query"
import { history, useSearchParams } from "@umijs/max"
import { Button, Card } from "antd"
import TaskForm from "../_components/task-form"

export default function AddTask() {
  const [searchParams] = useSearchParams()
  const id = searchParams.get("tplId")

  const { data: tplData } = useQuery({
    queryKey: ["tpl", id],
    queryFn: () =>
      tplReadOneApiIbexByTplsid({ id: id!.toString() }).then(
        (res) => res.data?.data,
      ),
    enabled: !!id,
  })

  return (
    <Card
      title={
        <div>
          <Button
            type="text"
            icon={<RollbackOutlined />}
            className="mr-2"
            onClick={() => history.replace(id ? "/ibex/tpls" : "/ibex/tasks")}
          />
          创建任务
        </div>
      }
    >
      {!id || tplData ? (
        <TaskForm
          initialValues={tplData}
          onFinish={async (values) => {
            await taskCreateApiIbexTasks(values)
            history.replace("/ibex/tasks")
          }}
          disabledEditScript={tplData?.category === "standard"}
        />
      ) : null}
    </Card>
  )
}
