import Table, { TableColumns } from "@/components/table"

import TableCellActions from "@/components/table-cell-actions"
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
} from "@/constants/table"
import { getCurrentUTCtimestamp, toLocaleDateTimeString } from "@/lib/utils"
import { hostCtfLogListApiIbexCtfsLogs } from "@/services/ibex/logs"
import { ActionType } from "@ant-design/pro-components"
import { useSearchParams } from "@umijs/max"
import { Tag } from "antd"
import { useAtomValue } from "jotai"
import { useMemo, useRef, useState } from "react"
import { categrafLogFilterAtom } from "../_atoms"
import CategrafLogDetailsDrawer from "./categraf-log-details-drawer"
import CategrafLogFilter from "./categraf-log-filter"

export default function CategrafLogTable() {
  const tableRef = useRef<ActionType>()

  const filter = useAtomValue(categrafLogFilterAtom)

  const [selectedLogToView, setSelectedLogToView] = useState<
    IBEX.HostCtfLog | undefined
  >()

  const [searchParams] = useSearchParams()

  const tableFilter = useMemo(
    () => ({
      ...filter,
      stime: filter.timeRangeHour
        ? getCurrentUTCtimestamp() - filter.timeRangeHour * 60 * 60
        : filter.stime!,
      etime: filter.timeRangeHour ? getCurrentUTCtimestamp() : filter.etime!,
    }),
    [filter],
  )

  const columns: TableColumns<IBEX.HostCtfLog> = [
    {
      title: "ID",
      dataIndex: "id",
      width: 60,
    },
    {
      title: "监控",
      dataIndex: "ctf_type",
      width: 120,
    },
    {
      title: "操作类型",
      dataIndex: "option",
      width: 100,
      render: (_, row) => <Tag>{row.option}</Tag>,
    },
    {
      title: "环境",
      dataIndex: "env_name",
      width: 200,
    },
    {
      title: "主机名",
      dataIndex: "hostname",
      width: 300,
    },
    {
      title: "状态",
      dataIndex: "status",
      width: 80,
      render: (_, row) => <Tag>{row.status}</Tag>,
    },
    {
      dataIndex: "operated_by",
      title: "操作人",
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      dataIndex: "created_time",
      title: "操作时间",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (_, record) =>
        record.operated_at
          ? toLocaleDateTimeString(
              new Date(record.operated_at * 1000).toString(),
            )
          : "-",
    },
    {
      title: "操作",
      key: "options",
      width: 100,
      fixed: "right",
      render: (_, row) => (
        <TableCellActions
          actions={[
            {
              text: "查看详情",
              onClick: () => setSelectedLogToView(row),
            },
          ]}
        />
      ),
    },
  ]

  return (
    <>
      <Table
        name="ctf-tpl"
        actionRef={tableRef}
        columns={columns}
        rowKey="id"
        params={{
          ...(tableFilter as any),
          hostuid: searchParams.get("hostUid"),
          env_name: searchParams.get("envName"),
        }}
        request={(
          params: IBEX.HostCtfLogListReq & {
            pageSize?: number
            current?: number
            keywords?: string
          },
        ) =>
          hostCtfLogListApiIbexCtfsLogs({
            ...params,
            stime: filter.timeRangeHour
              ? getCurrentUTCtimestamp() - filter.timeRangeHour * 60 * 60
              : filter.stime!,
            etime: filter.timeRangeHour
              ? getCurrentUTCtimestamp()
              : filter.etime!,
            p: params.current!,
            limit: params.pageSize!,
          }).then((res) => ({
            ...res,
            data: { ...res.data, list: res.data?.items },
          }))
        }
        toolbar={{
          subTitle: <CategrafLogFilter />,
        }}
        disabledDefaultKeywordsSearch
      />
      <CategrafLogDetailsDrawer
        open={!!selectedLogToView}
        onClose={() => setSelectedLogToView(undefined)}
        log={selectedLogToView}
      />
    </>
  )
}
