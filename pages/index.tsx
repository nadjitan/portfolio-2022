import type { NextPage } from "next"
import Head from "next/head"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="w-full h-full box-border p-4">Hello</div>
    </>
  )
}

export default Home
