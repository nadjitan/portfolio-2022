import Head from "next/head"
import FilesLayout from "../components/layouts/FilesLayout"

const About = () => {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <div className="w-full h-full box-border p-4">about</div>
    </>
  )
}
About.Layout = FilesLayout
export default About
