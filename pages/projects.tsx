import Head from "next/head"
import FilesLayout from "../components/layouts/FilesLayout"

const Projects = () => {
  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>

      <div className="box-border flex h-full w-full flex-col overflow-y-auto overflow-x-hidden p-4">
        <h1>projects</h1>{" "}
        <p className="mt-2">
          This site is made by me using NextJS and hosted in Vercel
        </p>{" "}
        <p>WIP</p>
      </div>
    </>
  )
}

Projects.Layout = FilesLayout

export default Projects
