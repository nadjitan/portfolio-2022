import Head from "next/head"
import FilesLayout from "../components/layouts/FilesLayout"

const markdown = `
# This is a title

~~~js
const foo = (bar) => {
  return bar++;
};

console.log(foo(5));
~~~
`

const Readme = () => {
  return (
    <>
      <Head>
        <title>Readme</title>
      </Head>
      <div className="w-full h-full box-border p-4">readme</div>
    </>
  )
}
Readme.Layout = FilesLayout
export default Readme
