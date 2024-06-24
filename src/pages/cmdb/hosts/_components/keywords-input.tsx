import { Input } from "antd"
import { forwardRef, useEffect, useImperativeHandle, useState } from "react"

export type KeywordsInputRef = {
  clear: () => void
}

export interface KeywordsInputProps {
  onPressEnter: (value?: string) => void
}

const KeywordsInput = forwardRef<KeywordsInputRef, KeywordsInputProps>(
  (props, ref) => {
    const [keywords, setKeywords] = useState("")

    useImperativeHandle(ref, () => ({
      clear: () => setKeywords(""),
    }))

    useEffect(() => {
      if (keywords.trim() === "") {
        props.onPressEnter(undefined)
      }
    }, [keywords])

    return (
      <Input
        type="text"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        id="host-table-keywords"
        className="w-[240px]"
        placeholder="请输入主机名称/备注查询"
        onPressEnter={() => {
          props.onPressEnter(keywords.trim())
        }}
      />
    )
  },
)
KeywordsInput.displayName = "KeywordsInput"

export default KeywordsInput
