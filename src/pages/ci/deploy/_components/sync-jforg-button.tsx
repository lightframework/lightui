import { packagesSyncApiDepPackagesSync } from "@/services/dep/packages"
import { useAccess } from "@umijs/max"
import { Button, message } from "antd"
import { useState } from "react"

export default function SyncJforgButton() {
  const access = useAccess()
  const [loading, setLoading] = useState(false)

  return (
    <Button
      type="primary"
      onClick={async () => {
        setLoading(true)
        await packagesSyncApiDepPackagesSync()
        setLoading(false)
        message.success("刷新成功")
      }}
      loading={loading}
      disabled={!access.packagesSyncApiDepPackagesSync}
    >
      刷新Jforg
    </Button>
  )
}
