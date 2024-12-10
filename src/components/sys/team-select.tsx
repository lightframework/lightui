import { useQueryTeamList } from "@/lib/hooks/data"
import { Select } from "antd"

const filterOption = (
  input: string,
  option?: { label: string; value: string },
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())

export default function TeamSelect({
  value,
  onChange,
}: {
  value?: number[]
  onChange?: (envUids?: string[]) => void
}) {
  //   const options = useQueryTeamList(0, PERM_READ, true)
  const options = useQueryTeamList()

  return (
    <Select
      mode="multiple"
      value={value}
      options={options.data?.map((item) => ({
        label: item.name,
        value: item.id,
      }))}
      filterOption={filterOption}
      placeholder="团队"
      style={{ width: 200 }}
      onChange={onChange}
      allowClear
      showSearch
    />
  )
}
