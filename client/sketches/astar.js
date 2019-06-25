import heap from './binaryHeap'
import UID from './id'
class Node {
  constructor(val) {
    this.val = this
    this.edgesTo = []
    this.edgesFrom = []
    this.f = Infinity
    this.h = Infinity
    this.id = UID.new()
  }
  addDirectionalEdgeTo(to, weight) {
    const edge = new Edge(this, to, weight)
    this.edgesTo.push(edge)
    to.edgesFrom.push(edge)
  }
}

class Edge {
  constructor(from, to, weight) {
    this.cost = weight
    this.to = to
    this.from = from
  }
}

// graph should be an array of Nodes
// connected by edges created by addDirectionalEdgeTo
export default function search(graph, start, end, heuristic = () => 0) {
  // set of nodes already evaluated
  const closed = new Set()
  // currently discovered nodes that are not evaluated yet
  // takes a scoring function
  const open = new heap(n => n.f)

  // will represent paths to the "best" node
  const cameFrom = new Map()
  // holds the raw edge weight, smaller means more optimal
  const gScore = new Map(graph.map(n => [n.id, Infinity]))
  // holds the combined g+h weight, smaller means more optimal
  const fScore = new Map(graph.map(n => [n.id, Infinity]))

  // the cost to go to itself is 0
  gScore.set(start.id, 0)
  // combined score would be 0 + h(x)
  fScore.set(start.id, heuristic(start))

  open.push(start)

  while (open.size() > 0) {
    // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
    const currNode = open.pop()

    // End case -- result has been found, return the traced path.
    if (currentNode === end) {
      return pathTo(currentNode)
    }
  }
}
