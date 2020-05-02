'use strict'

/**
 * The Cell object defines a single instance of a cell within the World.
 *
 * Cells have a position in the world (their row/col) and a state (whether they
 * are alive or dead or the intermediate states of dying and being born).
 *
 * Cells also keep track of all of their neighbors. Knowing the neighbors of a
 * given cell is necessary to apply the rules during each game tick.
 */
class Cell {
  // Class variables
  row
  col
  state

  // These define the neighbor of this cell instance. The World object handles
  // setting these.
  northWest = null
  north = null
  northEast = null
  west = null
  east = null
  southWest = null
  south = null
  southEast = null

  constructor(row, col, state) {
    this.row = row
    this.col = col

    this.state = state
  }

  /**
   * A getter function to return all of a cells neighbors.
   */
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

  /**
   * Handles updating a cells state based on the state of it's neighbors. This
   * is where the rules of Life are ultimately applied.
   */
  updateState() {
    const livingStates = [cellStates.dying, cellStates.alive]

    // First figure out how many neighbors this cell has that are alive...
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
