import { locationListApiOpsIpsettemplatesLocation } from "@/services/ops/ipsettemplate"
import { ProFormSelect, useDebounceValue } from "@ant-design/pro-components"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useState } from "react"

export default function ExcludeMultiSelect() {
  const [value, setValue] = useState<string>()
  const debouncedValue = useDebounceValue(value, 500)

  const { data, isFetching } = useQuery({
    queryKey: ["exclude", debouncedValue],
    queryFn: () =>
      locationListApiOpsIpsettemplatesLocation({
        keywords: debouncedValue,
      }).then((res) => res.data?.list ?? []),
    placeholderData: keepPreviousData,
    enabled: !!debouncedValue,
  })

  const handleSearch = (newValue: string) => {
    setValue(newValue)
  }

  return (
    <ProFormSelect
      label="exclude"
      name="exclude"
      mode="multiple"
      placeholder="请先输入关键字查询"
      showSearch
      options={data?.map((item) => ({
        label: item.name,
        value: item.name,
      }))}
      fieldProps={{
        loading: isFetching,
        defaultActiveFirstOption: false,
        filterOption: false,
        onSearch: handleSearch,
      }}
    />
  )
}
