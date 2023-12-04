import Centered from "@/components/centered"
import StdStringDisplayModal from "@/components/std-string-display-modal"
import { dictGet, subTaskStatusDict } from "@/constants/dict"
import { useToken } from "@/lib/hooks/use-token"
import {
  phaseConfirmApiOpsByPhasesidconfirm,
  phaseRunApiOpsByPhasesid,
  subTaskPhaseListApiOpsBySubtasksidphases,
} from "@/services/ops/task"
import {
  ExclamationCircleFilled,
  QuestionCircleOutlined,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons"
import { ProDescriptions } from "@ant-design/pro-components"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useAccess, useModel } from "@umijs/max"
import {
  Button,
  Modal,
  Select,
  Spin,
  Tag,
  Timeline,
  Tooltip,
  message,
} from "antd"
import { useEffect, useState } from "react"
import Markdown from "react-markdown"
import CreateInstanceManualProgressModalForm from "./create-instance-manual-progress-modal-form"
import ManualProgressModalForm from "./manual-progress-modal-form"

const TipMd =
  "#### 重试（子任务）：\r\n\
当子任务的retry字段是true时，允许重新配置资源信息，重新执行任务流程。\r\n\
> 注：允许子任务重试的两种情况：\r\n\
* 实例 `未成功创建`：因为某些原因，例如：所选机型库存不足、子网ip不足等，导致所选配置无法开通实例，此情况可以直接修改配置信息并重试。\r\n\
* 实例 `创建成功`：网卡添加失败（添加网卡时，刚好没有足够的子网ip可以分配），此情况需要先去云商手动删除相关实例后再重新执行流水线。\r\n\
\r\n\
#### 重试（步骤）:\r\n\
重新执行当前步骤。\r\n\
#### 填入InstanId:\r\n\
当所选云商`支持API`，但由于不可控原因无法在平台完成创建实例操作时，支持手动录入实例ID，继续后续流程。\r\n\
#### 信息录入:\r\n\
不支持API的云商，需要手动填入实例信息。\r\n\
> 注：支持Api的云商不需要信息录入，直接点击重试即可自动同步。"

