import CopyableText from "@/components/copyable-text"
import Table, { TableColumns, TableColumnsState } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import TableCellEllipsisList from "@/components/table-cell-ellipsis-list"
import VerticalDataList from "@/components/vertical-data-list"
import {
  dictDisplay,
  dictGet,
  hostStateDict,
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
import {
  tableCellDatetimePostProcess,
  tableCellString,
  toLocaleDateTimeString,
} from "@/lib/utils"
import { hostPageListApiCmdbHosts } from "@/services/cmdb/host"
import { ActionType } from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Select, Tag } from "antd"
import { useRef, useState } from "react"
import HostDeleteModalForm from "./host-delete-modal-form"
import HostInfoModal from "./host-info-modal"
import "./host-table.less"
import HostUpdateModalForm from "./host-update-modal-form"

function StateMultiSelect({
  onSelect,
}: {
  onSelect: (states: string[]) => void
}) {
  return (
    <Select
      allowClear
      className="host-state-select"
      mode="multiple"
      placeholder="选择状态"
      style={{
        width: 500,
      }}
      onChange={onSelect}
      options={Object.values(hostStateDict).map((state) => ({
        label: state.label,
        value: state.value,
      }))}
    />
  )
}

export default function HostTable({
  envId,
  hostType,
}: {
  envId?: string
  hostType?: string
}) {
  const { token } = useToken()
  const access = useAccess()
  const tableRef = useRef<ActionType>()

  const [selectedHostToView, setSelectedHostToView] = useState<
    CMDB.HostInfo | undefined
  >()
  const [selectedHostToUpdate, setSelectedHostToUpdate] = useState<
    CMDB.HostInfo | undefined
  >()

  const [states, setStates] = useState<string[] | undefined>()

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [selectedHostUids, setSelectedHostUids] = useState<string[]>([])

  const columnsState: TableColumnsState = {
    updateAt: { show: false },
    updateBy: { show: false },
    createBy: { show: false },
    createAt: { show: false },
    Uid: { show: false },
    "Instance,InstanceName": { show: false },
    DataDiskSet: { show: false },
    "Instance,RestrictState": { show: false },
    "Instance,InstanceType": { show: false },
    "Env,EnvName": { show: false },
    "Instance,DefaultLoginUser": { show: false },
    "Instance,DefaultLoginPort": { show: false },
    "Instance,InstanceState": { show: false },
    "Instance,Image,ImageName": { show: false },
    "Instance,OsName": { show: false },
    SecurityGroupSet: { show: false },
    CloudTagOptionSet: { show: false },
    "Instance,InstanceDesc": { show: false },
    "Instance,CreatedTime": { show: false },
    "Instance,Description": { show: false },
    Description: { show: false },
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
      title: "运维",
      dataIndex: "OpsSet",
      render: (_, row) => (
        <div className="flex flex-wrap gap-x-2">
          {row.OpsSet?.map((person) => (
            <span key={person.Uid}>{person.PersonName}</span>
          )) ?? "-"}
        </div>
      ),
      width: 200,
    },
    {
      title: "技术支持",
      dataIndex: "SupportSet",
      render: (_, row) => (
        <div className="flex flex-wrap gap-x-2">
          {row.SupportSet?.map((person) => (
            <span key={person.Uid}>{person.PersonName}</span>
          )) ?? "-"}
        </div>
      ),
      width: 200,
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
    {
      title: "登录用户",
      dataIndex: "LoginUser",
      width: 100,
    },
    {
      title: "登录端口",
      dataIndex: "LoginPort",
      width: 80,
    },
    {
      title: "登录密码",
      width: 200,
    },
    {
      title: "数据盘",
      key: "DataDiskSet",
      render: (_, row) => (
        <TableCellEllipsisList
          items={row.Instance?.DataDisks}
          renderItem={(item, index) => `${index + 1}：${item}`}
        />
      ),
      width: 200,
    },
    {
      title: "实例类型",
      dataIndex: ["Instance", "InstanceType"],
      width: 150,
    },
    {
      title: "实例状态",
      dataIndex: ["Instance", "InstanceState"],
      width: 120,
      render: (_, row) =>
        row.Instance?.InstanceState ? (
          <Tag
            color={
              row.Instance?.InstanceState === "RUNNING"
                ? token.colorSuccess
                : token.colorError
            }
          >
            {row.Instance?.InstanceState}
          </Tag>
        ) : (
          "-"
        ),
    },
    {
      title: "RestrictState",
      dataIndex: ["Instance", "RestrictState"],
      width: 120,
    },
    {
      title: "主机类型",
      dataIndex: ["HostType", "HostType"],
      width: 140,
    },
    {
      title: "所属环境",
      dataIndex: ["Env", "EnvName"],
      width: 120,
    },
    {
      title: "所属项目",
      dataIndex: "ProjectSet",
      width: 250,
      render: (_, row) => (
        <TableCellEllipsisList
          items={row.ProjectSet}
          renderItem={(project) => project.ProjectName}
        />
      ),
    },
    {
      title: "应用",
      dataIndex: "AppSet",
      render: (_, row) => (
        <TableCellEllipsisList
          items={row.AppSet?.filter((app) => app.App)}
          renderItem={(item) =>
            item.Version ? `${item.App}:${item.Version}` : item.App
          }
        />
      ),
      width: 140,
    },
    {
      title: "云商",
      dataIndex: ["Instance", "Zone", "Region", "Cloud", "CloudName"],
      width: 120,
    },
    {
      title: "区域",
      key: "region-zone",
      width: 200,
      renderText: (_, row) =>
        !row.Instance?.Zone?.ZoneName && !row.Instance?.Zone.Region.RegionName
          ? "-"
          : `${tableCellString(
              row.Instance?.Zone.Region.RegionName,
            )} : ${tableCellString(row.Instance?.Zone.ZoneName)}`,
    },
    {
      title: "计费模式",
      key: "instanceCharge",
      render: (_, row) => (
        <div>
          <div>
            {dictDisplay(
              row.Instance?.InstanceChargeType,
              instanceChargeTypeDict,
            )}
          </div>
          <div>{dictDisplay(row.Instance?.RenewFlag, renewFlagDict)}</div>
          <div>
            {row.Instance?.ExpiredTime &&
            row.Instance?.ExpiredTime !== "0001-01-01T00:00:00Z"
              ? `${toLocaleDateTimeString(row.Instance?.ExpiredTime)}到期`
              : "-"}
          </div>
        </div>
      ),
      width: 180,
    },

    {
      title: "镜像",
      dataIndex: ["Instance", "Image", "ImageName"],
      width: 200,
    },
    {
      title: "操作系统",
      dataIndex: ["Instance", "OsName"],
      width: 150,
    },
    {
      title: "默认用户",
      dataIndex: ["Instance", "DefaultLoginUser"],
      width: 120,
    },
    {
      title: "默认端口",
      dataIndex: ["Instance", "DefaultLoginPort"],
      width: 80,
    },
    {
      title: "安全组",
      key: "SecurityGroupSet",
      render: (_, row) => (
        <TableCellEllipsisList
          items={row.Instance?.SecurityGroupSet}
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
          items={row.Instance?.CloudTagOptionSet}
          renderItem={(item) => `${item.Key}:${item.Value}`}
        />
      ),
      width: 140,
    },
    {
      title: "实例创建时间",
      dataIndex: ["Instance", "CreatedTime"],
      valueType: "dateTime",
      width: TABLE_CELL_DATETIME_WIDTH,
      render: (dom, row) =>
        tableCellDatetimePostProcess(dom, row.Instance?.CreatedTime),
    },
    {
      title: "实例备注",
      dataIndex: ["Instance", "Description"],
      width: TABLE_CELL_DESC_WIDTH,
      ellipsis: true,
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
      render: (dom, row) => tableCellDatetimePostProcess(dom, row.createAt),
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
      render: (dom, row) => tableCellDatetimePostProcess(dom, row.updateAt),
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
      width: 134,
      fixed: "right",
      render: (_, row) => (
        <TableCellActions
          actions={[
            {
              text: "详情",
              onClick: () => setSelectedHostToView(row),
              disabled: !access.hostInfoApiCmdbHostsByUid,
            },
            {
              text: "配置",
              onClick: () => setSelectedHostToUpdate(row),
              disabled: !access.hostUpdateApiCmdbHostsByUid,
            },
            {
              text: "日志",
              disabled: true,
            },
          ]}
        />
      ),
    },
  ]

  const onSelectChange = (
    newSelectedRowKeys: React.Key[],
    rows: CMDB.HostInfo[],
  ) => {
    setSelectedRowKeys(newSelectedRowKeys)
    setSelectedHostUids(rows.map((host: any) => host.Uid))
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    fixed: true,
  }

  return (
    <>
      <Table
        name="env-host"
        className="env-host-table"
        actionRef={tableRef}
        columns={columns}
        rowKey="Uid"
        params={{
          EnvId: envId,
          HostType: hostType,
          States: states?.join(","),
        }}
        searchPlaceholder="请输入主机名称/IP地址/实例ID/名称查询"
        request={hostPageListApiCmdbHosts}
        defaultColumnsState={columnsState}
        toolbar={{
          subTitle: (
            <div className="flex items-center space-x-2">
              <StateMultiSelect onSelect={setStates} />
            </div>
          ),
          actions: [
            <HostDeleteModalForm
              key="host-delete"
              hostUids={selectedHostUids}
              onFinish={() => tableRef.current?.reload(false)}
            />,
          ],
        }}
        rowSelection={rowSelection}
      />
      <HostInfoModal
        open={selectedHostToView !== undefined}
        onCancel={() => setSelectedHostToView(undefined)}
        host={selectedHostToView}
      />
      <HostUpdateModalForm
        open={selectedHostToUpdate !== undefined}
        onCancel={() => setSelectedHostToUpdate(undefined)}
        host={selectedHostToUpdate}
        onFinish={() => tableRef.current?.reload(false)}
      />
    </>
  )
}
