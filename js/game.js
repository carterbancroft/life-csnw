'use strict'

let world
const canvas = document.getElementById('canvas')

const cellStates = {
  dead: 0,
  dying: 1,
  beingBorn: 2,
  alive: 3,
}

function initializeWorld() {
  const cellSize = 10
  const padding = 1
  const rows = 50
  const cols = 50

  world = new World(rows, cols, 0.90)

  const width = (rows * cellSize) + (rows * padding)
  const height = (cols * cellSize) + (cols * padding)

  const two = new Two({width, height}).appendTo(canvas)

  let yPos = cellSize / 2
  for (let r = 0; r < world.rows; r++) {
    let xPos = cellSize / 2
    for (let c = 0; c < world.cols; c++) {
      const rect = two.makeRectangle(xPos, yPos, cellSize, cellSize)
      const cell = world.grid[r][c]
      if (cell.state === cellStates.dead) {
        rect.fill = 'red'
      }
      else {
        rect.fill = 'blue'
      }

      rect.noStroke()
      xPos += cellSize + 1
    }

    yPos += cellSize + 1
  }

  two.update()
}

initializeWorld()
