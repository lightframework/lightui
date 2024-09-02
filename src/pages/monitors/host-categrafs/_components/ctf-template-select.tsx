import { ctfTplOptionsApiIbexCtfsOptions } from "@/services/ibex/tpls"
import { useQuery } from "@tanstack/react-query"
import { Cascader } from "antd"
import { useEffect, useState } from "react"

export interface CtfTemplateSelectProps {
  onSelect?: (item: IBEX.CtfTpl) => void
  defaultSelectConfig?: boolean
}

export default function CtfTemplateSelect({
  onSelect,
  defaultSelectConfig,
}: CtfTemplateSelectProps) {
  const { data: ctfTplOptions } = useQuery({
    queryKey: ["ctf-options"],
    queryFn: () =>
      ctfTplOptionsApiIbexCtfsOptions({}).then((res) => res.data?.items),
  })

  const [value, setValue] = useState<string[] | undefined>()

  useEffect(() => {
    if (defaultSelectConfig && ctfTplOptions) {
      const config = ctfTplOptions.find((ctf) => ctf.ctf_type === "config")
      const configDefault = config?.tpls.find(
        (tpl) => tpl.tpl_name === "default",
      )
      if (config && configDefault) {
        setValue([config.ctf_type, configDefault.tpl_name])
        onSelect?.(configDefault)
      }
    }
  }, [ctfTplOptions, defaultSelectConfig])

  return (
    <Cascader
      options={ctfTplOptions?.map((ctf) => ({
        value: ctf.ctf_type,
        label: ctf.ctf_type,
        children: ctf.tpls?.map((tpl) => ({
          value: tpl.tpl_name,
          label: tpl.tpl_name,
        })),
      }))}
      value={value}
      className="w-[300px]"
      onChange={(selected) => {
        setValue(selected)

        if (!selected) {
          return
        }

        const [ctfType, tplName] = selected

        const ctf = ctfTplOptions!.find((ctf) => ctf.ctf_type === ctfType)!
        const tpl = ctf.tpls.find((tpl) => tpl.tpl_name === tplName)!

        onSelect?.(tpl)
      }}
      allowClear={false}
    />
  )
}
