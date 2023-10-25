import CloudSyncButton from "@/components/cloud-sync-button"
import Table, { TableColumns, TableColumnsState } from "@/components/table"
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_DESC_WIDTH,
  TABLE_CELL_UID_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
  TABLE_REGION_HEIGHT,
} from "@/constants/table"
import { useToken } from "@/lib/hooks/use-token"
import { imagePageListApiCmdbImages } from "@/services/cmdb/image"
import { SyncOutlined } from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { Tag } from "antd"
import { useRef } from "react"

export default function ImageTable({ regionUid }: { regionUid: string }) {
  const { token } = useToken()
  const tableRef = useRef<ActionType>()

  const columnsState: TableColumnsState = {
    Uid: { show: false },
    createAt: { show: false },
    createBy: { show: false },
    Description: { show: false },
    IsSupportCloudinit: { show: false },
    Platfor: { show: false },
    ImageSource: { show: false },
    LicenseType: { show: false },
    SyncPercent: { show: false },
    ImageCreator: { show: false },
  }

  const columns: TableColumns<CMDB.ImageInfo> = [
    {
      title: "UID",
      dataIndex: "Uid",
      width: TABLE_CELL_UID_WIDTH,
    },
    {
      title: "镜像ID",
      dataIndex: "ImageId",
      width: 140,
      copyable: true,
      sorter: true,
    },
    {
      title: "镜像名称",
      dataIndex: "ImageName",
      copyable: true,
      sorter: true,
      width: 300,
    },
    {
      title: "状态",
      dataIndex: "ImageState",
      width: 100,
      sorter: true,
      render: (_, row) => (
        <Tag
          color={
            row.ImageState === "NORMAL" ? token.colorSuccess : token.colorError
          }
        >
          {row.ImageState}
        </Tag>
      ),
    },
    {
      title: "镜像类型",
      dataIndex: "ImageType",
      width: 120,
    },
    {
      title: "镜像架构",
      dataIndex: "Architecture",
      width: 70,
    },
    {
      title: "镜像平台",
      dataIndex: "Platfor",
      width: 80,
    },
    {
      title: "系统名称",
      dataIndex: "OsName",
      width: 300,
    },
    {
      title: "镜像大小 (MB)",
      dataIndex: "ImageSize",
      width: 100,
    },
    {
      title: "镜像源",
      dataIndex: "ImageSource",
      width: 150,
    },
    {
      title: "协议类型",
      dataIndex: "LicenseType",
      width: 120,
    },
    {
      title: "支持cloud-init",
      dataIndex: "IsSupportCloudinit",
      render: (_, row) => (
        <Tag
          color={row.IsSupportCloudinit ? token.colorSuccess : token.colorError}
        >
          {row.IsSupportCloudinit ? "是" : "否"}
        </Tag>
      ),
      width: 150,
    },
    {
      title: "同步进度",
      dataIndex: "SyncPercent",
      width: 80,
      render: (_, row) => `${row.SyncPercent}%`,
    },
    {
      title: "镜像创建者",
      dataIndex: "ImageCreator",
      width: 120,
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
  ]

  return (
    <>
      <Table
        name="image"
        actionRef={tableRef}
        columns={columns}
        rowKey="Uid"
        params={{ RegionUid: regionUid }}
        searchPlaceholder="请输入镜像ID/名称查询"
        request={imagePageListApiCmdbImages}
        defaultColumnsState={columnsState}
        scroll={{
          y: TABLE_REGION_HEIGHT,
        }}
        toolbar={{
          actions: [
            <CloudSyncButton
              key="image-sync"
              type="image"
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
    </>
  )
}
