import Table, { TableColumns } from "@/components/table"
import { dictGet, incidentProgressDict } from "@/constants/dict"
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_DESC_WIDTH,
} from "@/constants/table"
import { getCurrentUTCtimestamp, toLocaleDateTimeString } from "@/lib/utils"
import { entryGetByNameApiArgusDictsEntries } from "@/services/argus/dict"
import {
  incidentClaimApiArgusIncidentsClaim,
  incidentPageListApiArgusIncidents,
} from "@/services/argus/incident"
import { SyncOutlined } from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { useQuery } from "@tanstack/react-query"
import { Link, useAccess } from "@umijs/max"
import { Button, Popover, Select, Space, Tag, Tooltip, message } from "antd"
import useModal from "antd/es/modal/useModal"
import clsx from "clsx"
import { useAtom, useSetAtom } from "jotai"
import { RESET } from "jotai/utils"
import { useEffect, useRef, useState } from "react"
import { incidentFilterAtom, refetchIntervalAtom } from "../_atoms"
import IncidentFilter from "./incident-filter"
import IncidentRegionModalForm from "./incident-resign-modal-form"

export default function IncidentTable() {
  const access = useAccess()
  const [modal, contextHolder] = useModal()
  const tableRef = useRef<ActionType>()
  const setIncidentFilter = useSetAtom(incidentFilterAtom)
  const [refetchInterval, setRefetchInterval] = useAtom(refetchIntervalAtom)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const { data: progressOptions } = useQuery({
    queryKey: ["dict-entries", "incident_progress"],
    queryFn: () =>
      entryGetByNameApiArgusDictsEntries({
        name: "incident_progress",
      }).then((res) => res.data?.items ?? []),
  })

  const { data: severityOptions } = useQuery({
    queryKey: ["dict-entries", "incident_severity_level"],
    queryFn: () =>
      entryGetByNameApiArgusDictsEntries({
        name: "incident_severity_level",
      }).then((res) => res.data?.items ?? []),
  })

  const { data: sourceOptions } = useQuery({
    queryKey: ["dict-entries", "alert_source"],
    queryFn: () =>
      entryGetByNameApiArgusDictsEntries({
        name: "alert_source",
      }).then((res) => res.data?.items ?? []),
  })

  useEffect(() => {
    return () => setIncidentFilter(RESET)
  }, [])

  useEffect(() => {
    if (refetchInterval) {
      const timer = setInterval(() => {
        setIncidentFilter((filter) => ({
          ...filter,
          stime: filter.timeRangeHour
            ? getCurrentUTCtimestamp() - filter.timeRangeHour * 60 * 60
            : filter.stime,
          etime: filter.timeRangeHour ? getCurrentUTCtimestamp() : filter.etime,
        }))
        tableRef.current?.reload(false)
      }, refetchInterval)

      return () => clearInterval(timer)
    }
  }, [refetchInterval])

  const columns: TableColumns<ARGUS.Incident> = [
    {
      dataIndex: "title",
      title: "故障名称",
      width: 300,
      fixed: "left",
      render: (_, row) => (
        <Link to={`/argus/incidents/${row.id}`}>{row.title}</Link>
      ),
    },
    {
      dataIndex: "source",
      title: "故障来源",
      width: 100,
      render: (_, row) =>
        sourceOptions?.find((item) => item.key === row.source)?.value ??
        row.source,
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
          {severityOptions?.find((item) => item.key === String(row.severity))
            ?.value ?? row.severity}
        </Tag>
      ),
    },
    {
      dataIndex: "progress",
      title: "进展",
      width: 80,
      render: (_, row) => (
        <Tag
          color={dictGet(row.progress, incidentProgressDict)?.color}
          icon={dictGet(row.progress, incidentProgressDict)?.icon}
        >
          {progressOptions?.find((item) => item.key === row.progress)?.value ??
            row.progress}
        </Tag>
      ),
    },
    {
      title: "匹配策略",
      key: "tactic",
      width: 200,
      render: (_, record) => (
        <Link to="/argus/tactics" state={{ viewTacticId: record.tactic.id }}>
          {record.tactic.name}
        </Link>
      ),
    },
    {
      dataIndex: "responders",
      title: "认领人",
      width: 220,
      render: (_, row) => (
        <div className="flex flex-wrap gap-1">
          {row.responders?.map((person) => {
            const data = person as {
              userid: number
              username: string
              assigned_at: number
              acknoledged_at: number
            }

            return (
              <Popover
                key={data.userid}
                content={
                  <div>
                    <div>
                      指定时间：
                      {data.assigned_at !== 0 &&
                        toLocaleDateTimeString(
                          new Date(data.assigned_at * 1000).toString(),
                        )}
                    </div>
                    <div>
                      认领时间：
                      {data.acknoledged_at !== 0 &&
                        toLocaleDateTimeString(
                          new Date(data.acknoledged_at * 1000).toString(),
                        )}
                    </div>
                  </div>
                }
              >
                <div
                  className={clsx(
                    data.acknoledged_at ? "font-semibold" : "text-gray-400",
                  )}
                >
                  {data.username}
                </div>
              </Popover>
            )
          })}
        </div>
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

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    fixed: true,
  }

  return (
    <>
      {contextHolder}
      <Table
        name="incidents"
        actionRef={tableRef}
        className="incident-table"
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
        search={false}
        rowSelection={rowSelection}
        toolbar={{
          title: <IncidentFilter />,
          actions: [
            <Button
              key="claim"
              type="primary"
              disabled={
                selectedRowKeys.length === 0 ||
                !access.incidentClaimApiArgusIncidentsClaim
              }
              onClick={() => {
                modal.confirm({
                  title: "确定要认领故障吗？",
                  onOk: async () => {
                    await incidentClaimApiArgusIncidentsClaim({
                      ids: selectedRowKeys as number[],
                    })
                    message.success("认领成功")
                    tableRef.current?.reload(false)
                  },
                })
              }}
            >
              认领
            </Button>,
            <IncidentRegionModalForm
              key="resign"
              ids={selectedRowKeys as number[]}
              onFinish={() => {
                tableRef.current?.reload(false)
              }}
            />,
            <Space.Compact key="refetch-interval">
              <Tooltip title="手动刷新">
                <Button
                  icon={<SyncOutlined />}
                  onClick={() => {
                    setIncidentFilter((filter) => ({
                      ...filter,
                      stime: filter.timeRangeHour
                        ? getCurrentUTCtimestamp() -
                          filter.timeRangeHour * 60 * 60
                        : filter.stime,
                      etime: filter.timeRangeHour
                        ? getCurrentUTCtimestamp()
                        : filter.etime,
                    }))
                    tableRef.current?.reload(false)
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
