import Vertex from './Vertex'

export default class Edge {
  #from: Vertex
  #to: Vertex
  #weight: number

  constructor(from: Vertex, to: Vertex, weight: number) {
    this.#from = from
    this.#to = to
    this.#weight = weight
  }

  get from(): Vertex {
    return this.#from
  }

  get to(): Vertex {
    return this.#to
  }

  get weight(): number {
    return this.#weight
  }

  toString(): string {
    return `${this.from.name} [${this.#from.outgoing}] > ${this.#to.name} [${this.#to.outgoing}] (${this.weight})`
  }
}
