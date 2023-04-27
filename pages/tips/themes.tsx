import type { NextPage } from "next"
import Head from "next/head"
import { Sandpack } from "@codesandbox/sandpack-react"

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
        <title>Tips - Themes</title>
        <meta name="description" content="Test tips page." />
      </Head>

      <article className="prose relative box-border h-full w-full max-w-none overflow-y-auto overflow-x-hidden p-4 wide:prose-xl">
        <h2 className="text-theme-on-background">WIP</h2>

        <Sandpack
          theme="auto"
          template="react"
          options={{
            externalResources: ["https://cdn.tailwindcss.com"],
          }}
        />
      </article>
    </>
  )
}

export default Themes
