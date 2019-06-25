class Node {
  constructor(val) {
    this.val = this
    this.edgesTo = []
    this.edgesFrom = []
  }
  addDirectionalEdge(weight, to) {
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
