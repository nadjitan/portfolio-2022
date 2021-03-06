import type { NextPage } from "next"
import Head from "next/head"
import {
  CogIcon,
  DownArrowIcon,
  ExitIcon,
  FileIcon,
  FolderIcon,
  FolderOpenIcon,
  GithubIcon,
  MenuIcon,
  RightArrowIcon,
} from "../icons"
import ThemeSwitcher from "../ThemeSwitcher"
import { FC, useState, useEffect } from "react"
import Link from "next/link"
import Router, { useRouter } from "next/router"

const tree = {
  type: "root",
  name: "PORTFOLIO 2022",
  children: [
    {
      type: "folder",
      name: "Games",
      children: [
        {
          type: "js",
          name: "Snek",
        },
        {
          type: "js",
          name: "Shapez",
        },
        {
          type: "folder",
          name: "Test",
          children: [
            {
              type: "js",
              name: "Example",
            },
          ],
        },
      ],
    },
    {
      type: "md",
      name: "about",
    },
    {
      type: "md",
      name: "skills",
    },
    {
      type: "md",
      name: "README",
    },
  ],
}
type Tree = typeof tree

const addOrRemove = <T,>(arr: T[], item: T) =>
  arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item]

const FilesLayout: NextPage<{ children: JSX.Element }> = ({ children }) => {
  // Router events
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    Router.events.on("routeChangeStart", () => setLoading(true))
    Router.events.on("routeChangeComplete", () => setLoading(false))
    Router.events.on("routeChangeError", () => setLoading(false))
    return () => {
      Router.events.off("routeChangeStart", () => setLoading(true))
      Router.events.off("routeChangeComplete", () => setLoading(false))
      Router.events.off("routeChangeError", () => setLoading(false))
    }
  }, [Router.events])
  const router = useRouter()

  // "File system" events
  const [clicked, setClicked] = useState(router.pathname.split("/").pop() ?? "")
  const paths = router.pathname.split("/")
  paths.pop()
  paths.splice(0, paths.length, ...paths.filter(element => element !== ""))
  const [menu, setMenu] = useState(false)
  const [expand, setExpand] = useState(
    router.pathname.split("/")
      ? [...paths, "portfolio 2022"]
      : ["portfolio 2022"]
  )

  // Component for each "folder" and "file"
  const RecursiveComponent: FC<{ files: typeof tree }> = ({ files }) => {
    let parentObjs: Tree[] = []
    let found = false
    function searchParentsObj(tree: Tree, toFind: string) {
      if (tree.children) {
        for (let f of tree.children) {
          if (f.name.toLowerCase() === toFind) {
            found = true
            break
          } else searchParentsObj(f as Tree, toFind)
        }
        if (found) parentObjs.push(tree)
      }
    }

    const SummaryElem: FC = () => {
      return (
        <summary
          className={`btn-folder ${
            clicked === files.name.toLowerCase() && "active-btn"
          }`}
          onClick={() => {
            setExpand(addOrRemove(expand, files.name.toLowerCase()))
            setClicked(files.name.toLowerCase())
          }}>
          {expand.find(f => f === files.name.toLowerCase()) ? (
            <DownArrowIcon svgClass="fill-theme-on-background scale-50" />
          ) : (
            <RightArrowIcon svgClass="fill-theme-on-background scale-50" />
          )}
          {files.type === "folder" && (
            <>
              {expand.find(f => f === files.name.toLowerCase()) ? (
                <FolderOpenIcon svgClass="fill-theme-on-background" />
              ) : (
                <FolderIcon svgClass="fill-theme-on-background" />
              )}
              &nbsp;
            </>
          )}
          {files.name}
        </summary>
      )
    }

    const LinkElem: FC = () => {
      searchParentsObj(tree, files.name.toLowerCase())
      parentObjs = parentObjs.reverse()

      let url = `/${files.name.toLowerCase()}`

      if (parentObjs.length > 1) {
        let strings = ""
        parentObjs.forEach(f => {
          if (f.type !== "root") {
            strings = strings + `/${f.name.toLowerCase()}`
          }
        })

        url = `${strings + "/" + files.name.toLowerCase()}`
      }

      return (
        <Link href={url}>
          <a
            className={
              clicked === files.name.toLowerCase()
                ? "btn-file active-btn"
                : "btn-file"
            }
            onClick={() => setClicked(files.name.toLowerCase())}>
            <FileIcon svgClass="fill-theme-on-background" />
            &nbsp;
            {files.name}.{files.type}
          </a>
        </Link>
      )
    }

    const DetailsElem: FC = () => {
      let expandDetails = false

      if (
        expand.find(f => f === files.name.toLowerCase()) ||
        files.children.find(f => f.name.toLowerCase() === clicked)
      ) {
        expandDetails = true
      }
      return (
        <details className="container-folder" open={expandDetails}>
          <SummaryElem />

          {files.children &&
            files.children.map((item, index) => (
              <RecursiveComponent key={index} files={item as typeof files} />
            ))}
        </details>
      )
    }

    if (files.type === "folder" || files.type === "root") {
      return <DetailsElem />
    } else {
      return <LinkElem />
    }
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main className="flex h-full w-full flex-col items-center sm:h-[660px] sm:w-[950px] wide:h-[800px] ">
        <div className="flex w-full justify-between py-3 px-3 sm:px-0">
          <Link href="/">
            <h1
              className="cursor-pointer"
              onClick={() => {
                setClicked("")
                setExpand(["portfolio 2022"])
              }}>
              nadjitan
            </h1>
          </Link>
          <div className="flex">
            <a
              href="https://github.com/nadjitan"
              className="mr-[25px] inline-flex"
              target="_blank"
              rel="noreferrer">
              <GithubIcon
                title="Github profile"
                svgClass="fill-theme-on-background scale-150"
              />
            </a>
            <ThemeSwitcher
              spanClass="sm:mr-0 mr-[25px] cursor-pointer"
              svgClass="fill-theme-on-background scale-150"
              title="Theme toggle"
            />
            <MenuIcon
              spanClass="sm:hidden cursor-pointer"
              svgClass="fill-theme-on-background scale-150"
              title="Menu toggle"
              onClick={() => setMenu(!menu)}
            />
          </div>
        </div>
        <div className="relative grid h-full w-full grid-cols-1 grid-rows-1 overflow-hidden border-t-2 border-t-theme-on-background sm:grid-cols-[200px,1fr]">
          <div
            className={`${
              menu ? "left-0" : "left-[-208px]"
            } files-tree absolute z-50 box-border flex h-full w-52 flex-col justify-between border-r-2 border-theme-on-background bg-theme-background pt-2 font-rubik text-base transition-[left] sm:hidden`}>
            <RecursiveComponent files={tree} />
            
            <div
              className={`${
                loading ? "opacity-100" : "opacity-0"
              } absolute bottom-14 z-0 flex scale-75 items-center justify-center place-self-center bg-theme-background transition-opacity`}>
              <CogIcon
                svgClass="fill-theme-on-background scale-[2]"
                spanClass="mr-5 animate-spin"
              />
              <h3 className="inline-flex justify-center font-bold">
                Loading...
              </h3>
            </div>

            <button
              onClick={() => setMenu(false)}
              className="flex w-full items-center justify-center rounded-none">
              CLOSE
              <ExitIcon svgClass="scale-75 fill-theme-background" />
            </button>
          </div>
          <div className="files-tree z-50 box-border hidden h-full w-full border-r-2 border-theme-on-background bg-theme-background pt-2 font-rubik text-base sm:block">
            <RecursiveComponent files={tree} />
          </div>
          <div
            onClick={() => setMenu(false)}
            className="relative h-full w-full overflow-auto">
            {children}
          </div>
        </div>
      </main>
      <div
        className={`${
          loading ? "opacity-100" : "opacity-0"
        } absolute right-8 bottom-6 z-50 hidden scale-100 items-center justify-center bg-theme-background transition-opacity sm:flex`}>
        <CogIcon
          svgClass="fill-theme-on-background scale-[2]"
          spanClass="mr-5 animate-spin"
        />
        <h3 className="inline-flex justify-center font-bold">Loading...</h3>
      </div>
    </>
  )
}

export default FilesLayout
