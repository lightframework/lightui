import Table, { TableColumns, TableColumnsState } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import {
  ipsetTemplateDeleteApiOpsIpsettemplatesById,
  ipsetTemplatePageListApiOpsIpsettemplates,
} from "@/services/ops/ipsettemplate"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { message } from "antd"
import useModal from "antd/es/modal/useModal"
import { useRef, useState } from "react"
import GenerateIpsetButton from "./generate-ipset-button"
import IpsetTemplateCreateModalForm from "./ipset-template-create-modal-form"
import IpsetTemplateUpdateModalForm from "./ipset-template-update-modal-form"

export default function IpsetTemplateTable() {
  const access = useAccess()
  const [modal, contextHolder] = useModal()
  const tableRef = useRef<ActionType>()

  const [selectedIpsetTemplateToUpdate, setSelectedIpsetTemplateToUpdate] =
    useState<OPS.IpsetTemplateInfo | undefined>()

  const showDeleteConfirm = (ipsetTemplate: OPS.IpsetTemplateInfo) =>
    modal.confirm({
      title: "确定删除ipset模板吗？",
      icon: <ExclamationCircleOutlined />,
      content: `删除ipset模板 ${ipsetTemplate.name}`,
      onOk: async () => {
        await ipsetTemplateDeleteApiOpsIpsettemplatesById({
          id: String(ipsetTemplate.id),
        })
        message.success("删除成功")
        tableRef.current?.reload(false)
      },
    })

  const columnsState: TableColumnsState = {
    id: { show: false },
  }

  const columns: TableColumns<OPS.IpsetTemplateInfo> = [
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
    },
    {
      title: "模板名称",
      dataIndex: "name",
      width: 140,
      copyable: true,
    },
    {
      title: "limit",
      dataIndex: "limit",
      width: 300,
    },
    {
      title: "exclude",
      dataIndex: "exclude",
      width: 300,
    },
    {
      title: "ISP",
      dataIndex: "isp",
      width: 200,
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
              onClick: () => setSelectedIpsetTemplateToUpdate(row),
              disabled: !access.ipsetTemplateUpdateApiOpsIpsettemplatesById,
            },
            {
              text: "删除",
              onClick: () => showDeleteConfirm(row),
              danger: true,
              disabled: !access.ipsetTemplateDeleteApiOpsIpsettemplatesById,
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
        name="ipset-template"
        actionRef={tableRef}
        columns={columns}
        rowKey="id"
        searchPlaceholder="请输入模板名称查询"
        request={ipsetTemplatePageListApiOpsIpsettemplates}
        toolbar={{
          actions: [
            <GenerateIpsetButton key="generate-ipset" />,
            <IpsetTemplateCreateModalForm
              key="ipset-template-create"
              onFinish={() => tableRef.current?.reload()}
            />,
          ],
        }}
        defaultColumnsState={columnsState}
      />
      <IpsetTemplateUpdateModalForm
        open={!!selectedIpsetTemplateToUpdate}
        onCancel={() => setSelectedIpsetTemplateToUpdate(undefined)}
        ipsetTemplate={selectedIpsetTemplateToUpdate}
        onFinish={() => tableRef.current?.reload(false)}
      />
    </>
  )
}
