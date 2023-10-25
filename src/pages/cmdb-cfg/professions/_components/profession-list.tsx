import ResizableFilterList, {
  FilterListItem,
} from "@/components/resizable-filter-list"
import { professionDeleteApiCmdbProfessionsByUid } from "@/services/cmdb/profession"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { useQueryClient } from "@tanstack/react-query"
import { useAccess } from "@umijs/max"
import { message } from "antd"
import useModal from "antd/es/modal/useModal"
import { useState } from "react"
import ProfessionCreateModalForm from "./profession-create-modal-form"
import ProfessionUpdateModalForm from "./profession-update-modal-form"

export default function ProfessionList({
  professions,
}: {
  professions: CMDB.ProfessionOption[]
}) {
  const access = useAccess()
  const [modal, contextHolder] = useModal()
  const queryClient = useQueryClient()

  const [selectedProfessionToUpdate, setSelectedProfessionToUpdate] = useState<
    CMDB.ProfessionOption | undefined
  >()

  const refetchProfessions = () =>
    queryClient.invalidateQueries({ queryKey: ["profession-options"] })

  const showDeleteConfirm = (profession: CMDB.ProfessionOption) =>
    modal.confirm({
      title: "确定删除人员类型吗？",
      icon: <ExclamationCircleOutlined />,
      content: `删除人员类型 ${profession.ProfessionName}（${profession.ProfessionId}）`,
      onOk: async () => {
        await professionDeleteApiCmdbProfessionsByUid({ uid: profession.Uid })
        message.success("删除成功")
        refetchProfessions()
      },
    })

  const items: FilterListItem[] = professions.map((profession) => ({
    label: profession.ProfessionName,
    key: profession.Uid,
    to: `/cmdb-cfg/professions/${profession.Uid}`,
    onEditClick: access.professionUpdateApiCmdbProfessionsByUid
      ? () => setSelectedProfessionToUpdate(profession)
      : undefined,
    onRemoveClick: access.professionDeleteApiCmdbProfessionsByUid
      ? () => showDeleteConfirm(profession)
      : undefined,
  }))

  return (
    <>
      {contextHolder}
      <ResizableFilterList
        name="profession"
        title="人员类型列表"
        items={items}
        extras={<ProfessionCreateModalForm onFinish={refetchProfessions} />}
      />
      <ProfessionUpdateModalForm
        open={selectedProfessionToUpdate !== undefined}
        onCancel={() => setSelectedProfessionToUpdate(undefined)}
        profession={selectedProfessionToUpdate}
        onFinish={refetchProfessions}
      />
    </>
  )
}
