import Table, { TableColumns, TableColumnsState } from "@/components/table"
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_DESC_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
} from "@/constants/table"
import { tableCellDatetimePostProcess } from "@/lib/utils"
import { certRecordPageListApiOpsCertsRecords } from "@/services/ops/cert"
import { ActionType, useToken } from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Tag, message } from "antd"
import Paragraph from "antd/es/typography/Paragraph"
import { useRef, useState } from "react"
import CertIssuanceRecordCertTableModal from "./cert-issuance-record-cert-table-modal"

export default function CertIssuanceRecordTable() {
  const { token } = useToken()
  const tableRef = useRef<ActionType>()
  const access = useAccess()

  const [selectedRecordToView, setSelectedRecordToView] = useState<
    OPS.CertRecordList | undefined
  >(undefined)

  const columnsState: TableColumnsState = {
    id: { show: false },
    CreatedAt: { show: false },
    CreatedBy: { show: false },
    UpdatedAt: { show: false },
    UpdatedBy: { show: false },
  }

  const columns: TableColumns<OPS.CertRecordList> = [
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
    },
    {
      title: "标题",
      dataIndex: "title",
      copyable: true,
      fixed: "left",
      width: 240,
      render: (_, row) => (
        <Paragraph copyable={{ text: row.title }} style={{ marginBottom: 0 }}>
          <a
            onClick={() => {
              if (access.certRecordReadOneApiOpsCertsByRecordsid) {
                setSelectedRecordToView(row)
              } else {
                message.error("抱歉，没有查看下发记录详情的权限")
              }
            }}
          >
            {row.title}
          </a>
        </Paragraph>
      ),
    },
    {
      title: "下发时间",
      dataIndex: "orderTime",
      valueType: "dateTime",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (dom, row) => tableCellDatetimePostProcess(dom, row.orderTime),
    },
    {
      title: "状态",
      dataIndex: "state",
      width: 80,
      render: (_, row) => (
        <Tag color={row.state ? token.colorSuccess : token.colorError}>
          {row.state ? "成功" : "失败"}
        </Tag>
      ),
    },
    {
      title: "创建者",
      dataIndex: "CreatedBy",
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      title: "创建时间",
      dataIndex: "CreatedAt",
      valueType: "dateTime",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (dom, row) => tableCellDatetimePostProcess(dom, row.CreatedAt),
    },
    {
      title: "更新者",
      dataIndex: "UpdatedBy",
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      title: "更新时间",
      dataIndex: "UpdatedAt",
      valueType: "dateTime",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (dom, row) => tableCellDatetimePostProcess(dom, row.UpdatedAt),
    },
    {
      title: "备注",
      dataIndex: "description",
      ellipsis: true,
      width: TABLE_CELL_DESC_WIDTH,
    },
  ]

  return (
    <>
      <Table
        name="cert-issuance-record"
        searchPlaceholder="请输入标题查询"
        actionRef={tableRef}
        columns={columns}
        rowKey="id"
        request={certRecordPageListApiOpsCertsRecords}
        defaultColumnsState={columnsState}
      />
      <CertIssuanceRecordCertTableModal
        open={!!selectedRecordToView}
        onCancel={() => setSelectedRecordToView(undefined)}
        record={selectedRecordToView}
      />
    </>
  )
}
