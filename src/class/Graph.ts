import { verticesToString } from '../libs/helpers'
import Vertex from './Vertex'

type Vertices = Record<number, Vertex>

export default class Graph {
  #vertices: Vertices
  #num: number

  constructor() {
    this.#vertices = {}
    this.#num = 0
  }

  get vertices(): Vertices {
    return this.#vertices
  }

  createVertex(name: string, up: boolean) {
    const vertex = new Vertex(this.#num + 1, name, up)
    this.addVertex(vertex)
    return vertex
  }

  exists(vertex: Vertex): boolean {
    return !!this.#vertices[vertex.id]
  }

  addVertex(vertex: Vertex) {
    if (this.exists(vertex)) {
      throw new Error(
        `Impossible to add this vertex: ${vertex.name}. It already exists !`,
      )
    }
    this.#vertices[vertex.id] = vertex
    this.#num = this.#num + 1
  }

  getVertexById(id: number): Vertex | null {
    return this.#vertices[id] ?? null
  }

  getVertexByName(search: string): Vertex | null {
    for (let id in this.#vertices) {
      if (this.#vertices[id].name === search) return this.#vertices[id]
    }
    return null
  }

  removeVertex(vertex: Vertex) {
    if (!this.exists(vertex)) {
      throw new Error(
        `Impossible to remove this vertex: ${vertex.name}. It does not exist !`,
      )
    }
    for (const id in this.#vertices) {
      const current = this.#vertices[id]
      current.unbind(vertex)
    }
    delete this.#vertices[vertex.id]
    this.#num = this.#num - 1
  }

  toString(): string {
    return verticesToString(Object.values(this.#vertices))
  }
}
