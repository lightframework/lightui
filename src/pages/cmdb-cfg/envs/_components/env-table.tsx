import EditableOwnersCell from "@/components/editable-owners-cell"
import EditablePipelineCell from "@/components/editable-pipeline-cell"
import Table, { TableColumns, TableColumnsState } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import TableCellEllipsisList from "@/components/table-cell-ellipsis-list"
import { ciStageStateDict, dictGet } from "@/constants/dict"
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_DESC_WIDTH,
  TABLE_CELL_UID_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
} from "@/constants/table"
import { tableCellDatetimePostProcess } from "@/lib/utils"
import {
  envDeleteApiCmdbEnvsByUid,
  envLockApiCmdbEnvsLock,
  envPageListApiCmdbEnvs,
} from "@/services/cmdb/env"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { Link, useAccess, useModel } from "@umijs/max"
import { Button, Switch, Tag, message } from "antd"
import useModal from "antd/es/modal/useModal"
import { useRef, useState } from "react"
import EnvFormDrawer from "./env-form-drawer"

export default function EnvTable() {
  const access = useAccess()
  const [modal, contextHolder] = useModal()
  const tableRef = useRef<ActionType>()
  const { initialState } = useModel("@@initialState")
  const currentUser = initialState?.currentUser

  const [openFormDrawer, setOpenFormDrawer] = useState(false)

  const [selectedEnvToUpdate, setSelectedEnvToUpdate] = useState<
    CMDB.EnvInfo | undefined
  >()

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
      title: "状态",
      dataIndex: "State",
      width: 80,
      render: (_, row) =>
        row.State ? (
          <Tag
            color={
              row.State === "ONLINE"
                ? "green"
                : row.State === "TEST"
                  ? "orange"
                  : undefined
            }
          >
            {row.State === "ONLINE"
              ? "线上"
              : row.State === "TEST"
                ? "测试"
                : row.State === "GRAY"
                  ? "灰度"
                  : row.State}
          </Tag>
        ) : (
          "-"
        ),
    },
    {
      title: "Owners",
      dataIndex: "Owners",
      width: 240,
      render: (_, row) => (
        <EditableOwnersCell
          envUid={row.Uid}
          owners={row.Owners}
          onFinish={() => tableRef.current?.reload()}
        />
      ),
    },
    {
      title: "流水线",
      dataIndex: "Pipline",
      width: 160,
      render: (_, row) => (
        <EditablePipelineCell
          envUid={row.Uid}
          pipeline={row.Pipline}
          onFinish={() => tableRef.current?.reload()}
        />
      ),
    },
    {
      title: "流水线状态",
      dataIndex: "PiplineState",
      width: 100,
      render: (_, row) =>
        row.PiplineState ? (
          <Tag color={dictGet(row.PiplineState, ciStageStateDict)?.color}>
            {dictGet(row.PiplineState, ciStageStateDict)?.value ??
              row.PiplineState}
          </Tag>
        ) : null,
    },
    {
      title: "锁定",
      dataIndex: "Locker",
      width: 100,
      render: (_, row) => {
        return (
          <Switch
            checked={!!row.Locker}
            onChange={async (checked) => {
              await envLockApiCmdbEnvsLock({ uid: row.Uid, Lock: checked })
              tableRef.current?.reload(false)
            }}
            disabled={
              !access.envLockApiCmdbEnvsLock ||
              (!!row.Locker && row.Locker !== currentUser?.username)
            }
            checkedChildren={row.Locker}
          />
        )
      },
    },
    {
      title: "IP集数量",
      key: "IpsetCount",
      width: 80,
      render: (_, row) => (
        <Link to={`/business/ipset/ipset?envUid=${row.Uid}`} target="_blank">
          {row.IpsetVersionIds?.length ?? 0}
        </Link>
      ),
    },
    {
      title: "域名集数量",
      key: "DomainsetCount",
      width: 80,
      render: (_, row) => (
        <Link
          to={`/business/domainset/domainset?envUid=${row.Uid}`}
          target="_blank"
        >
          {row.DomainsetVersionIds?.length ?? 0}
        </Link>
      ),
    },
    {
      title: "运维",
      dataIndex: "Ops",
      render: (_, row) => (
        <TableCellEllipsisList
          items={row.Ops}
          renderItem={(row) => row.NickName}
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
          renderItem={(row) => row.NickName}
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
          renderItem={(row) => row.NickName}
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
          renderItem={(row) => row.NickName}
        />
      ),
      width: 80,
    },
    {
      title: " Orch处理器架构",
      dataIndex: "OsType",
      width: 120,
    },
    {
      title: "Orch部署架构",
      dataIndex: "EnvType",
      width: 100,
    },
    {
      title: "Orch语言",
      dataIndex: "EnvLanguage",
      width: 100,
      render: (_, row) =>
        row.EnvLanguage === "cn"
          ? "中文"
          : row.EnvLanguage === "us"
            ? "英文"
            : row.EnvLanguage,
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
              onClick: () => {
                setOpenFormDrawer(true)
                setSelectedEnvToUpdate(row)
              },
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
            <Button
              key="add"
              type="primary"
              onClick={() => setOpenFormDrawer(true)}
              disabled={!access.EnvCreateApiCmdbEnvs}
            >
              新建
            </Button>,
          ],
        }}
        defaultColumnsState={columnsState}
      />
      <EnvFormDrawer
        open={openFormDrawer}
        onClose={() => {
          setOpenFormDrawer(false)
          setSelectedEnvToUpdate(undefined)
        }}
        env={selectedEnvToUpdate}
        onFinish={() => tableRef.current?.reload()}
      />
    </>
  )
}
