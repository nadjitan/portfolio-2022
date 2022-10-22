import { FC } from "react"

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx"
import nightOwl from "react-syntax-highlighter/dist/cjs/styles/prism/night-owl"

SyntaxHighlighter.registerLanguage("tsx", tsx)

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
