import IpsetOnlineModal from "@/components/ipset-online-modal"
import IpsetPushModal from "@/components/ipset-push-modal"
import Table, { TableColumns, TableColumnsState } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_DESC_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
} from "@/constants/table"
import { useQueryEnvOptions, useQueryIpSetTagOptions } from "@/lib/hooks/data"
import { useToken } from "@/lib/hooks/use-token"
import { tableCellDatetimePostProcess } from "@/lib/utils"
import {
  ipsetDeleteApiOpsIpsetsById,
  ipsetPageListApiOpsIpsets,
} from "@/services/ops/ipset"
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
import IpSetBaseUpdateFormDrawer from "./ipset-base-update-form-drawer"
import IpSetCreateFromDrawer from "./ipset-create-form-drawer"
import IpsetInfoModal from "./ipset-info-modal"
import IpSetUpdateFormDrawer from "./ipset-update-form-drawer"

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

export default function IpsetTable({ initEnvUid }: { initEnvUid?: string }) {
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

  const [selectedIpsetToView, setSelectedIpsetToView] = useState<
    OPS.IpsetList | undefined
  >()
  const [selectedIpsetToUpdate, setSelectedIpsetToUpdate] = useState<
    OPS.IpsetList | undefined
  >()
  const [selectedIpSetToUpdateBase, setSelectedIpSetToUpdateBase] = useState<
    OPS.IpsetList | undefined
  >()

  const { data: ipSetTags } = useQueryIpSetTagOptions()
  const ipSetTagOptions = ipSetTags?.map((tag) => ({ value: tag, label: tag }))

  const showDeleteConfirm = (ipset: OPS.IpsetList) =>
    modal.confirm({
      title: "确定删除IP集吗？",
      icon: <ExclamationCircleOutlined />,
      content: `删除IP集 ${ipset.name} （版本：${ipset.version}）`,
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
      title: "名称",
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
              onClick: () => setSelectedIpSetToUpdateBase(row),
              disabled: !access.ipsetUpdateInfoApiOpsIpsetsByInfoid,
            },
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
        params={{ envUid, tags: tags?.join(","), overWall, autoUpdate }}
        request={ipsetPageListApiOpsIpsets}
        toolbar={{
          subTitle: (
            <div className="flex gap-2">
              <EnvSelect value={envUid} onChange={setEnvUid} />
              <Select
                mode="multiple"
                placeholder="标签"
                options={ipSetTagOptions}
                showSearch
                allowClear
                className="w-40"
                value={tags}
                onChange={setTags}
                maxTagCount="responsive"
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
              key="ipset-push"
              type="primary"
              onClick={() => setOpenPushModal(true)}
              disabled={!access.ipsetPushApiOpsIpsetsPush}
            >
              推送
            </Button>,
            <Button
              key="ipset-online"
              type="primary"
              onClick={() => setOpenOnlineModal(true)}
              disabled={!access.ipsetOnlineApiOpsIpsetsOnline}
            >
              上线
            </Button>,
            <Button
              key="ipset-create"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setOpenCreateDrawer(true)}
            >
              添加IP集
            </Button>,
          ],
        }}
        defaultColumnsState={columnsState}
      />
      <IpsetPushModal
        open={openPushModal}
        onCancel={() => setOpenPushModal(false)}
        onFinish={() => history.push("/business/ipset/push-records")}
      />
      <IpsetOnlineModal
        open={openOnlineModal}
        onCancel={() => setOpenOnlineModal(false)}
        onFinish={() => history.push("/business/ipset/push-records")}
      />
      <IpsetInfoModal
        open={!!selectedIpsetToView}
        onCancel={() => setSelectedIpsetToView(undefined)}
        ipset={selectedIpsetToView}
      />
      <IpSetCreateFromDrawer
        open={openCreateDrawer}
        onClose={() => setOpenCreateDrawer(false)}
        onFinish={() => tableRef.current?.reload()}
      />
      <IpSetUpdateFormDrawer
        ipSet={selectedIpsetToUpdate}
        open={!!selectedIpsetToUpdate}
        onClose={() => setSelectedIpsetToUpdate(undefined)}
        onFinish={() => tableRef.current?.reload(false)}
      />
      <IpSetBaseUpdateFormDrawer
        ipSet={selectedIpSetToUpdateBase}
        open={!!selectedIpSetToUpdateBase}
        onClose={() => setSelectedIpSetToUpdateBase(undefined)}
        onFinish={() => tableRef.current?.reload(false)}
      />
    </>
  )
}
