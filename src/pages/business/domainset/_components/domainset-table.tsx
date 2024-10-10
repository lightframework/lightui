import DomainsetOnlineModal from "@/components/domainset-online-modal"
import DomainsetPushModal from "@/components/domainset-push-modal"
import Table, { TableColumns, TableColumnsState } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_DESC_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
} from "@/constants/table"
import {
  useQueryDomainSetTagOptions,
  useQueryEnvOptions,
} from "@/lib/hooks/data"
import { useToken } from "@/lib/hooks/use-token"
import { tableCellDatetimePostProcess } from "@/lib/utils"
import {
  domainsetDeleteApiOpsDomainsetsById,
  domainsetPageListApiOpsDomainsets,
} from "@/services/ops/domainset"
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { history, useAccess } from "@umijs/max"
import { Button, Flex, Select, Tag, message } from "antd"
import useModal from "antd/es/modal/useModal"
import Paragraph from "antd/es/typography/Paragraph"
import { useRef, useState } from "react"
import UsageAccessUnitTable from "../../ipset/_components/usage-accessunit-table"
import DomainSetBaseUpdateFormDrawer from "./domainset-base-update-form-drawer"
import DomainSetCreateFromDrawer from "./domainset-create-form-drawer"
import DomainsetInfoModal from "./domainset-info-modal"
import DomainSetUpdateFormDrawer from "./domainset-update-form-drawer"

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

export default function DomainsetTable({
  initEnvUid,
}: {
  initEnvUid?: string
}) {
  const { token } = useToken()
  const access = useAccess()
  const [modal, contextHolder] = useModal()
  const tableRef = useRef<ActionType>()

  const [envUid, setEnvUid] = useState<string | undefined>(initEnvUid)
  const [tags, setTags] = useState<string[] | undefined>()
  const [overWall, setOverWall] = useState<number | undefined>()
  const [autoUpdate, setAutoUpdate] = useState<number | undefined>()

  const [openCreateDrawer, setOpenCreateDrawer] = useState(false)

  const [openOnlineModal, setOpenOnlineModal] = useState(false)
  const [openPushModal, setOpenPushModal] = useState(false)

  const [selectedDomainsetToView, setSelectedDomainsetToView] = useState<
    OPS.DomainsetList | undefined
  >()
  const [selectedDomainsetToUpdate, setSelectedDomainsetToUpdate] = useState<
    OPS.DomainsetList | undefined
  >()
  const [selectedDomainsetToUpdateBase, setSelectedDomainsetToUpdateBase] =
    useState<OPS.DomainsetList | undefined>()

  const { data: domainSetTags } = useQueryDomainSetTagOptions()
  const domainSetTagOptions = domainSetTags?.map((tag) => ({
    value: tag,
    label: tag,
  }))

  const showDeleteConfirm = (domainset: OPS.DomainsetList) =>
    modal.confirm({
      title: "确定删除DomainSet吗？",
      icon: <ExclamationCircleOutlined />,
      content: `删除DomainSet ${domainset.name} （版本：${domainset.version}）`,
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
      title: "标签",
      key: "tags",
      width: 240,
      render: (_, row) => (
        <Flex
          gap={4}
          style={{
            flexWrap: "wrap",
          }}
        >
          {row.tags?.map((item) => (
            <Tag key={item} color="blue">
              {item}
            </Tag>
          ))}
        </Flex>
      ),
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
      title: "引用单元",
      dataIndex: "accessUnit",
      width: 100,
      render: (_, row) => (
        <Button
          size="small"
          type="link"
          onClick={() =>
            modal.info({
              title: `${row.name} - 引用单元`,
              icon: null,
              okText: "确认",
              width: "80dvw",
              content: <UsageAccessUnitTable ids={row.auIds ?? []} />,
            })
          }
        >
          {row.auIds?.length ?? 0}
        </Button>
      ),
    },
    {
      title: "支持FQ",
      dataIndex: "overWall",
      width: 80,
      render: (_, row) =>
        row.overWall === 2 ? (
          <CheckCircleOutlined style={{ color: token.colorSuccess }} />
        ) : row.overWall === 1 ? (
          <CloseCircleOutlined />
        ) : null,
    },
    {
      title: "自动更新",
      dataIndex: "autoUpdate",
      width: 80,
      render: (_, row) =>
        row.autoUpdate === 2 ? (
          <CheckCircleOutlined style={{ color: token.colorSuccess }} />
        ) : row.autoUpdate === 1 ? (
          <CloseCircleOutlined />
        ) : null,
    },
    {
      title: "支持API",
      dataIndex: "officialSupportApi",
      width: 80,
      render: (_, row) =>
        row.officialSupportApi === 2 ? (
          <CheckCircleOutlined style={{ color: token.colorSuccess }} />
        ) : row.officialSupportApi === 1 ? (
          <CloseCircleOutlined />
        ) : null,
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
      width: 200,
      fixed: "right",
      render: (_, row) => (
        <TableCellActions
          actions={[
            {
              text: "编辑基础信息",
              onClick: () => setSelectedDomainsetToUpdateBase(row),
              disabled: !access.domainsetUpdateInfoApiOpsDomainsetsByInfoid,
            },
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
        params={{ envUid, tags: tags?.join(",") }}
        request={domainsetPageListApiOpsDomainsets}
        toolbar={{
          subTitle: (
            <div className="flex gap-2">
              <EnvSelect value={envUid} onChange={setEnvUid} />
              <Select
                mode="multiple"
                placeholder="标签"
                options={domainSetTagOptions}
                showSearch
                allowClear
                className="w-40"
                value={tags}
                onChange={setTags}
              />
              <Select
                placeholder="FQ"
                allowClear
                style={{ width: 100 }}
                options={[
                  { value: 1, label: "不支持FQ" },
                  { value: 2, label: "支持FQ" },
                  { value: 3, label: "无" },
                ]}
                value={overWall}
                onChange={setOverWall}
              />
              <Select
                placeholder="自动更新"
                allowClear
                style={{ width: 100 }}
                options={[
                  { value: 1, label: "手动更新" },
                  { value: 2, label: "自动更新" },
                  { value: 3, label: "无" },
                ]}
                value={autoUpdate}
                onChange={setAutoUpdate}
              />
            </div>
          ),
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
            <Button
              key="ipset-create"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setOpenCreateDrawer(true)}
            >
              添加DomainSet
            </Button>,
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
      <DomainSetCreateFromDrawer
        open={openCreateDrawer}
        onClose={() => setOpenCreateDrawer(false)}
        onFinish={() => tableRef.current?.reload()}
      />
      <DomainSetUpdateFormDrawer
        domainSet={selectedDomainsetToUpdate}
        open={!!selectedDomainsetToUpdate}
        onClose={() => setSelectedDomainsetToUpdate(undefined)}
        onFinish={() => tableRef.current?.reload(false)}
      />
      <DomainSetBaseUpdateFormDrawer
        domainSet={selectedDomainsetToUpdateBase}
        open={!!selectedDomainsetToUpdateBase}
        onClose={() => setSelectedDomainsetToUpdateBase(undefined)}
        onFinish={() => tableRef.current?.reload(false)}
      />
    </>
  )
}
