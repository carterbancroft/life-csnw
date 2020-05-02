'use strict'

/**
 * The World object defines a single instance of the world in which all cells
 * live and evolve.
 *
 * It has a size (defined by the number of rows and columns).
 *
 * It also is created with a threshold for life. A variable that defines how
 * likely it is for a given cell to be alive or dead upon world creation.
 */
class World {
  // Class variables
  grid
  rows
  cols
  lifeThreshold

  constructor(rows, cols, lifeThreshold) {
    this.rows = rows
    this.cols = cols
    this.lifeThreshold = lifeThreshold

    this._initWorld()
    this._initCells()
  }

  /**
   * Handles initializing the world by creating the grid with all of it's cells.
   * The world grid is just a 2D array of Cell objects.
   *
   * Cells will be initialized with either an alive or dead state dependent upon
   * the `lifeThreshold` var.
   */
  _initWorld() {
    const _grid = []
    for (let r = 0; r < this.rows; r++) {
      const row = []
      for (let c = 0; c < this.cols; c++) {
        // Using the lifeThreshold value and rand we determine here whether the
        // cell we're creating is going to be alive or dead initially.
        const rand = Math.random()
        const state = rand >= this.lifeThreshold ?
          cellStates.alive : cellStates.dead

        row[c] = new Cell(r, c, state)
      }

      _grid.push(row)
    }

    this.grid = _grid
  }

  /**
   * Once the world is created this "connects" the cells to eachother. Basically
   * setting a cells neighbors based on it's position in the grid.
   */
  _initCells() {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const cell = this.grid[r][c]

        // Each neighbors position within the grid is calculated using the
        // _calcRow and _calcCol methods on this class.
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

  /**
   * Handles updating all the cells within the world based on the rules of Life.
   */
  update() {
    // First we loop over the world and apply all the rules by calling each
    // cell's `updateState()` method.
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const cell = this.grid[r][c]
        cell.updateState()
      }
    }

    // Once each cell is updated the changes will be reflected by the
    // intermediate states of `dying` and `beingBorn`. These need to be updated
    // to the appropriate final state of `dead` or `alive` accordingly.
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const cell = this.grid[r][c]

        if (cell.state === cellStates.dying) {
          cell.state = cellStates.dead // kill it
        }
        else if (cell.state === cellStates.beingBorn) {
          cell.state = cellStates.alive // bring it to life
        }
      }
    }
  }

  /**
   * Helper to calculate an appropriate row value in the case of a value
   * being outside of the bounds of the world.
   *
   * Basically these make the world spherical, where left and right edges of the
   * world connect as do the top and bottom.
   *
   * Note: An interesting problem might be to make the world toroidal instead of
   * spherical.
   */
  _calcRow(row) {
    // If a row value is negative (off the top of the world), return the last
    // row.
    if (row < 0) {
      return this.rows - 1
    }
    // If a row value is greater than the last row, return 0 (the value of the
    // first row).
    if (row > this.rows - 1) {
      return 0
    }
    // Otherwise the row value is within the bounds of the world and just fine.
    return row
  }

  /**
   * Same as with `_calcRow`. This calculates appropriate column values based
   * on whether or not they are out of bounds.
   */
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
