import type { NextPage } from "next"
import { Suspense } from "react"
import dynamic from "next/dynamic"
import Head from "next/head"

const CodeBlock = dynamic(() => import("../../components/code-block"), {
  suspense: true,
})

const StringsSort: NextPage = () => {
  return (
    <>
      <Head>
        <title>Tips - Strings sort</title>
        <meta name="description" content="Using sort in Javascript." />
      </Head>

      <article className="prose relative box-border h-full w-full max-w-none overflow-y-auto overflow-x-hidden p-4 wide:prose-xl">
        <h2 className="text-theme-on-background">Strings sort</h2>

        <p className="text-theme-on-background">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, velit
          assumenda! Alias explicabo consequuntur praesentium dolorum labore
          modi doloremque eum ipsa. Aperiam laboriosam, sapiente facere sint
          repellendus vitae voluptatibus perferendis?
        </p>
        <Suspense fallback={<p className="italic">Loading codes...</p>}>
          <CodeBlock
            text={`
  const test = (test: string) => {
    // Just a comment
    const one = 1
    const hello = "hello"

    return <div>Hello world! {hello}</div>
  }
  `}
          />
        </Suspense>
      </article>
    </>
  )
}

export default StringsSort