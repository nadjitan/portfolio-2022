import Head from "next/head"
import FilesLayout from "../components/layouts/FilesLayout"

const Skills = () => {
  return (
    <>
      <Head>
        <title>Tech</title>
      </Head>

      <div className="box-border h-full w-full p-4">
        <h1>Tech</h1>{" "}
        <p className="mt-2">
          This site is made by me using NextJS and hosted in Vercel
        </p>{" "}
        <p>WIP</p>
      </div>
    </>
  )
}

Skills.Layout = FilesLayout

export default Skills
