import CopyableText from "@/components/copyable-text"
import StdStringDisplayModal from "@/components/std-string-display-modal"
import Table, { TableColumns, TableColumnsState } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import TableCellEllipsisList from "@/components/table-cell-ellipsis-list"
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_UID_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
} from "@/constants/table"
import { tableCellDatetimePostProcess } from "@/lib/utils"

import { dictDisplay, releaseResourceTypeDict } from "@/constants/dict"
import { releasePageListApiOpsReleases } from "@/services/ops/release"
import { ActionType } from "@ant-design/pro-components"
import { useRef, useState } from "react"
import HostDestroyModal from "./host-destroy-modal"
import InstanceDestroyModal from "./instance-destroy-modal"

export default function ReleaseTable() {
  const tableRef = useRef<ActionType>()

  const [selectedReleaseToView, setSelectedReleaseToView] =
    useState<OPS.Release>()

  const columnsState: TableColumnsState = {
    id: { show: false },
  }

  const columns: TableColumns<OPS.Release> = [
    {
      title: "ID",
      dataIndex: "id",
      width: TABLE_CELL_UID_WIDTH,
    },
    {
      title: "名称",
      dataIndex: "HostName",
      width: 300,
      copyable: true,
      fixed: "left",
    },
    {
      title: "资源类型",
      dataIndex: "ResourceType",
      renderText: (value) => dictDisplay(value, releaseResourceTypeDict),
      width: 120,
    },
    {
      title: "IP地址",
      key: "addresses",
      render: (_, row) => {
        return (
          <div>
            <TableCellEllipsisList
              items={row.PublicIpAddresses}
              renderItem={(ip) =>
                ip ? <CopyableText text={`${ip}（公）`} copyText={ip} /> : null
              }
              empty={null}
            />
            <TableCellEllipsisList
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
      title: "运维",
      dataIndex: "OpsSet",
      render: (_, row) => (
        <TableCellEllipsisList items={row.Ops} renderItem={(row) => row} />
      ),
      width: 80,
    },
    {
      title: "技术支持",
      dataIndex: "SupportSet",
      render: (_, row) => (
        <TableCellEllipsisList items={row.Supports} renderItem={(row) => row} />
      ),
      width: 80,
    },
    {
      title: "所属环境",
      dataIndex: "Env",
      width: 160,
    },
    {
      title: "所属项目",
      dataIndex: "Projects",
      render: (_, row) => (
        <TableCellEllipsisList items={row.Projects} renderItem={(row) => row} />
      ),
      width: 300,
    },
    {
      title: "实例来源",
      key: "cloud",
      render: (_, row) => (
        <div>
          <div>云商：{row.Cloud}</div>
          <div>区域：{row.Region}</div>
          <div>可用区：{row.Zone}</div>
        </div>
      ),
      width: 200,
    },
    {
      title: "实例ID",
      dataIndex: "InstanceId",
      width: 240,
    },
    {
      title: "实例配置",
      key: "instance-config",
      render: (_, row) => (
        <div>
          <span>{row.Cpu}核</span>
          {"-"}
          <span>{row.Memory}GB</span>
        </div>
      ),
      width: 100,
    },
    {
      title: "操作人",
      dataIndex: "CreatedBy",
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      title: "销毁时间",
      dataIndex: "CreatedAt",
      valueType: "dateTime",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (dom, row) => tableCellDatetimePostProcess(dom, row.CreatedAt),
    },
    {
      title: "操作",
      key: "options",
      width: 70,
      fixed: "right",
      render: (_, row) => (
        <TableCellActions
          actions={[
            {
              text: "查看详情",
              onClick: () => setSelectedReleaseToView(row),
            },
          ]}
        />
      ),
    },
  ]

  return (
    <>
      <Table
        name="release"
        actionRef={tableRef}
        columns={columns}
        rowKey="id"
        searchPlaceholder="请输入关键字查询"
        request={releasePageListApiOpsReleases}
        toolbar={{
          actions: [
            <InstanceDestroyModal key="instance-destroy" />,
            <HostDestroyModal key="host-destroy" />,
          ],
        }}
        defaultColumnsState={columnsState}
      />
      <StdStringDisplayModal
        title={`${selectedReleaseToView?.HostName} - 资源详情`}
        open={selectedReleaseToView !== undefined}
        onCancel={() => setSelectedReleaseToView(undefined)}
        content={selectedReleaseToView?.ResourceInfo}
      />
    </>
  )
}
