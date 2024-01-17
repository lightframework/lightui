import CopyableText from "@/components/copyable-text"
import Table, { TableColumns, TableColumnsState } from "@/components/table"
import TableCellEllipsisList from "@/components/table-cell-ellipsis-list"
import VerticalDataList from "@/components/vertical-data-list"
import { dictGet, hostStateDict } from "@/constants/dict"
import { TABLE_CELL_UID_WIDTH } from "@/constants/table"
import { toLocaleDateTimeString } from "@/lib/utils"
import { hostPageListApiCmdbHosts } from "@/services/cmdb/host"
import { ActionType } from "@ant-design/pro-components"
import { Tag } from "antd"
import { useState } from "react"
import { ReleaseHost } from "./host-destroy-form"
import IpsInput from "./ips-input"

export default function HostOptionTable({
  tableRef,
  releaseHosts,
  onHostSelect,
}: {
  tableRef: React.MutableRefObject<ActionType | undefined>
  releaseHosts: ReleaseHost[]
  onHostSelect: (host: CMDB.HostInfo) => void
}) {
  const [ips, setIps] = useState<string>("")

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
          Ips: ips,
        }}
        searchPlaceholder="请输入主机名称/实例ID查询"
        request={hostPageListApiCmdbHosts}
        toolbar={{
          subTitle: <IpsInput onPressEnter={setIps} />,
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
