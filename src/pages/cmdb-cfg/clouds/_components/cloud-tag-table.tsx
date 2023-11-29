import CloudSyncButton from "@/components/cloud-sync-button"
import Table, { TableColumns, TableColumnsState } from "@/components/table"
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_DESC_WIDTH,
  TABLE_CELL_UID_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
  TABLE_MODAL_HEIGHT,
} from "@/constants/table"
import { cloudTagPageListApiCmdbCloudtags } from "@/services/cmdb/cloudTag"
import { SyncOutlined } from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { useRef } from "react"

export default function CloudTagTable({ cloudUid }: { cloudUid: string }) {
  const tableRef = useRef<ActionType>()

  const columnsState: TableColumnsState = {
    Uid: { show: false },
  }

  const columns: TableColumns<CMDB.CloudTagInfo> = [
    {
      title: "UID",
      dataIndex: "Uid",
      width: TABLE_CELL_UID_WIDTH,
    },
    {
      title: "标签",
      dataIndex: "Key",
      copyable: true,
      sorter: true,
      width: 180,
    },
    {
      title: "标签值",
      dataIndex: "Value",
      copyable: true,
      width: 180,
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
        name="cloud-tag"
        actionRef={tableRef}
        columns={columns}
        rowKey="Uid"
        params={{ CloudUid: cloudUid }}
        searchPlaceholder="请输入标签/标签值查询"
        request={cloudTagPageListApiCmdbCloudtags}
        defaultColumnsState={columnsState}
        scroll={{
          y: TABLE_MODAL_HEIGHT,
        }}
        toolbar={{
          actions: [
            <CloudSyncButton
              key="cloud-tag-sync"
              cloudUid={cloudUid}
              type="tag"
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
