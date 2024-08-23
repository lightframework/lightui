import { ctfTplOptionsApiIbexCtfsOptions } from "@/services/ibex/tpls"
import { useQuery } from "@tanstack/react-query"
import { Cascader } from "antd"

export interface CtfTemplateSelectProps {
  onSelect?: (item: IBEX.CtfTpl) => void
}

export default function CtfTemplateSelect({
  onSelect,
}: CtfTemplateSelectProps) {
  const { data: ctfTplOptions } = useQuery({
    queryKey: ["ctf-options"],
    queryFn: () =>
      ctfTplOptionsApiIbexCtfsOptions({}).then((res) => res.data?.items),
  })

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
      className="w-[300px]"
      onChange={(selected) => {
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
