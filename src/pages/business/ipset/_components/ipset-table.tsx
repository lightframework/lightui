import IpsetPushModal from "@/components/ipset-push-modal"
import Table, { TableColumns, TableColumnsState } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_DESC_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
} from "@/constants/table"
import { useToken } from "@/lib/hooks/use-token"
import { tableCellDatetimePostProcess } from "@/lib/utils"
import {
  ipsetDeleteApiOpsIpsetsById,
  ipsetPageListApiOpsIpsets,
} from "@/services/ops/ipset"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { history, useAccess } from "@umijs/max"
import { Button, Tag, message } from "antd"
import useModal from "antd/es/modal/useModal"
import Paragraph from "antd/es/typography/Paragraph"
import { useRef, useState } from "react"
import IpsetCreateModalForm from "./ipset-create-modal-form"
import IpsetInfoModal from "./ipset-info-modal"
import IpsetUpdateModalForm from "./ipset-update-modal-form"

export default function IpsetTable() {
  const { token } = useToken()
  const access = useAccess()
  const [modal, contextHolder] = useModal()
  const tableRef = useRef<ActionType>()

  const [openPushModal, setOpenPushModal] = useState(false)

  const [selectedIpsetToView, setSelectedIpsetToView] = useState<
    OPS.IpsetList | undefined
  >()
  const [selectedIpsetToUpdate, setSelectedIpsetToUpdate] = useState<
    OPS.IpsetList | undefined
  >()

  const showDeleteConfirm = (ipset: OPS.IpsetList) =>
    modal.confirm({
      title: "确定删除ipset吗？",
      icon: <ExclamationCircleOutlined />,
      content: `删除ipset ${ipset.name} （版本：${ipset.version}）`,
      onOk: async () => {
        await ipsetDeleteApiOpsIpsetsById({ id: String(ipset.id) })
        message.success("删除成功")
        tableRef.current?.reload(false)
      },
    })

  const columnsState: TableColumnsState = {
    id: { show: false },
  }

  const columns: TableColumns<OPS.IpsetList> = [
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
    },
    {
      title: "Ipset名称",
      dataIndex: "name",
      width: 140,
      render: (_, row) => (
        <Paragraph copyable={{ text: row.name }} style={{ marginBottom: 0 }}>
          <a onClick={() => setSelectedIpsetToView(row)}>{row.name}</a>
        </Paragraph>
      ),
    },
    {
      title: "版本",
      dataIndex: "version",
      width: 200,
    },
    {
      title: "已存档",
      dataIndex: "isArchive",
      width: 80,
      render: (_, row) => (
        <Tag color={row.isArchive ? token.colorSuccess : token.colorError}>
          {row.isArchive ? "是" : "否"}
        </Tag>
      ),
    },
    {
      title: "备注",
      dataIndex: "description",
      ellipsis: true,
      width: TABLE_CELL_DESC_WIDTH,
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
      render: (dom, row) => tableCellDatetimePostProcess(dom, row.createdAt),
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
      render: (dom, row) => tableCellDatetimePostProcess(dom, row.updatedAt),
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
              onClick: () => setSelectedIpsetToUpdate(row),
              disabled: !access.ipsetUpdateApiOpsIpsetsById,
            },
            {
              text: "删除",
              onClick: () => showDeleteConfirm(row),
              danger: true,
              disabled: !access.ipsetDeleteApiOpsIpsetsById,
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
        name="ipset"
        actionRef={tableRef}
        columns={columns}
        rowKey="id"
        searchPlaceholder="请输入名称/IP查询"
        request={ipsetPageListApiOpsIpsets}
        toolbar={{
          actions: [
            <Button
              key="ipset-push"
              type="primary"
              onClick={() => setOpenPushModal(true)}
              disabled={!access.ipsetPushApiOpsIpsetsPush}
            >
              推送
            </Button>,
            <IpsetCreateModalForm
              key="ipset-create"
              onFinish={() => tableRef.current?.reload()}
            />,
          ],
        }}
        defaultColumnsState={columnsState}
      />
      <IpsetPushModal
        open={openPushModal}
        onCancel={() => setOpenPushModal(false)}
        onFinish={() => history.push("/jobs/ipset-push-records")}
      />
      <IpsetInfoModal
        open={!!selectedIpsetToView}
        onCancel={() => setSelectedIpsetToView(undefined)}
        ipset={selectedIpsetToView}
      />
      <IpsetUpdateModalForm
        open={!!selectedIpsetToUpdate}
        onCancel={() => setSelectedIpsetToUpdate(undefined)}
        ipset={selectedIpsetToUpdate}
        onFinish={() => tableRef.current?.reload(false)}
      />
    </>
  )
}