export default function SubTaskPhaseInfo({
  selectedSubTask,
  refetchInterval,
  setRefetchInterval,
}: {
  selectedSubTask: OPS.SubTaskInfo
  refetchInterval: number | false
  setRefetchInterval: (value: number | false) => void
}) {
  const [loading, setLoading] = useState(false)
  const { token } = useToken()
  const access = useAccess()

  const { initialState, setInitialState } = useModel("@@initialState")
  const user = initialState?.currentUser

  const queryClient = useQueryClient()

  const [modal, contextHolder] = Modal.useModal()

  const { data, refetch, isPending, isFetching } = useQuery({
    queryKey: ["sub-task-phase", selectedSubTask.id],
    queryFn: () =>
      subTaskPhaseListApiOpsBySubtasksidphases({
        id: String(selectedSubTask.id),
      }),
    refetchInterval: refetchInterval,
  })

  const [selectedStdinPhase, setSelectedStdinPhase] = useState<
    OPS.PhaseInfo | undefined
  >()
  const [selectedStdoutPhase, setSelectedStdoutPhase] = useState<
    OPS.PhaseInfo | undefined
  >()

  const phases = data?.data?.list ?? []

  useEffect(() => {
    if (isFetching) {
      setLoading(true)
      setTimeout(() => setLoading(false), 1000)
    }
  }, [isFetching])

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

          {loading && (
            <span className="text-[rgba(0,0,0,.45)]">自动加载中...</span>
          )}
        </div>

        <div>
          <Button
            type="text"
            className="text-[rgba(0,0,0,.45)]"
            onClick={() =>
              modal.info({
                width: 600,
                icon: <ExclamationCircleFilled style={{ color: "#faad14" }} />,
                title: "子任务及其步骤详细信息",
                content: (
                  <div className="mt-2 [&_blockquote]:italic [&_h4]:font-semibold">
                    <Markdown>{TipMd}</Markdown>
                  </div>
                ),
                okText: "确认",
              })
            }
          >
            <QuestionCircleOutlined />
            提示
          </Button>

          <Tooltip title="手动刷新">
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
          <Select
            value={refetchInterval}
            style={{ width: 56 }}
            loading={loading}
            onChange={(value) => setRefetchInterval(value)}
            options={[
              {
                label: "off",
                value: false,
              },
              {
                label: "2s",
                value: 2 * 1000,
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
                label: "20s",
                value: 20 * 1000,
              },
              {
                label: "30s",
                value: 30 * 1000,
              },
            ]}
          />
        </div>
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
                  {(phase.retry || user?.username === "lightops") && (
                    <Button
                      disabled={!access.phaseRunApiOpsByPhasesid}
                      onClick={() => {
                        modal.confirm({
                          title: `确定要重试 ${phase.name} ？`,
                          icon: <ExclamationCircleFilled />,
                          onOk: async () => {
                            await phaseRunApiOpsByPhasesid(
                              {
                                id: String(phase.id),
                              },
                              {},
                            )
                            message.success("已重试")
                            refetch()
                            queryClient.invalidateQueries({
                              queryKey: ["sub-tasks"],
                            })
                          },
                        })
                      }}
                    >
                      重试
                    </Button>
                  )}

                  {phase.status === "Confirm" && (
                    <Button
                      disabled={!access.phaseConfirmApiOpsByPhasesidconfirm}
                      onClick={async () => {
                        modal.confirm({
                          title: `确定要确认步骤 ${phase.name} 吗？`,
                          icon: <ExclamationCircleFilled />,
                          onOk: async () => {
                            await phaseConfirmApiOpsByPhasesidconfirm({
                              id: String(phase.id),
                            })
                            message.success("手动确认成功")
                          },
                        })
                      }}
                    >
                      确认
                    </Button>
                  )}

                  {phase.type === "CreateInstance" &&
                    phase.status !== "Compleated" && (
                      <CreateInstanceManualProgressModalForm
                        title={`填入InstanceId 步骤${index + 1}（${
                          phase.name
                        }）`}
                        phaseId={phase.id}
                        onFinish={() => {
                          refetch()
                          queryClient.invalidateQueries({
                            queryKey: ["sub-tasks"],
                          })
                        }}
                      />
                    )}

                  {phase.type === "LoggingInstance" && (
                    <ManualProgressModalForm
                      title={`信息录入 步骤${index + 1}（${phase.name}）`}
                      phaseId={phase.id}
                      phaseStdin={phase.stdin}
                      onFinish={() => {
                        refetch()
                        queryClient.invalidateQueries({
                          queryKey: ["sub-tasks"],
                        })
                      }}
                    />
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
              <ProDescriptions.Item label="开始时间">
                {phase.started !== "0001-01-01 08:05:43" ? phase.started : "-"}
              </ProDescriptions.Item>
              <ProDescriptions.Item label="结束时间">
                {phase.finished !== "0001-01-01 08:05:43"
                  ? phase.finished
                  : "-"}
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
                  contentStyle={{
                    color:
                      phase.status === "Failed"
                        ? "red"
                        : phase.status === "InManualProgress" ||
                          phase.status === "Waitting"
                        ? "#fadb14"
                        : "rgba(0,0,0,0.45)",
                  }}
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
        open={!!selectedStdinPhase}
        onCancel={() => setSelectedStdinPhase(undefined)}
        content={selectedStdinPhase?.stdin}
      />
      <StdStringDisplayModal
        title={`${selectedStdoutPhase?.name} - 标准输出`}
        open={!!selectedStdoutPhase}
        onCancel={() => setSelectedStdoutPhase(undefined)}
        content={selectedStdoutPhase?.stdout}
      />
    </div>
  )
}
