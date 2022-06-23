import Head from "next/head"
import FilesLayout from "../components/layouts/FilesLayout"

const Skills = () => {
  return (
    <>
      <Head>
        <title>Skills</title>
      </Head>
      <div className="w-full h-full box-border p-4">Skills</div>
    </>
  )
}

Skills.Layout = FilesLayout

export default Skills
