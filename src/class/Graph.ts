import Vertex from './Vertex'

export default class Graph {
  #root: Vertex

  constructor(vertex: Vertex) {
    this.#root = vertex
  }

  get root() {
    return this.#root
  }
}
