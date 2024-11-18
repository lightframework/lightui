import Table, { TableColumns, TableColumnsState } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import { TABLE_CELL_UID_WIDTH } from "@/constants/table"
import { envPageListApiCmdbEnvs } from "@/services/cmdb/env"
import {
  TeamPermUpdateApiSysTeamsByIdperms,
  TeamPermsDelApiSysTeamsByIdperms,
} from "@/services/sys/team"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Checkbox, message } from "antd"
import useModal from "antd/es/modal/useModal"
import Paragraph from "antd/es/typography/Paragraph"
import { useRef } from "react"
import TeamEnvsAddModalForm from "./team-envs-add-modal-form"

export default function TeamEnvsTable({ teamId }: { teamId: number }) {
  const access = useAccess()
  const [modal, contextHolder] = useModal()
  const tableRef = useRef<ActionType>()

  const showDeleteConfirm = (r: CMDB.EnvInfo) =>
    modal.confirm({
      title: "确定移除该环境吗？",
      icon: <ExclamationCircleOutlined />,
      content: `移除环境 ${r.EnvName}（${r.Uid}）`,
      onOk: async () => {
        await TeamPermsDelApiSysTeamsByIdperms(
          { id: String(teamId) },
          {
            resource: 1,
            uids: [r.Uid],
          },
        )
        message.success("移除成功")
        tableRef.current?.reload(false)
      },
    })

  const columnsState: TableColumnsState = {
    id: { show: false },
  }

  const columns: TableColumns<CMDB.EnvInfo> = [
    {
      title: "UID",
      dataIndex: "Uid",
      width: TABLE_CELL_UID_WIDTH,
      copyable: true,
    },
    {
      title: "环境名称",
      dataIndex: "EnvName",
      copyable: true,
      width: 300,
      fixed: "left",
      render: (_, row) => (
        <Paragraph copyable={{ text: row.EnvName }} style={{ marginBottom: 0 }}>
          <a
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            {row.EnvName}
          </a>
        </Paragraph>
      ),
    },

    {
      title: "可写",
      dataIndex: "State",
      width: 120,
      render: (_, row) => (
        <Checkbox
          checked={row.Permission.Edit}
          disabled={!access.roleAuthEditApiSysRolesByIdauth}
          onChange={(e) => {
            TeamPermUpdateApiSysTeamsByIdperms(
              {
                id: String(teamId),
              },
              {
                resource: 1,
                perm: 2,
                uid: row.Uid,
                value: e.target.checked,
              },
            ).then(() => {
              tableRef?.current?.reload()
              message.success("ok!")
            })
          }}
        ></Checkbox>
      ),
    },
    {
      title: "可执行",
      dataIndex: "State",
      width: 120,
      render: (_, row) => (
        <Checkbox
          checked={row.Permission.Exec}
          onChange={(e) => {
            TeamPermUpdateApiSysTeamsByIdperms(
              {
                id: String(teamId),
              },
              {
                resource: 1,
                perm: 1,
                uid: row.Uid,
                value: e.target.checked,
              },
            ).then(() => {
              tableRef?.current?.reload()
              message.success("ok!")
            })
          }}
        ></Checkbox>
      ),
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
                disabled: !access.TeamPermsDelApiSysTeamsByIdperms,
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
        searchPlaceholder="请输入用环境名称查询"
        params={{
          TeamId: teamId,
        }}
        request={async (params) => {
          const response = await envPageListApiCmdbEnvs(params)
          return {
            ...response,
            data: {
              list: response.data?.list,
              total: response.data?.total,
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
