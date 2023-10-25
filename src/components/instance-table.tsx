import CopyableText from "@/components/copyable-text"
import Table, { TableColumns, TableColumnsState } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import TableCellEllipsisList from "@/components/table-cell-ellipsis-list"
import VerticalDataList from "@/components/vertical-data-list"
import {
  dictDisplay,
  diskTypeDict,
  instanceChargeTypeDict,
  renewFlagDict,
} from "@/constants/dict"
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_DESC_WIDTH,
  TABLE_CELL_UID_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
} from "@/constants/table"
import { useToken } from "@/lib/hooks/use-token"
import { toLocaleDateTimeString } from "@/lib/utils"
import {
  instancePageListApiCmdbInstances,
  instanceSyncApiCmdbInstancesSync,
} from "@/services/cmdb/instance"
import { SyncOutlined } from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Button, Tag, message } from "antd"
import useModal from "antd/es/modal/useModal"
import { useRef, useState } from "react"
import InstanceInfoModal from "./instance-info-modal"

export default function InstanceTable({
  cloudUid,
  regionUid,
  zoneUid,
  height,
}: {
  cloudUid?: string
  regionUid?: string
  zoneUid?: string
  height?: number | string
}) {
  const { token } = useToken()
  const access = useAccess()
  const [modal, contextHolder] = useModal()
  const tableRef = useRef<ActionType>()

  const [selectedInstanceToView, setSelectedInstanceToView] = useState<
    CMDB.InstanceInfo | undefined
  >()

  const columnsState: TableColumnsState = {
    Uid: { show: false },
    updateAt: { show: false },
    updateBy: { show: false },
    createBy: { show: false },
    createAt: { show: false },
    DataDiskSet: { show: false },
    RestrictState: { show: false },
    InstanceType: { show: false },
    DefaultLoginUser: { show: false },
    DefaultLoginPort: { show: false },
    Image: { show: false },
    OsName: { show: false },
    SecurityGroupSet: { show: false },
    CloudTagOptionSet: { show: false },
    CreatedTime: { show: false },
    Description: { show: false },
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
            {dictDisplay(row.SystemDisk.DiskType, diskTypeDict)} -{" "}
            {row.SystemDisk.DiskSize}GB
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
      title: "数据盘",
      key: "DataDiskSet",
      render: (_, row) => (
        <TableCellEllipsisList
          items={row.DataDiskSet}
          renderItem={(item, index) =>
            `${index + 1}：${dictDisplay(item.DiskType, diskTypeDict)} - ${
              item.DiskSize
            }GB`
          }
        />
      ),
      width: 200,
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
    {
      title: "RestrictState",
      dataIndex: "RestrictState",
      width: 120,
      render: (_, row) =>
        row.RestrictState ? (
          <Tag
            color={
              row.RestrictState === "NORMAL"
                ? token.colorSuccess
                : token.colorError
            }
          >
            {row.RestrictState}
          </Tag>
        ) : (
          "-"
        ),
    },
    {
      title: "可用区",
      key: "zone",
      width: 200,
      renderText: (_, row) => row.Zone.ZoneName,
    },
    {
      title: "计费模式",
      key: "instanceCharge",
      render: (_, row) => (
        <div>
          <div>
            {dictDisplay(row.InstanceChargeType, instanceChargeTypeDict)}
          </div>
          <div>{dictDisplay(row.RenewFlag, renewFlagDict)}</div>
          <div>{toLocaleDateTimeString(row.ExpiredTime)}到期</div>
        </div>
      ),
      width: 180,
    },

    {
      title: "镜像",
      dataIndex: ["Image", "ImageName"],
      width: 200,
    },
    {
      title: "操作系统",
      dataIndex: "OsName",
      width: 150,
    },
    {
      title: "默认用户",
      dataIndex: "DefaultLoginUser",
      width: 120,
    },
    {
      title: "默认端口",
      dataIndex: "DefaultLoginPort",
      width: 80,
    },
    {
      title: "安全组",
      key: "SecurityGroupSet",
      render: (_, row) => (
        <TableCellEllipsisList
          items={row.SecurityGroupSet}
          renderItem={(item) => item.SecurityGroupName}
        />
      ),
      width: 200,
    },
    {
      title: "云商标签",
      key: "CloudTagOptionSet",
      render: (_, row) => (
        <TableCellEllipsisList
          items={row.CloudTagOptionSet}
          renderItem={(item) => `${item.Key}:${item.Value}`}
        />
      ),
      width: 140,
    },
    {
      title: "实例创建时间",
      dataIndex: "CreatedTime",
      valueType: "dateTime",
      width: TABLE_CELL_DATETIME_WIDTH,
    },
    {
      title: "创建者",
      dataIndex: "createBy",
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      title: "创建时间",
      dataIndex: "createAt",
      valueType: "dateTime",
      width: TABLE_CELL_DATETIME_WIDTH,
    },
    {
      title: "更新者",
      dataIndex: "updateBy",
      width: TABLE_CELL_USERNAME_WIDTH,
    },
    {
      title: "更新时间",
      dataIndex: "updateAt",
      valueType: "dateTime",
      width: TABLE_CELL_DATETIME_WIDTH,
    },
    {
      title: "备注",
      dataIndex: "Description",
      ellipsis: true,
      width: TABLE_CELL_DESC_WIDTH,
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
              onClick: () => setSelectedInstanceToView(row),
              disabled: !access.instanceReadOneApiCmdbInstancesByUid,
            },
          ]}
        />
      ),
    },
  ]

  const instanceSync = async () =>
    modal.confirm({
      title: `确定同步主机实例吗？`,
      onOk: async () => {
        if (regionUid) {
          await instanceSyncApiCmdbInstancesSync({
            RegionUid: regionUid,
          })
          message.success("同步成功")
          tableRef.current?.reload()
        }
      },
    })

  return (
    <>
      {contextHolder}
      <Table
        name="host-instance"
        actionRef={tableRef}
        columns={columns}
        rowKey="Uid"
        params={{
          CloudUid: cloudUid,
          RegionUid: regionUid,
          ZoneUid: zoneUid,
        }}
        searchPlaceholder="请输入实例ID/名称/IP地址查询"
        request={instancePageListApiCmdbInstances}
        defaultColumnsState={columnsState}
        scroll={
          height
            ? {
                y: height,
              }
            : undefined
        }
        toolbar={{
          actions: [
            <Button
              key="cloud-sync"
              type="primary"
              disabled={
                !access.instanceSyncApiCmdbInstancesSync ||
                !regionUid ||
                !!zoneUid
              }
              onClick={instanceSync}
            >
              <SyncOutlined />
              同步
            </Button>,
          ],
        }}
      />
      <InstanceInfoModal
        open={selectedInstanceToView !== undefined}
        onCancel={() => setSelectedInstanceToView(undefined)}
        instance={selectedInstanceToView}
      />
    </>
  )
}
