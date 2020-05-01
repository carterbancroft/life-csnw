'use strict'

const cellSize = 3
const padding = 1
const rows = 200
const cols = 350
const lifeThreshold = 0.85

const world = new World(rows, cols, lifeThreshold)

const canvas = document.getElementById('canvas')
const width = (cols * cellSize) + (cols * padding)
const height = (rows * cellSize) + (rows * padding)

canvas.width = width
canvas.height = height

function drawWorld() {
  const context = canvas.getContext('2d')
  context.clearRect(0, 0, width, height)

  let yPos = 0
  for (let r = 0; r < world.rows; r++) {
    let xPos = 0

    for (let c = 0; c < world.cols; c++) {
      const cell = world.grid[r][c]

      if (cell.state === cellStates.dead) {
        context.fillStyle = "#ffffff"
      }
      else {
        context.fillStyle = "#0000ff"
      }

      context.fillRect(xPos, yPos, cellSize, cellSize)
      xPos += cellSize + padding
    }

    yPos += cellSize + padding
  }
}

drawWorld()

let i = 0
setInterval(() => {
  world.update()
  drawWorld()

  i++
}, 100)
