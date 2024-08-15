import { Button } from "antd"
import { useState } from "react"

export default function CollapseText({ text }: { text: string }) {
  const lineCount = text.match(/\n/g)?.length ?? 0

  const [viewMore, setViewMore] = useState(false)

  return (
    <div>
      <pre className={!viewMore ? "line-clamp-5" : undefined}>{text}</pre>
      {lineCount > 5 && (
        <Button
          type="link"
          size="small"
          onClick={() => setViewMore((prev) => !prev)}
          style={{ marginInline: 0, paddingInline: 0 }}
        >
          {viewMore ? "查看更少" : "查看更多"}
        </Button>
      )}
    </div>
  )
}
