import { CSSProperties, FC, useLayoutEffect } from "react"
import { MoonIcon, SunIcon } from "../components/icons"
import { useAppContext } from "../hooks/useApp"

interface IconProps {
  style?: CSSProperties
  title?: string
}

const ThemeSwitcher: FC<IconProps> = props => {
  let useDark
  const { theme, setTheme } = useAppContext()

  useLayoutEffect(() => {
    useDark = window.matchMedia("(prefers-color-scheme: dark)")
    document.documentElement.classList.toggle("dark", useDark.matches)
    useDark.addEventListener("change", e => {
      setTheme(theme === "light" ? "dark" : "light")
      document.documentElement.classList.toggle("dark", e.matches)
    })
  }, [])

  return theme === "light" ? (
    <SunIcon
      title={props.title}
      style={props.style}
      onClick={() => {
        setTheme("dark")
        document.documentElement.classList.toggle("dark")
      }}
    />
  ) : (
    <MoonIcon
      title={props.title}
      style={props.style}
      onClick={() => {
        setTheme("light")
        document.documentElement.classList.toggle("dark")
      }}
    />
  )
}

export default ThemeSwitcher
