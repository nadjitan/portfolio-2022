import { useAutoAnimate } from "@formkit/auto-animate/react"
import { useEffect, useRef, useState } from "react"
import lottie from "lottie-web"
import cb from "../../public/data/checkBox.json"
import trash from "../../public/data/trashV2.json"
import uuid from "react-uuid"
import { SaveIcon } from "../../components/icons"

const Todo = () => {
  const [parent] = useAutoAnimate<HTMLUListElement>()
  const [todo, setTodo] = useState({
    title: "todo",
    todos: [
      { id: uuid(), name: "Eat", done: false },
      { id: uuid(), name: "Code", done: true },
      { id: uuid(), name: "Sleep", done: false },
    ],
  })

  const cbEls = useRef<HTMLSpanElement[]>([])
  const trashEls = useRef<HTMLSpanElement[]>([])

  const addTodo = (name: string) => {
    setTodo(prev => {
      prev.todos.push({
        id: uuid(),
        name: name,
        done: false,
      })

      return { ...prev }
    })
  }

  useEffect(() => {
    cbEls.current = Array.from(
      document.getElementsByClassName("lottie-checkbox")
    ) as HTMLSpanElement[]
    trashEls.current = Array.from(
      document.getElementsByClassName("lottie-trash")
    ) as HTMLSpanElement[]

    cbEls.current.map((el, index) => {
      const currTodo = todo.todos[index]
      if (currTodo) {
        let play = currTodo.done

        const anim = lottie.loadAnimation({
          container: el,
          renderer: "svg",
          loop: false,
          autoplay: false,
          animationData: cb,
        })
        anim.setSpeed(3)
        // in json { ..., "ip" === start, "op" === max, ...}
        if (play) anim.goToAndPlay(30, true)

        el.onclick = () => {
          if (!play) {
            anim.setDirection(1)
            anim.play()
            play = true
          } else {
            anim.setDirection(-1)
            anim.play()
            play = false
          }

          setTodo(prev => {
            const found = prev.todos.find(t => t.id === currTodo.id)
            if (found) found.done = play
            return prev
          })
        }
      }
    })

    trashEls.current.map(el => {
      const anim = lottie.loadAnimation({
        container: el,
        renderer: "svg",
        loop: false,
        autoplay: false,
        animationData: trash,
      })

      el.onmouseover = () => {
        anim.setDirection(1)
        anim.play()
      }
      el.onmouseleave = () => {
        anim.setDirection(-1)
        anim.play()
      }
    })

    return () => {
      lottie.destroy()
      cbEls.current.map(el => (el.onclick = null))
      trashEls.current.map(el => {
        el.onmouseover = null
        el.onmouseleave = null
      })
    }
  }, [todo])

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
          {todo.todos.map(t => (
            <li
              key={t.id}
              className="flex w-full items-center gap-2 border-2 border-theme-on-background py-2 px-2 hover:bg-theme-on-background hover:text-theme-background [&_path]:stroke-theme-on-background [&_path]:hover:stroke-theme-background">
              <span className="lottie-checkbox h-7 w-7 cursor-pointer" />

              <p>{t.name}</p>

              <span
                className="lottie-trash ml-auto h-7 w-7 cursor-pointer"
                onClick={() =>
                  setTodo({
                    ...todo,
                    todos: todo.todos.filter(todo => todo.id !== t.id && todo),
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
