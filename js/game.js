'use strict'

// Mutable variables that track game state as it evolves.
//
// Stores the "game loop" interval so it can be stopped and started.
let gameLoop
// Whether or not the game is currently running.
let playing = false
// The current generation, or game turn, that the cells are on.
let currentGeneration = 0

// Game config values. Tweak these to get different effects.
//
// All cells are squares. This stores their height and width in pixels.
const cellSize = 5
// The amount of space around a given cell. Basically this gives us a 1 pixel
// line in between cells.
const padding = 1
// The amount of rows and columns in the overall grid. Used to calculate the
// canvas size as well.
const rows = 110
const cols = 220
// This defines how likely a given cell in the world is to be dead. It defines
// how seeded with living cells the world will be when it's first generated. The
// higher the value the fewer living cells there will be at generation 0. Think
// of it like "85% of cells will start dead".
const lifeThreshold = 0.85
// Modify these to modify the colors of the cells in the browser.
let aliveCellColor = '#f242f5'
const deadCellColor = '#333333'
// The amount of time (in milliseconds) that a single generation gets to exist
// before the rules are applied and the next generation bursts into being. In
// other words the lenght of a single game tick.
const loopSpeedMs = 100

// The World object, which at it's core is just a 2D array representation of
// cells to be rendered.
const world = new World(rows, cols, lifeThreshold)

const canvas = document.getElementById('canvas')

// Calculate the width and height of the canvas based off the size of the cells,
// the number of rows/cols and the amount of padding.
const width = (cols * cellSize) + (cols * padding)
const height = (rows * cellSize) + (rows * padding)

canvas.width = width
canvas.height = height

/**
 * Handles rendering the world into an HTML canvas.
 *
 * Note: I struggled a bit with whether this should go into the World class or
 * if it should be here. Ultimately I decided the rendering should be separate
 * from the world object itself. This way, in theory, you could shim the World
 * class under any JS rendering framework and it should work as long as you get
 * the draw function set up right.
 */
function drawWorld() {
  const context = canvas.getContext('2d')
  // Clear the entire canvas on each draw
  context.clearRect(0, 0, width, height)

  let yPos = 0
  for (let r = 0; r < world.rows; r++) {
    let xPos = 0

    for (let c = 0; c < world.cols; c++) {
      const cell = world.grid[r][c]

      // Depending on the state of a cell, set it's color.
      if (cell.state === cellStates.dead) {
        context.fillStyle = deadCellColor
      }
      else {
        context.fillStyle = aliveCellColor
      }

      // Draw that sucker.
      context.fillRect(xPos, yPos, cellSize, cellSize)

      // Both X and Y positions need to be calculated and kept track of using
      // the cellSize and padding values.
      xPos += cellSize + padding
    }

    yPos += cellSize + padding
  }
}

/**
 * Handles running the game loop, which updates the World array based on the
 * rules of Life and then drawing the updated world. Also tracks the current
 * Generation.
 *
 * The loop is a simple js setInterval.
 */
function play() {
  const generation = document.getElementById('generation')
  gameLoop = setInterval(() => {
    world.update()
    drawWorld()

    currentGeneration++
    generation.innerText = `Generation: ${currentGeneration}`
  }, loopSpeedMs)
}

// egg
let p = false
document.addEventListener('keyup', e => {
  if (e.keyCode === 32) {
    togglePlay()
  }
  else if (e.keyCode === 66) {
    const l = document.getElementById('l')
    p ? l.pause() : l.play()
    p = !p
  }
  else if (e.keyCode === 67) {
    const c = ['#f242f5', '#36ff6b', '#36f5ff', '#ffc936', '#ff5b36']
    let r = aliveCellColor
    while (r === aliveCellColor) {
      r = c[Math.floor(Math.random() * c.length)]
    }
    aliveCellColor = r
  }
})

/**
 * Handles stopping and starting the game. Basically updates the UI
 * appropriately and calls `play()` to kick off the game loop.
 */
function togglePlay() {
  const button = document.getElementById('playButton')

  if (!playing) {
    button.innerText = 'Pause'
    play()
  }
  else {
    button.innerText = 'Play'
    clearInterval(gameLoop)
  }

  playing = !playing
}

// Draw generation 0 on startup. This renders the world as it is initially
// generated.
drawWorld()
