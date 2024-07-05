import Editable from "@/components/editable"
import Table, { TableColumns } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import { certDryRunStateDict, certStateDict, dictGet } from "@/constants/dict"
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_UID_WIDTH,
  TABLE_MODAL_HEIGHT,
} from "@/constants/table"
import { certUpdateUseStateApiOpsCertsByUsestateid } from "@/services/ops/cert"
import {
  domainDryPushApiOpsDomainsDrypush,
  domainPushApiOpsDomainsPush,
} from "@/services/ops/domain"
import { ActionType } from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { message, Select, Tag } from "antd"
import { useRef } from "react"

async function certExport(cert: OPS.CertInfo) {
  const token = localStorage.getItem("token")

  try {
    const res = await fetch(`/api/ops/certs/export/${cert.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
    })

    const blob = await res.blob()

    const url = window.URL.createObjectURL(blob)

    let filename = "certs.zip"

    const disposition = res.headers.get("Content-Disposition")
    if (disposition && disposition.indexOf("attachment") !== -1) {
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
      let matches = filenameRegex.exec(disposition)
      if (matches !== null && matches[1]) {
        filename = matches[1].replace(/['"]/g, "")
      }
    }

    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()

    window.URL.revokeObjectURL(url)
  } catch (error) {
    message.error("导出证书失败")
  }
}

export interface CertTableProps {
  domainId: number
  certs: OPS.CertInfo[]
  onFinish?: VoidFunction
}

export default function CertTable({
  domainId,
  certs,
  onFinish,
}: CertTableProps) {
  const access = useAccess()
  const tableRef = useRef<ActionType>()

  const columns: TableColumns<OPS.CertInfo> = [
    {
      title: "名称",
      dataIndex: "certName",
      width: 200,
    },
    {
      title: "ID",
      dataIndex: "id",
      width: TABLE_CELL_UID_WIDTH,
    },
    {
      title: "签发时间",
      dataIndex: "notBefore",
      width: TABLE_CELL_DATETIME_WIDTH,
    },
    {
      title: "过期时间",
      dataIndex: "notAfter",
      width: TABLE_CELL_DATETIME_WIDTH,
    },
    {
      title: "证书ID",
      dataIndex: "certId",
      width: 100,
    },
    {
      title: "使用状态",
      dataIndex: "useState",
      width: 120,
      render: (_, row) => (
        <Editable
          disabled={!access.certUpdateUseStateApiOpsCertsByUsestateid}
          value={row.useState}
          control={
            <Select
              options={Object.entries(certStateDict).map(([key, value]) => ({
                label: value.value,
                value: key,
              }))}
              style={{ width: 100 }}
            />
          }
          onFinish={async (value) => {
            await certUpdateUseStateApiOpsCertsByUsestateid(
              { id: String(row.id) },
              { useState: value },
            )
            onFinish?.()
          }}
        >
          <Tag color={dictGet(row.useState, certStateDict)?.borderColor}>
            {dictGet(row.useState, certStateDict)?.value ?? row.useState}
          </Tag>
        </Editable>
      ),
    },
    {
      title: "预下发状态",
      dataIndex: "dryPushState",
      width: 120,
      render: (_, row) => (
        <Tag
          color={dictGet(row.dryPushState, certDryRunStateDict)?.borderColor}
        >
          {dictGet(row.dryPushState, certDryRunStateDict)?.value ??
            row.dryPushState}
        </Tag>
      ),
    },
    {
      title: "云商",
      dataIndex: "cloud",
      width: 200,
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
              text: "预下发",
              disabled: !access.domainDryPushApiOpsDomainsDrypush,
              onClick: async () => {
                const { data } = await domainDryPushApiOpsDomainsDrypush({
                  certid: row.id,
                  id: domainId,
                })
                if (data?.dryPushState === "SUCCESS") {
                  message.success(data.message)
                } else if (data?.dryPushState === "FAILURE") {
                  message.error(data.message)
                } else {
                  message.info(data?.message)
                }
              },
            },
            {
              text: "下发",
              disabled: !access.domainPushApiOpsDomainsPush,
              onClick: async () => {
                const { data } = await domainPushApiOpsDomainsPush({
                  certid: row.id,
                  id: domainId,
                })
                if (data?.PushState === "SUCCESS") {
                  message.success(data.message)
                } else if (data?.PushState === "FAILURE") {
                  message.error(data.message)
                } else {
                  message.info(data?.message)
                }
              },
            },
            {
              text: "导出",
              disabled: !access.certExportApiOpsCertsByExportid,
              onClick: () => certExport(row),
            },
          ]}
        />
      ),
    },
  ]

  return (
    <Table
      name="cert"
      actionRef={tableRef}
      columns={columns}
      rowKey="id"
      dataSource={certs}
      scroll={{ y: TABLE_MODAL_HEIGHT }}
      className="cert-table"
    />
  )
}
