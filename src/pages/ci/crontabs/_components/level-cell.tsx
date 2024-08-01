import { Tag, Tooltip } from "antd"
import { transformCrontabLevel } from "../_helper"

export interface LevelCellProps {
  level: number
}

export default function LevelCell({ level }: LevelCellProps) {
  const info = transformCrontabLevel(level)

  return (
    <Tooltip title={info.tooltip}>
      <Tag color={info.color}>{info.label}</Tag>
    </Tooltip>
  )
}
