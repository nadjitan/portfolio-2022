import { NextPage } from "next"
import { useEffect } from "react"
import { GithubIcon } from "../../components/icons"
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
  let gameEnd = false
  let snek: Snek = { body: [{ x: 0, y: 0 }], move: "right" }

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
        snek.body.some(coord => coord.x === x && coord.y === y)
      ) {
        index = randomApplePos()
      }
      return index
    }

    const game = () => {
      controls(snek)
      // START
      let head = snek.body[snek.body.length - 1]
      grid.children.item(randomApplePos())!.classList.add("food")

      // UPDATE
      const gameUpdate = setInterval(() => {
        if (gameEnd) clearInterval(gameUpdate)
        // Remove tail
        grid.children
          .item(oneDIndex(snek.body.shift()!))!
          .classList.remove("active")

        // Updating head
        if (snek.move === "down") {
          head = { x: head.x, y: head.y === rows - 1 ? 0 : head.y + 1 }
        } else if (snek.move === "up") {
          head = { x: head.x, y: head.y === 0 ? rows - 1 : head.y - 1 }
        } else if (snek.move === "right") {
          head = { x: head.x === cols - 1 ? 0 : head.x + 1, y: head.y }
        } else if (snek.move === "left") {
          head = { x: head.x === 0 ? cols - 1 : head.x - 1, y: head.y }
        }

        // Always push new coordinates to body
        snek.body.push(head)

        // Updating head element
        let headClass = grid.children.item(oneDIndex(head))!.classList
        if (headClass.contains("active")) {
          // End game
          gameEnd = true
          snek = { body: [{ x: 0, y: 0 }], move: "right" }
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
          snek.body.push(head)
          scoreDiv.textContent = `Score: ${snek.body.length - 1}`
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
      gameEnd = false

      game()
    })
  }, [])

  return (
    <div id="file-snek">
      <div id="modal-snek">
        <h1>Snek 🐍</h1>
        <p>
          Movement: <kbd>W</kbd>
          <kbd>A</kbd>
          <kbd>S</kbd>
          <kbd>D</kbd>
        </p>
        <button className="modal-btn" value="start">
          Start
        </button>
        <button className="modal-btn hidden" value="restart">
          Restart
        </button>
      </div>
      <div>
        <div id="grid-snek"></div>
        <div className="w-full flex justify-between mt-[10px]">
          <h4 id="score">Score: 0</h4>
          <a
            title="Github"
            href="https://github.com/Kapatid/snek-game"
            target="_blank"
          >
            <GithubIcon />
          </a>
        </div>
      </div>
    </div>
  )
}

Snek.Layout = FilesLayout
export default Snek
