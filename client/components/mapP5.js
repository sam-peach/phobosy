import React from 'react'
import P5Wrapper from 'react-p5-wrapper'
import marsMapSketch from '../sketches/marsMapSketch'

const MapP5 = props => {
  return (
    <div>
      <P5Wrapper sketch={marsMapSketch} className="myCanvas" />
      <div id="p5_loading" className="loadingclass">
        <img src="https://www.dokkan.ly/Themes/Dokkan/Content/images/dokkanloader.gif" />
      </div>
    </div>
  )
}

export default MapP5
