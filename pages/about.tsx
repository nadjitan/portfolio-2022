import Head from "next/head"
import FilesLayout from "../components/layouts/FilesLayout"

const About = () => {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <div className="box-border h-full w-full p-4">
        <article className="prose text-theme-on-background lg:prose-xl">
          <h1 className="text-theme-on-background">I AM NADJI</h1>
          <p>
            For years parents have espoused the health benefits of eating garlic
            bread with cheese to their children, with the food earning such an
            iconic status in our culture that kids will often dress up as warm,
            cheesy loaf for Halloween.
          </p>
        </article>
      </div>
    </>
  )
}
About.Layout = FilesLayout
export default About
