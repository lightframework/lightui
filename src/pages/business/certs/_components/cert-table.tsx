import Table, { TableColumns, TableColumnsState } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import TableCellEllipsisList from "@/components/table-cell-ellipsis-list"
import { certStateDict, certUseStateDict, dictGet } from "@/constants/dict"
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_DESC_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
} from "@/constants/table"
import { tableCellDatetimePostProcess } from "@/lib/utils"
import {
  certAlarmApiOpsCertsAlarm,
  certDeleteApiOpsCertsById,
  certPageListApiOpsCerts,
  certRefreshApiOpsCertsByRefreshid,
  certSyncApiOpsCertsSync,
} from "@/services/ops/cert"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { history, useAccess } from "@umijs/max"
import { Button, Tag, message } from "antd"
import useModal from "antd/es/modal/useModal"
import { useRef, useState } from "react"
import CertCreateModalForm from "./cert-create-modal-form"
import CertIssuanceModalForm from "./cert-issuance-modal-form"
import CertUpdateModalForm from "./cert-update-modal-form"

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

export default function CertTable() {
  const tableRef = useRef<ActionType>()
  const access = useAccess()
  const [modal, contextHolder] = useModal()

  const [selectedCertToUpdate, setSelectedCertToUpdate] = useState<
    OPS.CertInfo | undefined
  >(undefined)

  const showDeleteConfirm = (cert: OPS.CertInfo) =>
    modal.confirm({
      title: "确定删除证书吗？",
      icon: <ExclamationCircleOutlined />,
      content: `删除证书 ${cert.certName}（${cert.domain}）`,
      onOk: async () => {
        await certDeleteApiOpsCertsById({ id: String(cert.id) })
        message.success("删除成功")
        tableRef.current?.reload(false)
      },
    })

  const showSyncConfirm = () =>
    modal.confirm({
      title: "确定要同步证书吗？",
      icon: <ExclamationCircleOutlined />,
      content: "同步所有证书信息",
      onOk: async () => {
        certSyncApiOpsCertsSync()
        message.info("请稍后刷新查看")
      },
    })

  const columnsState: TableColumnsState = {
    id: { show: false },
    CreatedAt: { show: false },
    CreatedBy: { show: false },
    UpdatedAt: { show: false },
    UpdatedBy: { show: false },
  }

  const columns: TableColumns<OPS.CertInfo> = [
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
    },
    {
      title: "证书名称",
      dataIndex: "certName",
      copyable: true,
      fixed: "left",
      width: 280,
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
      title: "证书类型",
      dataIndex: "isAuto",
      width: 80,
      render: (_, row) => (
        <Tag color={row.isAuto ? "blue" : "green"}>
          {row.isAuto ? "云商证书" : "客户证书"}
        </Tag>
      ),
    },
    {
      title: "使用状态",
      dataIndex: "useState",
      width: 80,
      render: (_, row) => (
        <Tag
          color={dictGet(row.useState, certUseStateDict)?.bgColor}
          style={{
            color: "black",
            border: `1px solid ${
              dictGet(row.useState, certUseStateDict)?.borderColor ?? "black"
            }`,
          }}
        >
          {dictGet(row.useState, certUseStateDict)?.value ?? row.useState}
        </Tag>
      ),
    },
    {
      title: "证书状态",
      dataIndex: "certState",
      width: 80,
      render: (_, row) => (
        <Tag
          color={dictGet(row.certState, certStateDict)?.bgColor}
          style={{
            color: "black",
            border: `1px solid ${
              dictGet(row.certState, certStateDict)?.borderColor ?? "black"
            }`,
          }}
        >
          {dictGet(row.certState, certStateDict)?.value ?? row.certState}
        </Tag>
      ),
    },
    {
      title: "到期天数",
      dataIndex: "dueDays",
      width: 80,
    },
    {
      title: "签发时间",
      dataIndex: "notBefore",
      width: TABLE_CELL_DATETIME_WIDTH,
      valueType: "dateTime",
      render: (dom, row) => tableCellDatetimePostProcess(dom, row.notBefore),
    },
    {
      title: "过期时间",
      dataIndex: "notAfter",
      width: TABLE_CELL_DATETIME_WIDTH,
      valueType: "dateTime",
      render: (dom, row) => tableCellDatetimePostProcess(dom, row.notAfter),
    },
    {
      title: "云商",
      dataIndex: "cloud",
      width: 160,
    },

    {
      title: "主机",
      dataIndex: "hostList",
      width: 300,
      render: (_, row) => (
        <TableCellEllipsisList
          items={row.hostList}
          renderItem={(item) => item.name}
        />
      ),
    },
    {
      title: "端口",
      dataIndex: "port",
      width: 80,
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
    {
      title: "操作",
      key: "options",
      width: 180,
      fixed: "right",
      render: (_, row) => (
        <TableCellActions
          actions={[
            {
              text: "导出",
              onClick: () => certExport(row),
              disabled: !access.certExportApiOpsCertsByExportid,
            },
            {
              text: "刷新",
              onClick: async () => {
                await certRefreshApiOpsCertsByRefreshid({ id: String(row.id) })
                message.success("刷新成功")
              },
              disabled: !access.certRefreshApiOpsCertsByRefreshid,
            },
            {
              text: "编辑",
              onClick: () => setSelectedCertToUpdate(row),
              disabled: !access.certUpdateApiOpsCertsById,
            },
            {
              text: "删除",
              danger: true,
              onClick: () => showDeleteConfirm(row),
              disabled: row.isAuto || !access.certDeleteApiOpsCertsById,
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
        name="cert"
        searchPlaceholder="请输入证书名称/域名查询"
        actionRef={tableRef}
        columns={columns}
        rowKey="id"
        request={certPageListApiOpsCerts}
        defaultColumnsState={columnsState}
        toolbar={{
          actions: [
            <Button
              key="cert-alarm"
              danger
              type="primary"
              onClick={() =>
                modal.confirm({
                  title: "确定要手动触发告警吗？（临时测试）",
                  onOk: async () => {
                    await certAlarmApiOpsCertsAlarm()
                    message.success("触发成功")
                  },
                })
              }
            >
              告警
            </Button>,
            <CertIssuanceModalForm
              key="cert-issuance"
              onFinish={() =>
                history.push("/business/certs/cert-issuance-records")
              }
            />,
            <Button
              key="cert-sync"
              type="primary"
              onClick={showSyncConfirm}
              disabled={!access.certSyncApiOpsCertsSync}
            >
              同步
            </Button>,
            <CertCreateModalForm
              key="cert-create"
              onFinish={() => tableRef.current?.reload()}
            />,
          ],
        }}
      />
      <CertUpdateModalForm
        open={!!selectedCertToUpdate}
        onCancel={() => setSelectedCertToUpdate(undefined)}
        cert={selectedCertToUpdate}
        onFinish={() => tableRef.current?.reload(false)}
      />
    </>
  )
}
