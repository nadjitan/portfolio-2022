import { CSSProperties, FC, useEffect, useRef } from "react"
import { MoonIcon, SunIcon } from "../components/icons"
import { useAppContext } from "../hooks/useApp"

interface IconProps {
  title?: string
  spanClass?: string
  svgClass?: string
}

const ThemeSwitcher: FC<IconProps> = props => {
  let useDark = useRef<MediaQueryList | null>(null)
  const { theme, setTheme } = useAppContext()

  useEffect(() => {
    useDark.current = window.matchMedia("(prefers-color-scheme: dark)")
    document.documentElement.classList.toggle("dark", useDark.current.matches)
    useDark.current.addEventListener("change", e => {
      setTheme(theme === "light" ? "dark" : "light")
      document.documentElement.classList.toggle("dark", e.matches)
    })
  }, [])

  return theme === "light" ? (
    <SunIcon
      spanClass={props.spanClass}
      svgClass={props.svgClass}
      title={props.title}
      onClick={() => {
        setTheme("dark")
        document.documentElement.classList.toggle("dark")
      }}
    />
  ) : (
    <MoonIcon
      spanClass={props.spanClass}
      svgClass={props.svgClass}
      title={props.title}
      onClick={() => {
        setTheme("light")
        document.documentElement.classList.toggle("dark")
      }}
    />
  )
}

export default ThemeSwitcher
