import Table, { TableColumns, TableColumnsState } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_DESC_WIDTH,
  TABLE_CELL_UID_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
} from "@/constants/table"
import { useToken } from "@/lib/hooks/use-token"
import {
  cloudDeleteApiCmdbCloudsByUid,
  cloudPageListApiCmdbClouds,
} from "@/services/cmdb/cloud"
import { ExclamationCircleOutlined, SearchOutlined } from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { Link, useAccess } from "@umijs/max"
import { Tag, message } from "antd"
import useModal from "antd/es/modal/useModal"
import { useRef, useState } from "react"
import CloudCreateModalForm from "./cloud-create-modal-form"
import CloudTagTableModal from "./cloud-tag-table-modal"
import CloudUpdateModalForm from "./cloud-update-modal-form"

export default function CloudTable() {
  const { token } = useToken()
  const access = useAccess()
  const [modal, contextHolder] = useModal()
  const tableRef = useRef<ActionType>()

  const [selectedCloudToViewTags, setSelectedCloudToViewTags] = useState<
    CMDB.CloudInfo | undefined
  >()

  const [selectedCloudToUpdate, setSelectedCloudToUpdate] = useState<
    CMDB.CloudInfo | undefined
  >()

  const showDeleteConfirm = (cloud: CMDB.CloudInfo) =>
    modal.confirm({
      title: "确定删除云商吗？",
      icon: <ExclamationCircleOutlined />,
      content: `删除云商 ${cloud.CloudName}（${cloud.Cloud}）`,
      onOk: async () => {
        await cloudDeleteApiCmdbCloudsByUid({ uid: cloud.Uid })
        message.success("删除成功")
        tableRef.current?.reload(false)
      },
    })

  const columnsState: TableColumnsState = {
    Uid: { show: false },
    updateAt: { show: false },
    updateBy: { show: false },
    createBy: { show: false },
    createAt: { show: false },
  }

  const columns: TableColumns<CMDB.CloudInfo> = [
    {
      title: "UID",
      dataIndex: "Uid",
      width: TABLE_CELL_UID_WIDTH,
    },
    {
      title: "云商ID",
      dataIndex: "Cloud",
      width: 140,
      copyable: true,
    },
    {
      title: "云商名称",
      dataIndex: "CloudName",
      width: 200,
      render: (_, row) => (
        <Link to={`${row.Uid}/regions`}>{row.CloudName}</Link>
      ),
      sorter: true,
    },
    {
      title: "资源组",
      dataIndex: "ResourceGroup",
      width: 200,
      copyable: true,
    },
    {
      title: "账号",
      dataIndex: "Account",
      width: 220,
      copyable: true,
    },
    {
      title: "官网链接",
      dataIndex: "Website",
      width: 240,
      render: (_, row) =>
        row.Website ? (
          <a
            href={
              !row.Website.startsWith("https://") ||
              !row.Website.startsWith("http://")
                ? `https://${row.Website}`
                : row.Website
            }
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-x-1"
          >
            <span>{row.Website}</span>
            <SearchOutlined />
          </a>
        ) : (
          "-"
        ),
    },
    {
      title: "云商API",
      dataIndex: "ApiDomain",
      copyable: true,
      width: 240,
    },
    {
      title: "支持API",
      dataIndex: "SupportApi",
      width: 80,
      render: (_, row) => (
        <Tag color={row.SupportApi ? token.colorSuccess : token.colorError}>
          {row.SupportApi ? "是" : "否"}
        </Tag>
      ),
    },
    {
      title: "权重",
      dataIndex: "Weight",
      width: 65,
    },
    {
      title: "SecretId",
      dataIndex: "SecretId",
      copyable: true,
      ellipsis: true,
      width: 300,
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
      width: 160,
      fixed: "right",
      render: (_, row) => (
        <TableCellActions
          actions={[
            {
              text: "查看标签",
              onClick: () => setSelectedCloudToViewTags(row),
              disabled: !access.cloudTagPageListApiCmdbCloudtags,
            },
            {
              text: "编辑",
              onClick: () => setSelectedCloudToUpdate(row),
              disabled: !access.cloudUpdateApiCmdbCloudsByUid,
            },
            {
              text: "删除",
              onClick: () => showDeleteConfirm(row),
              danger: true,
              disabled: !access.cloudDeleteApiCmdbCloudsByUid,
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
        name="cloud"
        actionRef={tableRef}
        columns={columns}
        rowKey="Uid"
        searchPlaceholder="请输入云商ID/名称查询"
        request={cloudPageListApiCmdbClouds}
        toolbar={{
          actions: [
            <CloudCreateModalForm
              key="cloud-create"
              onFinish={() => tableRef.current?.reload()}
            />,
          ],
        }}
        defaultColumnsState={columnsState}
      />
      <CloudTagTableModal
        open={selectedCloudToViewTags !== undefined}
        onCancel={() => setSelectedCloudToViewTags(undefined)}
        cloud={selectedCloudToViewTags}
      />
      <CloudUpdateModalForm
        open={selectedCloudToUpdate !== undefined}
        onCancel={() => setSelectedCloudToUpdate(undefined)}
        cloud={selectedCloudToUpdate}
        onFinish={() => tableRef.current?.reload(false)}
      />
    </>
  )
}
