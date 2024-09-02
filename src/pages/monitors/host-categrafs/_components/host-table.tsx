import CopyableText from "@/components/copyable-text"
import Table, { TableColumns } from "@/components/table"
import TableCellActions, {
  TableCellAction,
} from "@/components/table-cell-actions"
import TableCellEllipsisList from "@/components/table-cell-ellipsis-list"
import { dictGet } from "@/constants/dict"
import { useQueryAppOptions, useQueryEnvOptions } from "@/lib/hooks/data"
import { hostPageListApiCmdbHosts } from "@/services/cmdb/host"
import {
  hostCtfStartApiIbexCtfsHostsByUidstart,
  hostCtfStopApiIbexCtfsHostsByUidstop,
} from "@/services/ibex/hosts"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { App, Select, Tag } from "antd"
import { useState } from "react"
import { HostCtfState, hostCtfStateDict } from "../_constants"
import HostInstallCategrafDrawer from "./host-install-categraf-drawer"

function EnvSelect({
  value,
  onChange,
}: {
  value?: string[]
  onChange?: (envUids?: string[]) => void
}) {
  const options = useQueryEnvOptions()

  return (
    <Select
      mode="multiple"
      value={value}
      options={options.data?.map((item) => ({
        label: item.EnvName,
        value: item.Uid,
      }))}
      optionFilterProp="label"
      placeholder="环境"
      style={{ width: 160 }}
      onChange={onChange}
      allowClear
      showSearch
      maxTagCount="responsive"
    />
  )
}

function AppSelect({
  value,
  onChange,
}: {
  value?: string[]
  onChange?: (appUids?: string[]) => void
}) {
  const options = useQueryAppOptions()

  return (
    <Select
      mode="multiple"
      value={value}
      options={options.data?.map((item) => ({
        label: `${item.App}:${item.Version}`,
        value: item.Uid,
      }))}
      placeholder="应用"
      style={{ width: 200 }}
      onChange={onChange}
      allowClear
      showSearch
      optionFilterProp="label"
      maxTagCount="responsive"
    />
  )
}

export interface HostTableProps {
  tableRef: React.MutableRefObject<ActionType | undefined>
  hostCtfTableRef?: React.MutableRefObject<ActionType | undefined>
  selectedHost?: CMDB.HostInfo
  onHostSelect?: (host: CMDB.HostInfo) => void
}

export default function HostTable({
  tableRef,
  hostCtfTableRef,
  selectedHost,
  onHostSelect,
}: HostTableProps) {
  const { modal, message } = App.useApp()

  const [selectedHostToInstall, setSelectedHostToInstall] = useState<
    CMDB.HostInfo | undefined
  >()

  const [filters, setFilters] = useState<{
    envUids?: string[]
    appUids?: string[]
  }>({})

  const showStopConfirm = (host: CMDB.HostInfo) =>
    modal.confirm({
      title: `确定停用主机 ${host.HostName} 的监控吗？`,
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        await hostCtfStopApiIbexCtfsHostsByUidstop({
          uid: host.Uid,
        })
        message.success("停用成功")
        tableRef.current?.reload(false)
      },
    })

  const showStartConfirm = (host: CMDB.HostInfo) =>
    modal.confirm({
      title: `确定启动主机 ${host.HostName} 的监控吗？`,
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        await hostCtfStartApiIbexCtfsHostsByUidstart({
          uid: host.Uid,
        })
        message.success("启动成功")
        tableRef.current?.reload(false)
      },
    })
  const columns: TableColumns<CMDB.HostInfo> = [
    {
      title: "主机名",
      dataIndex: "HostName",
      width: 300,
      fixed: "left",
    },
    { title: "环境", dataIndex: ["Env", "EnvName"], width: 160 },
    {
      title: "IP地址",
      key: "addresses",
      render: (_, row) => {
        return (
          <div>
            <TableCellEllipsisList
              items={row.Instance?.PublicIpAddresses}
              renderItem={(ip) =>
                ip ? <CopyableText text={`${ip}（公）`} copyText={ip} /> : null
              }
              empty={null}
            />
            <TableCellEllipsisList
              items={row.Instance?.PrivateIpAddresses}
              renderItem={(ip) =>
                ip ? <CopyableText text={`${ip}（私）`} copyText={ip} /> : null
              }
              empty={null}
            />
          </div>
        )
      },
      width: 160,
    },
    {
      title: "状态",
      dataIndex: "CtfState",
      width: 100,
      render: (_, row) => (
        <Tag color={dictGet(row?.CtfState, hostCtfStateDict)?.color}>
          {dictGet(row?.CtfState, hostCtfStateDict)?.label || "未知"}
        </Tag>
      ),
    },
    {
      title: "操作",
      key: "options",
      width: 100,
      fixed: "right",
      render: (_, row) => {
        let actions: TableCellAction[] = []

        switch (row?.CtfState) {
          case HostCtfState.UNINSTALLED: {
            actions = [
              { text: "安装", onClick: () => setSelectedHostToInstall(row) },
            ]
            break
          }
          case HostCtfState.MONIT_STARTED: {
            actions = [
              {
                text: "停用",
                danger: true,
                onClick: () => showStopConfirm(row),
              },
            ]
            break
          }
          case HostCtfState.RUNNING: {
            actions = [
              {
                text: "停用",
                danger: true,
                onClick: () => showStopConfirm(row),
              },
              { text: "同步" },
            ]
            break
          }
          case HostCtfState.STOPED: {
            actions = [{ text: "启动", onClick: () => showStartConfirm(row) }]
            break
          }
          default: {
            actions = [
              { text: "检测" },
              { text: "安装", onClick: () => setSelectedHostToInstall(row) },
            ]
            break
          }
        }

        return <TableCellActions actions={actions} />
      },
    },
  ]

  return (
    <>
      <Table
        name="categraf-host"
        actionRef={tableRef}
        columns={columns}
        rowKey="Uid"
        request={async (params) => {
          if (!params.keywords && !params.AppUids && !params.EnvUids) {
            return {
              code: 2000,
              data: { list: [], total: 0 },
              msg: "OK",
            }
          }

          return hostPageListApiCmdbHosts(params)
        }}
        searchPlaceholder="请输入主机名/实例ID查询"
        params={{
          EnvUids: filters.envUids?.join(","),
          AppUids: filters.appUids?.join(","),
        }}
        onRow={(row) => ({ onClick: () => onHostSelect?.(row) })}
        rowClassName={(row) =>
          selectedHost?.Uid === row.Uid
            ? "[&>td]:!bg-[#ebf0ff] [&>td]:hover:!bg-[#ebf0ff] cursor-pointer"
            : "cursor-pointer"
        }
        toolbar={{
          subTitle: (
            <div className="flex gap-x-2">
              <EnvSelect
                value={filters.envUids}
                onChange={(val) =>
                  setFilters((prev) => ({ ...prev, envUids: val }))
                }
              />
              <AppSelect
                value={filters.appUids}
                onChange={(val) =>
                  setFilters((prev) => ({ ...prev, appUids: val }))
                }
              />
            </div>
          ),
        }}
      />
      <HostInstallCategrafDrawer
        open={!!selectedHostToInstall}
        onClose={() => setSelectedHostToInstall(undefined)}
        host={selectedHostToInstall}
        onFinish={() => {
          tableRef.current?.reload()
          hostCtfTableRef?.current?.reload()
        }}
      />
    </>
  )
}
