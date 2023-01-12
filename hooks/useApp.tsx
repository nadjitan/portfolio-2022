import { NextPage } from "next"
import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useState,
} from "react"

type IAppContext = {
  animation: "idle" | "animating" | "animate"
  theme: "light" | "dark"
  setAnimState: Dispatch<SetStateAction<IAppContext["animation"]>>
  setTheme: Dispatch<SetStateAction<IAppContext["theme"]>>
}

const initialState: IAppContext = {
  animation: "idle",
  theme: "light",
  setAnimState: () => {},
  setTheme: () => {},
}

const AppContext = createContext<IAppContext>(initialState)

export const useAppContext = () => {
  const context = useContext(AppContext)

  return context
}

export const AppProvider: NextPage<{ children: ReactElement }> = props => {
  const [animation, setAnimState] = useState<IAppContext["animation"]>(
    initialState.animation
  )
  const [theme, setTheme] = useState<IAppContext["theme"]>(initialState.theme)

  return (
    <AppContext.Provider value={{ animation, theme, setAnimState, setTheme }}>
      {props.children}
    </AppContext.Provider>
  )
}
