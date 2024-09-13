import { hostCtfSyncApiIbexCtfsHostsBySyncuid } from "@/services/ibex/hosts"
import { App, Button } from "antd"

export interface SyncButtonProps {
  host: CMDB.HostInfo
  onFinish?: VoidFunction
}

export default function SyncButton({ host, onFinish }: SyncButtonProps) {
  const { message } = App.useApp()

  return (
    <Button
      type="link"
      size="small"
      onClick={async (e) => {
        e.stopPropagation()
        message.loading(`正在同步${host.HostName}监控配置信息，请稍后...`)
        await hostCtfSyncApiIbexCtfsHostsBySyncuid({ uid: host.Uid })
        message.destroy()
        message.success("同步成功")
        onFinish?.()
      }}
    >
      同步
    </Button>
  )
}
