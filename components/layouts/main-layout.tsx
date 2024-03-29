import type { NextPage } from "next"
import { FC, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import NextNProgress from "nextjs-progressbar"

import {
  DownArrowIcon,
  ExitIcon,
  FileIcon,
  FolderIcon,
  FolderOpenIcon,
  GithubIcon,
  MenuIcon,
  RightArrowIcon,
} from "../icons"
import ThemeSwitcher from "../theme-switcher"
import { addOrRemove } from "../../utils"
import { useAppContext } from "../../hooks/useApp"

type Tree = {
  type: string
  name: string
  children: (
    | {
        type: string
        name: string
        children: {
          type: string
          name: string
        }[]
      }
    | {
        type: string
        name: string
        children?: undefined
      }
  )[]
}
const tree = process.env.projDir as unknown as Tree

const MainLayout: NextPage<{ children: JSX.Element }> = ({ children }) => {
  // useEffect(() => {
  //   console.debug(JSON.stringify(process.env.projDir, null, 2))
  // }, [])

  const { theme } = useAppContext()

  const router = useRouter()

  // "File system" events
  const [clicked, setClicked] = useState(router.pathname.split("/").pop() ?? "")
  const paths = router.pathname.split("/")
  paths.pop()
  paths.splice(0, paths.length, ...paths.filter(element => element !== ""))
  const [menu, setMenu] = useState(false)
  const [expand, setExpand] = useState(
    router.pathname.split("/")
      ? [...paths, tree.name.toLowerCase()]
      : [tree.name.toLowerCase()]
  )

  // Component for each "folder" and "file"
  const RecursiveComponent: FC<{ files: Tree }> = ({ files }) => {
    let parentObjs: Tree[] = []
    let found = false
    function getFilePath(tree: Tree, toFind: string) {
      if (found) return
      if (tree.children) {
        tree.children.forEach(f => {
          if (f.name.toLowerCase() === toFind) {
            found = true
            return
          } else getFilePath(f as Tree, toFind)
        })
        if (found) parentObjs.push(tree)
      }
    }

    const LinkElem: FC = () => {
      getFilePath(tree, files.name.toLowerCase())
      parentObjs = parentObjs.reverse()

      let url = `/${files.name.toLowerCase()}`

      if (parentObjs.length > 1) {
        let strings = ""
        parentObjs.forEach(f => {
          if (f.type !== "root") {
            strings = `${strings}/${f.name.toLowerCase()}`
          }
        })

        url = `${strings + "/" + files.name.toLowerCase()}`
      }

      return (
        <Link
          href={url}
          className={`btn-file font-cascadia-code ${
            clicked === files.name.toLowerCase() && "active-btn"
          }`}
          onClick={() => {
            setClicked(files.name.toLowerCase())
            setMenu(false)
          }}>
          <FileIcon svgClass="fill-theme-on-background" />
          &nbsp;{files.name + files.type}
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
          <summary
            className={`btn-folder font-cascadia-code ${
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

          {files.children &&
            files.children.map((item, index) => (
              <RecursiveComponent key={index} files={item as typeof files} />
            ))}
        </details>
      )
    }

    if (files.type === "folder" || files.type === "root") return <DetailsElem />
    else return <LinkElem />
  }

  return (
    <>
      <main className="flex h-full w-full flex-col items-center sm:h-[680px] sm:w-[950px]">
        <nav className="flex w-full justify-between border-b-2 border-b-theme-on-background py-3 pl-3 pr-4">
          <div className="tooltip tooltip-right" data-tip="Hello 🎅">
            <Link href="/about">
              <h2
                className="cursor-pointer font-semibold"
                onClick={() => setClicked("about")}>
                nadjitan
              </h2>
            </Link>
          </div>

          <div className="flex gap-6">
            <a
              aria-label={"Go to Github page"}
              href="https://github.com/nadjitan"
              className="tooltip tooltip-bottom z-50 grid"
              data-tip="Github Profile"
              target="_blank"
              rel="noreferrer">
              <GithubIcon
                svgClass="fill-theme-on-background scale-150 w-5 h-5"
                spanClass="items-center inline-flex"
              />
            </a>

            <span
              className="tooltip tooltip-bottom z-50 grid"
              data-tip="Change Theme">
              <ThemeSwitcher
                spanClass="sm:mr-0 cursor-pointer items-center inline-flex"
                svgClass="fill-theme-on-background scale-150 w-5 h-5"
              />
            </span>

            <MenuIcon
              spanClass="sm:hidden cursor-pointer"
              svgClass="fill-theme-on-background w-7 h-7"
              title="Menu toggle"
              onClick={() => setMenu(!menu)}
            />
          </div>
        </nav>

        <div className="relative grid h-full w-full grid-cols-1 grid-rows-1 overflow-hidden sm:grid-cols-[200px,1fr]">
          <div
            className={`${
              menu ? "left-0" : "left-[-256px]"
            } files-tree font-rubik absolute z-50 box-border flex h-full w-64 flex-col overflow-auto border-r-2 border-theme-on-background bg-theme-background pt-2 text-base transition-[left] sm:hidden`}>
            <RecursiveComponent files={tree} />

            <button
              onClick={() => setMenu(false)}
              className="mt-auto flex w-full items-center justify-center rounded-none">
              CLOSE
              <ExitIcon svgClass="scale-75 fill-theme-background" />
            </button>
          </div>

          <div className="files-tree font-rubik relative z-50 box-border hidden h-full w-full overflow-auto border-r-2 border-theme-on-background bg-theme-background pt-2 text-base sm:block">
            <RecursiveComponent files={tree} />
          </div>

          <div
            id="container-layout"
            onClick={() => setMenu(false)}
            className="h-full w-full overflow-y-auto overflow-x-hidden">
            <NextNProgress
              color={theme === "light" ? "#1a1c2c" : "white"}
              options={{
                showSpinner: false,
                parent: "#container-layout",
              }}
            />

            {children}
          </div>
        </div>
      </main>
    </>
  )
}

export default MainLayout
