import { FC, useEffect, useRef } from "react"
import { MoonIcon, SunIcon } from "./icons"
import { useAppContext } from "../hooks/useApp"

type IconProps = {
  title?: string
  spanClass?: string
  svgClass?: string
}

const ThemeSwitcher: FC<IconProps> = props => {
  const { theme, setTheme } = useAppContext()

  useEffect(() => {
    setTheme(
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    )

    // Change theme based on user's system
    let useDark = window.matchMedia("(prefers-color-scheme: dark)")
    document.documentElement.classList.toggle("dark", useDark.matches)

    useDark.addEventListener("change", e => {
      setTheme(theme === "light" ? "dark" : "light")
      document.documentElement.classList.toggle("dark", e.matches)
    })
  }, [])

  return theme === "light" ? (
    <MoonIcon
      spanClass={props.spanClass}
      svgClass={props.svgClass}
      title={props.title}
      onClick={() => {
        setTheme("dark")
        document.documentElement.classList.toggle("dark")
      }}
    />
  ) : (
    <SunIcon
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
