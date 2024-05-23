import {
  taskCreateBackApiDepTasksBack,
  taskLatestUpgradeApiDepTasksLatest,
} from "@/services/dep/task"
import { useQuery } from "@tanstack/react-query"
import { Descriptions, List, Modal, message } from "antd"
import { useMemo } from "react"

export interface RollbackConfirmModalProps {
  open: boolean
  onCancel: VoidFunction
  env?: CMDB.EnvInfo
  onFinish?: VoidFunction
}

export default function RollbackConfirmModal({
  open,
  onCancel,
  env,
  onFinish,
}: RollbackConfirmModalProps) {
  const { data } = useQuery({
    queryKey: ["env-rollback-info", env],
    queryFn: () =>
      taskLatestUpgradeApiDepTasksLatest({ envId: env!.EnvId as string }),
    select: (res) => res.data,
    enabled: !!env,
  })

  const jenkins = useMemo(() => {
    const pipeline = env?.Pipline || "orch"

    return env?.EnvType === "all"
      ? `${pipeline}-rollback-ansible`
      : `${pipeline}-rollback`
  }, [env])

  return (
    <Modal
      title="创建回退任务"
      open={open}
      onCancel={onCancel}
      onOk={async () => {
        if (!data) {
          return
        }

        await taskCreateBackApiDepTasksBack({
          envId: env!.EnvId!,
          job: jenkins,
          taskType: "回退",
          package: data.package!,
          product: data.product!,
          toolsType: data.toolsType!,
          type: data.type!,
          taskBackId: data.taskBackId!,
        })

        message.success("创建回退任务成功")
        onCancel()
        onFinish?.()
        return true
      }}
    >
      {data && (
        <Descriptions
          items={[
            {
              key: "id",
              label: "回退任务ID",
              children: data.taskBackId,
            },
            {
              key: "product",
              label: "产品",
              children: data.product,
            },
            {
              key: "type",
              label: "类型",
              children: data.type,
            },
            {
              key: "toolsType",
              label: "代码类型",
              children: data.toolsType,
            },
            {
              key: "jenkins",
              label: "jenkins",
              children: jenkins,
            },
            {
              key: "packages",
              label: "依赖包",
              children: (
                <List
                  dataSource={data.package}
                  rowKey="repo"
                  renderItem={(item) => (
                    <List.Item>
                      <span>{item.repo}</span>
                      <span className="mx-2">-</span>
                      <span>{item.version}</span>
                    </List.Item>
                  )}
                />
              ),
            },
          ]}
          column={1}
        />
      )}
    </Modal>
  )
}
