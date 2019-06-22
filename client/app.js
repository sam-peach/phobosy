import React from 'react'
import MapP5 from './components/mapP5'
import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <MapP5 />
    </div>
  )
}

export default App
