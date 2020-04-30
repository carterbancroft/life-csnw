'use strict'

class World {
  constructor(rows, cols, lifeThreshold) {
    this.rows = rows
    this.cols = cols
    this.lifeThreshold = lifeThreshold

    // Initialize the grid to have rows x cols null cells
    const _grid = []
    for (let r = 0; r < this.rows; r++) {
      const row = []
      for (let c = 0; c < this.cols; c++) {
        row[c] = new Cell(r, c, this.lifeThreshold)
      }
      _grid.push(row)
    }

    this.grid = _grid

    this._initCells()
  }

  _initCells() {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const cell = this.grid[r][c]

        cell.northWest = this.grid[this._calcRow(r - 1)][this._calcCol(c - 1)]
        cell.north = this.grid[this._calcRow(r - 1)][c]
        cell.northEast = this.grid[this._calcRow(r - 1)][this._calcCol(c + 1)]

        cell.west = this.grid[r][this._calcCol(c - 1)]
        cell.east = this.grid[r][this._calcCol(c + 1)]

        cell.southWest = this.grid[this._calcRow(r + 1)][this._calcCol(c - 1)]
        cell.south = this.grid[this._calcRow(r + 1)][c]
        cell.southEast = this.grid[this._calcRow(r + 1)][this._calcCol(c + 1)]
      }
    }
  }

  update() {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const cell = this.grid[r][c]
        cell.updateState()
      }
    }

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const cell = this.grid[r][c]
        cell.updateState()
        if (cell.state === cellStates.dying) {
          cell.state = cellStates.dead // kill it
        }
        else if (cell.state === cellStates.beingBorn) {
          cell.state = cellStates.alive // bring it to life
        }
      }
    }
  }

  _calcRow(row) {
    if (row < 0) {
      return this.rows - 1
    }
    if (row > this.rows - 1) {
      return 0
    }
    return row
  }

  _calcCol(col) {
    if (col < 0) {
      return this.cols - 1
    }
    if (col > this.cols - 1) {
      return 0
    }
    return col
  }
}
