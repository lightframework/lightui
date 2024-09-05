import { CheckOutlined, CopyOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { ButtonProps } from "antd/lib"
import clsx from "clsx"
import { SyntheticEvent, useEffect, useState } from "react"

const unsecuredCopyToClipboard = (text: string) => {
  const textArea = document.createElement("textarea")
  textArea.value = text
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()
  try {
    document.execCommand("copy")
  } catch (err) {
    console.error("Unable to copy to clipboard", err)
  }
  document.body.removeChild(textArea)
}

const copyToClipboard = async (text: string) => {
  if (window.isSecureContext && navigator.clipboard) {
    await navigator.clipboard.writeText(text)
  } else {
    unsecuredCopyToClipboard(text)
  }
}

export default function CopyableText({
  text,
  copyText,
  size,
  className,
}: {
  text: string
  copyText?: string
  size?: ButtonProps["size"]
  className?: string
}) {
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (done) {
      setTimeout(() => setDone(false), 2500)
    }
  }, [done])

  const copy = async (e: SyntheticEvent) => {
    e.stopPropagation()
    await copyToClipboard(copyText ?? text)
    setDone(true)
  }

  return (
    <div className={clsx("flex items-center", className)}>
      {text}
      <Button
        size={size ?? "small"}
        type="link"
        className="ml-1 !w-auto"
        icon={done ? <CheckOutlined /> : <CopyOutlined />}
        onClick={done ? undefined : copy}
      />
    </div>
  )
}
