import CloudSyncButton from "@/components/cloud-sync-button"
import CopyableText from "@/components/copyable-text"
import Table, { TableColumns, TableColumnsState } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import VerticalDataList from "@/components/vertical-data-list"
import {
  TABLE_CELL_DATETIME_WIDTH,
  TABLE_CELL_DESC_WIDTH,
  TABLE_CELL_IP_WIDTH,
  TABLE_CELL_UID_WIDTH,
  TABLE_CELL_USERNAME_WIDTH,
  TABLE_REGION_HEIGHT,
} from "@/constants/table"
import { useToken } from "@/lib/hooks/use-token"
import { vpcPageListApiCmdbVpcs } from "@/services/cmdb/vpc"
import { SyncOutlined } from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Tag } from "antd"
import { useRef, useState } from "react"
import SubnetTableModal from "./subnet-table-modal"

export default function VpcTable({ regionUid }: { regionUid: string }) {
  const { token } = useToken()
  const access = useAccess()
  const tableRef = useRef<ActionType>()

  const [selectedVpcToViewSubnet, setSelectedVpcToViewSubnet] = useState<
    CMDB.VpcInfo | undefined
  >()

  const columnsState: TableColumnsState = {
    Uid: { show: false },
    createAt: { show: false },
    createBy: { show: false },
  }

  const columns: TableColumns<CMDB.VpcInfo> = [
    {
      title: "UID",
      dataIndex: "Uid",
      width: TABLE_CELL_UID_WIDTH,
    },
    {
      title: "VPC ID",
      dataIndex: "VpcId",
      copyable: true,
      width: 180,
      sorter: true,
    },
    {
      title: "VPC名称",
      dataIndex: "VpcName",
      copyable: true,
      sorter: true,
      width: 200,
    },
    {
      title: " VPC网段",
      dataIndex: "CidrBlock",
      copyable: true,
      width: TABLE_CELL_IP_WIDTH,
    },
    {
      title: "是否默认",
      key: "IsDefault",
      dataIndex: "IsDefault",
      render: (_, row) => (
        <Tag color={row.IsDefault ? token.colorSuccess : token.colorError}>
          {row.IsDefault ? "是" : "否"}
        </Tag>
      ),
      width: 70,
    },
    {
      title: "DNS列表",
      dataIndex: "DnsServerSet",
      ellipsis: true,
      render: (_, row) => (
        <VerticalDataList
          items={row.DnsServerSet}
          renderItem={(dns) => <CopyableText text={dns} />}
        />
      ),
      width: 130,
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
      width: 70,
      render: (_, row) => (
        <TableCellActions
          actions={[
            {
              text: "查看子网",
              onClick: () => setSelectedVpcToViewSubnet(row),
              disabled: !access.subnetPageListApiCmdbSubnets,
            },
          ]}
        />
      ),
    },
  ]

  return (
    <>
      <Table
        name="vpc"
        actionRef={tableRef}
        columns={columns}
        rowKey="Uid"
        params={{ RegionUid: regionUid }}
        searchPlaceholder="请输入VPC ID/名称查询"
        request={vpcPageListApiCmdbVpcs}
        defaultColumnsState={columnsState}
        scroll={{
          y: TABLE_REGION_HEIGHT,
        }}
        toolbar={{
          actions: [
            <CloudSyncButton
              key="vpc-sync"
              type="vpc"
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
      <SubnetTableModal
        open={selectedVpcToViewSubnet !== undefined}
        onCancel={() => setSelectedVpcToViewSubnet(undefined)}
        vpc={selectedVpcToViewSubnet}
      />
    </>
  )
}
