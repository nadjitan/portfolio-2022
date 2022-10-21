import type { NextPage } from "next"
import dynamic from "next/dynamic"
import Head from "next/head"
import { FC } from "react"

// import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"
const SyntaxHighlighter = dynamic(
  () => import("react-syntax-highlighter/dist/cjs/prism-async-light"),
  {
    loading: () => <p className="italic">Loading codes...</p>,
  }
)

import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx"
import nightOwl from "react-syntax-highlighter/dist/cjs/styles/prism/night-owl"
// SyntaxHighlighter.registerLanguage("tsx", tsx)

const CodeHighlighter: FC<{ text: string }> = ({ text }) => {
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

const Themes: NextPage = () => {
  const codeString = `
  const test = (test: string) => {
    // Just a comment
    const one = 1
    const hello = "hello"

    return <div>Hello world! {hello}</div>
  }
  `

  return (
    <>
      <Head>
        <title>Blog - Themes</title>
      </Head>

      <article className="prose relative box-border h-full w-full max-w-none overflow-y-auto overflow-x-hidden p-4 wide:prose-xl">
        <h2 className="text-theme-on-background">Themes</h2>

        <p className="text-theme-on-background">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, velit
          assumenda! Alias explicabo consequuntur praesentium dolorum labore
          modi doloremque eum ipsa. Aperiam laboriosam, sapiente facere sint
          repellendus vitae voluptatibus perferendis?
        </p>
        <CodeHighlighter text={codeString} />

        <p className="text-theme-on-background">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Exercitationem, natus?
        </p>
        <CodeHighlighter text={codeString} />
      </article>
    </>
  )
}

export default Themes
