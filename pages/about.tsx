import dynamic from "next/dynamic"
import Head from "next/head"
import { Suspense } from "react"
import { IconProps } from "../components/icons"

import MainLayout from "../components/layouts/main-layout"
import { PicProps } from "../components/pic"
import { useAppContext } from "../hooks/useApp"

const Me = dynamic<PicProps>(() =>
  import("../components/pic").then(mod => mod.Me)
)
const Me2 = dynamic<PicProps>(() =>
  import("../components/pic").then(mod => mod.Me2)
)
const QuoteRightIcon = dynamic<IconProps>(() =>
  import("../components/icons").then(mod => mod.QuoteRightIcon)
)
const QuoteLeftIcon = dynamic<IconProps>(() =>
  import("../components/icons").then(mod => mod.QuoteLeftIcon)
)

const classess = "w-[800px] sm:mt-0 mt-8"

const About = () => {
  const { theme } = useAppContext()

  return (
    <>
      <Head>
        <title>About</title>
        <meta name="description" content="All about me as a web developer." />
      </Head>

      <article className="relative box-border flex h-full w-full flex-col p-4">
        <h1>about me</h1>
        <p className="mt-2 text-xl sm:text-base">
          Video Games 🎮... video games is what led me to be a web developer 👨‍💻.
          It made me explore technologies that people would have never guessed
          to exist. Soon after many years of obsessing over video games and
          internet culture I discovered the{" "}
          <a
            aria-label={"Go to tech links"}
            className="p-link"
            href="https://gist.github.com/nadjitan/6e0c933f0058a4e569da2c3c04eecb81"
            target="_blank"
            rel="noreferrer">
            web dev community
          </a>
          . Things such as{" "}
          <a
            aria-label={"Go to web reactivity article"}
            className="p-link"
            href="https://www.infoworld.com/article/3661810/reactive-javascript-the-evolution-of-front-end-architecture.html"
            target="_blank"
            rel="noreferrer">
            reactivity
          </a>{" "}
          in a website blew my mind and the{" "}
          <a
            aria-label={"Go to state of js website"}
            className="p-link"
            href="https://stateofjs.com/en-us/"
            target="_blank"
            rel="noreferrer">
            rate of growth
          </a>{" "}
          <a
            aria-label={"Go to Javascript website"}
            className="p-link"
            href="https://www.javascript.com/"
            target="_blank"
            rel="noreferrer">
            JavaScript
          </a>{" "}
          have shown made it easy for beginners to learn coding. That is how I
          got into coding and I am{" "}
          <a
            aria-label={"Go to Snyk io article about npm's milestone"}
            className="p-link"
            href="https://snyk.io/blog/npm-passes-the-1-millionth-package-milestone-what-can-we-learn/"
            target="_blank"
            rel="noreferrer">
            99.9% certain
          </a>{" "}
          that:
        </p>

        <div className="flex h-[350px] w-full flex-col items-center justify-between pt-16 sm:mt-0 sm:flex-row">
          <Suspense fallback={<p className="italic">Loading...</p>}>
            <div className="flex flex-col">
              <div className="flex w-full justify-center sm:justify-start">
                <QuoteLeftIcon
                  svgClass="h-6 w-6 sm:h-6 sm:w-6"
                  spanClass="inline-flex"
                />
                &nbsp;
                <QuoteRightIcon
                  svgClass="h-6 w-6 sm:h-6 sm:w-6"
                  spanClass="inline-flex"
                />
              </div>
              <h2 className="ml-0 mt-2 w-full text-center italic sm:ml-4 sm:text-start">
                There&apos;s probably a JavaScript library or framework for
                that.
              </h2>
            </div>

            {theme === "light" ? (
              <Me classes={classess} />
            ) : (
              <Me2 classes={classess} />
            )}
          </Suspense>
        </div>
      </article>
    </>
  )
}
About.Layout = MainLayout
export default About
