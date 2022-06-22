import type { NextPage } from "next"
import Head from "next/head"
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
import ThemeSwitcher from "../ThemeSwitcher"
import { FC, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

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
  const router = useRouter()
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
          }}
        >
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
            onClick={() => setClicked(files.name.toLowerCase())}
          >
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
      <main className="flex flex-col items-center sm:w-[950px] sm:h-[600px] wide:h-[800px] w-full h-full ">
        <div className="w-full flex justify-between py-3 px-3 sm:px-0">
          <Link href="/">
            <h1
              className="cursor-pointer"
              onClick={() => {
                setClicked("")
                setExpand(["portfolio 2022"])
              }}
            >
              nadjitan
            </h1>
          </Link>
          <div className="flex">
            <a
              href="https://github.com/nadjitan"
              className="mr-[25px] inline-flex"
              target="_blank"
              rel="noreferrer"
            >
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
        <div className="relative w-full h-full grid grid-rows-1 grid-cols-1 sm:grid-cols-[0.8fr,700px] place-items-center border-t-2 border-t-theme-on-background overflow-hidden">
          <div
            className={`${
              menu ? "left-[0]" : "left-[-208px]"
            } transition-[left] z-50 bg-theme-background w-52 h-full sm:hidden shadow-2xl absolute flex flex-col justify-between pt-2 box-border text-base font-rubik border-r-2 border-theme-on-background files-tree`}
          >
            <RecursiveComponent files={tree} />
            <button
              onClick={() => setMenu(false)}
              className="w-full rounded-none flex items-center justify-center"
            >
              CLOSE
              <ExitIcon svgClass="scale-75 fill-theme-background" />
            </button>
          </div>
          <div className="z-50 bg-theme-background w-52 h-full sm:block hidden shadow-2xl pt-2 box-border text-base font-rubik border-r-2 border-theme-on-background files-tree">
            <RecursiveComponent files={tree} />
          </div>

          <div
            onClick={() => setMenu(false)}
            className="w-full h-full p-4 relative box-border overflow-auto"
          >
            {children}
          </div>
        </div>
      </main>
    </>
  )
}

export default FilesLayout
