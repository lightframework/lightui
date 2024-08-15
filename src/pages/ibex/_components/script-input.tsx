import { loadLanguage } from "@uiw/codemirror-extensions-langs"
import { vscodeDark } from "@uiw/codemirror-theme-vscode"
import CodeMirror, { EditorView } from "@uiw/react-codemirror"

export interface ScriptInputProps {
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  inputRef?: React.MutableRefObject<EditorView | null>
}

export default function ScriptInput({
  value,
  onChange,
  disabled,
  inputRef,
}: ScriptInputProps) {
  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      onCreateEditor={(view) => {
        if (inputRef) {
          inputRef.current = view
        }
      }}
      minHeight="100px"
      maxHeight="500px"
      theme={vscodeDark}
      editable={!disabled}
      extensions={[loadLanguage("shell")!].filter(Boolean)}
    />
  )
}
