import CloudSyncButton from "@/components/cloud-sync-button"
import ResizableFilterList, {
  FilterListItem,
} from "@/components/resizable-filter-list"
import { useQueryCloud } from "@/lib/hooks/data"
import { regionDeleteApiCmdbRegionsByUid } from "@/services/cmdb/region"
import { ExclamationCircleOutlined, SyncOutlined } from "@ant-design/icons"
import { useQueryClient } from "@tanstack/react-query"
import { useAccess, useLocation, useParams } from "@umijs/max"
import { message } from "antd"
import useModal from "antd/es/modal/useModal"
import { useState } from "react"
import RegionCreateModalForm from "./region-create-modal-form"
import RegionUpdateModalForm from "./region-update-modal-form"

export default function RegionList({
  regions,
}: {
  regions: CMDB.RegionOption[]
}) {
  const access = useAccess()
  const [modal, contextHolder] = useModal()

  const { pathname, search } = useLocation()
  const currentUrl = pathname + search

  const queryClient = useQueryClient()
  const refetchRegions = () =>
    queryClient.invalidateQueries({ queryKey: ["region-options"] })

  const [selectedRegionToUpdate, setSelectedRegionToUpdate] = useState<
    CMDB.RegionOption | undefined
  >()

  const { cloudUid } = useParams()
  const { data: cloud } = useQueryCloud(cloudUid!)

  const showDeleteConfirm = (region: CMDB.RegionOption) =>
    modal.confirm({
      title: "确定删除区域吗？",
      icon: <ExclamationCircleOutlined />,
      content: `删除区域 ${region.RegionName}（${region.Region}）`,
      onOk: async () => {
        await regionDeleteApiCmdbRegionsByUid({ uid: region.Uid })
        message.success("删除成功")
        refetchRegions()
      },
    })

  const items: FilterListItem[] = regions.map((region) => ({
    label: `${region.RegionName} - ${
      !!region.City.CityNameCn ? region.City.CityNameCn : "(无)"
    }`,
    key: region.Uid,
    to: currentUrl.replace(/\/regions\/.*\//, `/regions/${region.Uid}/`),
    onEditClick: access.regionUpdateApiCmdbRegionsByUid
      ? () => setSelectedRegionToUpdate(region)
      : undefined,
    onRemoveClick:
      !cloud?.SupportApi && access.regionDeleteApiCmdbRegionsByUid
        ? () => showDeleteConfirm(region)
        : undefined,
  }))

  return (
    <>
      {contextHolder}
      <ResizableFilterList
        name="region"
        title="区域列表"
        items={items}
        minWidth={240}
        extras={
          <div className="flex items-center gap-x-px">
            <RegionCreateModalForm
              onFinish={() =>
                queryClient.invalidateQueries({ queryKey: ["region-options"] })
              }
            />
            <CloudSyncButton
              type="region"
              buttonProps={{
                type: "text",
                icon: <SyncOutlined />,
                shape: "circle",
              }}
              onFinish={() =>
                queryClient.invalidateQueries({ queryKey: ["region-options"] })
              }
            />
          </div>
        }
        searchPlaceHolder="请输入区域名称查询"
      />
      <RegionUpdateModalForm
        open={selectedRegionToUpdate !== undefined}
        onCancel={() => setSelectedRegionToUpdate(undefined)}
        region={selectedRegionToUpdate}
        onFinish={refetchRegions}
      />
    </>
  )
}
