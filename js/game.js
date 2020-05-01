'use strict'

let gameLoop
let playing = false
let currentGeneration = 0

const cellSize = 5
const padding = 1
const rows = 110
const cols = 220
const lifeThreshold = 0.90

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
        context.fillStyle = '#eeeeee'
      }
      else {
        context.fillStyle = '#0000ff'
      }

      context.fillRect(xPos, yPos, cellSize, cellSize)
      xPos += cellSize + padding
    }

    yPos += cellSize + padding
  }
}

function togglePlay() {
  const button = document.getElementById('playButton')
  const generation = document.getElementById('generation')

  if (!playing) {
    button.innerText = 'Pause'
    gameLoop = setInterval(() => {
      world.update()
      drawWorld()

      currentGeneration++
      generation.innerText = `Generation: ${currentGeneration}`
    }, 100)
  }
  else {
    button.innerText = 'Play'
    clearInterval(gameLoop)
  }

  playing = !playing
}

drawWorld()
