import Convert from "ansi-to-html"
import { Button, Modal } from "antd"
import { useEffect, useState } from "react"

export default function StdStringDisplayModal({
  title,
  content,
  open,
  onCancel,
}: {
  title: string
  content?: string
  open: boolean
  onCancel: VoidFunction
}) {
  const [isJSON, setIsJSON] = useState(false)
  const [text, setText] = useState("")

  useEffect(() => {
    if (!content) {
      setIsJSON(false)
      setText("-")
    } else {
      try {
        const json = JSON.parse(content)
        setIsJSON(true)
        setText(JSON.stringify(json, null, 2))
      } catch (error) {
        setIsJSON(false)
        const convert = new Convert({
          newline: true,
        })
        setText(convert.toHtml(String(content)).replaceAll("#A00", "#ef4444"))
      }
    }
  }, [content])

  return (
    <Modal
      title={title}
      open={open}
      onCancel={onCancel}
      centered
      width={800}
      footer={[
        <Button key="back" type="default" onClick={onCancel}>
          返回
        </Button>,
      ]}
    >
      <div className="max-h-[min(80vh,600px)] w-full overflow-auto rounded bg-zinc-700 p-3 text-white">
        {isJSON ? (
          <pre>{text}</pre>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: text }} />
        )}
      </div>
    </Modal>
  )
}
