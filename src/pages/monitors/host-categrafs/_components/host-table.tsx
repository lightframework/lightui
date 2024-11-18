import CopyableText from "@/components/copyable-text"
import DebounceInput from "@/components/decounce-input"
import Table, { TableColumns } from "@/components/table"
import TableCellEllipsisList from "@/components/table-cell-ellipsis-list"
import { PERM_EXEC } from "@/constants/vars"
import { useQueryAppOptions, useQueryEnvOptions } from "@/lib/hooks/data"
import IpsInput from "@/pages/cmdb/hosts/_components/ips-input"
import { hostPageListApiCmdbHosts } from "@/services/cmdb/host"
import { SyncOutlined } from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { App, Button, Select, Tooltip } from "antd"
import { useState } from "react"
import HostInstallCategrafDrawer from "./host-install-categraf-drawer"
import SyncButton from "./sync-button"

function EnvSelect({
  value,
  onChange,
}: {
  value?: string[]
  onChange?: (envUids?: string[]) => void
}) {
  const options = useQueryEnvOptions(0, PERM_EXEC, false)

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
  const { message } = App.useApp()

  const [selectedHostToInstall, setSelectedHostToInstall] = useState<
    CMDB.HostInfo | undefined
  >()

  const [filters, setFilters] = useState<{
    keywords?: string
    envUids?: string[]
    appUids?: string[]
    ips?: string[]
  }>({})

  // const showStopConfirm = (host: CMDB.HostInfo) =>
  //   modal.confirm({
  //     title: `确定停用主机 ${host.HostName} 的监控吗？`,
  //     icon: <ExclamationCircleOutlined />,
  //     onOk: async () => {
  //       await hostCtfStopApiIbexCtfsHostsByUidstop({
  //         uid: host.Uid,
  //       })
  //       message.success("停用成功")
  //       tableRef.current?.reload(false)
  //     },
  //   })

  // const showStartConfirm = (host: CMDB.HostInfo) =>
  //   modal.confirm({
  //     title: `确定启动主机 ${host.HostName} 的监控吗？`,
  //     icon: <ExclamationCircleOutlined />,
  //     onOk: async () => {
  //       await hostCtfStartApiIbexCtfsHostsByUidstart({
  //         uid: host.Uid,
  //       })
  //       message.success("启动成功")
  //       tableRef.current?.reload(false)
  //     },
  //   })

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
      title: "操作",
      key: "options",
      width: 100,
      fixed: "right",
      render: (_, row) => (
        <SyncButton
          key={row.Uid}
          host={row}
          onFinish={() => hostCtfTableRef?.current?.reload()}
        />
      ),
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
          if (
            !params.keywords &&
            !params.AppUids &&
            !params.EnvUids &&
            !params.Ips
          ) {
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
          keywords: filters.keywords,
          EnvUids: filters.envUids?.join(","),
          AppUids: filters.appUids?.join(","),
          Ips: filters.ips?.join(","),
        }}
        onRow={(row) => ({
          onClick: async () => {
            onHostSelect?.(row)
          },
        })}
        rowClassName={(row) =>
          selectedHost?.Uid === row.Uid
            ? "[&>td]:!bg-[#ebf0ff] [&>td]:hover:!bg-[#ebf0ff] cursor-pointer"
            : "cursor-pointer"
        }
        search={false}
        toolbar={{
          title: (
            <div className="flex flex-wrap items-center gap-2">
              <Tooltip title="刷新">
                <Button
                  type="default"
                  icon={<SyncOutlined />}
                  onClick={() => {
                    if (
                      !filters.keywords &&
                      !filters.appUids &&
                      !filters.envUids &&
                      !filters.ips
                    ) {
                      message.info("请输入至少一个筛选条件")
                    } else {
                      tableRef.current?.reload(false)
                    }
                  }}
                />
              </Tooltip>
              <DebounceInput
                type="text"
                value={filters.keywords}
                onChange={(val) =>
                  setFilters((prev) => ({ ...prev, keywords: val }))
                }
                className="w-[240px]"
                placeholder="请输入主机名称/备注查询"
              />

              <IpsInput
                value={filters.ips}
                onChange={(val) =>
                  setFilters((prev) => ({ ...prev, ips: val }))
                }
              />

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
        scroll={{
          y: "calc(100vh - 256px)",
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
