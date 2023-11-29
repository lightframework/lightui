import Table, { TableColumns, TableColumnsState } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_DESC_WIDTH,
  TABLE_CELL_UID_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
  TABLE_REGION_HEIGHT,
} from "@/constants/table"
import {
  zoneDeleteApiCmdbZonesByUid,
  zonePageListApiCmdbZones,
} from "@/services/cmdb/zone"
import { ActionType } from "@ant-design/pro-components"
import { Tag, message } from "antd"

import CloudSyncButton from "@/components/cloud-sync-button"
import { useToken } from "@/lib/hooks/use-token"
import { ExclamationCircleOutlined, SyncOutlined } from "@ant-design/icons"
import { useAccess } from "@umijs/max"
import useModal from "antd/es/modal/useModal"
import { useRef, useState } from "react"
import { useMetaData } from "../../_lib/use-meta-data"
import ZoneCreateModalForm from "./zone-create-modal-form"
import ZoneInstanceTableModal from "./zone-instance-table-modal"
import ZoneUpdateModalForm from "./zone-update-modal-form"

export default function ZoneTable({ regionUid }: { regionUid: string }) {
  const { token } = useToken()
  const [modal, contextHolder] = useModal()
  const access = useAccess()
  const tableRef = useRef<ActionType>()

  const { cloud } = useMetaData()

  const [selectedZoneToViewInstance, setSelectedZoneToViewInstance] = useState<
    CMDB.ZoneInfo | undefined
  >()
  const [selectedZoneToUpdate, setSelectedZoneToUpdate] = useState<
    CMDB.ZoneInfo | undefined
  >()

  const showDeleteConfirm = (zone: CMDB.ZoneInfo) =>
    modal.confirm({
      title: "确定删除可用区吗？",
      icon: <ExclamationCircleOutlined />,
      content: `删除可用区 ${zone.ZoneName}（${zone.Zone}）`,
      onOk: async () => {
        await zoneDeleteApiCmdbZonesByUid({ uid: zone.Uid })
        message.success("删除成功")
        tableRef.current?.reload(false)
      },
    })

  const columnsState: TableColumnsState = {
    createAt: { show: false },
    createBy: { show: false },
    Uid: { show: false },
  }

  const columns: TableColumns<CMDB.ZoneInfo> = [
    {
      title: "UID",
      dataIndex: "Uid",
      width: TABLE_CELL_UID_WIDTH,
    },
    {
      title: "可用区ID",
      dataIndex: "Zone",
      copyable: true,
      sorter: true,
      width: 240,
    },
    {
      title: "可用区名称",
      dataIndex: "ZoneName",
      copyable: true,
      sorter: true,
      width: 250,
    },
    {
      title: "状态",
      dataIndex: "ZoneState",
      width: 120,
      sorter: true,
      render: (_, row) => (
        <Tag
          color={
            row.ZoneState === "AVAILABLE"
              ? token.colorSuccess
              : token.colorError
          }
        >
          {row.ZoneState}
        </Tag>
      ),
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
      fixed: "right",
      width: 180,
      render: (_, row) => {
        return (
          <TableCellActions
            actions={[
              {
                text: "查看可用机型",
                onClick: () => setSelectedZoneToViewInstance(row),
                disabled: !access.instanceTypeQuotaItemPageListApiCmdbInstypes,
              },
              {
                text: "编辑",
                onClick: () => setSelectedZoneToUpdate(row),
                disabled:
                  cloud?.SupportApi || !access.zoneUpdateApiCmdbZonesByUid,
              },
              {
                text: "删除",
                onClick: () => showDeleteConfirm(row),
                danger: true,
                disabled:
                  cloud?.SupportApi || !access.zoneDeleteApiCmdbZonesByUid,
              },
            ]}
          />
        )
      },
    },
  ]

  return (
    <>
      {contextHolder}
      <Table
        name="zone"
        actionRef={tableRef}
        columns={columns}
        rowKey="Uid"
        params={{ RegionUid: regionUid }}
        searchPlaceholder="请输入可用区ID/名称查询"
        request={zonePageListApiCmdbZones}
        defaultColumnsState={columnsState}
        scroll={{
          y: TABLE_REGION_HEIGHT,
        }}
        toolbar={{
          actions: [
            <ZoneCreateModalForm
              key="zone-create"
              onFinish={() => tableRef.current?.reload()}
            />,
            <CloudSyncButton
              key="zone-sync"
              type="zone"
              regionUid={regionUid}
              buttonProps={{
                type: "primary",
                children: "同步",
                icon: <SyncOutlined />,
              }}
              onFinish={() => tableRef.current?.reload()}
            />,
          ],
        }}
      />

      <ZoneInstanceTableModal
        open={selectedZoneToViewInstance !== undefined}
        onCancel={() => setSelectedZoneToViewInstance(undefined)}
        zone={selectedZoneToViewInstance}
      />

      <ZoneUpdateModalForm
        open={selectedZoneToUpdate !== undefined}
        onCancel={() => setSelectedZoneToUpdate(undefined)}
        zone={selectedZoneToUpdate}
        onFinish={() => tableRef.current?.reload(false)}
      />
    </>
  )
}
