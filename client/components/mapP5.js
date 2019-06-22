import React from 'react'
import P5Wrapper from 'react-p5-wrapper'
import marsMapSketch from '../sketches/marsMapSketch'

const MapP5 = props => {
  return (
    <div>
      <P5Wrapper sketch={marsMapSketch} />
    </div>
  )
}

export default MapP5
