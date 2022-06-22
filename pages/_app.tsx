import "../styles/global.css"
import "../styles/animista.css"
import "../styles/Files.css"
import "../styles/Shapez.css"
import "../styles/Snek.css"
import type { AppProps } from "next/app"
import { AppProvider } from "../hooks/useApp"
import FilesLayout from "../components/layouts/FilesLayout"

function MyApp({ Component, pageProps }: AppProps) {
  // const Layout = Component.Layout || FilesLayout

  return (
    <AppProvider>
      <FilesLayout>
        <Component {...pageProps} />
      </FilesLayout>
    </AppProvider>
  )
}

export default MyApp
