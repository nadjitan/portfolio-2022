import { useLayoutEffect } from "react"
import { GithubIcon } from "../../components/icons"
import FilesLayout from "../../components/layouts/FilesLayout"

const tetrominoes = {
  I: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
  ],
  J: [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
  ],
  L: [
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 2, y: 0 },
  ],
  O: [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
  ],
  S: [
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
  ],
  T: [
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 1, y: 0 },
    { x: 2, y: 1 },
  ],
  Z: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
  ],
}

type Vector2D = typeof tetrominoes.I[0]
type Tetromino = typeof tetrominoes.I

const getGridData = () => {
  const gridComputedStyle = window.getComputedStyle(
    document.querySelector("#grid-shapez")!
  )

  return {
    rows: gridComputedStyle.getPropertyValue("grid-template-rows").split(" ")
      .length,
    cols: gridComputedStyle.getPropertyValue("grid-template-columns").split(" ")
      .length,
  }
}
/**
 * @see https://stackoverflow.com/a/7102110
 */
const rotateBox = (degree: number, { x, y }: Vector2D, origin: Vector2D) => {
  const radians = (degree * Math.PI) / 180
  const cos = Math.cos(radians)
  const sin = Math.sin(radians)
  const x2 = x - origin.x
  const y2 = y - origin.y
  return {
    x: x2 * cos - y2 * sin + origin.x,
    y: x2 * sin + y2 * cos + origin.y,
  }
}

