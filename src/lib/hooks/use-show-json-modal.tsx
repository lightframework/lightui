import SyntaxHighlighter from "@/components/syntax-highlighter"
import { App } from "antd"
import { useCallback } from "react"

export default function useShowJsonModal() {
  const { modal } = App.useApp()

  return useCallback(
    ({ title, content }: { title: string; content: string }) => {
      let jsonStr = content || "-"

      // TODO: 处理 ansi
      try {
        const obj = JSON.parse(content)
        jsonStr = JSON.stringify(obj, null, 2)
      } catch (error) {
        console.error(error)
      }

      modal.info({
        title,
        width: "min(80dvw, 800px)",
        icon: null,
        content: (
          <SyntaxHighlighter
            language="json"
            customStyle={{
              maxHeight: "65dvh",
            }}
            wrapLongLines
          >
            {jsonStr}
          </SyntaxHighlighter>
        ),
        okText: "确认",
        className: "json-modal",
      })
    },
    [modal],
  )
}
