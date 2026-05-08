export default class Vertex {
  #name: string
  #depth: number
  #links: Vertex[]

  constructor(name: string) {
    this.#name = name
    this.#depth = 0
    this.#links = []
  }

  set depth(value: number) {
    this.#depth = value
  }

  get depth() {
    return this.#depth
  }

  get name() {
    return this.#name
  }

  get links() {
    return this.#links
  }

  linkedTo(vertex: Vertex) {
    vertex.depth = this.#depth + 1
    this.#links.push(vertex)
  }
}
