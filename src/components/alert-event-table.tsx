import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_MODAL_HEIGHT,
} from "@/constants/table"
import { toLocaleDateTimeString } from "@/lib/utils"
import { alertReadOneRespApiArgusAlertsByHash } from "@/services/argus/alert"
import { useQuery } from "@tanstack/react-query"
import { Button } from "antd"
import Table, { ColumnsType } from "antd/es/table"
import { useState } from "react"
import StdStringDisplayModal from "./std-string-display-modal"

export interface AlertEventTableProps {
  selectedAlert?: ARGUS.Alert
}

export default function AlertEventTable({
  selectedAlert,
}: AlertEventTableProps) {
  const { data, isFetching } = useQuery({
    queryKey: ["alert", selectedAlert?.hash],
    queryFn: () =>
      alertReadOneRespApiArgusAlertsByHash({ hash: selectedAlert!.hash }).then(
        (res) => res.data,
      ),

    enabled: !!selectedAlert,
  })

  const [selectedEventToViewData, setSelectedEventToViewData] = useState<
    ARGUS.Event | undefined
  >()

  const columns: ColumnsType<ARGUS.Event> = [
    {
      title: "告警对象",
      dataIndex: "target_ident",
      width: 200,
    },
    {
      title: "触发时间",
      dataIndex: "trigger_time",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (_, record) =>
        record.trigger_time
          ? toLocaleDateTimeString(
              new Date(record.trigger_time * 1000).toString(),
            )
          : "-",
    },
    {
      title: "触发时值",
      dataIndex: "trigger_value",
      width: 200,
    },
    {
      title: "原始数据",
      key: "metadata",
      width: 80,
      render: (_, row) => (
        <Button
          type="link"
          size="small"
          onClick={() => setSelectedEventToViewData(row)}
        >
          原始数据
        </Button>
      ),
    },
  ]

  return (
    <>
      <Table
        dataSource={data?.events}
        columns={columns}
        loading={isFetching}
        scroll={{ y: TABLE_MODAL_HEIGHT }}
      />
      <StdStringDisplayModal
        title="原始数据"
        open={!!selectedEventToViewData}
        onCancel={() => setSelectedEventToViewData(undefined)}
        content={selectedEventToViewData?.medata}
      />
    </>
  )
}
