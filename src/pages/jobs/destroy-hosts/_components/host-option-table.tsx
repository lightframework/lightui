import CopyableText from "@/components/copyable-text"
import Table, { TableColumns, TableColumnsState } from "@/components/table"
import TableCellEllipsisList from "@/components/table-cell-ellipsis-list"
import VerticalDataList from "@/components/vertical-data-list"
import { dictGet, hostStateDict } from "@/constants/dict"
import { TABLE_CELL_UID_WIDTH } from "@/constants/table"
import { PERM_EDIT } from "@/constants/vars"
import { toLocaleDateTimeString } from "@/lib/utils"
import IpsInput from "@/pages/cmdb/hosts/_components/ips-input"
import { hostPageListApiCmdbHosts } from "@/services/cmdb/host"
import { ActionType, useDebounceValue } from "@ant-design/pro-components"
import { AutoComplete, Tag } from "antd"
import { useEffect, useState } from "react"
import { ReleaseHost } from "./host-destroy-form"

function StateSelect({ onChange }: { onChange?: (value?: string) => void }) {
  const [value, setValue] = useState<string | undefined>()
  const debouncedValue = useDebounceValue(value)

  useEffect(() => {
    onChange?.(value)
  }, [debouncedValue])

  return (
    <AutoComplete
      style={{
        width: 140,
      }}
      value={value}
      placeholder="状态（支持手动输入）"
      allowClear
      showSearch
      onChange={setValue}
      options={[
        {
          value: "RUNNING",
        },
        {
          value: "NOT_BOUND_INS",
          label: "未绑定实例",
        },
        {
          value: "TO_BE_DESTROYED",
          label: "待销毁",
        },
        {
          value: "DESTROYED",
        },
        {
          value: "Up",
        },
      ]}
    />
  )
}

export default function HostOptionTable({
  tableRef,
  releaseHosts,
  onHostSelect,
}: {
  tableRef: React.MutableRefObject<ActionType | undefined>
  releaseHosts: ReleaseHost[]
  onHostSelect: (host: CMDB.HostInfo) => void
}) {
  const [state, setState] = useState<string | undefined>()
  const [ips, setIps] = useState<string[] | undefined>()

  const columnsState: TableColumnsState = {
    Uid: { show: false },
  }

  const columns: TableColumns<CMDB.HostInfo> = [
    {
      title: "UID",
      dataIndex: "Uid",
      width: TABLE_CELL_UID_WIDTH,
    },
    {
      title: "主机名",
      dataIndex: "HostName",
      copyable: true,
      width: 300,
      fixed: "left",
    },
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
      width: 180,
    },
    {
      title: "状态",
      dataIndex: "State",
      width: 120,
      render: (_, row) => (
        <div>
          <Tag
            color={dictGet(row.State, hostStateDict)?.bgColor}
            style={{
              color: "black",
              border: `1px solid ${
                dictGet(row.State, hostStateDict)?.borderColor ?? "black"
              }`,
            }}
          >
            {dictGet(row.State, hostStateDict)?.label ?? row.State}
          </Tag>

          {row.State === "TO_BE_DESTROYED" && (
            <div>回收时间：{toLocaleDateTimeString(row.removeAt)}</div>
          )}
        </div>
      ),
    },
    {
      title: "实例名称",
      dataIndex: ["Instance", "InstanceName"],
      width: 300,
      copyable: true,
    },
    {
      title: "实例ID",
      dataIndex: ["Instance", "InstanceId"],
      width: 150,
      copyable: true,
    },
    {
      title: "实例配置",
      key: "instance",
      width: 250,
      render: (_, row) => (
        <div>
          <div>
            <span>{row.Instance?.Cpu}核</span>
            {"-"}
            <span>{row.Instance?.Memory}GB</span>
          </div>
          <div>
            系统盘：
            {row.Instance?.SystemDisk}
          </div>
          <div className="flex items-start">
            网络：
            <VerticalDataList
              items={row.Instance?.SubnetWithVpcSet}
              renderItem={(item) => item.SubnetName}
            />
          </div>
        </div>
      ),
    },
  ]

  return (
    <>
      <Table
        name="release-option-host"
        className="env-host-table"
        actionRef={tableRef}
        columns={columns}
        rowKey="Uid"
        params={{
          Ips: ips && ips.length > 0 ? ips.join(",") : undefined,
          State: state,
          Perm: PERM_EDIT,
        }}
        searchPlaceholder="请输入主机名称/实例ID查询"
        request={hostPageListApiCmdbHosts}
        toolbar={{
          subTitle: (
            <div className="flex items-center gap-2">
              <IpsInput value={ips} onChange={setIps} />
              <StateSelect onChange={setState} />
            </div>
          ),
        }}
        defaultColumnsState={columnsState}
        scroll={{
          y: "calc(80vh - 120px)",
        }}
        onRow={(row) => ({ onClick: () => onHostSelect(row) })}
        rowClassName={(row) =>
          releaseHosts.find((host) => host.Uid === row.Uid)
            ? "[&>td]:!bg-[#ebf0ff] [&>td]:hover:!bg-[#ebf0ff] cursor-pointer"
            : ""
        }
      />
    </>
  )
}
