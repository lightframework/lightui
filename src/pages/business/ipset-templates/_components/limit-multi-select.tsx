import { locationListApiOpsIpsettemplatesLocation } from "@/services/ops/ipsettemplate"
import { ProFormSelect, useDebounceValue } from "@ant-design/pro-components"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

export default function LimitMultiSelect() {
  const [value, setValue] = useState<string>()
  const debouncedValue = useDebounceValue(value, 500)

  const { data, isFetching } = useQuery({
    queryKey: ["limit", debouncedValue],
    queryFn: () =>
      locationListApiOpsIpsettemplatesLocation({
        keywords: debouncedValue,
      }).then((res) => res.data?.list ?? []),
    enabled: !!debouncedValue,
  })

  const handleSearch = (newValue: string) => {
    setValue(newValue)
  }

  return (
    <ProFormSelect
      label="limit"
      name="limit"
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
      rules={[
        {
          required: true,
          message: "请选择limit地区",
        },
      ]}
    />
  )
}
