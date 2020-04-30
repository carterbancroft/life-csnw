'use strict'

const cellSize = 10
const padding = 1
const rows = 50
const cols = 100
const lifeThreshold = 0.92

const world = new World(rows, cols, lifeThreshold)

const canvas = document.getElementById('canvas')
const width = (rows * cellSize) + (rows * padding)
const height = (cols * cellSize) + (cols * padding)

canvas.width = width
canvas.height = height

function drawWorld() {
  const context = canvas.getContext('2d')
  context.clearRect(0, 0, width, height)

  let yPos = cellSize / 2
  for (let r = 0; r < world.rows; r++) {
    let xPos = cellSize / 2

    for (let c = 0; c < world.cols; c++) {
      const cell = world.grid[r][c]

      if (cell.state === cellStates.dead) {
        context.fillStyle = "#FF0000"
      }
      else {
        context.fillStyle = "#0000FF"
      }

      context.fillRect(xPos, yPos, cellSize, cellSize)
      xPos += cellSize + 1
    }

    yPos += cellSize + 1
  }
}

let i = 0
setInterval(() => {
  console.log(`generation: ${i}`)

  world.update()
  drawWorld()

  i++
}, 200)
