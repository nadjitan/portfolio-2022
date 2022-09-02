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
        <p className="mt-1 ">
          Video Games... video games is what led me to be a web developer. It
          made me explore technologies that people would have never guessed to
          exist. Soon after many years of obsessing over video games and
          internet culture I discovered the web dev community. Things such as{" "}
          <a
            className="p-link"
            href="https://www.infoworld.com/article/3661810/reactive-javascript-the-evolution-of-front-end-architecture.html"
            target="_blank"
            rel="noreferrer">
            <code>reactivity</code>
          </a>{" "}
          in a website blew my mind and the rate of growth{" "}
          <a
            className="p-link"
            href="https://www.javascript.com/"
            target="_blank"
            rel="noreferrer">
            <code>JavaScript</code>
          </a>{" "}
          have shown made it easy for beginners to learn coding. I am 99.9%
          certain that:
        </p>

        <div className="mt-12 flex h-[350px] w-full flex-col items-center justify-between sm:mt-0 sm:flex-row wide:mt-20">
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
              There's probably a JavaScript library or framework for that.
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
