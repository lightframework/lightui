import ResizableFilterList, {
  FilterListItem,
} from "@/components/resizable-filter-list"
import { alertAggrViewDeleteApiArgusAlertaggrviewsById } from "@/services/argus/alertAggrView"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { useQueryClient } from "@tanstack/react-query"
import { useAccess } from "@umijs/max"
import { message } from "antd"
import useModal from "antd/es/modal/useModal"
import { useState } from "react"
import AggrViewCreateModalForm from "./aggr-view-create-modal-form"
import AggrViewUpdateModalForm from "./aggr-view-update-modal-form"

export default function AggrViewList({
  views,
}: {
  views: ARGUS.AlertAggrView[]
}) {
  const access = useAccess()
  const [modal, contextHolder] = useModal()
  const queryClient = useQueryClient()

  const [selectedViewToUpdate, setSelectedViewToUpdate] = useState<
    ARGUS.AlertAggrView | undefined
  >()

  const refetchAggrViews = () =>
    queryClient.invalidateQueries({ queryKey: ["alert-aggr-views"] })

  const showDeleteConfirm = (view: ARGUS.AlertAggrView) =>
    modal.confirm({
      title: "确定删除聚合规则吗？",
      icon: <ExclamationCircleOutlined />,
      content: `删除聚合规则 ${view.name}（${view.id}）`,
      onOk: async () => {
        await alertAggrViewDeleteApiArgusAlertaggrviewsById({
          id: String(view.id),
        })
        message.success("删除成功")
        refetchAggrViews()
      },
    })

  const items: FilterListItem[] = views.map((view) => ({
    label: view.name,
    key: view.id ?? view.rule,
    extra:
      view.cate === 1 ? <span className="mr-1 text-gray-400">公开</span> : null,
    to: `/argus/current-alerts/${view.rule}`,
    onEditClick: access["alertAggrViewUpdateApiArgusAlert-aggr-viewsById"]
      ? () => setSelectedViewToUpdate(view)
      : undefined,
    onRemoveClick: access["alertAggrViewDeleteApiArgusAlert-aggr-viewsById"]
      ? () => showDeleteConfirm(view)
      : undefined,
  }))

  return (
    <>
      {contextHolder}
      <ResizableFilterList
        name="aggr-view"
        title="聚合规则"
        items={items}
        extras={<AggrViewCreateModalForm onFinish={refetchAggrViews} />}
        searchPlaceHolder="请输入名称查询"
      />
      <AggrViewUpdateModalForm
        open={selectedViewToUpdate !== undefined}
        onCancel={() => setSelectedViewToUpdate(undefined)}
        view={selectedViewToUpdate}
        onFinish={refetchAggrViews}
      />
    </>
  )
}
