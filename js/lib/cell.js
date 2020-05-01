'use strict'

class Cell {
  constructor(row, col, lifeThreshold) {
    this.row = row
    this.col = col

    this.northWest = null
    this.north = null
    this.northEast = null

    this.west = null
    this.east = null

    this.southWest = null
    this.south = null
    this.southEast = null

    const rand = Math.random()
    const state = rand >= lifeThreshold ?
      cellStates.alive : cellStates.dead

    this.state = state
  }

  get neighbors() {
    return [
      this.northWest,
      this.north,
      this.northEast,
      this.west,
      this.east,
      this.southWest,
      this.south,
      this.southEast
    ]
  }

  updateState() {
    const livingStates = [cellStates.dying, cellStates.alive]

    let liveNeighbors = 0
    this.neighbors.forEach(n => {
      if (livingStates.includes(n.state)) liveNeighbors += 1
    })

    let newState = this.state

    // If the current cell is alive...
    if (livingStates.includes(newState)) {
      // If the current cell has either 2 or 3 living neighbors, it survives.
      if (liveNeighbors < 2) newState = cellStates.dying
      else if (liveNeighbors > 3) newState = cellStates.dying
    }
    // Else if the current cell is dead...
    else {
      // If the current cell has 3 living neighbors it becomes living.
      if (liveNeighbors === 3) newState = cellStates.beingBorn
      // Otherwise the current cell stays dead.
    }

    this.state = newState
  }
}
