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
  return <>Hello</>
}
Readme.Layout = FilesLayout
export default Readme
