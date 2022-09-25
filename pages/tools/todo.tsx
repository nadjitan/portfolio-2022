import { useAutoAnimate } from "@formkit/auto-animate/react"
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react"
import lottie, { AnimationItem } from "lottie-web"
import cb from "../../public/data/checkBox.json"
import trash from "../../public/data/trashV2.json"
import uuid from "react-uuid"
import { SaveIcon } from "../../components/icons"

const LottieCB: FC<{
  action: {
    id: string
    name: string
    done: boolean
  }
  setTodo: Dispatch<
    SetStateAction<{
      title: string
      actions: {
        id: string
        name: string
        done: boolean
      }[]
    }>
  >
}> = ({ action, setTodo }) => {
  const cbEl = useRef<HTMLSpanElement>(null)
  const anim = useRef<AnimationItem | null>(null)

  useEffect(() => {
    anim.current = lottie.loadAnimation({
      container: cbEl.current!,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: cb,
    })
    anim.current!.setSpeed(3)
    // in json { ..., "ip" === start, "op" === max, ...}
    if (action.done) anim.current!.goToAndPlay(30, true)
  }, [])

  return (
    <span
      ref={cbEl}
      onClick={() => {
        if (!action.done) {
          anim.current!.setDirection(1)
          anim.current!.play()
        } else {
          anim.current!.setDirection(-1)
          anim.current!.play()
        }

        setTodo(prev => {
          prev.actions.map(a => {
            if (a.id === action.id) a.done = !a.done
          })
          return { ...prev }
        })
      }}
      className="lottie-checkbox h-7 w-7 cursor-pointer"
    />
  )
}

const LottieTrash: FC<{
  onClick: () => void
}> = ({ onClick }) => {
  const trashEl = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: trashEl.current!,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: trash,
    })

    trashEl.current!.onmouseover = () => {
      anim.setDirection(1)
      anim.play()
    }
    trashEl.current!.onmouseleave = () => {
      anim.setDirection(-1)
      anim.play()
    }
  }, [])

  return (
    <span
      ref={trashEl}
      onClick={() => onClick()}
      className="lottie-trash ml-auto h-7 w-7 cursor-pointer"
    />
  )
}

const Todo = () => {
  const [parent] = useAutoAnimate<HTMLUListElement>()
  const [todo, setTodo] = useState({
    title: "todo",
    actions: [
      { id: uuid(), name: "Eat", done: false },
      { id: uuid(), name: "Code", done: true },
      { id: uuid(), name: "Sleep", done: false },
    ],
  })

  const addTodo = (name: string) => {
    setTodo(prev => {
      prev.actions.push({
        id: uuid(),
        name: name,
        done: false,
      })

      return { ...prev }
    })
  }

  return (
    <div className="grid h-full w-full justify-center overflow-hidden">
      <div className="flex h-full w-max flex-col gap-6 pt-14">
        <h1 className="place-self-center">{todo.title}</h1>

        <div
          id="input-container"
          className="flex w-full items-center border-b-2 border-b-theme-on-background focus-within:border-theme-on-background">
          <input
            id="input-todo"
            type="text"
            className="box-border w-full bg-transparent p-2 text-theme-on-background placeholder:text-theme-on-background focus:outline-none"
            placeholder="name..."
            onKeyUp={e => {
              if (e.key === "Enter") {
                const input = e.target as HTMLInputElement
                if (input.value !== "") addTodo(input.value)
                else
                  document
                    .getElementById("input-container")!
                    .classList.toggle("head-shake")
              }
            }}
          />

          <SaveIcon
            onClick={() => {
              const input = document.getElementById(
                "input-todo"
              ) as HTMLInputElement
              if (input.value !== "") addTodo(input.value)
              else
                document
                  .getElementById("input-container")!
                  .classList.toggle("head-shake")
            }}
            svgClass="h-7 w-7 cursor-pointer stroke-theme-on-background"
          />
        </div>

        <ul
          ref={parent}
          className="flex h-2/3 w-64 flex-col gap-2 overflow-y-auto">
          {todo.actions.map(a => (
            <li
              key={a.id}
              className="flex w-full items-center gap-2 border-2 border-theme-on-background bg-theme-background py-2 px-2 hover:bg-theme-on-background hover:text-theme-background [&_path]:stroke-theme-on-background [&_path]:hover:stroke-theme-background">
              <LottieCB action={a} setTodo={setTodo} />

              <p className={a.done ? `italic line-through decoration-2` : ""}>
                {a.name}
              </p>

              <LottieTrash
                onClick={() =>
                  setTodo({
                    ...todo,
                    actions: todo.actions.filter(
                      todo => todo.id !== a.id && todo
                    ),
                  })
                }
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Todo
