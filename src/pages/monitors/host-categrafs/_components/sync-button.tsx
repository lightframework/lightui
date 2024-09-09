import { hostCtfSyncApiIbexCtfsHostsBySyncuid } from "@/services/ibex/hosts"
import { Button, message } from "antd"
import { useEffect, useState } from "react"

export interface SyncButtonProps {
  host: CMDB.HostInfo
  onFinish?: VoidFunction
}

export default function SyncButton({ host, onFinish }: SyncButtonProps) {
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    if (disabled) {
      const timer = setTimeout(() => setDisabled(false), 10 * 1000)
      return () => clearTimeout(timer)
    }
  }, [disabled])

  return (
    <Button
      type="link"
      size="small"
      disabled={disabled}
      onClick={async (e) => {
        e.stopPropagation()
        setDisabled(true)
        message.info("已开始同步服务器Categraf配置信息，请稍等！")
        await hostCtfSyncApiIbexCtfsHostsBySyncuid({ uid: host.Uid })

        onFinish?.()
      }}
    >
      同步
    </Button>
  )
}
