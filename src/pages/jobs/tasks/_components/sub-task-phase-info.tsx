import Centered from "@/components/centered"
import { dictGet, subTaskStatusDict } from "@/constants/dict"
import { useToken } from "@/lib/hooks/use-token"
import {
  phaseRunApiOpsByPhasesid,
  subTaskPhaseListApiOpsBySubtasksidphases,
} from "@/services/ops/task"
import {
  ExclamationCircleFilled,
  RedoOutlined,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons"
import { ProDescriptions } from "@ant-design/pro-components"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useAccess } from "@umijs/max"
import { Button, Modal, Spin, Tag, Timeline, Tooltip, message } from "antd"
import { useState } from "react"
import ManualProgressModalForm from "./manual-progress-modal-form"
import StdStringDisplayModal from "./std-string-display-modal"

export default function SubTaskPhaseInfo({
  selectedSubTask,
}: {
  selectedSubTask: OPS.SubTaskInfo
}) {
  const { token } = useToken()
  const access = useAccess()
  const queryClient = useQueryClient()
  const [modal, contextHolder] = Modal.useModal()

  const { data, refetch, isPending } = useQuery({
    queryKey: ["sub-task-phase", selectedSubTask.id],
    queryFn: () =>
      subTaskPhaseListApiOpsBySubtasksidphases({
        id: String(selectedSubTask.id),
      }),
    refetchInterval: 2000,
  })

  const [selectedStdinPhase, setSelectedStdinPhase] = useState<
    OPS.PhaseInfo | undefined
  >()
  const [selectedStdoutPhase, setSelectedStdoutPhase] = useState<
    OPS.PhaseInfo | undefined
  >()

  const phases = data?.data?.list ?? []

  if (isPending) {
    return (
      <Centered>
        <Spin />
      </Centered>
    )
  }

  return (
    <div className="relative">
      {contextHolder}
      <div className="sticky top-0 z-50 mb-5 flex items-center justify-between bg-white">
        <div className="flex items-center gap-x-3">
          <h3 className="mb-0 text-sm font-semibold">子任务执行步骤 </h3>

          {phases.every((phase) => phase.status === "Compleated") && (
            <Tag color={token.colorSuccess}>已完成</Tag>
          )}
        </div>

        <Tooltip title="手动刷新，默认每2秒自动刷新">
          <Button
            type="default"
            icon={<SyncOutlined />}
            onClick={async () => {
              await Promise.all([
                refetch(),
                queryClient.invalidateQueries({ queryKey: ["sub-tasks"] }),
              ])
              message.success("刷新成功")
            }}
          />
        </Tooltip>
      </div>

      <Timeline
        items={phases.map((phase, index) => ({
          color:
            phase.status === "Compleated"
              ? "green"
              : phase.status === "Failed"
              ? "red"
              : "blue",
          children: (
            <ProDescriptions
              key={phase.id}
              title={`${index + 1}. ${phase.name}`}
              className="space-y-3"
              column={2}
              extra={
                <div className="flex gap-x-1">
                  {phase.retry && (
                    <Tooltip title="重试">
                      <Button
                        type="default"
                        icon={<RedoOutlined />}
                        disabled={!access.phaseRunApiOpsByPhasesid}
                        onClick={() => {
                          modal.confirm({
                            title: `确定要重试 ${phase.name} ？`,
                            icon: <ExclamationCircleFilled />,
                            onOk: async () => {
                              await phaseRunApiOpsByPhasesid({
                                id: String(phase.id),
                              })
                              message.success("已重试")
                              refetch()
                              queryClient.invalidateQueries({
                                queryKey: ["sub-tasks"],
                              })
                            },
                          })
                        }}
                      />
                    </Tooltip>
                  )}

                  {phase.status === "InManualProgress" && (
                    <ManualProgressModalForm
                      title={`手动执行 步骤${index + 1}（${phase.name}）`}
                      phaseId={phase.id}
                      onFinish={() => {
                        refetch()
                        queryClient.invalidateQueries({
                          queryKey: ["sub-tasks"],
                        })
                      }}
                    />
                  )}

                  {phase.confirm && (
                    <Button
                      type="primary"
                      onClick={() => message.info("暂未实现")}
                    >
                      确认
                    </Button>
                  )}
                </div>
              }
            >
              <ProDescriptions.Item label="执行次数">
                {phase.runTimes}
              </ProDescriptions.Item>
              <ProDescriptions.Item
                label="当前状态"
                contentStyle={{
                  color: dictGet(phase.status, subTaskStatusDict)?.borderColor,
                }}
              >
                {phase.status}
              </ProDescriptions.Item>
              <ProDescriptions.Item label="开始时间" valueType="dateTime">
                {phase.started}
              </ProDescriptions.Item>
              <ProDescriptions.Item label="结束时间" valueType="dateTime">
                {phase.finished}
              </ProDescriptions.Item>
              <ProDescriptions.Item label="标准输入">
                <Button
                  type="link"
                  size="small"
                  onClick={() => setSelectedStdinPhase(phase)}
                >
                  <span>查看</span>
                  <SearchOutlined />
                </Button>
              </ProDescriptions.Item>
              <ProDescriptions.Item label="标准输出">
                <Button
                  type="link"
                  size="small"
                  onClick={() => setSelectedStdoutPhase(phase)}
                >
                  <span>查看</span>
                  <SearchOutlined />
                </Button>
              </ProDescriptions.Item>
              {phase.message && (
                <ProDescriptions.Item
                  label="消息"
                  contentStyle={{ color: "red" }}
                  span={2}
                >
                  {phase.message}
                </ProDescriptions.Item>
              )}
            </ProDescriptions>
          ),
        }))}
      />

      <StdStringDisplayModal
        title={`${selectedStdinPhase?.name} - 标准输入`}
        open={selectedStdinPhase !== undefined}
        onCancel={() => setSelectedStdinPhase(undefined)}
        content={selectedStdinPhase?.stdin}
      />
      <StdStringDisplayModal
        title={`${selectedStdoutPhase?.name} - 标准输出`}
        open={selectedStdoutPhase !== undefined}
        onCancel={() => setSelectedStdoutPhase(undefined)}
        content={selectedStdoutPhase?.stdout}
      />
    </div>
  )
}
