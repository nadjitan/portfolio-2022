import type { NextPage } from "next"
import Head from "next/head"
import {
  DownArrowIcon,
  FileIcon,
  FolderIcon,
  FolderOpenIcon,
  GithubIcon,
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

const addOrRemove = <T,>(arr: T[], item: T) =>
  arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item]

const FilesLayout: NextPage<{ children: JSX.Element }> = ({ children }) => {
  const [clicked, setClicked] = useState("")
  const router = useRouter()
  const [expand, setExpand] = useState(["portfolio 2022"])

  const RecursiveComponent: FC<{ tree: typeof tree }> = ({ tree }) => {
    const SummaryElem: FC = () => {
      return (
        <summary
          className={`btn-folder ${clicked === tree.name && "active-btn"}`}
          onClick={() => {
            setExpand(addOrRemove(expand, tree.name.toLowerCase()))
            setClicked(tree.name)
          }}
        >
          {expand.find(f => f === tree.name.toLowerCase()) ? (
            <DownArrowIcon />
          ) : (
            <RightArrowIcon />
          )}
          {tree.type === "folder" && (
            <>
              {expand.find(f => f === tree.name.toLowerCase()) ? (
                <FolderOpenIcon />
              ) : (
                <FolderIcon />
              )}
              &nbsp;
            </>
          )}
          {tree.name}
        </summary>
      )
    }

    const LinkElem: FC = () => (
      <Link href={`/files/${tree.name.toLowerCase()}`}>
        <a
          className={clicked === tree.name ? "btn-file active-btn" : "btn-file"}
          onClick={() => setClicked(tree.name)}
        >
          <FileIcon />
          &nbsp;
          {tree.name}.{tree.type}
        </a>
      </Link>
    )

    const DetailsElem: FC = () => {
      return (
        <details
          className="container-folder"
          open={expand.find(f => f === tree.name.toLowerCase()) ? true : false}
        >
          <SummaryElem />

          {tree.children &&
            tree.children.map((item, index) => (
              <RecursiveComponent key={index} tree={item as typeof tree} />
            ))}
        </details>
      )
    }

    if (tree.type === "folder" || tree.type === "root") {
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
      <main className="flex flex-col items-center w-full h-full xs:w-max xs:h-max">
        <div className="w-full flex justify-between py-3 px-3 xs:px-0">
          <Link href="/">
            <h1>nadjitan</h1>
          </Link>
          <div className="flex h-full">
            <a
              href="https://github.com/nadjitan"
              style={{ marginRight: "25px", display: "inline-flex" }}
              target="_blank"
            >
              <GithubIcon
                title="Github profile"
                style={{ transform: "scale(1.5)" }}
              />
            </a>
            <ThemeSwitcher
              title="Theme toggle"
              style={{ transform: "scale(1.5)" }}
            />
          </div>
        </div>
        <div className="xs:w-[950px] xs:h-[800px] w-full h-full grid grid-rows-1 grid-cols-1 xs:grid-cols-[0.8fr,700px] place-items-center border-t-2 border-t-theme-on-background overflow-hidden">
          <div className="w-full h-full xs:block hidden pt-2 box-border text-base font-rubik border-r-2 border-theme-on-background files-tree">
            <RecursiveComponent tree={tree} />
          </div>

          <div className="w-full h-full p-4 relative box-border overflow-auto">
            {children}
          </div>
        </div>
      </main>
    </>
  )
}

export default FilesLayout
