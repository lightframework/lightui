import Table, { TableColumns, TableColumnsState } from "@/components/table"
import { dictGet, incidentProgressDict } from "@/constants/dict"
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_DESC_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
} from "@/constants/table"
import { getCurrentUTCtimestamp, toLocaleDateTimeString } from "@/lib/utils"
import { entryGetByNameApiArgusDictsEntries } from "@/services/argus/dict"
import {
  incidentClaimApiArgusIncidentsClaim,
  incidentListApiArgusIncidentsList,
} from "@/services/argus/incident"
import { SyncOutlined } from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { Link, useAccess } from "@umijs/max"
import { Button, Popover, Select, Space, Tag, Tooltip, message } from "antd"
import useModal from "antd/es/modal/useModal"
import { TableRowSelection } from "antd/es/table/interface"
import clsx from "clsx"
import { useAtom } from "jotai"
import { RESET } from "jotai/utils"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { incidentFilterAtom, refetchIntervalAtom } from "../_atoms"
import IncidentFilter from "./incident-filter"
import IncidentRegionModalForm from "./incident-resign-modal-form"

export default function IncidentTable() {
  const access = useAccess()
  const [modal, contextHolder] = useModal()
  const tableRef = useRef<ActionType>()
  const [incidentFilter, setIncidentFilter] = useAtom(incidentFilterAtom)
  const [refetchInterval, setRefetchInterval] = useAtom(refetchIntervalAtom)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const filter = useMemo(
    () => ({
      ...incidentFilter,
      stime: incidentFilter.timeRangeHour
        ? getCurrentUTCtimestamp() - incidentFilter.timeRangeHour * 60 * 60
        : incidentFilter.stime!,
      etime: incidentFilter.timeRangeHour
        ? getCurrentUTCtimestamp()
        : incidentFilter.etime!,
    }),
    [incidentFilter],
  )

  const { data, isFetching } = useQuery({
    queryKey: ["incidents", filter],
    queryFn: () =>
      incidentListApiArgusIncidentsList(filter).then(
        (res) => res.data?.items ?? [],
      ),
    placeholderData: keepPreviousData,
  })

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

  const refresh = useCallback(() => {
    setIncidentFilter((filter) => ({
      ...filter,
      stime: filter.timeRangeHour
        ? getCurrentUTCtimestamp() - filter.timeRangeHour * 60 * 60
        : filter.stime,
      etime: filter.timeRangeHour ? getCurrentUTCtimestamp() : filter.etime,
    }))
  }, [setIncidentFilter])

  useEffect(() => {
    if (refetchInterval) {
      const timer = setInterval(() => {
        refresh()
      }, refetchInterval)

      return () => clearInterval(timer)
    }
  }, [refetchInterval])

  const columns: TableColumns<ARGUS.Incident> = [
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
      fixed: "left",
    },
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
      dataIndex: "status",
      title: "状态",
      width: 80,
      render: (_, row) => (
        <Tag
          color={dictGet(row.status, incidentProgressDict)?.color}
          icon={dictGet(row.status, incidentProgressDict)?.icon}
        >
          {progressOptions?.find((item) => item.key === row.status)?.value ??
            row.status}
        </Tag>
      ),
    },
    {
      title: "活跃告警",
      width: 80,
      dataIndex: "actived",
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
      title: "当前处理人",
      dataIndex: "processor",
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      title: "匹配策略",
      key: "tactic",
      width: 200,
      render: (_, record) => (
        <Link to={`/argus/tactics?id=${record.tactic.id}`} target="_blank">
          {record.tactic.name}
        </Link>
      ),
    },
    {
      dataIndex: "created_time",
      title: "创建时间",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (_, record) =>
        record.created_time
          ? toLocaleDateTimeString(
              new Date(record.created_time * 1000).toString(),
            )
          : "-",
    },
    {
      dataIndex: "updated_time",
      title: "末次触发",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (_, record) =>
        record.updated_time
          ? toLocaleDateTimeString(
              new Date(record.updated_time * 1000).toString(),
            )
          : "-",
    },
    {
      dataIndex: "closed_time",
      title: "关闭时间",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (_, record) =>
        record.closed_time
          ? toLocaleDateTimeString(
              new Date(record.closed_time * 1000).toString(),
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

  const rowSelection: TableRowSelection<ARGUS.Incident> = {
    selectedRowKeys,
    onChange: onSelectChange,
    fixed: true,
    getCheckboxProps: (row) => ({ disabled: row.progress === "Closed" }),
  }

  const columnsState: TableColumnsState = {
    next_eval_time: { show: false },
    description: { show: false },
  }

  return (
    <>
      {contextHolder}
      <Table
        name="incidents"
        actionRef={tableRef}
        className="incident-table"
        params={incidentFilter}
        dataSource={data}
        rowKey="id"
        columns={columns}
        search={false}
        rowSelection={rowSelection}
        defaultColumnsState={columnsState}
        loading={isFetching}
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
                    refresh()
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
                refresh()
              }}
            />,
            <Space.Compact key="refetch-interval">
              <Tooltip title="手动刷新">
                <Button
                  icon={<SyncOutlined />}
                  onClick={() => {
                    refresh()
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
