import Table, { TableColumns } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import {
  AllAuAutoUpdate,
  AllAuAutoUpdateDict,
  AllAuGetWay,
  AllAuGetWayDict,
  AllAuOverWall,
  AllAuOverWallDict,
  AllAuSupportApi,
  AllAuSupportApiDict,
  AuResourceType,
  AuResourceTypeDict,
} from "@/constants/dict"
import { TABLE_MODAL_HEIGHT } from "@/constants/table"
import { auPageListApiOpsAu } from "@/services/ops/au"
import { ActionType } from "@ant-design/pro-components"
import { Flex, Tag } from "antd"
import { useRef, useState } from "react"
import RelatedAccessUnitDetailsDrawer from "../../related-accessunit/components/related-accessunit-details-drawer"

const enum DrawerType {
  Add,
  Edit,
  Details,
  None,
}

export default function UsageAccessUnitTable({ ids }: { ids: number[] }) {
  const tableRef = useRef<ActionType>()

  const [drawerType, setDrawerType] = useState<DrawerType>(DrawerType.None)
  const [currentAu, setCurrentAu] = useState<OPS.AuList | undefined>()

  const closeDrawer = () => {
    setDrawerType(DrawerType.None)
    setCurrentAu(undefined)
  }

  const columns: TableColumns<OPS.AuList> = [
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
    },
    {
      title: "名称",
      dataIndex: "name",
      width: 140,
    },
    {
      title: "类型",
      key: "type",
      width: 100,
      render: (_, row) => (
        <Tag color={row.related ? "purple" : "blue"}>
          {row.related ? "Related" : "Primary"}
        </Tag>
      ),
    },
    {
      title: "资源类型",
      key: "resourceType",
      width: 220,
      render: (_, row) =>
        row.resourceType?.map((type) => {
          const { label, color } = AuResourceTypeDict[type as AuResourceType]
          return (
            <Tag key={type} color={color}>
              {label}
            </Tag>
          )
        }),
    },
    {
      title: "IPSet",
      key: "ipsetCount",
      width: 100,
      render: (_, row) => row.ipsetIds?.length ?? 0,
    },
    {
      title: "DomainSet",
      key: "domainsetCount",
      width: 100,
      render: (_, row) => row.domainsetIds?.length ?? 0,
    },
    {
      title: "支持FQ",
      dataIndex: "overWall",
      width: 100,
      render: (_, row) => {
        if (!row.overWall) {
          return null
        }

        const { label, color } =
          AllAuOverWallDict[row.overWall as AllAuOverWall]
        return <Tag color={color}>{label}</Tag>
      },
    },
    {
      title: "自动更新",
      dataIndex: "autoUpdate",
      width: 100,
      render: (_, row) => {
        if (!row.autoUpdate) {
          return null
        }
        const { label, color } =
          AllAuAutoUpdateDict[row.autoUpdate as AllAuAutoUpdate]
        return <Tag color={color}>{label}</Tag>
      },
    },
    {
      title: "支持API",
      dataIndex: "officialSupportApi",
      width: 100,
      render: (_, row) => {
        if (!row.officialSupportApi) {
          return null
        }
        const { label, color } =
          AllAuSupportApiDict[row.officialSupportApi as AllAuSupportApi]
        return <Tag color={color}>{label}</Tag>
      },
    },
    {
      title: "获取方式",
      dataIndex: "getWay",
      width: 240,
      render: (_, row) => (
        <Flex
          gap={4}
          style={{
            flexWrap: "wrap",
          }}
        >
          {row.getWay?.map((way) => {
            const { label, color } = AllAuGetWayDict[way as AllAuGetWay] ?? {}
            return (
              <Tag key={way} color={color}>
                {label}
              </Tag>
            )
          })}
        </Flex>
      ),
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
              onClick: () => {
                setDrawerType(DrawerType.Details)
                setCurrentAu(row)
              },
            },
          ]}
        />
      ),
    },
  ]

  return (
    <>
      <Table
        name="usageAccessUnit"
        actionRef={tableRef}
        columns={columns}
        rowKey="id"
        request={auPageListApiOpsAu}
        params={{ auIds: ids.join(",") }}
        searchPlaceholder="请输入名称查询"
        scroll={{ y: TABLE_MODAL_HEIGHT }}
      />
      <RelatedAccessUnitDetailsDrawer
        open={drawerType === DrawerType.Details}
        onClose={closeDrawer}
        id={currentAu?.id}
      />
    </>
  )
}
