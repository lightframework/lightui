import { loadLanguage } from "@uiw/codemirror-extensions-langs"
import { vscodeDark } from "@uiw/codemirror-theme-vscode"
import CodeMirror from "@uiw/react-codemirror"

export interface ScriptInputProps {
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
}

export default function ScriptInput({
  value,
  onChange,
  disabled,
}: ScriptInputProps) {
  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      minHeight="100px"
      maxHeight="500px"
      theme={vscodeDark}
      editable={!disabled}
      extensions={[loadLanguage("shell")!].filter(Boolean)}
    />
  )
}
