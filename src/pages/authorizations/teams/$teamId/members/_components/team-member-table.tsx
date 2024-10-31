import Table, { TableColumns, TableColumnsState } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import {
  TABLE_CELL_EMAIL_WIDTH,
  TABLE_CELL_MOBILE_WIDTH,
  TABLE_CELL_UID_WIDTH,
} from "@/constants/table"
import {
  teamMemDelApiSysTeamsByIdusers,
  teamMemListApiSysTeamsByIdusers,
} from "@/services/sys/team"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { message } from "antd"
import useModal from "antd/es/modal/useModal"
import { useRef } from "react"
import TeamMemberAddModalForm from "./team-member-add-modal-form"

export default function TeamMemberTable({ teamId }: { teamId: number }) {
  const access = useAccess()
  const [modal, contextHolder] = useModal()
  const tableRef = useRef<ActionType>()

  const showDeleteConfirm = (member: SYS.UserInfo) =>
    modal.confirm({
      title: "确定移除成员吗？",
      icon: <ExclamationCircleOutlined />,
      content: `移除成员 ${member.username}（${member.id}）`,
      onOk: async () => {
        await teamMemDelApiSysTeamsByIdusers(
          { id: String(teamId) },
          { usernames: [member.username] },
        )
        message.success("移除成功")
        tableRef.current?.reload(false)
      },
    })

  const columnsState: TableColumnsState = {
    id: { show: false },
  }

  const columns: TableColumns<SYS.UserInfo> = [
    {
      title: "ID",
      dataIndex: "id",
      width: TABLE_CELL_UID_WIDTH,
    },
    {
      title: "用户名",
      dataIndex: "username",
      copyable: true,
      width: 140,
    },
    {
      title: "姓名",
      dataIndex: "nickname",
      copyable: true,
      width: 140,
    },
    {
      title: "邮箱",
      dataIndex: "email",
      copyable: true,
      width: TABLE_CELL_EMAIL_WIDTH,
    },
    {
      title: "联系电话",
      dataIndex: "mobile",
      copyable: true,
      width: TABLE_CELL_MOBILE_WIDTH,
    },
    {
      title: "操作",
      key: "options",
      width: 45,
      fixed: "right",
      render: (_, row) => {
        return (
          <TableCellActions
            actions={[
              {
                text: "移除",
                danger: true,
                onClick: () => showDeleteConfirm(row),
                disabled: !access.teamMemDelApiSysTeamsByIdusers,
              },
            ]}
          />
        )
      },
    },
  ]

  return (
    <>
      {contextHolder}
      <Table
        name="team-member"
        actionRef={tableRef}
        columns={columns}
        rowKey="id"
        searchPlaceholder="请输入用户ID/名称查询"
        params={{ id: String(teamId) }}
        request={async (params) => {
          const response = await teamMemListApiSysTeamsByIdusers(params)
          return {
            ...response,
            data: {
              list: response.data?.items,
              total: response.data?.items?.length,
            },
          }
        }}
        defaultColumnsState={columnsState}
        toolbar={{
          actions: [
            <TeamMemberAddModalForm
              key="team-member-add"
              teamId={teamId}
              onFinish={() => tableRef.current?.reload()}
            />,
          ],
        }}
      />
    </>
  )
}
