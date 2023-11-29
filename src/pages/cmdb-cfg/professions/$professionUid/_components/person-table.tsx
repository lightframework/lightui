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
import { useToken } from "@/lib/hooks/use-token"
import { tableCellDatetimePostProcess } from "@/lib/utils"
import {
  personDeleteApiCmdbPersonsByUid,
  personPageListApiCmdbPersons,
} from "@/services/cmdb/person"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Tag, message } from "antd"
import useModal from "antd/es/modal/useModal"
import { useRef, useState } from "react"
import PersonCreateModalForm from "./person-create-modal-form"
import PersonUpdateModalForm from "./person-update-modal-form"

export default function PersonTable({
  professionUid,
}: {
  professionUid: string
}) {
  const { token } = useToken()
  const access = useAccess()
  const [modal, contextHolder] = useModal()
  const tableRef = useRef<ActionType>()

  const [selectedPersonToUpdate, setSelectedPersonToUpdate] = useState<
    CMDB.PersonInfo | undefined
  >()

  const showDeleteConfirm = (person: CMDB.PersonInfo) =>
    modal.confirm({
      title: "确定删除人员吗？",
      icon: <ExclamationCircleOutlined />,
      content: `删除人员 ${person.PersonName}（${person.PersonId}）`,
      onOk: async () => {
        await personDeleteApiCmdbPersonsByUid({ uid: person.Uid })
        message.success("删除成功")
        tableRef.current?.reload(false)
      },
    })

  const columnsState: TableColumnsState = {
    updateAt: { show: false },
    updateBy: { show: false },
    createBy: { show: false },
    Uid: { show: false },
  }

  const columns: TableColumns<CMDB.PersonInfo> = [
    {
      title: "UID",
      dataIndex: "Uid",
      width: TABLE_CELL_UID_WIDTH,
    },
    {
      title: "人员ID",
      dataIndex: "PersonId",
      copyable: true,
      width: 140,
      sorter: true,
    },
    {
      title: "姓名",
      key: "PersonName",
      dataIndex: "PersonName",
      copyable: true,
      sorter: true,
      width: 200,
    },
    {
      title: "邮箱",
      key: "Email",
      dataIndex: "Email",
      copyable: true,
      width: TABLE_CELL_EMAIL_WIDTH,
    },
    {
      title: "联系电话",
      key: "Mobile",
      dataIndex: "Mobile",
      copyable: true,
      width: TABLE_CELL_MOBILE_WIDTH,
    },
    {
      title: "状态",
      key: "Enabled",
      dataIndex: "Enabled",
      width: 70,
      render: (_, row) => (
        <Tag color={row.Enabled ? token.colorSuccess : token.colorError}>
          {row.Enabled ? "可用" : "禁用"}
        </Tag>
      ),
    },
    {
      title: "类型",
      key: "Professions",
      dataIndex: "Professions",
      render: (_, row) =>
        row.Professions?.map((pro) => pro.ProfessionName).join(","),
      width: 240,
    },
    {
      title: "创建者",
      dataIndex: "createBy",
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      title: "创建时间",
      dataIndex: "createAt",
      valueType: "dateTime",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (dom, row) => tableCellDatetimePostProcess(dom, row.createAt),
    },
    {
      title: "更新者",
      dataIndex: "updateBy",
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      title: "更新时间",
      dataIndex: "updateAt",
      valueType: "dateTime",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (dom, row) => tableCellDatetimePostProcess(dom, row.updateAt),
    },
    {
      title: "备注",
      dataIndex: "Description",
      ellipsis: true,
      width: TABLE_CELL_DESC_WIDTH,
    },
    {
      title: "操作",
      key: "options",
      width: 90,
      fixed: "right",
      render: (_, row) => (
        <TableCellActions
          actions={[
            {
              text: "编辑",
              onClick: () => setSelectedPersonToUpdate(row),
              disabled: !access.personUpdateApiCmdbPersonsByUid,
            },
            {
              text: "删除",
              onClick: () => showDeleteConfirm(row),
              danger: true,
              disabled: !access.personDeleteApiCmdbPersonsByUid,
            },
          ]}
        />
      ),
    },
  ]

  return (
    <>
      {contextHolder}
      <Table
        name="person"
        actionRef={tableRef}
        columns={columns}
        rowKey="Uid"
        params={{ ProfessionUid: professionUid }}
        searchPlaceholder="请输入人员ID/名称/邮箱/联系电话查询"
        request={personPageListApiCmdbPersons}
        defaultColumnsState={columnsState}
        toolbar={{
          actions: [
            <PersonCreateModalForm
              key="person-create"
              onFinish={() => tableRef.current?.reload()}
            />,
          ],
        }}
      />
      <PersonUpdateModalForm
        open={selectedPersonToUpdate !== undefined}
        onCancel={() => setSelectedPersonToUpdate(undefined)}
        person={selectedPersonToUpdate}
        onFinish={() => tableRef.current?.reload(false)}
      />
    </>
  )
}
