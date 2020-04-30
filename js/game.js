'use strict'

const cellStates = {
  dead: 0,
  dying: 1,
  beingBorn: 2,
  alive: 3,
}

const cellSize = 10
const padding = 1
const rows = 50
const cols = 50

const world = new Grid(rows, cols)

const canvas = document.getElementById('game')
const width = (rows * cellSize) + (rows * padding)
const height = (cols * cellSize) + (cols * padding)

//const params = {width: 600, height: 600}
const two = new Two({width, height}).appendTo(canvas)

let yPos = cellSize / 2
for (let r = 0; r < world.rows; r++) {
  let xPos = cellSize / 2
  for (let c = 0; c < world.cols; c++) {
    const rect = two.makeRectangle(xPos, yPos, cellSize, cellSize)
    rect.fill = 'red'
    rect.noStroke()
    xPos += cellSize + 1
  }

  yPos += cellSize + 1
}

two.update()
