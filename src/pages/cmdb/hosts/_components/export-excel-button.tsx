import { useLocalStorageState } from "@/lib/hooks/use-local-storage-state"
import { hostFieldsApiCmdbHostsFields } from "@/services/cmdb/host"
import { ModalForm, ProFormCheckbox } from "@ant-design/pro-components"
import { useQuery } from "@tanstack/react-query"
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
  const [localFields, setLocalFields] = useLocalStorageState<
    Record<string, boolean> | undefined
  >("host-export-fields", undefined)

  const { data: fields } = useQuery({
    queryKey: ["host-export-fields"],
    queryFn: () => hostFieldsApiCmdbHostsFields(),
    select: (res) => res.data?.items ?? [],
  })

  const exportExcel = async (fields: string[]) => {
    setLoading(true)

    const token = localStorage.getItem("token")

    try {
      const res = await fetch("/api/cmdb/hosts/export", {
        method: "POST",
        body: JSON.stringify({
          Path: path,
          EnvUid: envUid,
          CityUid: cityUid,
          CloudUid: cloudUid,
          ProjectUid: projectUid,
          OpsUid: opsUid,
          SupportUid: supportUid,
          AppUids: appUids,
          State: state,
          Ips: ips?.split(","),
          items: fields,
        } satisfies CMDB.HostExportReq),
        headers: {
          "Content-Type": "application/json",
          Authorization: token!,
        },
      })

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
    <>
      <ModalForm
        title="导出主机字段配置"
        layout="horizontal"
        trigger={
          <Button
            disabled={!access.hostExportApiCmdbHostsExport}
            type="primary"
            loading={loading}
          >
            导出
          </Button>
        }
        initialValues={localFields}
        onFinish={async (values) => {
          setLocalFields(values)

          const keys: string[] = []
          Object.entries(values).forEach(([key, value]) => {
            if (value) {
              keys.push(key)
            }
          })

          console.log(keys)

          if (keys.length === 0) {
            message.error("请选择要导出的字段")
            return false
          }

          await exportExcel(keys)
          return true
        }}
      >
        <div className="grid grid-cols-3">
          {fields &&
            fields.map((field) => (
              <ProFormCheckbox
                key={field.key}
                name={field.key}
                label={field.name}
              />
            ))}
        </div>
      </ModalForm>
    </>
  )
}
