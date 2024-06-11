import { TableColumns } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import { TABLE_CELL_DATETIME_WIDTH, TABLE_FULL_HEIGHT } from "@/constants/table"
import useShowJsonModal from "@/lib/hooks/use-show-json-modal"
import { toLocaleDateTimeString } from "@/lib/utils"
import { eventRequestPageListApiArgusEventRequests } from "@/services/argus/event"
import { ActionType, ProTable } from "@ant-design/pro-components"

export interface EventTableProps {
  tableRef?: React.MutableRefObject<ActionType | undefined>
  filter: Omit<ARGUS.EventRequestPageListReq, "p" | "limit">
}

export default function EventTable({ tableRef, filter }: EventTableProps) {
  const showJsonModal = useShowJsonModal()

  const columns: TableColumns<ARGUS.EventRequest> = [
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
      fixed: "left",
    },
    {
      title: "数据源类型",
      dataIndex: "data_source_type",
      width: 200,
    },
    {
      title: "数据源",
      dataIndex: "data_source",
      width: 360,
    },
    {
      title: "事件类型",
      dataIndex: "event_type",
      width: 200,
    },
    {
      dataIndex: "timestamp",
      title: "推送事件",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (_, record) =>
        record.timestamp
          ? toLocaleDateTimeString(new Date(record.timestamp * 1000).toString())
          : "-",
    },
    {
      title: "操作",
      key: "actions",
      fixed: "right",
      width: 100,
      render: (_, row) => (
        <TableCellActions
          actions={[
            {
              text: "查看内容",
              onClick: () =>
                showJsonModal({ title: "事件内容", content: row.body }),
            },
          ]}
        />
      ),
    },
  ]

  return (
    <>
      <ProTable
        actionRef={tableRef}
        className="event-table"
        params={filter}
        search={false}
        request={async (params) => {
          const res = await eventRequestPageListApiArgusEventRequests({
            ...params,
            p: params.current ?? 1,
            limit: params.pageSize ?? 20,
          })

          return {
            success: res.msg === "OK",
            total: res.data?.total,
            data: res.data?.items,
          }
        }}
        rowKey="id"
        columns={columns}
        scroll={{
          x: 920,
          y: TABLE_FULL_HEIGHT,
        }}
      />
    </>
  )
}
