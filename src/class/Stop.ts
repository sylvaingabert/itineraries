import Vertex from './Vertex'

export default class Stop {
  #outgoing: Vertex
  #incoming: Vertex

  constructor(outgoing: Vertex, incoming: Vertex) {
    this.#outgoing = outgoing
    this.#incoming = incoming
  }

  get outgoing(): Vertex {
    return this.#outgoing
  }

  get incoming(): Vertex {
    return this.#incoming
  }

  toString() {
    let str = ''
    str += this.#outgoing ? this.#outgoing.toString() : ''
    if (this.#incoming) {
      str += ' + ' + this.#incoming.toString()
    }
    return str
  }
}
