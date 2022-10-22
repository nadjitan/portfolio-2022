import { FC } from "react"

import { Light as SyntaxHighlighter } from "react-syntax-highlighter"
import nightOwl from "react-syntax-highlighter/dist/cjs/styles/hljs/night-owl"

const CodeBlock: FC<{ text: string }> = ({ text }) => {
  return (
    <SyntaxHighlighter
      language="tsx"
      lineProps={{
        style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
      }}
      style={nightOwl}
      customStyle={{ padding: "0.5px", height: "max-content" }}>
      {text}
    </SyntaxHighlighter>
  )
}

export default CodeBlock
