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
        if (!data || data.taskBackId === 0) {
          onCancel()
          return true
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
      {data &&
        (data.taskBackId === 0 ? (
          <span>该环境没有找到可回退的任务ID，无法进行回退。</span>
        ) : (
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
              ...(data.type === "SM"
                ? [
                    {
                      key: "installMonitor",
                      label: "安装监控",
                      children: (data as DEP.TaskCreateCrypReq).installMonitor
                        ? "是"
                        : "否",
                    },
                    {
                      key: "setDomain",
                      label: "设置域名",
                      children: (data as DEP.TaskCreateCrypReq).setDomain
                        ? "是"
                        : "否",
                    },
                    {
                      key: "installMonitor",
                      label: "安装监控",
                      children: (data as DEP.TaskCreateCrypReq).installMonitor
                        ? "是"
                        : "否",
                    },
                    {
                      key: "cmnSetKeepalived",
                      label: "cmnSetKeepalived",
                      children: (data as DEP.TaskCreateCrypReq).cmnSetKeepalived
                        ? "是"
                        : "否",
                    },
                    {
                      key: "csdpSetKeepalived",
                      label: "csdpSetKeepalived",
                      children: (data as DEP.TaskCreateCrypReq)
                        .csdpSetKeepalived
                        ? "是"
                        : "否",
                    },
                    {
                      key: "osmSetKeepalived",
                      label: "osmSetKeepalived",
                      children: (data as DEP.TaskCreateCrypReq).osmSetKeepalived
                        ? "是"
                        : "否",
                    },
                  ]
                : []),
              {
                key: "packages",
                label: "依赖包",
                children: (
                  <List
                    dataSource={data.package}
                    rowKey="repo"
                    renderItem={(item) => (
                      <List.Item>
                        <div>
                          <div>repo: {item.repo}</div>
                          <List
                            className="pl-4"
                            dataSource={item.module}
                            rowKey="moduleName"
                            renderItem={(item) => (
                              <List.Item>
                                <span>module: {item.moduleName}</span>
                                <span className="mx-2">-</span>
                                <span>version: {item.version}</span>
                              </List.Item>
                            )}
                          />
                        </div>
                      </List.Item>
                    )}
                  />
                ),
              },
            ]}
            column={1}
          />
        ))}
    </Modal>
  )
}
