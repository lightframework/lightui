import { TagProps } from "antd"
import { ReactNode } from "react"

export function transformCrontabLevel(level: number): {
  label: ReactNode
  tooltip: ReactNode
  color?: TagProps["color"]
} {
  switch (level) {
    case 1: {
      return {
        label: "A",
        tooltip: "影响客户运行中的网络业务",
        color: "red",
      }
    }
    case 2: {
      return {
        label: "B",
        tooltip: "已在使用中的客户端或CPE不受影响，新的客户端或CPE暂无法连接",
        color: "orange",
      }
    }
    case 3: {
      return {
        label: "C",
        tooltip: "Protal无法登陆但不影响业务面",
        color: "blue",
      }
    }
    case 4: {
      return { label: "D", tooltip: "无客户感知", color: "green" }
    }
    default: {
      return {
        label: level.toString(),
        tooltip: level.toString(),
      }
    }
  }
}
