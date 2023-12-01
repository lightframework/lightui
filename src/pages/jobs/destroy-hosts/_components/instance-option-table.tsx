import CopyableText from "@/components/copyable-text"
import Table, { TableColumns, TableColumnsState } from "@/components/table"
import VerticalDataList from "@/components/vertical-data-list"
import { TABLE_CELL_UID_WIDTH } from "@/constants/table"
import { useToken } from "@/lib/hooks/use-token"
import { instancePageListApiCmdbInstances } from "@/services/cmdb/instance"
import { ActionType } from "@ant-design/pro-components"
import { Tag } from "antd"
import { useState } from "react"
import { ReleaseInstance } from "./instance-destroy-form"

export default function InstanceOptionTable({
  tableRef,
  releaseInstances,
  onInstanceSelected,
}: {
  tableRef: React.MutableRefObject<ActionType | undefined>
  releaseInstances: ReleaseInstance[]
  onInstanceSelected: (instances: CMDB.InstanceInfo[]) => void
}) {
  const { token } = useToken()

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const columnsState: TableColumnsState = {
    Uid: { show: false },
  }

  const columns: TableColumns<CMDB.InstanceInfo> = [
    {
      title: "UID",
      dataIndex: "Uid",
      width: TABLE_CELL_UID_WIDTH,
    },
    {
      title: "实例ID",
      dataIndex: "InstanceId",
      width: 300,
      copyable: true,
    },
    {
      title: "实例名称",
      dataIndex: "InstanceName",
      width: 300,
      copyable: true,
      fixed: "left",
    },
    {
      title: "IP地址",
      key: "addresses",
      render: (_, row) => {
        return (
          <div>
            <VerticalDataList
              items={row.PublicIpAddresses}
              renderItem={(ip) =>
                ip ? <CopyableText text={`${ip}（公）`} copyText={ip} /> : null
              }
              empty={null}
            />
            <VerticalDataList
              items={row.PrivateIpAddresses}
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
      title: "实例配置",
      key: "instance",
      width: 250,
      render: (_, row) => (
        <div>
          <div>
            <span>{row.Cpu}核</span> <span>{row.Memory}GB</span>
          </div>
          <div>
            系统盘：
            {row.SystemDisk}
          </div>
          <div className="flex items-start">
            网络：
            <VerticalDataList
              items={row.SubnetWithVpcSet}
              renderItem={(item) => item.SubnetName}
            />
          </div>
        </div>
      ),
    },
    {
      title: "实例类型",
      dataIndex: "InstanceType",
      width: 150,
    },
    {
      title: "实例状态",
      dataIndex: "InstanceState",
      width: 120,
      render: (_, row) =>
        row.InstanceState ? (
          <Tag
            color={
              row.InstanceState === "RUNNING"
                ? token.colorSuccess
                : token.colorError
            }
          >
            {row.InstanceState}
          </Tag>
        ) : (
          "-"
        ),
    },
  ]

  const onSelectChange = (
    newSelectedRowKeys: React.Key[],
    rows: CMDB.InstanceInfo[],
  ) => {
    setSelectedRowKeys(newSelectedRowKeys)
    onInstanceSelected(rows)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    fixed: true,
    getCheckboxProps: (row: CMDB.InstanceInfo) => {
      if (releaseInstances.find((instance) => instance.uid === row.Uid)) {
        return { disabled: true }
      }
      return {}
    },
  }

  return (
    <>
      <Table
        name="release-option-instance"
        actionRef={tableRef}
        columns={columns}
        rowKey="Uid"
        searchPlaceholder="请输入实例ID/名称/IP地址查询"
        request={instancePageListApiCmdbInstances}
        defaultColumnsState={columnsState}
        rowSelection={rowSelection}
        scroll={{
          y: "calc(80vh - 120px)",
        }}
        rowClassName={(row) =>
          releaseInstances.find((instance) => instance.uid === row.Uid)
            ? "[&>td]:!bg-[#ebf0ff] [&>td]:hover:!bg-[#ebf0ff] cursor-pointer"
            : ""
        }
      />
    </>
  )
}
