import {easyAStar} from 'easy-astar'
import {Graph, astar} from 'javascript-astar'

export default function sketch(p) {
  let mapImage
  let map = []
  let graph
  let resultWithDiagonals
  let width = p.windowWidth
  let height = p.windowHeight
  p.preload = async () => {
    mapImage = await p.loadImage('/api/images')
  }

  p.setup = async () => {
    p.pixelDensity(1)
    p.frameRate(12)
    p.createCanvas(width, height, p.P2D)
    p.image(mapImage, 0, 0)
    mapImage.loadPixels()

    for (let x = 0; x < width; x++) {
      map.push([])
      for (let y = 0; y < height; y++) {
        const index = (x + y * width) * 4
        let avg = p.map(
          Math.floor(
            (mapImage.pixels[index] +
              mapImage.pixels[index + 1] +
              mapImage.pixels[index + 3]) /
              3
          ),
          0,
          255,
          255,
          0
        )

        map[x].push(avg ** 2)
      }
    }

    graph = new Graph(map, {diagonal: true})
  }
  const pointOne = {x: null, y: null}
  const pointTwo = {x: null, y: null}
  const previousPaths = []
  p.draw = () => {
    p.noFill()
    p.strokeWeight(5)
    if (previousPaths.length) {
      for (let i = 0; i < previousPaths.length; i++) {
        let resultPath = previousPaths[i]

        p.noFill()
        p.stroke(0)
        p.strokeWeight(5)
        p.beginShape()
        for (let j = 0; j < resultPath.length; j += 30) {
          p.vertex(resultPath[j].x, resultPath[j].y)
        }
        p.vertex(pointTwo.x, pointTwo.y)
        p.endShape()
      }
      // p.noLoop()
      // p.line(pointOne.x, pointOne.y ,pointTwo.x, pointTwo.y )
    }
    // p.noStroke()
    p.fill(0)
    if (pointOne.x) {
      p.ellipse(pointOne.x, pointOne.y, 10, 10)
    }
    if (pointTwo.x) {
      p.ellipse(pointTwo.x, pointTwo.y, 10, 10)
    }
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

      resultWithDiagonals = astar.search(graph, start, end, {
        heuristic: astar.heuristics.diagonal
      })

      previousPaths.push(resultWithDiagonals)
    }
  }
}
