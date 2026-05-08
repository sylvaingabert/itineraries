import { verticesToString } from '../libs/helpers'
import Vertex from './Vertex'

export default class Path {
  #vertices: Vertex[]

  constructor() {
    this.#vertices = []
  }

  get length() {
    return this.#vertices.length
  }

  set vertices(values: Vertex[]) {
    this.#vertices = values
  }

  get vertices() {
    return this.#vertices
  }

  addVertex(vertex: Vertex) {
    this.#vertices.push(vertex)
  }

  addVertices(vertices: Vertex[]) {
    this.#vertices.push(...vertices)
  }

  includes(vertex: Vertex) {
    return this.#vertices.includes(vertex)
  }

  toString() {
    return verticesToString(this.#vertices)
  }
}
