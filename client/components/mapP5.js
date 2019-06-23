import React from 'react'
import P5Wrapper from 'react-p5-wrapper'
import marsMapSketch from '../sketches/marsMapSketch'

const MapP5 = props => {
  return (
    <div>
      <P5Wrapper sketch={marsMapSketch} className="canvas">
        <div id="p5_loading" className="loadingclass">
          <img src="https://media.giphy.com/media/55IcZKfutOQZG/giphy.gif" />
        </div>
      </P5Wrapper>
    </div>
  )
}

export default MapP5
