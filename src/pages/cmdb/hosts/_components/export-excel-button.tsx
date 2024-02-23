import { useAccess } from "@umijs/max"
import { Button, message } from "antd"
import { useState } from "react"

export default function ExportExcelButton({
  path,
  envUid,
  cityUid,
  cloudUid,
  projectUid,
  opsUid,
  appUids,
  supportUid,
  state,
  ips,
}: {
  path?: string
  envUid?: string
  cityUid?: string
  cloudUid?: string
  projectUid?: string
  opsUid?: string
  supportUid?: string
  appUids?: string[]
  state?: string
  ips?: string
}) {
  const access = useAccess()
  const [loading, setLoading] = useState(false)

  const exportExcel = async () => {
    setLoading(true)

    const token = localStorage.getItem("token")

    const searchParams = new URLSearchParams()

    if (path) searchParams.append("Path", path)
    if (envUid) searchParams.append("EnvUid", envUid)
    if (cityUid) searchParams.append("CityUid", cityUid)
    if (cloudUid) searchParams.append("CloudUid", cloudUid)
    if (projectUid) searchParams.append("ProjectUid", projectUid)
    if (opsUid) searchParams.append("OpsUid", opsUid)
    if (supportUid) searchParams.append("SupportUid", supportUid)
    if (appUids) searchParams.append("AppUids", appUids.join(","))
    if (state) searchParams.append("State", state)
    if (ips) searchParams.append("Ips", ips)

    try {
      const res = await fetch(
        "/api/cmdb/hosts/export" + `?${searchParams.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token!,
          },
        },
      )

      const blob = await res.blob()

      const url = window.URL.createObjectURL(blob)

      let filename = "hosts.xlsx"

      const disposition = res.headers.get("Content-Disposition")
      if (disposition && disposition.indexOf("attachment") !== -1) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
        let matches = filenameRegex.exec(disposition)
        if (matches !== null && matches[1]) {
          filename = matches[1].replace(/['"]/g, "")
        }
      }

      const a = document.createElement("a")
      a.href = url
      a.download = filename
      a.click()

      window.URL.revokeObjectURL(url)
    } catch (error) {
      message.error("导出excel失败")
    }

    setLoading(false)
  }

  return (
    <Button
      key="export"
      disabled={!access.hostExportApiCmdbHostsExport}
      type="primary"
      loading={loading}
      onClick={exportExcel}
    >
      导出
    </Button>
  )
}
