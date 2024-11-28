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
import { UserSyncApiSysUsersSync } from "@/services/sys/user"
import {
  CloudDownloadOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Button, message } from "antd"
import useModal from "antd/es/modal/useModal"
import { useRef } from "react"
import TeamMemberAddModalForm from "./team-member-add-modal-form"

export default function TeamMemberTable({ teamId }: { teamId: number }) {
  const access = useAccess()
  const [modal, contextHolder] = useModal()
  const tableRef = useRef<ActionType>()

  const showDeleteConfirm = (member: SYS.TeamMember) =>
    modal.confirm({
      title: "确定移除成员吗？",
      icon: <ExclamationCircleOutlined />,
      content: `移除成员 ${member.username}（${member.id}）`,
      onOk: async () => {
        await teamMemDelApiSysTeamsByIdusers(
          { id: String(teamId) },
          { username: member.username },
        )
        message.success("移除成功")
        tableRef.current?.reload(false)
      },
    })

  const showSyncConfirm = (refetch: () => void) => {
    modal.confirm({
      title: "确定同步钉钉部门用户信息吗？",
      icon: <CloudDownloadOutlined />,
      content: `同步操作仅会更新部门的用户信息，不会对手动创建的团队用户产生影响！`,
      onOk: () => {
        UserSyncApiSysUsersSync() // 移除了 await 关键字
          .then(() => {
            message.success("已开始同步，用时较长，请稍后刷新页面查看！")
          })
          .catch((error) => {
            message.error(error, "同步失败，请重试！")
          })
        // 不等待同步完成，直接调用 refetch
        refetch()
      },
    })
  }
  const columnsState: TableColumnsState = {
    id: { show: false },
  }

  const columns: TableColumns<SYS.TeamMember> = [
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
                disabled:
                  !access.teamMemDelApiSysTeamsByIdusers || !row.additional,
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
            <Button
              key="syncUsers"
              type="link"
              disabled={!access.UserSyncApiSysUsersSync}
              title="同步啊"
              onClick={() => {
                showSyncConfirm(tableRef.current?.reload)
              }}
            >
              <CloudDownloadOutlined />
              同步
            </Button>,
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
