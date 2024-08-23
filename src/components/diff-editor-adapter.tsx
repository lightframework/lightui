import { DiffEditor, DiffEditorProps } from "@monaco-editor/react"
import type { editor } from "monaco-editor"
import { useEffect, useRef } from "react"

function useDiffEditorSync(value: string, onChange: (value: string) => void) {
  const editorRef = useRef<any>(null)

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.getValue()) {
      editorRef.current.setValue(value)
    }
  }, [value, editorRef.current])

  return {
    onMount(editor: editor.IStandaloneDiffEditor) {
      const modified = editor.getModifiedEditor()
      editorRef.current = modified

      modified.onDidChangeModelContent(() => {
        onChange(modified.getValue())
      })
    },
  }
}

export interface DiffEditorAdapterProps extends DiffEditorProps {
  value?: string
  onChange?: (val: string) => void
}

export default function DiffEditorAdapter({
  value = "",
  onChange = () => {},
  ...props
}: DiffEditorAdapterProps) {
  const diffEditorSync = useDiffEditorSync(value, onChange)

  return (
    <DiffEditor
      theme="vs-dark"
      {...props}
      modified={value}
      onMount={diffEditorSync.onMount}
    />
  )
}
