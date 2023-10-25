import Table, { TableColumns, TableColumnsState } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_DESC_WIDTH,
  TABLE_CELL_EMAIL_WIDTH,
  TABLE_CELL_MOBILE_WIDTH,
  TABLE_CELL_UID_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
} from "@/constants/table"
import {
  userChangeStatusApiSysUsersByIdstatus,
  userDeleteApiSysUsersById,
  userPageListApiSysUsers,
} from "@/services/sys/user"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Switch, message } from "antd"
import useModal from "antd/es/modal/useModal"
import { useRef, useState } from "react"
import UserCreateModalForm from "./user-create-modal-form"
import UserResetPasswordModalForm from "./user-reset-password-modal-form"
import UserUpdateModalForm from "./user-update-modal-form"

export default function UserTable() {
  const access = useAccess()
  const [modal, contextHolder] = useModal()
  const tableRef = useRef<ActionType>()

  const [selectedUserToResetPass, setSelectedUserToResetPass] = useState<
    SYS.UserInfo | undefined
  >()

  const [selectedUserToUpdate, setSelectedUserToUpdate] = useState<
    SYS.UserInfo | undefined
  >()

  const showDeleteConfirm = (user: SYS.UserInfo) =>
    modal.confirm({
      title: "确定删除用户吗？",
      icon: <ExclamationCircleOutlined />,
      content: `删除用户 ${user.username}（${user.nickname}）`,
      onOk: async () => {
        await userDeleteApiSysUsersById({ id: user.id })
        message.success("删除成功")
        tableRef.current?.reload(false)
      },
    })

  const columnsState: TableColumnsState = {
    id: { show: false },
    createBy: { show: false },
    createAt: { show: false },
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
      title: "角色",
      dataIndex: "roles",
      width: 250,
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
      title: "状态",
      dataIndex: "enabled",
      width: 80,
      render(_, row) {
        return (
          <Switch
            disabled={!access.userChangeStatusApiSysUsersByIdstatus}
            checked={row.enabled}
            checkedChildren="启用"
            unCheckedChildren="禁用"
            onChange={async (value) => {
              await userChangeStatusApiSysUsersByIdstatus(
                { id: String(row.id) },
                {
                  enabled: value,
                  id: row.id,
                },
              )

              message.success(`${!!value ? "启用" : "禁用"}成功！`)
              tableRef.current?.reload(false)
            }}
          />
        )
      },
    },
    {
      title: "创建者",
      dataIndex: "createBy",
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      valueType: "dateTime",
      width: TABLE_CELL_DATETIME_WIDTH,
    },
    {
      title: "更新者",
      dataIndex: "updateBy",
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      title: "更新时间",
      dataIndex: "updatedAt",
      valueType: "dateTime",
      width: TABLE_CELL_DATETIME_WIDTH,
    },
    {
      title: "备注",
      dataIndex: "info",
      ellipsis: true,
      width: TABLE_CELL_DESC_WIDTH,
    },

    {
      title: "操作",
      key: "options",
      width: 156,
      fixed: "right",
      render: (_, row) => {
        return (
          <TableCellActions
            actions={[
              {
                text: "编辑",
                onClick: () => setSelectedUserToUpdate(row),
                disabled: !access.userUpdateApiSysUsersById,
              },
              {
                text: "重置密码",
                onClick: () => setSelectedUserToResetPass(row),
                disabled: !access.userResetPassApiSysUsersByIdpass,
              },
              {
                text: "删除",
                danger: true,
                onClick: () => showDeleteConfirm(row),
                disabled: !access.userDeleteApiSysUsersById,
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
        name="user"
        actionRef={tableRef}
        columns={columns}
        rowKey="id"
        searchPlaceholder="请输入用户名/姓名/邮箱/联系电话查询"
        request={userPageListApiSysUsers}
        defaultColumnsState={columnsState}
        toolbar={{
          actions: [
            <UserCreateModalForm
              key="user-create"
              onFinish={() => tableRef.current?.reload()}
            />,
          ],
        }}
      />
      <UserUpdateModalForm
        open={selectedUserToUpdate !== undefined}
        onCancel={() => setSelectedUserToUpdate(undefined)}
        user={selectedUserToUpdate}
        onFinish={() => tableRef.current?.reload(false)}
      />
      <UserResetPasswordModalForm
        open={selectedUserToResetPass !== undefined}
        onCancel={() => setSelectedUserToResetPass(undefined)}
        user={selectedUserToResetPass}
        onFinish={() => tableRef.current?.reload(false)}
      />
    </>
  )
}
