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
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
} from "@/constants/table"
import { tableCellDatetimePostProcess } from "@/lib/utils"
import { auDeleteApiOpsAuById, auPageListApiOpsAu } from "@/services/ops/au"
import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { App, Button, Flex, Tag } from "antd"
import { useRef, useState } from "react"
import UsageDomainsetTable from "../../primary-accessunit/components/usage-domainset-table"
import UsageIpsetTable from "../../primary-accessunit/components/usage-ipset-table"
import RelatedAccessUnitDetailsDrawer from "./related-accessunit-details-drawer"
import RelatedAccessUnitFormDrawer from "./related-accessunit-form-drawer"

const enum DrawerType {
  Add,
  Edit,
  Details,
  None,
}

export default function RelatedAccessUnitTable() {
  const { modal, message } = App.useApp()
  const tableRef = useRef<ActionType>()

  const [drawerType, setDrawerType] = useState<DrawerType>(DrawerType.None)
  const [currentAu, setCurrentAu] = useState<OPS.AuList | undefined>()

  const closeDrawer = () => {
    setDrawerType(DrawerType.None)
    setCurrentAu(undefined)
  }

  const showIpSets = (au: OPS.AuList) =>
    modal.info({
      title: `${au.name} - IP集`,
      icon: null,
      okText: "确认",
      width: "80dvw",
      content: <UsageIpsetTable ids={au.ipsetIds ?? []} />,
    })

  const showDomainSets = (au: OPS.AuList) =>
    modal.info({
      title: `${au.name} - 域名集`,
      icon: null,
      okText: "确认",
      width: "80dvw",
      content: <UsageDomainsetTable ids={au.domainsetIds ?? []} />,
    })

  const showDeleteConfirm = (au: OPS.AuList) =>
    modal.confirm({
      title: "确定删除访问单元吗？",
      icon: <ExclamationCircleOutlined />,
      content: `删除访问单元 ${au.name}`,
      onOk: async () => {
        await auDeleteApiOpsAuById({ id: String(au.id) })
        message.success("删除成功")
        tableRef.current?.reload(false)
      },
    })

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
      title: "IP集",
      key: "ipsetCount",
      width: 100,
      render: (_, row) => (
        <Button type="link" size="small" onClick={() => showIpSets(row)}>
          {row.ipsetIds?.length ?? 0}
        </Button>
      ),
    },
    {
      title: "域名集",
      key: "domainsetCount",
      width: 100,
      render: (_, row) => (
        <Button type="link" size="small" onClick={() => showDomainSets(row)}>
          {row.domainsetIds?.length ?? 0}
        </Button>
      ),
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
      title: "创建者",
      dataIndex: "createdBy",
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      valueType: "dateTime",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (dom, row) => tableCellDatetimePostProcess(dom, row.createdAt),
    },
    {
      title: "更新者",
      dataIndex: "updatedBy",
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      title: "更新时间",
      dataIndex: "updatedAt",
      valueType: "dateTime",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (dom, row) => tableCellDatetimePostProcess(dom, row.updatedAt),
    },
    {
      title: "操作",
      key: "options",
      width: 170,
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
            {
              text: "编辑",
              onClick: () => {
                setDrawerType(DrawerType.Edit)
                setCurrentAu(row)
              },
            },
            {
              text: "删除",
              danger: true,
              onClick: () => showDeleteConfirm(row),
            },
          ]}
        />
      ),
    },
  ]

  return (
    <>
      <Table
        name="relatedAccessUnit"
        actionRef={tableRef}
        columns={columns}
        rowKey="id"
        request={auPageListApiOpsAu}
        params={{ related: true }}
        searchPlaceholder="请输入名称查询"
        toolbar={{
          actions: [
            <Button key="push" type="primary">
              推送
            </Button>,
            <Button
              key="create"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setDrawerType(DrawerType.Add)}
            >
              添加
            </Button>,
          ],
        }}
      />

      <RelatedAccessUnitFormDrawer
        open={[DrawerType.Add, DrawerType.Edit].includes(drawerType)}
        onClose={closeDrawer}
        accessUnit={currentAu}
        onFinish={() => tableRef.current?.reload()}
      />
      <RelatedAccessUnitDetailsDrawer
        open={drawerType === DrawerType.Details}
        onClose={closeDrawer}
        id={currentAu?.id}
        onClickIpSetCount={currentAu ? () => showIpSets(currentAu) : undefined}
        onClickDomainSetCount={
          currentAu ? () => showDomainSets(currentAu) : undefined
        }
      />
    </>
  )
}
