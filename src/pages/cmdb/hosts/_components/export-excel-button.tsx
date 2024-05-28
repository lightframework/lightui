import { useLocalStorageState } from "@/lib/hooks/use-local-storage-state"
import { HolderOutlined } from "@ant-design/icons"
import { ModalForm, ProFormCheckbox } from "@ant-design/pro-components"
import { useAccess } from "@umijs/max"
import { Alert, Button, message } from "antd"
import useFormInstance from "antd/es/form/hooks/useFormInstance"
import { useEffect, useMemo, useState } from "react"
import { ReactSortable } from "react-sortablejs"

function SelectAllCheckbox({
  fields,
  checked,
  indeterminate,
  onChange,
}: {
  fields: CMDB.FieldInfo[]
  checked?: boolean
  indeterminate?: boolean
  onChange?: (checked: boolean) => void
}) {
  const form = useFormInstance()

  return (
    <ProFormCheckbox
      label="全选/全不选"
      fieldProps={{
        checked,
        indeterminate,
        onChange: (e) => {
          const { checked } = e.target

          if (checked) {
            fields.forEach((field) => form.setFieldValue(field.key, true))
          } else {
            fields.forEach((field) => form.setFieldValue(field.key, false))
          }

          onChange?.(checked)
        },
      }}
    />
  )
}

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
  fields: initialFields,
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
  fields: CMDB.FieldInfo[]
}) {
  const access = useAccess()
  const [loading, setLoading] = useState(false)
  const [localFields, setLocalFields] = useLocalStorageState<
    Record<string, boolean>
  >("host-export-fields", {})

  const [fields, setFields] = useState<(CMDB.FieldInfo & { id: string })[]>(
    initialFields.map((field) => ({ ...field, id: field.key })),
  )

  useEffect(() => {
    const localFieldsStr = localStorage.getItem("host-export-field-order")

    if (localFieldsStr) {
      let localFields: typeof fields = JSON.parse(localFieldsStr)

      localFields = localFields.filter((field) =>
        initialFields.some((f) => f.key === field.key),
      )

      initialFields.forEach((field) => {
        if (!localFields.some((f) => f.key === field.key)) {
          localFields.push({ ...field, id: field.key })
        }
      })

      setFields(localFields)
    }
  }, [])

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

  const [formValues, setFormValues] = useState<Record<string, any>>({})

  const selectAllChecked = useMemo(() => {
    const allSelect = initialFields.every((field) => !!formValues[field.key])
    if (allSelect) {
      return true
    }

    const AllUnSelect = initialFields.every((field) => !formValues[field.key])
    if (AllUnSelect) {
      return false
    }

    return undefined
  }, [initialFields, formValues])

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
        onValuesChange={(_, values) => setFormValues(values)}
        onFinish={async (values) => {
          setLocalFields(values)

          const keys: string[] = []

          Object.entries(values).forEach(([key, value]) => {
            if (value) {
              keys.push(key)
            }
          })

          const orderedKeys: string[] = []

          fields.forEach((field) => {
            if (keys.includes(field.key)) {
              orderedKeys.push(field.key)
            }
          })

          if (keys.length === 0) {
            message.error("请选择要导出的字段")
            return false
          }

          await exportExcel(orderedKeys)
          return true
        }}
      >
        <Alert
          type="info"
          message="字段复选框顺序和导出Excel中字段顺序一致，可拖动排序。"
          closable
          className="mb-4"
        />
        <SelectAllCheckbox
          fields={initialFields}
          checked={selectAllChecked}
          indeterminate={selectAllChecked === undefined ? true : false}
          onChange={(checked) => {
            const newFormValues: Record<string, boolean> = {}

            initialFields.forEach(
              (field) => (newFormValues[field.key] = checked),
            )
            setFormValues(newFormValues)
          }}
        />
        <ReactSortable
          list={fields}
          setList={(state) => {
            setFields(state)
            localStorage.setItem(
              "host-export-field-order",
              JSON.stringify(state),
            )
          }}
          className="grid grid-cols-3 gap-3"
        >
          {fields.map((field) => (
            <div
              key={field.key}
              className="flex cursor-move items-center gap-2"
            >
              <HolderOutlined />
              <span>{field.name}</span>
              <ProFormCheckbox name={field.key} noStyle />
            </div>
          ))}
        </ReactSortable>
      </ModalForm>
    </>
  )
}
