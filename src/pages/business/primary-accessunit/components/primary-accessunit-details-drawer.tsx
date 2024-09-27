import {
  AllAuAutoUpdateDict,
  AllAuGetWayDict,
  AllAuOverWallDict,
  AllAuSupportApiDict,
  AuResourceTypeDict,
  dictGet,
} from "@/constants/dict"
import { auReadOneApiOpsAuById } from "@/services/ops/au"
import { useQuery } from "@tanstack/react-query"
import { Button, Descriptions, Drawer, Tag } from "antd"

export interface PrimaryAccessUnitDetailsDrawerProps {
  open: boolean
  onClose: VoidFunction
  id?: number
  onClickIpSetCount?: VoidFunction
  onClickDomainSetCount?: VoidFunction
  onClickRelatedAuCount?: VoidFunction
}

export default function PrimaryAccessUnitDetailsDrawer({
  open,
  onClose,
  id,
  onClickIpSetCount,
  onClickDomainSetCount,
  onClickRelatedAuCount,
}: PrimaryAccessUnitDetailsDrawerProps) {
  const { data, isPending } = useQuery({
    queryKey: ["accessunit", id],
    queryFn: () => auReadOneApiOpsAuById({ id: String(id) }),
    enabled: !!id,
    select: (data) => data.data?.data,
  })

  return (
    <Drawer
      open={open}
      onClose={onClose}
      loading={isPending}
      title={data?.name}
      width={500}
    >
      <Descriptions
        column={1}
        items={[
          {
            key: "id",
            label: "id",
            children: data?.id,
          },
          {
            key: "resourceType",
            label: "资源类型",
            children: (
              <div className="flex items-center gap-2">
                {data?.resourceType?.map((type) => (
                  <Tag key={type}>
                    {dictGet(type, AuResourceTypeDict)?.label}
                  </Tag>
                ))}
              </div>
            ),
          },
          {
            key: "ipsetCount",
            label: "IP集数量",
            children: onClickIpSetCount ? (
              <Button type="link" size="small" onClick={onClickIpSetCount}>
                {data?.ipsetIds?.length ?? 0}
              </Button>
            ) : (
              (data?.ipsetIds?.length ?? 0)
            ),
          },
          {
            key: "domainsetCount",
            label: "域名集数量",
            children: onClickDomainSetCount ? (
              <Button type="link" size="small" onClick={onClickDomainSetCount}>
                {data?.domainsetIds?.length ?? 0}
              </Button>
            ) : (
              (data?.domainsetIds?.length ?? 0)
            ),
          },
          {
            key: "relatedAuCount",
            label: "RelatedAU数量",
            children: onClickRelatedAuCount ? (
              <Button type="link" size="small" onClick={onClickRelatedAuCount}>
                {data?.relatedIds?.length ?? 0}
              </Button>
            ) : (
              (data?.relatedIds?.length ?? 0)
            ),
          },
          {
            key: "fq",
            label: "FQ",
            children:
              data?.overWall &&
              dictGet(data.overWall.toString(), AllAuOverWallDict)?.label,
          },
          {
            key: "autoUpdate",
            label: "自动更新",
            children:
              data?.autoUpdate &&
              dictGet(data.autoUpdate.toString(), AllAuAutoUpdateDict)?.label,
          },
          {
            key: "supportApi",
            label: "官网支持API",
            children:
              data?.officialSupportApi &&
              dictGet(data.officialSupportApi.toString(), AllAuSupportApiDict)
                ?.label,
          },
          {
            key: "getWay",
            label: "获取方式",
            children: (
              <div className="flex items-center gap-2">
                {data?.getWay?.map((way) => (
                  <Tag key={way}>{dictGet(way, AllAuGetWayDict)?.label}</Tag>
                ))}
              </div>
            ),
          },
          {
            key: "desc",
            label: "备注",
            children: data?.description,
          },
          {
            key: "faultRecords",
            label: "故障记录",
            children: data?.faultRecords,
          },
          {
            key: "desc",
            label: "问题记录",
            children: data?.issueRecords,
          },
          {
            key: "desc",
            label: "相关信息",
            children: data?.information,
          },
        ]}
      />
    </Drawer>
  )
}
