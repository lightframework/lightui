import DomainsetOnlineModal from "@/components/domainset-online-modal"
import DomainsetPushModal from "@/components/domainset-push-modal"
import Table, { TableColumns, TableColumnsState } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_DESC_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
} from "@/constants/table"
import { useQueryEnvOptions } from "@/lib/hooks/data"
import { useToken } from "@/lib/hooks/use-token"
import { tableCellDatetimePostProcess } from "@/lib/utils"
import {
  domainsetDeleteApiOpsDomainsetsById,
  domainsetPageListApiOpsDomainsets,
} from "@/services/ops/domainset"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { history, useAccess } from "@umijs/max"
import { Button, Select, Tag, message } from "antd"
import useModal from "antd/es/modal/useModal"
import Paragraph from "antd/es/typography/Paragraph"
import { useRef, useState } from "react"
import DomainCreateModalForm from "./domainset-create-modal-form"
import DomainsetInfoModal from "./domainset-info-modal"
import DomainsetUpdateModalForm from "./domainset-update-modal-form"

const filterOption = (
  input: string,
  option?: { label: string; value: string },
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())

function EnvSelect({
  value,
  onChange,
}: {
  value?: string
  onChange?: (envUid?: string) => void
}) {
  const options = useQueryEnvOptions()

  return (
    <Select
      value={value}
      options={options.data?.map((item) => ({
        label: item.EnvName,
        value: item.Uid,
      }))}
      filterOption={filterOption}
      placeholder="环境"
      style={{ width: 140 }}
      onChange={onChange}
      allowClear
      showSearch
    />
  )
}

export default function DomainsetTable() {
  const { token } = useToken()
  const access = useAccess()
  const [modal, contextHolder] = useModal()
  const tableRef = useRef<ActionType>()

  const [envUid, setEnvUid] = useState<string>()

  const [openOnlineModal, setOpenOnlineModal] = useState(false)
  const [openPushModal, setOpenPushModal] = useState(false)

  const [selectedDomainsetToView, setSelectedDomainsetToView] = useState<
    OPS.DomainsetList | undefined
  >()
  const [selectedDomainsetToUpdate, setSelectedDomainsetToUpdate] = useState<
    OPS.DomainsetList | undefined
  >()

  const showDeleteConfirm = (domainset: OPS.DomainsetList) =>
    modal.confirm({
      title: "确定删除域名集吗？",
      icon: <ExclamationCircleOutlined />,
      content: `删除域名集 ${domainset.name} （版本：${domainset.version}）`,
      onOk: async () => {
        await domainsetDeleteApiOpsDomainsetsById({ id: String(domainset.id) })
        message.success("删除成功")
        tableRef.current?.reload(false)
      },
    })

  const columnsState: TableColumnsState = {
    id: { show: false },
  }

  const columns: TableColumns<OPS.DomainsetList> = [
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
    },
    {
      title: "名称",
      dataIndex: "name",
      width: 140,
      render: (_, row) => (
        <Paragraph copyable={{ text: row.name }} style={{ marginBottom: 0 }}>
          <a onClick={() => setSelectedDomainsetToView(row)}>{row.name}</a>
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
              onClick: () => setSelectedDomainsetToUpdate(row),
              disabled: !access.domainsetUpdateApiOpsDomainsetsById,
            },
            {
              text: "删除",
              onClick: () => showDeleteConfirm(row),
              danger: true,
              disabled: !access.domainsetDeleteApiOpsDomainsetsById,
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
        name="domainset"
        actionRef={tableRef}
        columns={columns}
        rowKey="id"
        searchPlaceholder="请输入名称/域名查询"
        params={{ envUid }}
        request={domainsetPageListApiOpsDomainsets}
        toolbar={{
          subTitle: <EnvSelect value={envUid} onChange={setEnvUid} />,
          actions: [
            <Button
              key="domain-push"
              type="primary"
              onClick={() => setOpenPushModal(true)}
              disabled={!access.domainsetPushApiOpsDomainsetsPush}
            >
              推送
            </Button>,
            <Button
              key="domain-online"
              type="primary"
              onClick={() => setOpenOnlineModal(true)}
              disabled={!access.domainsetOnlineApiOpsDomainsetsOnline}
            >
              上线
            </Button>,
            <DomainCreateModalForm
              key="domain-create"
              onFinish={() => tableRef.current?.reload()}
            />,
          ],
        }}
        defaultColumnsState={columnsState}
      />
      <DomainsetPushModal
        open={openPushModal}
        onCancel={() => setOpenPushModal(false)}
        onFinish={() => history.push("/business/domainset/push-records")}
      />
      <DomainsetOnlineModal
        open={openOnlineModal}
        onCancel={() => setOpenOnlineModal(false)}
        onFinish={() => history.push("/business/domainset/push-records")}
      />
      <DomainsetInfoModal
        open={!!selectedDomainsetToView}
        onCancel={() => setSelectedDomainsetToView(undefined)}
        domainset={selectedDomainsetToView}
      />
      <DomainsetUpdateModalForm
        open={!!selectedDomainsetToUpdate}
        onCancel={() => setSelectedDomainsetToUpdate(undefined)}
        domainset={selectedDomainsetToUpdate}
        onFinish={() => tableRef.current?.reload(false)}
      />
    </>
  )
}
