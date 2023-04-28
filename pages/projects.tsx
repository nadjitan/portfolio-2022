import Head from "next/head"
// import MainLayout from "./layout"

const Projects = () => {
  return (
    <>
      <Head>
        <title>Projects</title>
        <meta name="description" content="Projects that I am involved in." />
      </Head>

      <div className="box-border flex h-full w-full flex-col overflow-y-auto overflow-x-hidden p-4">
        <h1>projects</h1>
        <div className="mt-6 flex max-h-full min-h-max w-full flex-wrap gap-4">
          <a
            aria-label={"Go to github of ticketing-system design doc"}
            href="https://drive.google.com/file/d/1lgB06KkT9OuxYN9lhKkkJ_YPF038Zkkd/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="project-item">
            ticketing-system
          </a>

          <a
            aria-label={"Go to github of infographic project"}
            href="https://github.com/nadjitan/interactive-infographic"
            target="_blank"
            rel="noreferrer"
            className="project-item">
            infographic
          </a>

          <a
            aria-label={"Go to github of POS project"}
            href="https://github.com/nadjitan/hybrid-prog-project"
            target="_blank"
            rel="noreferrer"
            className="project-item">
            POS
          </a>

          <a
            aria-label={"Go to github of KpOnlineStore project"}
            href="https://github.com/nadjitan/KpOnlineStore"
            target="_blank"
            rel="noreferrer"
            className="project-item">
            KpOnlineStore
          </a>

          <a
            aria-label={"Go to github of jquery css project"}
            href="https://github.com/nadjitan/jquery-css"
            target="_blank"
            rel="noreferrer"
            className="project-item">
            jquery-css
          </a>

          <a
            aria-label={"Go to github of jquery pos project"}
            href="https://github.com/nadjitan/jquery-pos"
            target="_blank"
            rel="noreferrer"
            className="project-item">
            jquery-pos
          </a>

          <a
            aria-label={"Go to github of CrudMobile project"}
            href="https://github.com/nadjitan/CrudMobile"
            target="_blank"
            rel="noreferrer"
            className="project-item">
            CrudMobile
          </a>
        </div>
      </div>
    </>
  )
}

// Projects.Layout = MainLayout

export default Projects
