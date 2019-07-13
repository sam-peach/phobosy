import React from 'react'
import {connect} from 'react-redux'

const Navbar = props => {
  return (
    <div id="navBar">
      <h1>Phobosy</h1>
      <h3 onClick={() => props.clearCoordinates(!props.clear)}>
        Clear coordinates
      </h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    clear: state.coordinates
  }
}

const mapDispatch = dispatch => {
  return {
    clearCoordinates: bool => dispatch({type: 'CLEAR_COORDINATES', bool})
  }
}

export default connect(mapState, mapDispatch)(Navbar)
