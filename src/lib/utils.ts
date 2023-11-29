import { ReactNode } from "react"

export function tableCellString(str?: string) {
  return str ? str : "-"
}

export function toLocaleDateTimeString(str?: string) {
  if (!str || str === "0001-01-01T00:00:00Z" || str === "0001-01-01 08:05:43")
    return "-"

  return new Date(str).toLocaleString().replaceAll("/", "-")
}

export function tableCellDatetimePostProcess(
  dom: ReactNode,
  datetime: string | undefined,
) {
  if (!datetime) return "-"

  return datetime === "0001-01-01T00:00:00Z" ||
    datetime === "0001-01-01 08:05:43"
    ? "-"
    : dom
}
