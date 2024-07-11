import { Select } from "antd"

export default function IpsInput({
  value,
  onChange,
}: {
  value?: string[]
  onChange?: (ips?: string[]) => void
}) {
  return (
    <Select
      mode="tags"
      tokenSeparators={[",", " "]}
      className="w-[240px]"
      placeholder="请输入IP地址，多个IP空白符分隔"
      value={value}
      allowClear
      onChange={onChange}
    />
  )
}
