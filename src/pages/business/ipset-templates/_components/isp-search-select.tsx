import { useQueryIpsetTemplateIspOptions } from "@/lib/hooks/data"
import { ProFormSelect, useDebounceValue } from "@ant-design/pro-components"
import { useState } from "react"

export default function IspSearchSelect() {
  const [value, setValue] = useState<string>()
  const debouncedValue = useDebounceValue(value, 500)
  const ispQuery = useQueryIpsetTemplateIspOptions(debouncedValue)

  const handleSearch = (newValue: string) => {
    setValue(newValue)
  }

  return (
    <ProFormSelect
      label="ISP"
      name="isp"
      placeholder="请先输入关键字查询"
      showSearch
      options={ispQuery.data?.map((item) => ({
        label: item.name,
        value: item.name,
      }))}
      fieldProps={{
        loading: ispQuery.isFetching,
        defaultActiveFirstOption: false,
        filterOption: false,
        onSearch: handleSearch,
      }}
    />
  )
}
