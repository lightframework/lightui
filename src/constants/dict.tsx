import {
  CheckCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons"
import { TagProps } from "antd"

export function dictDisplay<K extends string>(
  word: string,
  dict: Record<K, string>,
) {
  const res = dict[word as K]
  return res ? res : word
}

export function dictGet<K extends string, V>(word: string, dict: Record<K, V>) {
  const res = dict[word as K]
  return res ? res : undefined
}

export type InstanceChargeType = "PREPAID" | "POSTPAID_BY_HOUR"

export const DEFAULT_INSTANCE_CHARGE_TYPE = "PREPAID"

export const instanceChargeTypeDict: Record<InstanceChargeType, string> = {
  PREPAID: "包年包月",
  POSTPAID_BY_HOUR: "按时付费",
}

export type DiskType = "CLOUD_SSD" | "CLOUD_PREMIUM"

export const DEFAULT_DISK_TYPE = "CLOUD_PREMIUM"
export const DEFAULT_DISK_SIZE = 50

export const diskTypeDict: Record<DiskType, string> = {
  CLOUD_SSD: "SSD云硬盘",
  CLOUD_PREMIUM: "高性能云硬盘",
}

export type RenewFlag =
  | "NOTIFY_AND_AUTO_RENEW"
  | "NOTIFY_AND_MANUAL_RENEW"
  | "DISABLE_NOTIFY_AND_MANUAL_RENEW"

export const DEFAULT_INSTANCE_RENEW_FLAG = "NOTIFY_AND_AUTO_RENEW"

export const renewFlagDict: Record<RenewFlag, string> = {
  NOTIFY_AND_AUTO_RENEW: "通知过期且自动续费",
  NOTIFY_AND_MANUAL_RENEW: "通知过期不自动续费",
  DISABLE_NOTIFY_AND_MANUAL_RENEW: "不通知过期不自动续费",
}

export type InternetChargeType = "TRAFFIC_POSTPAID_BY_HOUR"

export const DEFAULT_INTERNET_CHARGE_TYPE = "TRAFFIC_POSTPAID_BY_HOUR"

export const internetChargeTypeDict: Record<string, string> = {
  TRAFFIC_POSTPAID_BY_HOUR: "流量按小时后付费",
}

export type ReleaseResourceType = "HostAndInstance" | "Host" | "Instance"

export const releaseResourceTypeDict: Record<ReleaseResourceType, string> = {
  HostAndInstance: "主机+实例",
  Host: "仅主机",
  Instance: "仅实例",
}

export type HostState =
  | "TO_BE_CREATE"
  | "TO_BE_COMPLEMENT"
  | "TO_BE_UPDATE"
  | "PENDING"
  | "TO_BE_DESTROYED"
  | "DESTROYED"
  | "RUNNING"

export const hostStateDict: Record<
  HostState,
  { label: string; value: string; bgColor: string; borderColor: string }
> = {
  TO_BE_CREATE: {
    label: "待创建",
    value: "TO_BE_CREATE",
    bgColor: "#fff2e8",
    borderColor: "#ffa940",
  },
  TO_BE_COMPLEMENT: {
    label: "待完善",
    value: "TO_BE_COMPLEMENT",
    bgColor: "#fffbe6",
    borderColor: "#ffc53d",
  },
  TO_BE_UPDATE: {
    label: "待更新",
    value: "TO_BE_UPDATE",
    bgColor: "#fcffe6",
    borderColor: "#bae637",
  },
  PENDING: {
    label: "PENDING",
    value: "PENDING",
    bgColor: "#e6fffb",
    borderColor: "#36cfc9",
  },
  TO_BE_DESTROYED: {
    label: "待销毁",
    value: "TO_BE_DESTROYED",
    bgColor: "#e6f4ff",
    borderColor: "#4096ff",
  },
  DESTROYED: {
    label: "已销毁",
    value: "DESTROYED",
    bgColor: "#fff1f0",
    borderColor: "#ff4d4f",
  },
  RUNNING: {
    label: "RUNNING",
    value: "RUNNING",
    bgColor: "#f6ffed",
    borderColor: "#73d13d",
  },
}

export type TaskType = "CreateHost" | "ReleaseHost" | "ReleaseIns"

export const taskTypeDict: Record<
  TaskType,
  { value: string; bgColor: string; borderColor: string }
> = {
  CreateHost: {
    value: "创建主机",
    borderColor: "#73d13d",
    bgColor: "#f6ffed",
  },
  ReleaseHost: {
    value: "回收主机",
    borderColor: "#ff4d4f",
    bgColor: "#fff1f0",
  },
  ReleaseIns: {
    value: "回收实例",
    borderColor: "#f759ab",
    bgColor: "#fff0f6",
  },
}

export type TaskStatus =
  | "Pending"
  | "InProgress"
  | "Success"
  | "Failed"
  | "Cancelled"
  | "Waitting"

export const taskStatusDict: Record<
  TaskStatus,
  { value: string; bgColor: string; borderColor: string }
> = {
  Success: {
    value: "成功",
    bgColor: "#f6ffed",
    borderColor: "#73d13d",
  },
  Failed: {
    value: "失败",
    bgColor: "#fff1f0",
    borderColor: "#ff4d4f",
  },
  InProgress: {
    value: "正在执行",
    bgColor: "#e6f4ff",
    borderColor: "#4096ff",
  },
  Pending: {
    value: "待执行",
    bgColor: "#ffffff",
    borderColor: "#d9d9d9",
  },
  Cancelled: {
    value: "已撤销",
    bgColor: "#ff7a45",
    borderColor: "#fff2e8",
  },
  Waitting: {
    value: "等待中",
    bgColor: "#fff0f6",
    borderColor: "#fadb14",
  },
}

export type SubTaskStatus =
  | "Compleated"
  | "Failed"
  | "InProgress"
  | "Pending"
  | "Initial"
  | "InManualProgress"
  | "Waitting"

export const subTaskStatusDict: Record<
  SubTaskStatus,
  { value: string; bgColor: string; borderColor: string }
> = {
  Compleated: {
    value: "Compleated",
    bgColor: "#f6ffed",
    borderColor: "#73d13d",
  },
  Failed: {
    value: "Failed",
    bgColor: "#fff1f0",
    borderColor: "#ff4d4f",
  },
  InProgress: {
    value: "InProgress",
    bgColor: "#e6f4ff",
    borderColor: "#4096ff",
  },
  Initial: {
    value: "Initial",
    bgColor: "#ffffff",
    borderColor: "#d9d9d9",
  },
  Pending: {
    value: "Pending",
    bgColor: "#fff0f6",
    borderColor: "#f759ab",
  },
  InManualProgress: {
    value: "#feffe6",
    bgColor: "#fff0f6",
    borderColor: "#fadb14",
  },
  Waitting: {
    value: "#feffe6",
    bgColor: "#fff0f6",
    borderColor: "#fadb14",
  },
}

export type InstanceState =
  | "PENDING"
  | "LAUNCH_FAILED"
  | "RUNNING"
  | "STOPPED"
  | "STARTING"
  | "STOPPING"
  | "REBOOTING"
  | "SHUTDOWN"
  | "TERMINATING"
  | "DESTROYED"

export const instanceStateDict: Record<
  InstanceState,
  { value: string; bgColor: string; borderColor: string }
> = {
  PENDING: {
    value: "创建中",
    bgColor: "#ffffff",
    borderColor: "#d9d9d9",
  },
  LAUNCH_FAILED: {
    value: "创建失败",
    bgColor: "#fff1f0",
    borderColor: "#ff4d4f",
  },
  RUNNING: {
    value: "运行中",
    bgColor: "#f6ffed",
    borderColor: "#73d13d",
  },
  STOPPED: {
    value: "关机",
    bgColor: "#fff1f0",
    borderColor: "#ff4d4f",
  },
  STARTING: {
    value: "开机中",
    bgColor: "#fff0f6",
    borderColor: "#f759ab",
  },
  STOPPING: {
    value: "关机中",
    bgColor: "#fff0f6",
    borderColor: "#f759ab",
  },
  REBOOTING: {
    value: "重启中",
    bgColor: "#e6f4ff",
    borderColor: "#4096ff",
  },
  SHUTDOWN: {
    value: "待销毁",
    bgColor: "#fff0f6",
    borderColor: "#fadb14",
  },
  TERMINATING: {
    value: "销毁中",
    bgColor: "#fff0f6",
    borderColor: "#fadb14",
  },
  DESTROYED: {
    value: "已销毁",
    bgColor: "#fff1f0",
    borderColor: "#ff4d4f",
  },
}

export type CertUseState = "USEING" | "UNUSED" | "ERROR" | "REPLACED"

export const certUseStateDict: Record<
  CertUseState,
  { value: string; bgColor: string; borderColor: string }
> = {
  USEING: { value: "使用中", bgColor: "#f6ffed", borderColor: "#73d13d" },
  ERROR: { value: "连接错误", bgColor: "#fff1f0", borderColor: "#ff4d4f" },
  UNUSED: { value: "未使用", bgColor: "#f9f0ff", borderColor: "#9254de" },
  REPLACED: { value: "已替换", bgColor: "#e6fffb", borderColor: "#36cfc9" },
}

export type CertState = "USEING" | "STOPPED" | "PUSHED" | "UNRECORD" | "UNPUSH"

export const certStateDict: Record<
  CertState,
  { value: string; bgColor: string; borderColor: string }
> = {
  USEING: { value: "使用中", bgColor: "#f6ffed", borderColor: "#73d13d" },
  STOPPED: { value: "已停用", bgColor: "#fff1f0", borderColor: "#ff4d4f" },
  PUSHED: { value: "已下发", bgColor: "#feffe6", borderColor: "#ffec3d" },
  UNRECORD: { value: "云商未记录", bgColor: "#fff7e6", borderColor: "#ffa940" },
  UNPUSH: { value: "未下发", bgColor: "#fff0f6", borderColor: "#f759ab" },
}

export type IncidentProgress = "Triggered" | "Processing" | "Closed"

export const incidentProgressDict: Record<
  IncidentProgress,
  { value: string; color: TagProps["color"]; icon?: React.ReactNode }
> = {
  Triggered: {
    value: "待处理",
    color: "warning",
    icon: <MinusCircleOutlined />,
  },
  Processing: {
    value: "处理中",
    color: "processing",
    icon: <SyncOutlined spin />,
  },
  Closed: { value: "已关闭", color: "success", icon: <CheckCircleOutlined /> },
}
