import React from 'react'
import P5Wrapper from 'react-p5-wrapper'
import marsMapSketch from '../sketches/marsMapSketch'
import {connect} from 'react-redux'

const MapP5 = props => {
  return (
    <div>
      <P5Wrapper
        sketch={marsMapSketch}
        clear={props.clearCoordinates}
        id="myCanvas"
      />
      <div id="p5_loading" className="loadingclass">
        <img src="https://media.giphy.com/media/sSgvbe1m3n93G/giphy.gif" />
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    clearCoordinates: state.coordinates
  }
}

export default connect(mapState)(MapP5)
