import Table, { TableColumns, TableColumnsState } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import TableCellEllipsisList from "@/components/table-cell-ellipsis-list"
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_DESC_WIDTH,
  TABLE_CELL_UID_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
} from "@/constants/table"
import { useToken } from "@/lib/hooks/use-token"
import { tableCellDatetimePostProcess } from "@/lib/utils"
import {
  envDeleteApiCmdbEnvsByUid,
  envPageListApiCmdbEnvs,
} from "@/services/cmdb/env"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Tag, message } from "antd"
import useModal from "antd/es/modal/useModal"
import { useRef, useState } from "react"
import DomainsetTableModal from "./domainset-table-modal"
import EnvCreateModalForm from "./env-create-modal-form"
import EnvUpdateModalForm from "./env-update-modal-form"
import IpsetTableModal from "./ipset-table-modal"

export default function EnvTable() {
  const access = useAccess()
  const { token } = useToken()
  const [modal, contextHolder] = useModal()
  const tableRef = useRef<ActionType>()

  const [selectedEnvToUpdate, setSelectedEnvToUpdate] = useState<
    CMDB.EnvInfo | undefined
  >()
  const [selectedEnvToViewIpsets, setSelectedEnvToViewIpsets] = useState<
    CMDB.EnvInfo | undefined
  >()
  const [selectedEnvToViewDomainsets, setSelectedEnvToViewDomainsets] =
    useState<CMDB.EnvInfo | undefined>()

  const showDeleteConfirm = (env: CMDB.EnvInfo) =>
    modal.confirm({
      title: "确定删除环境吗？",
      icon: <ExclamationCircleOutlined />,
      content: `删除环境 ${env.EnvName}（${env.EnvId}）`,
      onOk: async () => {
        await envDeleteApiCmdbEnvsByUid({ uid: env.Uid })
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

  const columns: TableColumns<CMDB.EnvInfo> = [
    {
      title: "UID",
      dataIndex: "Uid",
      width: TABLE_CELL_UID_WIDTH,
    },
    {
      title: "环境名称",
      dataIndex: "EnvName",
      width: 200,
      sorter: true,
      copyable: true,
      fixed: "left",
    },
    {
      title: "环境ID",
      dataIndex: "EnvId",
      width: 80,
      copyable: true,
    },
    {
      title: "环境Key",
      dataIndex: "EnvKey",
      width: 120,
      copyable: true,
    },
    {
      title: "发布状态",
      dataIndex: "IsGray",
      width: 80,
      render: (_, row) => (
        <Tag color={row.IsGray ? token.colorTextSecondary : token.colorSuccess}>
          {row.IsGray ? "灰度" : "线上"}
        </Tag>
      ),
    },
    {
      title: "IP集数量",
      key: "IpsetCount",
      width: 80,
      render: (_, row) =>
        access.ipsetPageListApiOpsIpsets ? (
          <a onClick={() => setSelectedEnvToViewIpsets(row)}>
            {row.IpsetVersionIds?.length ?? 0}
          </a>
        ) : (
          row.IpsetVersionIds?.length ?? 0
        ),
    },
    {
      title: "域名集数量",
      key: "DomainsetCount",
      width: 80,
      render: (_, row) =>
        access.domainsetPageListApiOpsDomainsets ? (
          <a onClick={() => setSelectedEnvToViewDomainsets(row)}>
            {row.DomainsetVersionIds?.length ?? 0}
          </a>
        ) : (
          row.IpsetVersionIds?.length ?? 0
        ),
    },
    {
      title: "运维",
      dataIndex: "Ops",
      render: (_, row) => (
        <TableCellEllipsisList
          items={row.Ops}
          renderItem={(row) => row.PersonName}
        />
      ),
      width: 80,
    },
    {
      title: "QA",
      dataIndex: "Qa",
      render: (_, row) => (
        <TableCellEllipsisList
          items={row.Qa}
          renderItem={(row) => row.PersonName}
        />
      ),
      width: 80,
    },
    {
      title: "销售",
      dataIndex: "Sale",
      render: (_, row) => (
        <TableCellEllipsisList
          items={row.Sale}
          renderItem={(row) => row.PersonName}
        />
      ),
      width: 80,
    },
    {
      title: "技术支持",
      dataIndex: "Support",
      render: (_, row) => (
        <TableCellEllipsisList
          items={row.Support}
          renderItem={(row) => row.PersonName}
        />
      ),
      width: 80,
    },
    {
      title: "官网链接",
      dataIndex: "DomainName",
      width: 300,
      ellipsis: true,
      render: (_, row) => (
        <a href={row.DomainName} target="_blank" rel="noreferrer">
          {row.DomainName}
        </a>
      ),
    },
    {
      title: "API链接",
      dataIndex: "ApiDomainName",
      copyable: true,
      width: 300,
      ellipsis: true,
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
              onClick: () => setSelectedEnvToUpdate(row),
              disabled: !access.envUpdateApiCmdbEnvsByUid,
            },
            {
              text: "删除",
              onClick: () => showDeleteConfirm(row),
              danger: true,
              disabled: !access.envDeleteApiCmdbEnvsByUid,
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
        name="env"
        actionRef={tableRef}
        columns={columns}
        rowKey="Uid"
        searchPlaceholder="请输入环境名称查询"
        request={envPageListApiCmdbEnvs}
        toolbar={{
          actions: [
            <EnvCreateModalForm
              key="env-create"
              onFinish={() => tableRef.current?.reload()}
            />,
          ],
        }}
        defaultColumnsState={columnsState}
      />

      <EnvUpdateModalForm
        open={selectedEnvToUpdate !== undefined}
        onCancel={() => setSelectedEnvToUpdate(undefined)}
        env={selectedEnvToUpdate}
        onFinish={() => tableRef.current?.reload(false)}
      />
      <IpsetTableModal
        open={!!selectedEnvToViewIpsets}
        onCancel={() => setSelectedEnvToViewIpsets(undefined)}
        env={selectedEnvToViewIpsets}
      />
      <DomainsetTableModal
        open={!!selectedEnvToViewDomainsets}
        onCancel={() => setSelectedEnvToViewDomainsets(undefined)}
        env={selectedEnvToViewDomainsets}
      />
    </>
  )
}
