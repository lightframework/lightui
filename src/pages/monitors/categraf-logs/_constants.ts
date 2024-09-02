import { TagProps } from "antd"

export const enum LogOption {
  install = "install",
  uninstall = "uninstall",
  create = "create",
  update = "update",
  delete = "delete",
}

export const logOptionDict: Record<
  LogOption,
  { label?: string; color?: TagProps["color"] }
> = {
  install: { label: "安装", color: "green" },
  uninstall: { label: "停用", color: "orange" },
  create: { label: "创建", color: "blue" },
  update: { label: "修改", color: "purple" },
  delete: { label: "移除", color: "red" },
}
