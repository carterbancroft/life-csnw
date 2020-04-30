'use strict'

class Cell {
  constructor(row, col, state = null) {
    this.row = row
    this.col = col
    this.state = state

    this.northWest = null
    this.north = null
    this.northEast = null

    this.west = null
    this.east = null

    this.southWest = null
    this.south = null
    this.southEast = null
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
}
