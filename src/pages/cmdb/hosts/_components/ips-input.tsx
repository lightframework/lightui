import { Input } from "antd"
import { forwardRef, useEffect, useImperativeHandle, useState } from "react"

export type IpsInputRef = {
  clear: () => void
}

export interface IpsInputProps {
  onPressEnter: (value?: string) => void
}

const IpsInput = forwardRef<IpsInputRef, IpsInputProps>((props, ref) => {
  const [Ips, setIps] = useState("")

  useImperativeHandle(ref, () => ({
    clear: () => setIps(""),
  }))

  useEffect(() => {
    if (Ips.trim() === "") {
      props.onPressEnter(undefined)
    }
  }, [Ips])

  return (
    <Input
      type="text"
      value={Ips}
      onChange={(e) => setIps(e.target.value)}
      id="host-table-ips"
      className="w-[200px]"
      placeholder="请输入IP地址，多个IP空白符分隔"
      onPressEnter={() => {
        props.onPressEnter(Ips.trim().replaceAll(/\s+/g, ","))
      }}
    />
  )
})
IpsInput.displayName = "IpsInput"

export default IpsInput
