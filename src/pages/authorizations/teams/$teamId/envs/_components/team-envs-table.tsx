import Table, { TableColumns, TableColumnsState } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import {
  TABLE_CELL_EMAIL_WIDTH,
  TABLE_CELL_MOBILE_WIDTH,
  TABLE_CELL_UID_WIDTH,
} from "@/constants/table"
import { ActionType } from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import useModal from "antd/es/modal/useModal"
import { useRef } from "react"
import TeamEnvsAddModalForm from "./team-envs-add-modal-form"

export default function TeamEnvsTable({ teamId }: { teamId: number }) {
  const access = useAccess()
  const [contextHolder] = useModal()
  const tableRef = useRef<ActionType>()

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
                text: "编辑",
                danger: true,
                onClick: () => showDeleteConfirm(row),
                disabled: !access.teamEnvEditApiSysTeamsByIdenvs,
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
          const response = await params
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
            <TeamEnvsAddModalForm
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
