import {
  Prism as ReactSyntaxHighlighter,
  SyntaxHighlighterProps as ReactSyntaxHighlighterProps,
} from "react-syntax-highlighter"
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import CopyableText from "./copyable-text"

export interface SyntaxHighlighterProps extends ReactSyntaxHighlighterProps {
  allowCopy?: boolean
}

export default function SyntaxHighlighter({
  allowCopy,
  ...props
}: SyntaxHighlighterProps) {
  return (
    <div className="relative w-full">
      <ReactSyntaxHighlighter {...props} style={materialDark} />
      {allowCopy && (
        <CopyableText
          text=""
          copyText={String(props.children)}
          className="absolute right-3 top-3"
          size="large"
        />
      )}
    </div>
  )
}
