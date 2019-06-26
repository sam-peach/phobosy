import astar, {Node} from './astar'

function getIndex(x, y, width) {
  return (x + y * width) * 4
}

function neighbors(x, y, width, height, map) {
  return [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [+1, 0],
    [-1, +1],
    [0, +1],
    [+1, +1]
  ]
    .map(pair => [pair[0] + x, pair[1] + y])
    .filter(pair => {
      if (pair[0] < 0 || pair[1] < 0) return false
      if (pair[0] >= width || pair[1] >= height) return false
      return true
    })
    .map(pair => map[pair[1]][pair[0]])
}

export default function sketch(p) {
  let mapImage
  let map = []
  let graph
  let resultWithDiagonals
  let width = p.displayWidth
  let height = p.displayHeight
  width = 500
  height = 500
  p.preload = async () => {
    mapImage = await p.loadImage('/api/images')
  }

  p.setup = async () => {
    p.pixelDensity(1)
    p.frameRate(12)
    p.createCanvas(width, height)
    p.image(mapImage, 0, 0)

    mapImage.loadPixels()

    for (let x = 0; x < width; x++) {
      map.push([])
      for (let y = 0; y < height; y++) {
        const index = getIndex(x, y, width)
        const r = mapImage.pixels[index],
          g = mapImage.pixels[index + 1],
          b = mapImage.pixels[index + 2]
        // map of all the nodes so we can make the edges without dupes
        // a little hacky but we need to because of how the astar works
        map[x].push(
          new Node({
            r,
            g,
            b,
            x,
            y
          })
        )
      }
    }
    // now for each node, we want an edge from each pixel to any neighbors
    // map.forEach(row => row.forEach(node => {
    //   neighbors(node.data.x, node.data.y, width, height)
    //     .map(pair => map[pair[1]][pair[0]])
    //     .forEach(neigh => {
    //       const diff =
    //         (node.data.r + neigh.data.r) +
    //         (node.data.g + node.data.g) +
    //         (node.data.b + node.data.b);

    //       node.addDirectionalEdgeTo(neigh, Math.abs(diff));
    //     })
    // }))

    // graph = new Graph(map, { diagonal: true })
  }
  const pointOne = {x: null, y: null}
  const pointTwo = {x: null, y: null}
  const previousPaths = []
  p.draw = () => {
    p.smooth()
    p.noFill()
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
    }

    p.noStroke()
    p.fill(38, 166, 154)
    if (pointOne.x) {
      p.ellipse(pointOne.x, pointOne.y, 15, 15)
    }
    if (pointTwo.x) {
      p.ellipse(pointTwo.x, pointTwo.y, 15, 15)
    }
  }

  p.mousePressed = () => {
    if (!pointOne.x && !pointOne.y) {
      pointOne.x = Math.ceil(p.mouseX)
      pointOne.y = Math.ceil(p.mouseY)
    } else {
      pointTwo.x = Math.ceil(p.mouseX)
      pointTwo.y = Math.ceil(p.mouseY)

      const end = map[pointTwo.x][pointTwo.y]
      const start = map[pointOne.x][pointOne.y]
      console.log('>>> ', start, end)
      const maxDist = Math.abs(
        pointOne.x - pointTwo.x + (pointOne.y - pointTwo.y)
      )
      const neighborFn = node =>
        neighbors(node.data.x, node.data.y, width, height, map)
      const costFn = to =>
        (Math.abs(end.data.x - to.x) + Math.abs(end.data.y - to.y)) / maxDist

      resultWithDiagonals = astar(map, start, end, neighborFn, costFn)
      previousPaths.push(resultWithDiagonals)
    }
  }
}

// (nextNode, currNode, start, end) => {
//   if (arguments.length === 1) {
//     return 0;
//   }
//   const diff = Math.abs((nextNode.x - end.x) + (nextNode.y - end.y))
//   return diff / maxDist
// }
