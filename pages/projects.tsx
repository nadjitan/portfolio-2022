import Head from "next/head"
import FilesLayout from "../components/layouts/FilesLayout"

const Projects = () => {
  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>
      <div className="box-border h-full w-full p-4">Projects</div>
    </>
  )
}

Projects.Layout = FilesLayout

export default Projects
