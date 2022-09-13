import Head from "next/head"
import {
  AstroIcon,
  CSSIcon,
  HTMLIcon,
  JSIcon,
  NextJSIcon,
  NuxtIcon,
  ReactIcon,
  SolidIcon,
  TailwindIcon,
  TSIcon,
  VueIcon,
} from "../components/icons"
import FilesLayout from "../components/layouts/FilesLayout"

const Skills = () => {
  return (
    <>
      <Head>
        <title>Tech</title>
      </Head>

      <div className="box-border max-h-max min-h-full w-full p-4">
        <h1>tech</h1>{" "}
        <p className="mt-2 text-xl sm:text-base">
          This{" "}
          <a
            className="p-link"
            href="https://github.com/nadjitan/portfolio-2022"
            target="_blank"
            rel="noreferrer">
            site
          </a>{" "}
          is made by me using{" "}
          <a
            className="p-link"
            href="https://nextjs.org/"
            target="_blank"
            rel="noreferrer">
            NextJS
          </a>{" "}
          and hosted in{" "}
          <a
            className="p-link"
            href="https://vercel.com"
            target="_blank"
            rel="noreferrer">
            Vercel
          </a>
          . Here is more web related tech I currently use or know of:
        </p>
        <br />
        <div className="flex h-max w-full flex-row flex-wrap gap-5 sm:gap-10">
          <div>
            <h4 className="text-lg font-semibold">LANGUAGES</h4>
            <div className="mt-2 flex h-max w-full flex-wrap gap-2">
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/HTML"
                target="_blank"
                rel="noreferrer"
                className="grid h-24 w-24 cursor-pointer place-items-center gap-1 border-2 border-dashed border-transparent px-3 py-2 hover:border-theme-on-background [&>*:nth-child(1)>*:nth-child(1)]:hover:fill-[#E34F26]">
                <HTMLIcon svgClass="fill-theme-on-background w-12 h-12" />
                <code>HTML</code>
              </a>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/CSS"
                target="_blank"
                rel="noreferrer"
                className="grid h-24 w-24 cursor-pointer place-items-center gap-1 border-2 border-dashed border-transparent px-3 py-2 hover:border-theme-on-background [&>*:nth-child(1)>*:nth-child(1)]:hover:fill-[#1572B6]">
                <CSSIcon svgClass="fill-theme-on-background w-12 h-12" />
                <code>CSS</code>
              </a>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
                target="_blank"
                rel="noreferrer"
                className="grid h-24 w-24 cursor-pointer place-items-center gap-1 border-2 border-dashed border-transparent px-3 py-2 hover:border-theme-on-background [&>*:nth-child(1)>*:nth-child(1)]:hover:fill-[#F7DF1E]">
                <JSIcon svgClass="fill-theme-on-background w-12 h-12" />
                <code className="text-[0.75rem]">JavaScript</code>
              </a>
              <a
                href="https://www.typescriptlang.org/"
                target="_blank"
                rel="noreferrer"
                className="grid h-24 w-24 cursor-pointer place-items-center gap-1 border-2 border-dashed border-transparent px-3 py-2 hover:border-theme-on-background [&>*:nth-child(1)>*:nth-child(1)]:hover:fill-[#3178C6]">
                <TSIcon svgClass="fill-theme-on-background w-12 h-12" />
                <code className="text-[0.75rem]">TypeScript</code>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold">CSS</h4>
            <div className="mt-2 flex h-max w-full gap-2">
              <a
                href="https://tailwindcss.com/"
                target="_blank"
                rel="noreferrer"
                className="grid h-24 w-24 cursor-pointer place-items-center gap-1 border-2 border-dashed border-transparent px-3 py-2 hover:border-theme-on-background [&>*:nth-child(1)>*:nth-child(1)]:hover:fill-[#06B6D4]">
                <TailwindIcon svgClass="fill-theme-on-background w-12 h-12" />
                <code className="text-sm">tailwind</code>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold">UI FRAMEWORK</h4>
            <div className="mt-2 flex h-max w-full gap-2">
              <a
                href="https://reactjs.org/"
                target="_blank"
                rel="noreferrer"
                className="grid h-24 w-24 cursor-pointer place-items-center gap-1 border-2 border-dashed border-transparent px-3 py-2 hover:border-theme-on-background [&>*:nth-child(1)>*:nth-child(1)]:hover:fill-[#61DAFB]">
                <ReactIcon svgClass="fill-theme-on-background w-12 h-12" />
                <code>ReactJS</code>
              </a>
              <a
                href="https://www.solidjs.com/"
                target="_blank"
                rel="noreferrer"
                className="grid h-24 w-24 cursor-pointer place-items-center gap-1 border-2 border-dashed border-transparent px-3 py-2 hover:border-theme-on-background">
                <SolidIcon svgClass="fill-theme-on-background w-12 h-12" />
                <code>SolidJS</code>
              </a>
              <a
                href="https://vuejs.org/"
                target="_blank"
                rel="noreferrer"
                className="grid h-24 w-24 cursor-pointer place-items-center gap-1 border-2 border-dashed border-transparent px-3 py-2 hover:border-theme-on-background">
                <VueIcon svgClass="fill-theme-on-background w-12 h-12" />
                <code>VueJS</code>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold">FRONTEND w/ BACKEND</h4>
            <div className="mt-2 flex h-max w-full gap-2">
              <a
                href="https://nextjs.org/"
                target="_blank"
                rel="noreferrer"
                className="grid h-24 w-24 cursor-pointer place-items-center gap-1 border-2 border-dashed border-transparent px-3 py-2 hover:border-theme-on-background">
                <NextJSIcon svgClass="fill-theme-on-background w-12 h-12" />
                <code>NextJS</code>
              </a>
              <a
                href="https://nuxtjs.org/"
                target="_blank"
                rel="noreferrer"
                className="grid h-24 w-24 cursor-pointer place-items-center gap-1 border-2 border-dashed border-transparent px-3 py-2 hover:border-theme-on-background [&>*:nth-child(1)>*:nth-child(1)]:hover:fill-[#00DC82]">
                <NuxtIcon svgClass="fill-theme-on-background w-12 h-12" />
                <code>NuxtJS</code>
              </a>
              <a
                href="https://astro.build/"
                target="_blank"
                rel="noreferrer"
                className="grid h-24 w-24 cursor-pointer place-items-center gap-1 border-2 border-dashed border-transparent px-3 py-2 hover:border-theme-on-background">
                <AstroIcon svgClass="fill-theme-on-background w-12 h-12" />
                <code>astro</code>
              </a>
            </div>
          </div>
        </div>
        
        <div className="flex w-full justify-end pt-6">
          <a
            href="https://gist.github.com/nadjitan/6e0c933f0058a4e569da2c3c04eecb81"
            target="_blank"
            rel="noreferrer"
            className="p-link">
            <code>more &gt;&gt;</code>
          </a>
        </div>
      </div>
    </>
  )
}

Skills.Layout = FilesLayout

export default Skills
