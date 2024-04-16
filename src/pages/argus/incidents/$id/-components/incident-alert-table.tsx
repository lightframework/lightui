import AlertInfoModal from "@/components/alert-info-modal"
import { TABLE_CELL_DATETIME_WIDTH } from "@/constants/table"
import { toLocaleDateTimeString } from "@/lib/utils"
import { incidentAlertsApiArgusIncidentsByIdalerts } from "@/services/argus/incident"
import { useQuery } from "@tanstack/react-query"
import { useAccess } from "@umijs/max"
import Table, { ColumnsType } from "antd/es/table"
import { useState } from "react"

export interface IncidentAlertTableProps {
  incidentId: number
}

export default function IncidentAlertTable({
  incidentId,
}: IncidentAlertTableProps) {
  const access = useAccess()
  const [selectedAlertToView, setSelectedAlertToView] = useState<
    ARGUS.Alert | undefined
  >()

  const { data } = useQuery({
    queryKey: ["incident-alerts", incidentId],
    queryFn: () =>
      incidentAlertsApiArgusIncidentsByIdalerts({
        id: String(incidentId),
      }).then(
        (res) =>
          res.data?.items ?? [
            {
              id: 7,
              hash: "dc7e4ba5695fb749b195a6989df682312",
              rule_id: 1,
              rule_name: "cpu使用率过高3",
              rule_note: "备注信息我最牛",
              group_id: 3,
              group_name: "自动化组",
              severity: 3,
              first_trigger_time: 1709883314,
              last_sent_time: 0,
              status: 0,
              source: "n9e",
              target_ident: "VM-23-75-centos",
            },
            {
              id: 6,
              hash: "dc7e4ba5695fb749b195a6989df682311",
              rule_id: 1,
              rule_name: "cpu使用率过高2",
              rule_note: "备注信息我最牛",
              group_id: 3,
              group_name: "自动化组",
              severity: 3,
              first_trigger_time: 1709883314,
              last_sent_time: 0,
              status: 0,
              source: "n9e",
              target_ident: "VM-23-75-centos",
            },
            {
              id: 5,
              hash: "dc7e4ba5695fb749b195a6989df68231",
              rule_id: 1,
              rule_name: "cpu使用率过高2",
              rule_note: "备注信息我最牛",
              group_id: 3,
              group_name: "自动化组",
              severity: 3,
              first_trigger_time: 1709883314,
              last_sent_time: 0,
              status: 0,
              source: "n9e",
              target_ident: "VM-23-75-centos",
            },
            {
              id: 4,
              hash: "dc7e4ba5695fb749b195a6989df68232",
              rule_id: 1,
              rule_name: "cpu使用率过高2",
              rule_note: "备注信息我最牛",
              group_id: 3,
              group_name: "自动化组",
              severity: 3,
              first_trigger_time: 1709883314,
              last_sent_time: 0,
              status: 0,
              source: "n9e",
              target_ident: "VM-23-75-centos",
            },
            {
              id: 3,
              hash: "dc7e4ba5695fb749b195a6989df68132",
              rule_id: 1,
              rule_name: "cpu使用率过高1",
              rule_note: "备注信息我最牛",
              group_id: 3,
              group_name: "自动化组",
              severity: 3,
              first_trigger_time: 1709883314,
              last_sent_time: 0,
              status: 0,
              source: "n9e",
              target_ident: "VM-23-75-centos",
            },
            {
              id: 2,
              hash: "dc7e4ba5695fb749b195a6989df68131",
              rule_id: 1,
              rule_name: "cpu使用率过高1",
              rule_note: "备注信息我最牛",
              group_id: 3,
              group_name: "自动化组",
              severity: 3,
              first_trigger_time: 1709883314,
              last_sent_time: 0,
              status: 0,
              source: "n9e",
              target_ident: "VM-23-75-centos",
            },
            {
              id: 1,
              hash: "dc7e4ba5695fb749b195a6989df68331",
              rule_id: 1,
              rule_name: "cpu使用率过高3",
              rule_note: "备注信息我最牛",
              group_id: 3,
              group_name: "自动化组",
              severity: 3,
              first_trigger_time: 1709883314,
              last_sent_time: 0,
              status: 0,
              source: "n9e",
              target_ident: "VM-23-75-centos",
            },
          ],
      ),
  })

  const columns: ColumnsType<ARGUS.Alert> = [
    {
      dataIndex: "source",
      title: "告警来源",
      width: 120,
    },
    {
      dataIndex: "rule_name",
      title: "告警标题",
      width: 200,
    },
    {
      dataIndex: "target_ident",
      title: "告警对象",
      width: 200,
    },
    {
      dataIndex: "first_trigger_time",
      title: "首次触发",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (_, record) =>
        record.first_trigger_time
          ? toLocaleDateTimeString(
              new Date(record.first_trigger_time * 1000).toString(),
            )
          : "-",
    },
    {
      dataIndex: "last_sent_time",
      title: "末次触发",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (_, record) =>
        record.last_sent_time
          ? toLocaleDateTimeString(
              new Date(record.last_sent_time * 1000).toString(),
            )
          : "-",
    },
    {
      dataIndex: "status",
      title: "状态",
      width: 120,
      render: (_, record) => (record.status ? record.status : "-"),
    },
  ]

  return (
    <>
      <Table
        className="incident-alert-table"
        dataSource={data}
        rowKey="id"
        columns={columns}
        rowClassName={
          access.alertReadOneRespApiArgusAlertsByHash
            ? "cursor-pointer"
            : undefined
        }
        onRow={
          access.alertReadOneRespApiArgusAlertsByHash
            ? (row) => ({ onClick: () => setSelectedAlertToView(row) })
            : undefined
        }
      />
      <AlertInfoModal
        open={!!selectedAlertToView}
        onCancel={() => setSelectedAlertToView(undefined)}
        alert={selectedAlertToView}
      />
    </>
  )
}
