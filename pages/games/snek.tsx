import Head from "next/head"
import { useEffect, useRef } from "react"
import {
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CaretUpIcon,
  GithubIcon,
} from "../../components/icons"
import FilesLayout from "../../components/layouts/FilesLayout"

interface Vector2D {
  x: number
  y: number
}

interface Snek {
  body: Vector2D[]
  move: "up" | "right" | "down" | "left"
}

const getGridData = () => {
  const gridComputedStyle = window.getComputedStyle(
    document.querySelector("#grid-snek") as Element
  )

  return {
    rows: gridComputedStyle.getPropertyValue("grid-template-rows").split(" ")
      .length,
    cols: gridComputedStyle.getPropertyValue("grid-template-columns").split(" ")
      .length,
  }
}

const controls = (snek: Snek) => {
  window.addEventListener("keydown", event => {
    switch (event.code) {
      case "KeyS":
      case "ArrowDown":
        if (snek.move !== "up") snek.move = "down"
        break
      case "KeyW":
      case "ArrowUp":
        if (snek.move !== "down") snek.move = "up"
        break
      case "KeyA":
      case "ArrowLeft":
        if (snek.move !== "right") snek.move = "left"
        break
      case "KeyD":
      case "ArrowRight":
        if (snek.move !== "left") snek.move = "right"
        break
    }
  })
}

const settings = { speed: 200, border: true }

const Snek = () => {
  let gameEnd = useRef(false)
  let snek = useRef<Snek>({ body: [{ x: 0, y: 0 }], move: "right" })

  useEffect(() => {
    // UI
    const scoreDiv = document.getElementById("score")!
    const modal: HTMLElement = document.querySelector("#modal-snek")!
    const startBtn = modal.querySelectorAll(
      ".modal-btn"
    )[0] as HTMLButtonElement
    const restartBtn = modal.querySelectorAll(
      ".modal-btn"
    )[1] as HTMLButtonElement
    startBtn.style.display = "grid"
    restartBtn.style.display = "none"

    // Get grid and populate it with boxes
    const grid = document.querySelector("#grid-snek")!
    const box = document.createElement("div")
    box.classList.add("box")
    for (let i = 0; i < 64; i++) {
      grid.appendChild(box.cloneNode())
    }

    const { cols, rows } = getGridData()

    /** from 2D index to 1D index. (row * width) + column */
    const oneDIndex = ({ x, y }: Vector2D) => y * cols + x

    const randomApplePos = () => {
      let index = Math.floor(Math.random() * cols * rows)

      // 1D to 2D (x,y) index
      const y = Math.floor(index / cols)
      const x = Math.floor(index % cols)

      // Prevent apple at 0 and at snake's body
      if (
        index === 0 ||
        snek.current.body.some(coord => coord.x === x && coord.y === y)
      ) {
        index = randomApplePos()
      }
      return index
    }

    const game = () => {
      controls(snek.current)
      // START
      let head = snek.current.body[snek.current.body.length - 1]
      grid.children.item(randomApplePos())!.classList.add("food")

      // UPDATE
      const gameUpdate = setInterval(() => {
        if (gameEnd.current) clearInterval(gameUpdate)
        // Remove tail
        grid.children
          .item(oneDIndex(snek.current.body.shift()!))!
          .classList.remove("active")

        // Updating head
        if (snek.current.move === "down") {
          head = { x: head.x, y: head.y === rows - 1 ? 0 : head.y + 1 }
        } else if (snek.current.move === "up") {
          head = { x: head.x, y: head.y === 0 ? rows - 1 : head.y - 1 }
        } else if (snek.current.move === "right") {
          head = { x: head.x === cols - 1 ? 0 : head.x + 1, y: head.y }
        } else if (snek.current.move === "left") {
          head = { x: head.x === 0 ? cols - 1 : head.x - 1, y: head.y }
        }

        // Always push new coordinates to body
        snek.current.body.push(head)

        // Updating head element
        let headClass = grid.children.item(oneDIndex(head))!.classList
        if (headClass.contains("active")) {
          // End game
          gameEnd.current = true
          snek.current = { body: [{ x: 0, y: 0 }], move: "right" }
          startBtn.style.display = "none"
          restartBtn.style.display = "grid"
          modal.querySelector("p")!.style.display = "none"
          modal.querySelector("h1")!.textContent = "GAME OVER 🙁"
          modal.style.display = "grid"
        }
        if (headClass.contains("food")) {
          headClass.remove("food")
          headClass.add("active")
          // Push new coordinate/body
          snek.current.body.push(head)
          scoreDiv.textContent = `Score: ${snek.current.body.length - 1}`
          // New food position
          grid.children.item(randomApplePos())!.classList.add("food")
        } else {
          headClass.add("active")
        }
      }, settings.speed)
    }

    startBtn.addEventListener("click", () => {
      modal.style.display = "none"
      game()
    })
    restartBtn.addEventListener("click", () => {
      scoreDiv.textContent = "Score: 0"
      Array.from(grid.children).forEach(box => {
        box.classList.remove("food")
        box.classList.remove("active")
      })
      modal.style.display = "none"
      gameEnd.current = false

      game()
    })
  }, [])

  return (
    <>
      <Head>
        <title>Snek 🐍</title>
      </Head>
      <div id="file-snek">
        <div id="modal-snek">
          <h1>Snek 🐍</h1>
          <p className="hidden sm:inline-block">
            Movement: <kbd>W</kbd>
            <kbd>A</kbd>
            <kbd>S</kbd>
            <kbd>D</kbd>
          </p>
          <button className="modal-btn" value="start">
            START
          </button>
          <button className="modal-btn hidden" value="restart">
            RESTART
          </button>
        </div>
        <div>
          <div id="grid-snek"></div>
          <div className="mt-[10px] flex w-full justify-between">
            <h4 id="score">Score: 0</h4>
            <a
              title="Github"
              href="https://github.com/Kapatid/snek-game"
              target="_blank"
              rel="noreferrer">
              <GithubIcon svgClass="fill-theme-on-background h-6 w-6" />
            </a>
          </div>
          <div className="mt-10 grid w-full place-items-center sm:hidden">
            <div className="grid  grid-cols-3 grid-rows-3">
              <button className="col-start-2 rounded-xl">
                <CaretUpIcon
                  svgClass="fill-theme-background h-6 w-6"
                  spanClass="scale-150"
                />
              </button>
              <button className="col-start-3 row-start-2 rounded-xl">
                <CaretRightIcon
                  svgClass="fill-theme-background h-6 w-6"
                  spanClass="scale-150"
                />
              </button>
              <button className="col-span-1 col-start-2 row-start-3 rounded-xl">
                <CaretDownIcon
                  svgClass="fill-theme-background h-6 w-6"
                  spanClass="scale-150"
                />
              </button>
              <button className="col-start-1 row-start-2 rounded-xl">
                <CaretLeftIcon
                  svgClass="fill-theme-background h-6 w-6"
                  spanClass="scale-150"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Snek.Layout = FilesLayout
export default Snek
