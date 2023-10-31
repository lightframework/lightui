import { CloudSyncType, cloudSyncTargetMap } from "@/constants/cloud"
import { useQueryCloud } from "@/lib/hooks/data"
import { cloudSyncApiCmdbCloudsSync } from "@/services/cmdb/cloud"
import { useAccess, useParams } from "@umijs/max"
import { Button, ButtonProps, Tooltip, message } from "antd"
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
  const [isTimeLimited, setIsTimeLimited] = useState(false)
  const access = useAccess()
  const params = useParams()

  const CloudUid = cloudUid ?? params.cloudUid
  if (!CloudUid) {
    throw new Error(
      "<CloudSyncButton> must be used with props or params `cloudUid`",
    )
  }

  const { data: cloud } = useQueryCloud(CloudUid)

  return (
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
        onClick={() => {
          cloudSyncApiCmdbCloudsSync({
            CloudUid: CloudUid,
            RegionUid: regionUid,
            target: cloudSyncTargetMap[type],
          })
          message.success("已开始同步，请稍后刷新查看")
          setIsTimeLimited(true)
          setTimeout(() => setIsTimeLimited(false), 1000 * 30)
          onFinish?.()
        }}
      />
    </Tooltip>
  )
}
