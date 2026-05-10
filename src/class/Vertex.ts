import Edge from './Edge'

export default class Vertex {
  #id: number
  #name: string
  #edges: Edge[]
  #outgoing: Boolean

  constructor(id: number, name: string, outgoing: boolean) {
    this.#id = id
    this.#name = name
    this.#edges = []
    this.#outgoing = outgoing
  }

  get edges(): Edge[] {
    return this.#edges
  }

  get id(): number {
    return this.#id
  }

  get name(): string {
    return this.#name
  }

  get outgoing() {
    return this.#outgoing
  }

  bind(vertex: Vertex, weight: number = 1): void {
    this.#edges.push(new Edge(this, vertex, weight))
  }

  unbind(vertex: Vertex): void {
    this.#edges = this.#edges.filter((edge) => edge.to !== vertex)
  }

  equals(vertex: Vertex): boolean {
    return this.id === vertex.id
  }

  findEdgeWith(to: Vertex): Edge | null {
    return this.edges.find((edge) => edge.to === to) ?? null
  }

  toString() {
    const edges = this.#edges.map((e) => e.toString())
    const str = edges.length ? ` (edges: ${edges.join(', ')})` : ''
    return `${this.name} (${this.outgoing})${str}`
  }
}
