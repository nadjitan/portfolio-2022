import "../styles/global.css"
import "../styles/animista.css"
import "../styles/Files.css"
import "../styles/Shapez.css"
import "../styles/Snek.css"
import type { AppProps } from "next/app"
import { AppProvider } from "../hooks/useApp"
import MainLayout from "../components/layouts/main-layout"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </AppProvider>
  )
}

export default MyApp
