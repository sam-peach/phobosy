import {Graph, astar} from 'javascript-astar'

export default function sketch(p) {
  let mapImage
  let imageToDisplay
  let map = []
  let graph
  let resultWithDiagonals
  let width = 900
  let height = 900
  p.preload = async () => {
    mapImage = await p.loadImage('/api/images')
    imageToDisplay = await p.loadImage('/api/images/col')
  }

  p.setup = async () => {
    p.pixelDensity(1)
    p.frameRate(12)
    p.createCanvas(width, height)
    p.image(imageToDisplay, 0, 0)

    mapImage.loadPixels()

    for (let x = 0; x < width; x++) {
      map.push([])
      for (let y = 0; y < height; y++) {
        const index = (x + y * width) * 4
        map[x].push(Math.floor(mapImage.pixels[index + 1]))
      }
    }
    graph = new Graph(map, {diagonal: true, greyscaleWeights: true})
  }
  const pointOne = {x: null, y: null}
  const pointTwo = {x: null, y: null}
  const previousPaths = []
  p.draw = () => {
    p.smooth()
    p.noFill()
    if (previousPaths.length) {
      for (let i = 0; i < previousPaths.length; i++) {
        let resultPath = previousPaths[i]

        p.stroke(38, 166, 154)
        p.strokeWeight(4)
        p.beginShape()
        p.vertex(resultPath[0].x, resultPath[0].y)
        for (let j = 1; j < resultPath.length; j += 30) {
          p.vertex(resultPath[j].x, resultPath[j].y)
        }
        p.vertex(
          resultPath[resultPath.length - 1].x,
          resultPath[resultPath.length - 1].y
        )
        p.endShape()
        p.ellipse(
          resultPath[resultPath.length - 1].x,
          resultPath[resultPath.length - 1].y,
          15,
          15
        )
      }
    }
    p.noStroke()
    p.fill(38, 166, 154)
    if (pointOne.x) {
      p.ellipse(pointOne.x, pointOne.y, 15, 15)
    }
    // if (pointTwo.x) {
    //   p.ellipse(pointTwo.x, pointTwo.y, 15, 15)
    // }
  }

  p.mousePressed = () => {
    if (!pointOne.x && !pointOne.y) {
      pointOne.x = Math.ceil(p.mouseX)
      pointOne.y = Math.ceil(p.mouseY)
    } else {
      pointTwo.x = Math.ceil(p.mouseX)
      pointTwo.y = Math.ceil(p.mouseY)

      const end = graph.grid[pointTwo.x][pointTwo.y]
      const start = graph.grid[pointOne.x][pointOne.y]
      console.log('>>> ', start, end)
      resultWithDiagonals = astar.search(graph, start, end, {
        heuristic: astar.heuristics.diagonal,
        diagonal: true,
        closest: true
      })
      previousPaths.push(resultWithDiagonals)
    }
  }
}
