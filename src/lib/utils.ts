import { ReactNode } from "react"

export function tableCellString(str?: string) {
  return str ? str : "-"
}

export function toLocaleDateTimeString(str?: string) {
  if (!str || str === "0001-01-01T00:00:00Z" || str === "0001-01-01 08:05:43")
    return "-"

  return new Date(str).toLocaleString().replaceAll("/", "-")
}

export function getCurrentUTCtimestamp() {
  return Math.floor(new Date().getTime() / 1000)
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

export async function copyTextToClipboard(text: string) {
  if ("clipboard" in navigator) {
    await navigator.clipboard.writeText(text)
  } else {
    const textArea = document.createElement("textarea")
    textArea.value = text
    textArea.style.opacity = "0"
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    document.execCommand("copy")
    document.body.removeChild(textArea)
  }
}
