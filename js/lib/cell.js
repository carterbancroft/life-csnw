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
    if (livingStates.includes(newState)) {
      if (liveNeighbors < 2) newState = cellStates.dying
      else if (liveNeighbors > 3) newState = cellStates.dying
    }
    else {
      if (liveNeighbors === 3) newState = cellStates.beingBorn
    }

    this.state = newState
  }
}
