import Head from "next/head"
import { QuoteLeftIcon, QuoteRightIcon } from "../components/icons"
import FilesLayout from "../components/layouts/FilesLayout"
import { Me, Me2 } from "../components/Me"
import { useAppContext } from "../hooks/useApp"

const classess = "w-[800px] sm:mt-0 mt-8"

const About = () => {
  const { theme } = useAppContext()

  return (
    <>
      <Head>
        <title>About</title>
      </Head>

      <article className="relative box-border flex h-full w-full flex-col overflow-y-auto overflow-x-hidden p-4">
        <h1 className="text-theme-on-background">about me</h1>
        <p className="mt-2 text-xl sm:text-base">
          Video Games 🎮... video games is what led me to be a web developer 👨‍💻.
          It made me explore technologies that people would have never guessed
          to exist. Soon after many years of obsessing over video games and
          internet culture I discovered the{" "}
          <a
            className="p-link"
            href="https://gist.github.com/nadjitan/6e0c933f0058a4e569da2c3c04eecb81"
            target="_blank"
            rel="noreferrer">
            web dev community
          </a>
          . Things such as{" "}
          <a
            className="p-link"
            href="https://www.infoworld.com/article/3661810/reactive-javascript-the-evolution-of-front-end-architecture.html"
            target="_blank"
            rel="noreferrer">
            reactivity
          </a>{" "}
          in a website blew my mind and the{" "}
          <a
            className="p-link"
            href="https://stateofjs.com/en-us/"
            target="_blank"
            rel="noreferrer">
            rate of growth
          </a>{" "}
          <a
            className="p-link"
            href="https://www.javascript.com/"
            target="_blank"
            rel="noreferrer">
            JavaScript
          </a>{" "}
          have shown made it easy for beginners to learn coding. That is how I
          got into coding and I am{" "}
          <a
            className="p-link"
            href="https://snyk.io/blog/npm-passes-the-1-millionth-package-milestone-what-can-we-learn/"
            target="_blank"
            rel="noreferrer">
            99.9% certain
          </a>{" "}
          that:
        </p>

        <div className="flex h-[350px] w-full flex-col items-center justify-between pt-16 sm:mt-0 sm:flex-row">
          <div className="flex flex-col">
            <div className="flex w-full justify-center sm:justify-start">
              <QuoteLeftIcon
                svgClass="h-6 w-6 sm:h-8 sm:w-8"
                spanClass="inline-flex"
              />
              &nbsp;
              <QuoteRightIcon
                svgClass="h-6 w-6 sm:h-8 sm:w-8"
                spanClass="inline-flex"
              />
            </div>
            <h2 className="ml-0 mt-2 w-full text-center italic sm:ml-4 sm:text-start">
              There&apos;s probably a JavaScript library or framework for that.
            </h2>
          </div>

          {theme === "light" ? (
            <Me classess={classess} />
          ) : (
            <Me2 classess={classess} />
          )}
        </div>
      </article>
    </>
  )
}
About.Layout = FilesLayout
export default About
