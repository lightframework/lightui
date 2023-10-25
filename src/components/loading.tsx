import { Spin } from "antd"

export default function Loading() {
  return (
    <div className="grid h-full place-items-center">
      <Spin />
    </div>
  )
}
