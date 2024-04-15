import Table, { TableColumns } from "@/components/table"
import TableCellEllipsisList from "@/components/table-cell-ellipsis-list"
import { dictGet, incidentProgressDict } from "@/constants/dict"
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_DESC_WIDTH,
} from "@/constants/table"
import { toLocaleDateTimeString } from "@/lib/utils"
import { incidentPageListApiArgusIncidents } from "@/services/argus/incident"
import { SyncOutlined } from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { useQueryClient } from "@tanstack/react-query"
import { useAccess } from "@umijs/max"
import { Button, Select, Space, Tag, Tooltip } from "antd"
import { useAtom } from "jotai"
import { RESET } from "jotai/utils"
import { useEffect, useRef } from "react"
import { incidentFilterAtom, refetchIntervalAtom } from "../_atoms"
import IncidentFilter from "./incident-filter"

export default function IncidentTable() {
  const access = useAccess()
  const tableRef = useRef<ActionType>()
  const [incidentFilter, setIncidentFilter] = useAtom(incidentFilterAtom)
  const [refetchInterval, setRefetchInterval] = useAtom(refetchIntervalAtom)
  const queryClient = useQueryClient()

  useEffect(() => {
    return () => setIncidentFilter(RESET)
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (refetchInterval) {
      interval = setInterval(
        () => tableRef?.current?.reload(false),
        refetchInterval,
      )
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [refetchInterval])

  const columns: TableColumns<ARGUS.Incident> = [
    {
      dataIndex: "title",
      title: "故障名称",
      width: 300,
      fixed: "left",
    },
    {
      dataIndex: "source",
      title: "故障来源",
      width: 100,
    },
    {
      dataIndex: "severity",
      title: "故障等级",
      width: 80,
      render: (_, row) => (
        <Tag
          color={
            row.severity === 1
              ? "red"
              : row.severity === 2
                ? "orange"
                : "yellow"
          }
        >
          S{row.severity}
        </Tag>
      ),
    },
    {
      dataIndex: "progress",
      title: "进展",
      width: 80,
      render: (_, row) => (
        <Tag color={dictGet(row.progress, incidentProgressDict)?.color}>
          {dictGet(row.progress, incidentProgressDict)?.value ?? row.progress}
        </Tag>
      ),
    },
    {
      dataIndex: "responders",
      title: "认领人",
      width: 220,
      render: (_, row) => (
        <TableCellEllipsisList
          items={row.responders as NonNullable<ARGUS.Responder["data"]>[]}
          rowKey={(item) => item.person_id!}
          maxCount={2}
          renderItem={(item) => (
            <div>
              <div>
                {item.person_name} {item.person_mobile}
              </div>
              <div>
                指定时间：
                {item.assigned_at
                  ? toLocaleDateTimeString(
                      new Date(item.assigned_at * 1000).toString(),
                    )
                  : "-"}
              </div>
              <div>
                知晓时间：
                {item.acknoledged_at
                  ? toLocaleDateTimeString(
                      new Date(item.acknoledged_at * 1000).toString(),
                    )
                  : "-"}
              </div>
            </div>
          )}
        />
      ),
    },
    {
      dataIndex: "start_time",
      title: "开始时间",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (_, record) =>
        record.start_time
          ? toLocaleDateTimeString(
              new Date(record.start_time * 1000).toString(),
            )
          : "-",
    },
    {
      dataIndex: "last_time",
      title: "末次触发",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (_, record) =>
        record.last_time
          ? toLocaleDateTimeString(new Date(record.last_time * 1000).toString())
          : "-",
    },
    {
      dataIndex: "close_time",
      title: "关闭时间",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (_, record) =>
        record.close_time
          ? toLocaleDateTimeString(
              new Date(record.close_time * 1000).toString(),
            )
          : "-",
    },
    {
      dataIndex: "description",
      title: "描述",
      width: TABLE_CELL_DESC_WIDTH,
    },
  ]

  return (
    <>
      <Table
        name="incidents"
        actionRef={tableRef}
        className="incident-table"
        params={incidentFilter}
        request={async (params) => {
          const res = await incidentPageListApiArgusIncidents({
            ...params,
            p: params.current ?? 1,
            limit: params.pageSize ?? 20,
          })

          return {
            ...res,
            data: { list: res.data?.items, total: res.data?.total },
          }
        }}
        rowKey="id"
        columns={columns}
        rowClassName={
          access.alertReadOneRespApiArgusAlertsByHash
            ? "cursor-pointer"
            : undefined
        }
        search={false}
        toolbar={{
          title: <IncidentFilter />,
          actions: [
            <Space.Compact key="refetch-interval">
              <Tooltip title="手动刷新">
                <Button
                  icon={<SyncOutlined />}
                  onClick={() => {
                    tableRef.current?.reload(false)
                    queryClient.invalidateQueries({ queryKey: ["alert-cards"] })
                  }}
                />
              </Tooltip>
              <Select
                value={refetchInterval}
                style={{ width: 56 }}
                onChange={(value) => setRefetchInterval(value)}
                options={[
                  {
                    label: "off",
                    value: false,
                  },

                  {
                    label: "5s",
                    value: 5 * 1000,
                  },

                  {
                    label: "30s",
                    value: 30 * 1000,
                  },
                  {
                    label: "60s",
                    value: 60 * 1000,
                  },
                ]}
              />
            </Space.Compact>,
          ],
        }}
      />
    </>
  )
}
