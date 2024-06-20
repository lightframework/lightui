import { intervalToDuration } from "date-fns"
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

export function defaultSelectFilter(
  input: string,
  option?: { label: string },
): boolean {
  return (
    option?.label
      .toLocaleLowerCase()
      .includes(input.trim().toLocaleLowerCase()) ?? false
  )
}

export function microsecondsToDuration(microseconds: number) {
  const duration = intervalToDuration({ start: 0, end: microseconds })
  const days = duration.days
  const hours = duration.hours
  const minutes = duration.minutes
  const seconds = duration.seconds

  let res = ""

  if (days) {
    res += days + "d"
  }

  if (hours) {
    res += hours + "h"
  }
  if (minutes) {
    res += minutes + "m"
  }
  if (seconds) {
    res += seconds + "s"
  }

  return res
}

function getRandomInt(min: number, max: number): number {
  return (
    Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min
  )
}

export function generatePassword(): string {
  const numbers = "0123456789"
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const specialChars = "@#$%^&+=!"

  function getRandomChar(characters: string): string {
    const index = Math.floor(Math.random() * characters.length)
    return characters[index]
  }

  const passwordArray: string[] = []
  passwordArray.push(getRandomChar(numbers))
  passwordArray.push(getRandomChar(letters))
  passwordArray.push(getRandomChar(specialChars))

  while (passwordArray.length < getRandomInt(8, 16)) {
    const allChars = numbers + letters + specialChars
    passwordArray.push(getRandomChar(allChars))
  }

  // 打乱数组顺序
  for (let i = passwordArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]]
  }

  return passwordArray.join("")
}
