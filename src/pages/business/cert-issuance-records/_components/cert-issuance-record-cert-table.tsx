import Table, { TableColumns } from "@/components/table"
import { TABLE_MODAL_HEIGHT } from "@/constants/table"
import { certRecordReadOneApiOpsCertsByRecordsid } from "@/services/ops/cert"
import { ActionType, useToken } from "@ant-design/pro-components"
import { Tag } from "antd"
import { useRef, useState } from "react"
import HostPushRecordTableModal from "./host-push-record-table-modal"

export interface CertIssuanceRecordCertTableProps {
  recordId: number
}

export default function CertIssuanceRecordCertTable({
  recordId,
}: CertIssuanceRecordCertTableProps) {
  const { token } = useToken()
  const tableRef = useRef<ActionType>()

  const [selectedRecordToViewHosts, setSelectedRecordToViewHosts] = useState<
    OPS.CertRecordCert | undefined
  >(undefined)

  const columns: TableColumns<OPS.CertRecordCert> = [
    {
      title: "证书名称",
      dataIndex: "certName",
      copyable: true,
      fixed: "left",
      width: 260,
    },
    {
      title: "证书ID",
      dataIndex: "certId",
      width: 160,
      copyable: true,
    },
    {
      title: "域名",
      dataIndex: "domain",
      width: 300,
      copyable: true,
    },
    {
      title: "复核域名",
      dataIndex: "reviewState",
      width: 80,
      render: (_, row) => (
        <Tag color={row.reviewState ? token.colorSuccess : token.colorError}>
          {row.reviewState ? "成功" : "失败"}
        </Tag>
      ),
    },
    {
      title: "主机数量",
      key: "hostCount",
      width: 100,
      render: (_, row) => (
        <a onClick={() => setSelectedRecordToViewHosts(row)}>
          {row.hostPushRecords?.length ?? 0}
        </a>
      ),
    },
    {
      title: "消息",
      dataIndex: "message",
      width: 300,
    },
  ]

  return (
    <>
      <Table
        name="cert-issuance-record-cert"
        actionRef={tableRef}
        columns={columns}
        rowKey="certId"
        searchPlaceholder="请输入证书名称/域名查询"
        params={{ id: String(recordId) }}
        request={certRecordReadOneApiOpsCertsByRecordsid}
        scroll={{
          y: TABLE_MODAL_HEIGHT,
        }}
      />
      <HostPushRecordTableModal
        open={!!selectedRecordToViewHosts}
        onCancel={() => setSelectedRecordToViewHosts(undefined)}
        certIssuanceRecordCert={selectedRecordToViewHosts}
      />
    </>
  )
}
