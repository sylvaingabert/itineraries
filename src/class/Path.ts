import { verticesToString } from '../libs/helpers'
import Vertex from './Vertex'

export default class Path {
  #vertices: Vertex[]
  #weight: number

  constructor() {
    this.#vertices = []
    this.#weight = 0
  }

  set vertices(values: Vertex[]) {
    this.#vertices = values
  }

  get vertices(): Vertex[] {
    return this.#vertices
  }

  get weight(): number {
    return this.#weight
  }

  addVertex(vertex: Vertex): void {
    if (this.#vertices.length === 0) {
      this.#vertices.push(vertex)
      return
    }

    const lastVertex = this.#vertices[this.#vertices.length - 1] ?? null
    this.#vertices.push(vertex)
    const edge = lastVertex.findEdgeWith(vertex)
    if (!edge) {
      throw new Error(`This is no edge between "${lastVertex}" and "${vertex}"`)
    }
    this.#weight += edge.weight
  }

  to(excludedVertex: Vertex): Path {
    const newPath = new Path()
    for (let current of this.#vertices) {
      if (current !== excludedVertex) newPath.addVertex(current)
      else break
    }
    return newPath
  }

  includes(vertex: Vertex): boolean {
    return this.#vertices.includes(vertex)
  }

  toString(weight: boolean = true, unique: boolean = false): string {
    if (this.#vertices.length === 0) return ''
    const str = verticesToString(this.#vertices, unique)
    if (weight) return `${str} (weight: ${this.#weight})`
    return str
  }
}
