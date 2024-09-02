import { TagProps } from "antd"

export const enum HostCtfState {
  UNINSTALLED = "UNINSTALLED",
  MONIT_STARTED = "MONIT_STARTED",
  RUNNING = "RUNNING",
  STOPED = "STOPED",
  UNDEFINED = "UNDEFINED",
}

export const hostCtfStateDict: Record<
  HostCtfState,
  { label?: string; color?: TagProps["color"] }
> = {
  RUNNING: { label: "已纳管", color: "green" },
  STOPED: { label: "已暂停", color: "orange" },
  UNINSTALLED: { label: "未安装", color: "red" },
  MONIT_STARTED: { label: "仅监控", color: "blue" },
  UNDEFINED: { label: "未知" },
}
