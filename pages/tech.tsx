import dynamic from "next/dynamic"
import Head from "next/head"
import { Suspense } from "react"
import { IconProps } from "../components/icons"

import MainLayout from "../components/layouts/main-layout"

const AstroIcon = dynamic<IconProps>(() =>
  import("../components/icons").then(mod => mod.AstroIcon)
)
const CSSIcon = dynamic<IconProps>(() =>
  import("../components/icons").then(mod => mod.CSSIcon)
)
const HTMLIcon = dynamic<IconProps>(() =>
  import("../components/icons").then(mod => mod.HTMLIcon)
)
const JSIcon = dynamic<IconProps>(() =>
  import("../components/icons").then(mod => mod.JSIcon)
)
const NextJSIcon = dynamic<IconProps>(() =>
  import("../components/icons").then(mod => mod.NextJSIcon)
)
const NuxtIcon = dynamic<IconProps>(() =>
  import("../components/icons").then(mod => mod.NuxtIcon)
)
const ReactIcon = dynamic<IconProps>(() =>
  import("../components/icons").then(mod => mod.ReactIcon)
)
const SolidIcon = dynamic<IconProps>(() =>
  import("../components/icons").then(mod => mod.SolidIcon)
)
const TailwindIcon = dynamic<IconProps>(() =>
  import("../components/icons").then(mod => mod.TailwindIcon)
)
const TSIcon = dynamic<IconProps>(() =>
  import("../components/icons").then(mod => mod.TSIcon)
)
const VueIcon = dynamic<IconProps>(() =>
  import("../components/icons").then(mod => mod.VueIcon)
)

const Tech = () => {
  return (
    <>
      <Head>
        <title>Tech</title>
        <meta
          name="description"
          content="This is a list of some of the web tech that I currntly user or know of."
        />
      </Head>

      <div className="box-border max-h-max min-h-full w-full p-4">
        <h1>tech</h1>{" "}
        <p className="mt-2 text-xl sm:text-base">
          This{" "}
          <a
            aria-label={"Go to github this website"}
            className="p-link"
            href="https://github.com/nadjitan/portfolio-2022"
            target="_blank"
            rel="noreferrer">
            site
          </a>{" "}
          is made by me using{" "}
          <a
            aria-label={"Go to website of NextJS"}
            className="p-link"
            href="https://nextjs.org/"
            target="_blank"
            rel="noreferrer">
            NextJS
          </a>{" "}
          and hosted in{" "}
          <a
            aria-label={"Go to website of Vercel"}
            className="p-link"
            href="https://vercel.com"
            target="_blank"
            rel="noreferrer">
            Vercel
          </a>
          . Here is more web related tech I currently use or know of:
        </p>
        <br />
        <Suspense fallback={<p className="italic">Loading...</p>}>
          <div className="flex h-max w-full flex-row flex-wrap gap-5 sm:gap-10">
            <div>
              <h4 className="text-lg font-semibold">LANGUAGES</h4>
              <div className="mt-2 flex h-max w-full flex-wrap gap-2">
                <a
                  aria-label={"Go to website of HTML"}
                  href="https://developer.mozilla.org/en-US/docs/Web/HTML"
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-24 w-24 cursor-pointer place-items-center gap-1 border-2 border-dashed border-transparent px-3 py-2 hover:border-theme-on-background [&>*:nth-child(1)>*:nth-child(1)]:hover:fill-[#E34F26]">
                  <HTMLIcon svgClass="fill-theme-on-background w-12 h-12" />
                  <code>HTML</code>
                </a>
                <a
                  aria-label={"Go to website of CSS"}
                  href="https://developer.mozilla.org/en-US/docs/Web/CSS"
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-24 w-24 cursor-pointer place-items-center gap-1 border-2 border-dashed border-transparent px-3 py-2 hover:border-theme-on-background [&>*:nth-child(1)>*:nth-child(1)]:hover:fill-[#1572B6]">
                  <CSSIcon svgClass="fill-theme-on-background w-12 h-12" />
                  <code>CSS</code>
                </a>
                <a
                  aria-label={"Go to website of Javascript"}
                  href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-24 w-24 cursor-pointer place-items-center gap-1 border-2 border-dashed border-transparent px-3 py-2 hover:border-theme-on-background [&>*:nth-child(1)>*:nth-child(1)]:hover:fill-[#F7DF1E]">
                  <JSIcon svgClass="fill-theme-on-background w-12 h-12" />
                  <code className="text-[0.75rem]">JavaScript</code>
                </a>
                <a
                  aria-label={"Go to website of typescript"}
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
              <div className="mt-2 flex h-max w-full flex-wrap gap-2">
                <a
                  aria-label={"Go to website of tailwind css"}
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
              <h4 className="text-lg font-semibold">WEB FRAMEWORKS</h4>
              <div className="mt-2 flex h-max w-full flex-wrap gap-2">
                <a
                  aria-label={"Go to website of reactjs"}
                  href="https://reactjs.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-24 w-24 cursor-pointer place-items-center gap-1 border-2 border-dashed border-transparent px-3 py-2 hover:border-theme-on-background [&>*:nth-child(1)>*:nth-child(1)]:hover:fill-[#61DAFB]">
                  <ReactIcon svgClass="fill-theme-on-background w-12 h-12" />
                  <code>ReactJS</code>
                </a>
                <a
                  aria-label={"Go to website of solidjs"}
                  href="https://www.solidjs.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-24 w-24 cursor-pointer place-items-center gap-1 border-2 border-dashed border-transparent px-3 py-2 hover:border-theme-on-background">
                  <SolidIcon svgClass="fill-theme-on-background w-12 h-12" />
                  <code>SolidJS</code>
                </a>
                <a
                  aria-label={"Go to website of vuejs"}
                  href="https://vuejs.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-24 w-24 cursor-pointer place-items-center gap-1 border-2 border-dashed border-transparent px-3 py-2 hover:border-theme-on-background">
                  <VueIcon svgClass="fill-theme-on-background w-12 h-12" />
                  <code>VueJS</code>
                </a>

                <a
                  aria-label={"Go to website of nextjs"}
                  href="https://nextjs.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-24 w-24 cursor-pointer place-items-center gap-1 border-2 border-dashed border-transparent px-3 py-2 hover:border-theme-on-background">
                  <NextJSIcon svgClass="fill-theme-on-background w-12 h-12" />
                  <code>NextJS</code>
                </a>
                <a
                  aria-label={"Go to website of nuxtjs"}
                  href="https://nuxtjs.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-24 w-24 cursor-pointer place-items-center gap-1 border-2 border-dashed border-transparent px-3 py-2 hover:border-theme-on-background [&>*:nth-child(1)>*:nth-child(1)]:hover:fill-[#00DC82]">
                  <NuxtIcon svgClass="fill-theme-on-background w-12 h-12" />
                  <code>NuxtJS</code>
                </a>
                <a
                  aria-label={"Go to website of astrojs"}
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
        </Suspense>
        <div className="flex w-full justify-end pt-6">
          <a
            aria-label={"Go to more links of tech"}
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

Tech.Layout = MainLayout

export default Tech
