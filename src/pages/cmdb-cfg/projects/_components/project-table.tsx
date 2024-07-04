import Table, { TableColumns, TableColumnsState } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_UID_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
} from "@/constants/table"
import { tableCellDatetimePostProcess } from "@/lib/utils"
import {
  projectDeleteApiCmdbProjectsByUid,
  projectPageListApiCmdbProjects,
} from "@/services/cmdb/project"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { message } from "antd"
import useModal from "antd/es/modal/useModal"
import { useRef, useState } from "react"
import ProjectCreateModalForm from "./project-create-modal-form"
import ProjectUpdateModalForm from "./project-update-modal-form"

export default function ProjectTable() {
  const access = useAccess()
  const [modal, contextHolder] = useModal()
  const tableRef = useRef<ActionType>()

  const [selectedProjectToUpdate, setSelectedProjectToUpdate] = useState<
    CMDB.ProjectInfo | undefined
  >()

  const showDeleteConfirm = (project: CMDB.ProjectInfo) =>
    modal.confirm({
      title: "确定删除项目吗？",
      icon: <ExclamationCircleOutlined />,
      content: `删除项目 ${project.ProjectName}`,
      onOk: async () => {
        await projectDeleteApiCmdbProjectsByUid({ uid: project.Uid })
        message.success("删除成功")
        tableRef.current?.reload(false)
      },
    })

  const columnsState: TableColumnsState = {
    Uid: { show: false },
  }

  const columns: TableColumns<CMDB.ProjectInfo> = [
    {
      title: "UID",
      dataIndex: "Uid",
      width: TABLE_CELL_UID_WIDTH,
    },
    {
      title: "项目名称",
      dataIndex: "ProjectName",
      width: 300,
      copyable: true,
      fixed: "left",
    },
    {
      title: "简称",
      dataIndex: "Ident",
      width: 200,
      copyable: true,
    },
    {
      title: "CusId",
      dataIndex: "CusId",
      width: 140,
      copyable: true,
    },
    {
      title: "项目ID",
      dataIndex: "Project",
      width: 140,
      copyable: true,
    },
    {
      title: "关联节点",
      dataIndex: "HostNum",
      width: 100,
      render: (_, row) => (
        <a
          href={`/cmdb/hosts?initProjectUid=${row.Uid}`}
          target="_blank"
          rel="noreferrer"
        >
          {row.HostNum}
        </a>
      ),
    },
    {
      title: "最终客户",
      dataIndex: "Client",
      width: 300,
    },
    {
      title: "销售",
      dataIndex: "Sale",
      width: 120,
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
      title: "操作",
      key: "options",
      width: 90,
      fixed: "right",
      render: (_, row) => (
        <TableCellActions
          actions={[
            {
              text: "编辑",
              onClick: () => setSelectedProjectToUpdate(row),
              disabled: !access.projectUpdateApiCmdbProjectsByUid,
            },
            {
              text: "删除",
              onClick: () => showDeleteConfirm(row),
              danger: true,
              disabled: !access.projectDeleteApiCmdbProjectsByUid,
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
        name="host-type"
        actionRef={tableRef}
        columns={columns}
        rowKey="Uid"
        searchPlaceholder="请输入项目ID/名称查询"
        request={projectPageListApiCmdbProjects}
        toolbar={{
          actions: [
            <ProjectCreateModalForm
              key="project-create"
              onFinish={() => tableRef.current?.reload()}
            />,
          ],
        }}
        defaultColumnsState={columnsState}
      />
      <ProjectUpdateModalForm
        open={selectedProjectToUpdate !== undefined}
        onCancel={() => setSelectedProjectToUpdate(undefined)}
        project={selectedProjectToUpdate}
        onFinish={() => tableRef.current?.reload(false)}
      />
    </>
  )
}
