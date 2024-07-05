import { Select } from "antd"
import clsx from "clsx"
import { useEffect, useMemo, useState } from "react"

export interface WatchkeeperUpdateProps {
  options?: string[]
  initialValue?: string[]
  allowEdit?: boolean
  onFinish?: (value: string[]) => void
}

const COLORS = ["#ffa940", "#7cb305", "#1677ff", "#9254de", "#f759ab"]
const NOT_FOUND_USER_COLOR = "#ff4d4f"

export default function WatchkeeperUpdate({
  options,
  initialValue,
  allowEdit,
  onFinish,
}: WatchkeeperUpdateProps) {
  const [readonly, setReadonly] = useState(true)
  const [value, setValue] = useState<string[]>([])

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue)
    }
  }, [initialValue])

  const userColor = useMemo(() => {
    const colors: Record<string, string> = {}

    options?.forEach((option, index) => {
      colors[option] = COLORS[index % (COLORS.length - 1)]
    })

    return colors
  }, [options])

  return (
    <div
      className={clsx("h-full w-full text-center")}
      onClick={allowEdit ? () => setReadonly(false) : undefined}
      style={{ pointerEvents: "initial" }}
    >
      {readonly ? (
        <>
          {initialValue?.map((user) => (
            <span
              key={user}
              style={{
                color: userColor[user] ?? NOT_FOUND_USER_COLOR,
                fontSize: 14,
                marginRight: 8,
              }}
            >
              {user}
            </span>
          ))}
        </>
      ) : (
        <Select
          mode="multiple"
          value={value}
          onChange={setValue}
          options={options?.map((u) => ({ value: u, label: u }))}
          style={{ width: "100%" }}
          defaultOpen
          onDropdownVisibleChange={(open) => {
            if (!open) {
              setReadonly(true)
              onFinish?.(value)
            }
          }}
        />
      )}
    </div>
  )
}
