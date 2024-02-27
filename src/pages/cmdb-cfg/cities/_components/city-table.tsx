import Table, { TableColumns, TableColumnsState } from "@/components/table"
import TableCellActions from "@/components/table-cell-actions"
import TableCellEllipsisList from "@/components/table-cell-ellipsis-list"
import { TABLE_CELL_DESC_WIDTH, TABLE_CELL_UID_WIDTH } from "@/constants/table"
import {
  cityDeleteApiCmdbCitysByUid,
  cityPageListApiCmdbCitys,
} from "@/services/cmdb/city"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { ActionType } from "@ant-design/pro-components"
import { useQueryClient } from "@tanstack/react-query"
import { Link, useAccess } from "@umijs/max"
import { message } from "antd"
import useModal from "antd/es/modal/useModal"
import { useRef, useState } from "react"
import CityCreateModalForm from "./city-create-modal-form"
import CityUpdateModalForm from "./city-update-modal-form"

export default function CityTable({
  countryUid,
  continentUid,
}: {
  countryUid?: string
  continentUid?: string
}) {
  const access = useAccess()
  const [modal, contextHolder] = useModal()
  const tableRef = useRef<ActionType>()

  const queryClient = useQueryClient()

  const refetchTreeData = () =>
    queryClient.invalidateQueries({ queryKey: ["continent-placement"] })

  const [selectedCityToUpdate, setSelectedCityToUpdate] = useState<
    CMDB.CityInfo | undefined
  >()

  const showDeleteConfirm = (city: CMDB.CityInfo) =>
    modal.confirm({
      title: "确定删除城市吗？",
      icon: <ExclamationCircleOutlined />,
      content: `删除城市 ${city.CityNameCn}（${city.CityName}）`,
      onOk: async () => {
        await cityDeleteApiCmdbCitysByUid({ uid: city.Uid })
        message.success("删除成功")
        tableRef.current?.reload(false)
        refetchTreeData()
      },
    })

  const columnsState: TableColumnsState = {
    Uid: { show: false },
  }

  const columns: TableColumns<CMDB.CityInfo> = [
    {
      title: "UID",
      dataIndex: "Uid",
      width: TABLE_CELL_UID_WIDTH,
    },
    {
      title: "城市ID",
      dataIndex: "CityId",
      width: 200,
      copyable: true,
      fixed: "left",
    },
    {
      title: "城市名称",
      dataIndex: "CityName",
      width: 200,
      copyable: true,
    },
    {
      title: "城市名称（中文）",
      dataIndex: "CityNameCn",
      width: 200,
      copyable: true,
    },
    {
      title: "实例数量",
      dataIndex: "instanceNum",
      width: 80,
    },
    {
      title: "备注",
      dataIndex: "Description",
      ellipsis: true,
      width: TABLE_CELL_DESC_WIDTH,
    },
    {
      title: "云商",
      dataIndex: "Regions",
      width: 200,
      copyable: true,
      render: (_, row) => (
        <TableCellEllipsisList
          items={row.Regions}
          renderItem={(item) => (
            <Link
              to={`/cmdb-cfg/clouds/${item.Cloud?.Uid}/regions/${item.Uid}`}
            >
              {item.Cloud?.CloudName} - {item.RegionName}
            </Link>
          )}
        />
      ),
    },
    {
      title: "所属地区",
      key: "placement",
      width: 150,
      renderText: (_, row) =>
        `${row.Country.Continent.ContinentNameCn} - ${row.Country.CountryNameCn}`,
    },
    {
      title: "操作",
      key: "options",
      width: 90,
      fixed: "right",
      render: (_, row) => (
        <TableCellActions
          actions={[
            {
              text: "编辑",
              onClick: () => setSelectedCityToUpdate(row),
              disabled: !access.hosttypeUpdateApiCmdbHosttypesByUid,
            },
            {
              text: "删除",
              onClick: () => showDeleteConfirm(row),
              danger: true,
              disabled: !access.hosttypeDeleteApiCmdbHosttypesByUid,
            },
          ]}
        />
      ),
    },
  ]

  return (
    <>
      {contextHolder}
      <Table
        name="city"
        actionRef={tableRef}
        columns={columns}
        rowKey="Uid"
        searchPlaceholder="请输入城市ID/名称查询"
        request={cityPageListApiCmdbCitys}
        params={{ CountryUid: countryUid, ContinentUid: continentUid }}
        toolbar={{
          actions: [
            <CityCreateModalForm
              key="city-create"
              countryUid={countryUid}
              onFinish={() => {
                tableRef.current?.reload()
                refetchTreeData()
              }}
            />,
          ],
        }}
        defaultColumnsState={columnsState}
      />
      <CityUpdateModalForm
        open={selectedCityToUpdate !== undefined}
        onCancel={() => setSelectedCityToUpdate(undefined)}
        city={selectedCityToUpdate}
        onFinish={() => tableRef.current?.reload(false)}
      />
    </>
  )
}
