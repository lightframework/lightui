import {
  tacticDeleteApiArgusTacticsById,
  tacticItemsApiArgusTactics,
} from "@/services/argus/tactic"
import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { useQuery } from "@tanstack/react-query"
import { useAccess } from "@umijs/max"
import { Spin, message } from "antd"
import useModal from "antd/es/modal/useModal"
import { useCallback, useState } from "react"
import TacticFormDrawer from "./tactic-form-drawer"
import TacticItem from "./tactic-item"

export default function TacticGrid() {
  const access = useAccess()
  const [modal, contextHolder] = useModal()

  const { data: tactics, refetch: refetchTactics } = useQuery({
    queryKey: ["argus-tactics"],
    queryFn: () => tacticItemsApiArgusTactics(),
    select: (res) => res.data?.items ?? [],
  })

  const [mutateTactic, setMutateTactic] = useState<{
    type: "create" | "edit" | "copy"
    tactic?: ARGUS.TacticInfo
  } | null>(null)

  const createNewTactic = useCallback(() => {
    setMutateTactic({ type: "create" })
  }, [])

  const editTactic = useCallback((tactic: ARGUS.TacticInfo) => {
    setMutateTactic({ type: "edit", tactic })
  }, [])

  const copyTactic = useCallback((tactic: ARGUS.TacticInfo) => {
    setMutateTactic({ type: "copy", tactic })
  }, [])

  const deleteTactic = useCallback(
    (tactic: ARGUS.TacticInfo) =>
      modal.confirm({
        title: "确定删除策略吗？",
        icon: <ExclamationCircleOutlined />,
        content: `删除策略 ${tactic.name}`,
        onOk: async () => {
          await tacticDeleteApiArgusTacticsById({ id: String(tactic.id) })
          message.success("删除成功")
          refetchTactics()
        },
      }),
    [],
  )

  const onDrawerClose = useCallback(() => {
    setMutateTactic(null)
  }, [])

  return (
    <>
      {contextHolder}
      <div className="flex h-full flex-col rounded bg-white p-3">
        <div>
          <div className="text-sm font-semibold">分派策略</div>
          <div className="mt-3 text-gray-500">
            故障将按顺序依次匹配策略，匹配到即终止。您可以拖拽策略进行排序。
          </div>
        </div>
        {tactics ? (
          <div className="mt-4 grid max-h-full grid-cols-1 gap-3 overflow-y-auto lg:grid-cols-2 xl:grid-cols-3">
            {tactics
              .sort((a, b) => a.rank - b.rank)
              .map((tactic) => (
                <TacticItem
                  key={tactic.id}
                  tactic={tactic}
                  onCopy={copyTactic}
                  onEdit={editTactic}
                  onDelete={deleteTactic}
                />
              ))}
            {access.TacticCreateApiArgusTactics && (
              <div
                role="button"
                className="flex h-[70px] cursor-pointer items-center justify-center gap-2 rounded border border-dashed border-[#d9d9d9] p-3 text-sm text-gray-500 transition-colors hover:border-[#6980f0]"
                onClick={createNewTactic}
              >
                <PlusOutlined /> 新增一条策略
              </div>
            )}
          </div>
        ) : (
          <Spin />
        )}
      </div>

      <TacticFormDrawer
        open={!!mutateTactic}
        onClose={onDrawerClose}
        type={mutateTactic?.type}
        tactic={mutateTactic?.tactic}
        onFinish={refetchTactics}
      />
    </>
  )
}
