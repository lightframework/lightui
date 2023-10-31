import {
  CloudSyncType,
  cloudSyncTargetMap,
  cloudSyncTitleMap,
} from "@/constants/cloud"
import { useQueryCloud, useQueryRegion } from "@/lib/hooks/data"
import { useToken } from "@/lib/hooks/use-token"
import { cloudSyncApiCmdbCloudsSync } from "@/services/cmdb/cloud"
import { useAccess, useParams } from "@umijs/max"
import { Button, ButtonProps, Tooltip, message } from "antd"
import useModal from "antd/es/modal/useModal"
import { useState } from "react"

export default function CloudSyncButton({
  cloudUid,
  regionUid,
  type,
  buttonProps,
  onFinish,
}: {
  cloudUid?: string
  regionUid?: string
  type: CloudSyncType
  buttonProps: ButtonProps
  onFinish?: VoidFunction
}) {
  const { token } = useToken()
  const [isTimeLimited, setIsTimeLimited] = useState(false)
  const access = useAccess()
  const params = useParams()
  const [modal, contextHolder] = useModal()

  const CloudUid = cloudUid ?? params.cloudUid
  if (!CloudUid) {
    throw new Error(
      "<CloudSyncButton> must be used with props or params `cloudUid`",
    )
  }

  const { data: cloud } = useQueryCloud(CloudUid)

  const { data: region } = useQueryRegion(regionUid)

  return (
    <>
      {contextHolder}
      <Tooltip
        title={
          cloud?.SupportApi
            ? isTimeLimited
              ? "30s内不能重复点击"
              : "同步"
            : "该云商不支持同步"
        }
      >
        <Button
          {...buttonProps}
          disabled={
            !access.cloudSyncApiCmdbCloudsSync ||
            !cloud?.SupportApi ||
            isTimeLimited
          }
          onClick={() =>
            modal.confirm({
              title: `确定同步${cloudSyncTitleMap[type]}吗？`,
              content: (
                <div>
                  同步{" "}
                  <span style={{ color: token.colorHighlight }}>
                    {cloud?.CloudName}
                    {region?.RegionName ? ` - ${region.RegionName}` : ""}
                  </span>{" "}
                  的{cloudSyncTitleMap[type]}
                </div>
              ),
              onOk: async () => {
                cloudSyncApiCmdbCloudsSync({
                  CloudUid: CloudUid,
                  RegionUid: regionUid,
                  target: cloudSyncTargetMap[type],
                })
                message.success("已开始同步，请稍后刷新查看")
                setIsTimeLimited(true)
                setTimeout(() => setIsTimeLimited(false), 1000 * 30)
                onFinish?.()
              },
            })
          }
        />
      </Tooltip>
    </>
  )
}