const Shapez = () => {
  useLayoutEffect(() => {
    let settings = { fallSpeed: 1000, border: true }

    // UI
    const scoreDiv = document.getElementById("score")!
    const modal: HTMLElement = document.getElementById("modal")!
    const startBtn = modal.querySelectorAll(
      ".modal-btn"
    )[0] as HTMLButtonElement
    const restartBtn = modal.querySelectorAll(
      ".modal-btn"
    )[1] as HTMLButtonElement
    startBtn.style.display = "grid"
    restartBtn.style.display = "none"

    // Get grid and populate it with boxes
    const grid = document.getElementById("grid-shapez")!
    const gridBoxes = grid.children
    const box = document.createElement("div")
    box.classList.add("box-shapez")
    for (let i = 0; i < 240; i++) {
      grid.appendChild(box.cloneNode())
    }

    const { cols, rows } = getGridData()
    let gameEnd = false

    /**
     * From xy coords to array index. (row * width) + column
     */
    const toArrIndex = ({ x, y }: Vector2D) => y * cols + x

    const renderTetromino = (block: Tetromino) =>
      block.forEach(coord => {
        grid.children[toArrIndex(coord)].classList.add("active")
      })

    /**
     * Remove previously rendered block
     */
    const removePrevTetromino = (block: Tetromino) =>
      block.map(coord =>
        gridBoxes[toArrIndex(coord)].classList.remove("active")
      )

    const isBoxStatic = (coord: Vector2D) =>
      gridBoxes[toArrIndex(coord)].classList.contains("static")

    const randomTetromino = (
      tetrisBlocks: typeof tetrominoes
    ): { bCoords: Tetromino; bName: string } => {
      const coords = Object.values(tetrisBlocks)
      const randomNum = Math.floor(Math.random() * coords.length)
      const name = Object.keys(tetrisBlocks)[randomNum]
      return {
        bCoords: coords[randomNum].map(coord => ({
          x:
            name === "O" // Move block to center
              ? coord.x + Math.floor(cols / 2 - 1)
              : coord.x + Math.floor(cols / 2 - 2),
          y: coord.y,
        })),
        bName: name,
      }
    }

    /**
     * Check if there are any completed lines
     */
    const checkLines = (block: Tetromino) => {
      // Get lowest y of current block that hit a static box/last row
      const lowestRow = block.reduce((prev, current) =>
        prev.y > current.y ? prev : current
      )
      let clearRow = false
      let rowsRemoved = 0

      // ROWS
      for (let i = lowestRow.y; i >= 0; i--) {
        // COLUMNS
        // If all boxes in a row is static, start clearing
        for (let j = 0; j < cols; j++) {
          if (isBoxStatic({ x: j, y: i })) {
            clearRow = true
          } else {
            clearRow = false
            break
          }
        }

        if (clearRow) {
          // COLUMNS
          // Start removing static classes of boxes
          for (let k = 0; k < cols; k++) {
            gridBoxes[toArrIndex({ x: k, y: i })].classList.remove("static")
          }
          rowsRemoved += 1
        }
      }

      if (rowsRemoved !== 0) {
        const score = parseInt(scoreDiv.textContent!.replace("Score: ", ""))
        scoreDiv.textContent = `Score: ${score + 100 * rowsRemoved}`
        // Starting from bottom, make all static boxes fall
        for (let i = toArrIndex(lowestRow); i >= 0; i--) {
          if (gridBoxes[i].classList.contains("static")) {
            gridBoxes[i].classList.remove("static")
            // Fall based on number of lines removed
            gridBoxes[cols * rowsRemoved + i].classList.add("static")
          }
        }
      }
    }

    function game() {
      // START
      let newTetromino = randomTetromino(tetrominoes)
      let { bCoords, bName } = newTetromino

      renderTetromino(bCoords)

      const makeBlockFall = () => {
        if (
          // If last row is reached
          bCoords.some(coord => coord.y >= rows - 1) ||
          // If falling block hit another block
          bCoords.some(coord => isBoxStatic({ x: coord.x, y: coord.y + 1 }))
        ) {
          // Make current block static
          bCoords.forEach(coord => {
            gridBoxes[toArrIndex(coord)].classList.remove("active")
            gridBoxes[toArrIndex(coord)].classList.add("static")
          })
          checkLines(bCoords)
          // Create new falling block
          newTetromino = randomTetromino(tetrominoes)
          bCoords = newTetromino.bCoords
          bName = newTetromino.bName
        } else {
          removePrevTetromino(bCoords)
          // Make block "fall"
          bCoords = bCoords.map(coord => ({ x: coord.x, y: coord.y + 1 }))
        }

        // If first row have static blocks, end game
        for (let i = 0; i < cols; i++) {
          if (gridBoxes[i].classList.contains("static")) {
            gameEnd = true
            startBtn.style.display = "none"
            restartBtn.style.display = "grid"
            modal.querySelectorAll("p").forEach(e => (e.style.display = "none"))
            modal.querySelector("h1")!.textContent = "GAME OVER 🙁"
            modal.style.display = "grid"
            break
          }
        }

        if (!gameEnd) renderTetromino(bCoords)
      }

      // UPDATE fall
      const gameUpdate = setInterval(() => {
        if (gameEnd) clearInterval(gameUpdate)
        makeBlockFall()
      }, settings.fallSpeed)

      // CONTROLS listener
      window.onkeydown = e => {
        if (gameEnd) {
          window.onkeydown = null
        }

        if (e.code === "KeyR" && bName !== "O") {
          const rotatedBlock = bCoords.map(coord =>
            rotateBox(90, coord, { x: bCoords[1].x, y: bCoords[1].y })
          )

          // Rotate only if computed rotation have NO static class around it &
          // does not exceed the left & right of the grid
          if (
            !rotatedBlock.some(coord =>
              isBoxStatic({ x: coord.x, y: coord.y })
            ) &&
            !rotatedBlock.some(coord => coord.x < 0) &&
            !rotatedBlock.some(coord => coord.x > cols - 1)
          ) {
            removePrevTetromino(bCoords)
            bCoords = rotatedBlock
            renderTetromino(bCoords)
          }
        }

        if (e.code === "KeyS" || e.code === "ArrowDown") {
          makeBlockFall()
        }

        if (e.code === "KeyA" || e.code === "ArrowLeft") {
          removePrevTetromino(bCoords)
          bCoords = bCoords.map(coord => ({
            x:
              // Stop moving if a box have x=0
              bCoords.some(coord => coord.x === 0) ||
              // Stop moving if there is a static box
              bCoords.some(coord =>
                isBoxStatic({ x: coord.x - 1, y: coord.y + 1 })
              )
                ? coord.x
                : coord.x - 1,
            y: coord.y,
          }))
          renderTetromino(bCoords)
        }

        if (e.code === "KeyD" || e.code === "ArrowRight") {
          removePrevTetromino(bCoords)
          bCoords = bCoords.map(coord => ({
            x:
              bCoords.some(coord => coord.x === cols - 1) ||
              bCoords.some(coord =>
                isBoxStatic({ x: coord.x + 1, y: coord.y + 1 })
              )
                ? coord.x
                : coord.x + 1,
            y: coord.y,
          }))
          renderTetromino(bCoords)
        }
      }
    }

    startBtn.addEventListener("click", () => {
      modal.style.display = "none"
      game()
    })
    restartBtn.addEventListener("click", () => {
      scoreDiv.textContent = "Score: 0"
      Array.from(gridBoxes).forEach(box => {
        box.classList.remove("active")
        box.classList.remove("static")
      })
      modal.style.display = "none"
      gameEnd = false

      game()
    })
  }, [])

  return (
    <div id="file-shapez">
      <div id="modal">
        <h1>Shapez 🧱</h1>
        <p>
          Movement: <kbd>W</kbd>
          <kbd>A</kbd>
          <kbd>S</kbd>
          <kbd>D</kbd>
        </p>
        <p>
          Rotate: <kbd>R</kbd>
        </p>
        <button className="modal-btn" value="start">
          Start
        </button>
        <button className="modal-btn hidden" value="restart">
          Restart
        </button>
      </div>
      <div>
        <div id="grid-shapez"></div>
        <div className="w-full flex justify-between mt-[10px">
          <h4 id="score">Score: 0</h4>
          <a
            title="Github"
            href="https://github.com/Kapatid/shapez-game"
            target="_blank"
          >
            <GithubIcon />
          </a>
        </div>
      </div>
    </div>
  )
}

Shapez.Layout = FilesLayout
export default Shapez
