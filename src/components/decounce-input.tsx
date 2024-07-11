import { useDebounceValue } from "@ant-design/pro-components"
import { Input, InputProps } from "antd"
import { useEffect, useState } from "react"

export interface DebounceInputProps
  extends Omit<InputProps, "value" | "onChange"> {
  value?: string
  onChange?: (value: string) => void
}

export default function DebounceInput({
  value,
  onChange,
  ...props
}: DebounceInputProps) {
  const [innerValue, setInnerValue] = useState(value ?? "")
  const debouncedValue = useDebounceValue(innerValue)

  useEffect(() => {
    onChange?.(debouncedValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue])

  return (
    <Input
      {...props}
      value={innerValue}
      onChange={(e) => setInnerValue(e.target.value)}
    />
  )
}
