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
            aria-label={"Go to github of infographic project"}
            href="https://github.com/nadjitan/interactive-infographic"
            target="_blank"
            rel="noreferrer"
            className="grid h-24 min-w-[6rem] max-w-[10rem] cursor-pointer place-items-center gap-1 border-2 border-dashed border-transparent px-3 py-2 hover:border-theme-on-background">
            infographic
          </a>

          <a
            aria-label={"Go to github of POS project"}
            href="https://github.com/nadjitan/hybrid-prog-project"
            target="_blank"
            rel="noreferrer"
            className="grid h-24 min-w-[6rem] max-w-[10rem] cursor-pointer place-items-center gap-1 border-2 border-dashed border-transparent px-3 py-2 hover:border-theme-on-background">
            POS
          </a>

          <a
            aria-label={"Go to github of KpOnlineStore project"}
            href="https://github.com/nadjitan/KpOnlineStore"
            target="_blank"
            rel="noreferrer"
            className="grid h-24 min-w-[6rem] max-w-[10rem] cursor-pointer place-items-center gap-1 border-2 border-dashed border-transparent px-3 py-2 hover:border-theme-on-background">
            KpOnlineStore
          </a>

          <a
            aria-label={"Go to github of jquery css project"}
            href="https://github.com/nadjitan/jquery-css"
            target="_blank"
            rel="noreferrer"
            className="grid h-24 min-w-[6rem] max-w-[10rem] cursor-pointer place-items-center gap-1 border-2 border-dashed border-transparent px-3 py-2 hover:border-theme-on-background">
            jquery-css
          </a>

          <a
            aria-label={"Go to github of jquery pos project"}
            href="https://github.com/nadjitan/jquery-pos"
            target="_blank"
            rel="noreferrer"
            className="grid h-24 min-w-[6rem] max-w-[10rem] cursor-pointer place-items-center gap-1 border-2 border-dashed border-transparent px-3 py-2 hover:border-theme-on-background">
            jquery-pos
          </a>

          <a
            aria-label={"Go to github of CrudMobile project"}
            href="https://github.com/nadjitan/CrudMobile"
            target="_blank"
            rel="noreferrer"
            className="grid h-24 min-w-[6rem] max-w-[10rem] cursor-pointer place-items-center gap-1 border-2 border-dashed border-transparent px-3 py-2 hover:border-theme-on-background">
            CrudMobile
          </a>
        </div>
      </div>
    </>
  )
}

// Projects.Layout = MainLayout

export default Projects
