import IpsetOnlineModal from "@/components/ipset-online-modal"
import IpsetPushModal from "@/components/ipset-push-modal"
import Table, { TableColumns, TableColumnsState } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_DESC_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
} from "@/constants/table"
import {
  useQueryIpsetEnvOptions,
  useQueryIpsetVersionOptions,
} from "@/lib/hooks/data"
import { useToken } from "@/lib/hooks/use-token"
import { tableCellDatetimePostProcess } from "@/lib/utils"
import { ipsetPushRecordsPageListApiOpsIpsetsPushrecords } from "@/services/ops/ipset"
import { ActionType } from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Button, Select, Tag } from "antd"
import Paragraph from "antd/es/typography/Paragraph"
import { useRef, useState } from "react"
import RecordBackModalForm from "./record-back-modal-form"
import RecordInfoModal from "./record-info-modal"

const filterOption = (input: string, option?: { label: string; value: any }) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase())

function EnvSelect({
  value,
  onChange,
}: {
  value?: string
  onChange?: (envUid?: string) => void
}) {
  const options = useQueryIpsetEnvOptions()

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

function IpsetSelect({
  value,
  onChange,
}: {
  value?: number
  onChange?: (ipsetId?: number) => void
}) {
  const options = useQueryIpsetVersionOptions()

  return (
    <Select
      value={value}
      options={options.data?.map((item) => ({
        label: item.name,
        value: item.Id,
      }))}
      filterOption={filterOption}
      placeholder="ipset"
      style={{ width: 140 }}
      onChange={onChange}
      allowClear
      showSearch
    />
  )
}

export default function RecordTable() {
  const { token } = useToken()
  const access = useAccess()
  const tableRef = useRef<ActionType>()

  const [envUid, setEnvUid] = useState<string | undefined>()
  const [ipsetId, setIpsetId] = useState<number | undefined>()

  const [openPushModal, setOpenPushModal] = useState(false)
  const [openOnlineModal, setOpenOnlineModal] = useState(false)

  const [selectedRecordToView, setSelectedRecordToView] = useState<
    OPS.IpsetPushRecord | undefined
  >()
  const [selectedRecordToBack, setSelectedRecordToBack] = useState<
    OPS.IpsetPushRecord | undefined
  >()

  const columnsState: TableColumnsState = {}

  const columns: TableColumns<OPS.IpsetPushRecord> = [
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 200,
      copyable: true,
      render: access.ipsetPushRecordsReadOneApiOpsIpsetsByPushrecordsid
        ? (_, row) => (
            <Paragraph
              copyable={{ text: row.title }}
              style={{ marginBottom: 0 }}
            >
              <a onClick={() => setSelectedRecordToView(row)}>{row.title}</a>
            </Paragraph>
          )
        : undefined,
    },
    {
      title: "类型",
      dataIndex: "pushType",
      width: 80,
      render: (_, row) => (
        <>
          <Tag
            color={
              row.pushType === "online"
                ? token.colorSuccess
                : row.pushType === "push"
                ? token.colorWarning
                : token.colorError
            }
          >
            {row.pushType === "online"
              ? "上线"
              : row.pushType === "push"
              ? "推送"
              : "回退"}
          </Tag>
        </>
      ),
    },

    {
      title: "立即生效",
      dataIndex: "pushNow",
      width: 80,
      render: (_, row) => (
        <Tag color={row.pushNow ? token.colorSuccess : token.colorError}>
          {row.pushNow ? "是" : "否"}
        </Tag>
      ),
    },
    {
      title: "回退ID",
      dataIndex: "backRecordId",
      width: 80,
      renderText: (value) => (value === 0 ? "-" : value),
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
              text: "回退",
              onClick: () => setSelectedRecordToBack(row),
              disabled:
                row.pushType === "back" || !access.ipsetBackApiOpsIpsetsBack,
            },
          ]}
        />
      ),
    },
  ]

  return (
    <>
      <Table
        name="ipset-push-record"
        actionRef={tableRef}
        columns={columns}
        rowKey="id"
        searchPlaceholder="请输入标题查询"
        params={{
          envUid,
          ipsetId,
        }}
        request={ipsetPushRecordsPageListApiOpsIpsetsPushrecords}
        toolbar={{
          subTitle: (
            <div className="flex items-center gap-2">
              <EnvSelect onChange={setEnvUid} />
              <IpsetSelect onChange={setIpsetId} />
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
          ],
        }}
        defaultColumnsState={columnsState}
      />
      <IpsetPushModal
        open={openPushModal}
        onCancel={() => setOpenPushModal(false)}
        onFinish={() => tableRef.current?.reload()}
      />
      <IpsetOnlineModal
        open={openOnlineModal}
        onCancel={() => setOpenOnlineModal(false)}
        onFinish={() => tableRef.current?.reload()}
      />
      <RecordInfoModal
        open={!!selectedRecordToView}
        onCancel={() => setSelectedRecordToView(undefined)}
        record={selectedRecordToView}
      />
      <RecordBackModalForm
        open={!!selectedRecordToBack}
        onCancel={() => setSelectedRecordToBack(undefined)}
        record={selectedRecordToBack}
        onFinish={() => tableRef.current?.reload(false)}
      />
    </>
  )
}
