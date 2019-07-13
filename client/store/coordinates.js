import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const CLEAR_COORDINATES = 'CLEAR_COORDINATES'

/**
 * INITIAL STATE
 */
const defaultState = false

/**
 * ACTION CREATORS
 */
const clearCoordinatesAction = bool => ({type: CLEAR_COORDINATES, bool})

/**
 * THUNK CREATORS
 */
export const clearCoordinates = bool => dispatch => {
  dispatch(clearCoordinatesAction(bool))
}
/**
 * REDUCER
 */
export default function(state = defaultState, action) {
  switch (action.type) {
    case CLEAR_COORDINATES:
      return action.bool
    default:
      return state
  }
}
