'use strict'

/**
 * Simple little enum-like object to store all the possible states of an
 * individual cell.
 *
 * `alive` and `dead` are "final" states meaning these are ones that you see
 * reflected in the world.
 *
 * `dying` and `beingBorn` are "intermediate" states that help determine whether
 * a cell should be alive or dead on the next tick.
 */
const cellStates = {
  dead: 0,
  alive: 3,
  dying: 1,
  beingBorn: 2,
}
