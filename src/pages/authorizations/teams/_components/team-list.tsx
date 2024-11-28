import ResizableFilterList, {
  FilterListItem,
} from "@/components/resizable-filter-list"
import { teamDeleteApiSysTeamsById } from "@/services/sys/team"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { useQueryClient } from "@tanstack/react-query"
import { useAccess, useLocation } from "@umijs/max"
import { message } from "antd"
import useModal from "antd/es/modal/useModal"
import { useState } from "react"
import TeamCreateModalForm from "./team-create-modal-form"
import TeamUpdateModalForm from "./team-update-modal-form"

export default function TeamList({ teams }: { teams: SYS.TeamIntro[] }) {
  const access = useAccess()
  const { pathname, search } = useLocation()
  const currentUrl = pathname + search
  const [modal, contextHolder] = useModal()
  const queryClient = useQueryClient()

  const [selectedTeamToUpdate, setSelectedTeamToUpdate] = useState<
    SYS.TeamIntro | undefined
  >()

  const refetchTeams = () =>
    queryClient.invalidateQueries({ queryKey: ["team-list"], useAdmin: true })

  const showDeleteConfirm = (team: SYS.TeamIntro) =>
    modal.confirm({
      title: "确定删除团队吗？",
      icon: <ExclamationCircleOutlined />,
      content: `删除团队 ${team.name}（${team.id}）`,
      onOk: async () => {
        await teamDeleteApiSysTeamsById({ id: String(team.id) })
        message.success("删除成功")
        refetchTeams()
      },
    })

  const items: FilterListItem[] = teams.map((team) => ({
    label: team.name,
    key: team.id,
    to: currentUrl.replace(/\/teams\/.*\//, `/teams/${team.id}/`),
    onEditClick: access.teamUpdateApiSysTeamsById
      ? () => setSelectedTeamToUpdate(team)
      : undefined,
    onRemoveClick: access.teamDeleteApiSysTeamsById
      ? () => showDeleteConfirm(team)
      : undefined,
  }))

  return (
    <>
      {contextHolder}
      <ResizableFilterList
        name="team"
        title="团队列表"
        items={items}
        extras={<TeamCreateModalForm onFinish={refetchTeams} />}
        searchPlaceHolder="请输入团队名称查询"
      />
      <TeamUpdateModalForm
        open={selectedTeamToUpdate !== undefined}
        onCancel={() => setSelectedTeamToUpdate(undefined)}
        team={selectedTeamToUpdate}
        onFinish={refetchTeams}
      />
    </>
  )
}
