import {
  Prism as ReactSyntaxHighlighter,
  SyntaxHighlighterProps as ReactSyntaxHighlighterProps,
} from "react-syntax-highlighter"
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism"

export type SyntaxHighlighterProps = ReactSyntaxHighlighterProps

export default function SyntaxHighlighter(props: SyntaxHighlighterProps) {
  return <ReactSyntaxHighlighter {...props} style={materialDark} />
}
