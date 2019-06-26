import heap from 'heap'
import UID from './id'
export class Node {
  constructor(data) {
    this.id = UID.new()
    this.data = {...data, id: this.id}
  }
}

// graph should be a 2d array of nodes. neighbors are the 8 surrounding
// connected by edges created by addDirectionalEdgeTo
export default function search(
  graph,
  start,
  end,
  getNeighborsFn = () => [],
  costFn = () => 0,
  heuristicFn = () => 0
) {
  // set of nodes already evaluated
  const closed = new Set()
  // will represent paths to the "best" node
  const cameFrom = new Map()
  // holds the raw edge weight, smaller means more optimal
  const gScore = new Map(graph.flat().map(n => [n.id, Infinity]))
  // holds the combined g+h weight, smaller means more optimal
  const fScore = new Map(graph.flat().map(n => [n.id, Infinity]))

  const idToNode = new Map(graph.flat().map(n => [n.id, n]))

  // currently discovered nodes that are not evaluated yet
  // takes a scoring function
  const open = new heap((n1, n2) => fScore.get(n1.id) - fScore.get(n2.id))
  open.push(start)

  // the cost to go to itself is 0
  gScore.set(start.id, 0)
  // combined score would be 0 + h(x)
  fScore.set(start.id, heuristicFn(start.data))

  open.push(start)

  while (open.size() > 0) {
    // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
    const currNode = open.pop()

    // End case -- result has been found, return the traced path.
    if (currNode === end) {
      return pathTo(end, start, cameFrom, idToNode)
    }

    closed.add(currNode.id)
    getNeighborsFn(currNode).forEach(neighbor => {
      const cost = costFn(currNode.data, neighbor.data)
      const nextNode = neighbor
      if (closed.has(nextNode.id)) {
        return
      }

      const newGScore = gScore.get(currNode.id) + cost
      if (!open.has(nextNode.id)) {
        open.push(nextNode) // new neighbor, visit eventually
      } else if (newGScore >= gScore.get(nextNode.id)) {
        return // return cause worse score and don't wanna update it
      }

      cameFrom.set(nextNode.id, currNode.id)
      gScore.set(nextNode.id, newGScore)
      const newHScore = heuristicFn(
        nextNode.data,
        currNode.data,
        start.data,
        end.data
      )
      fScore.set(nextNode.id, newGScore + newHScore)
    })
  }
  console.log('end, start', end, start)
  return pathTo(end, start, cameFrom, idToNode)
}

function pathTo(endID, startID, cameFrom, idToNode) {
  let path = []
  console.log(arguments)
  let tail = idToNode.get(startID)
  while (tail.id !== startID || tail.id !== endID) {
    path = [...path, tail.data]
    const nodeID = cameFrom.get(tail.id)
    tail = idToNode.get(nodeID)
  }
  return path
}
