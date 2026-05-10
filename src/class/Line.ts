import Graph from './graph'
import Stop from './Stop'
import Vertex from './Vertex'

export default class Line {
  #graph: Graph
  #name: string
  #stops: Stop[]

  constructor(graph: Graph, name: string) {
    this.#graph = graph
    this.#name = name
    this.#stops = []
  }

  get name(): string {
    return this.#name
  }

  get stops(): Stop[] {
    return this.#stops
  }

  create(stops: string[]) {
    const { length } = stops

    if (length < 2)
      throw new Error('A minimum of 2 stops are required to create a line')

    for (let stop of stops) {
      const outgoing = this.#graph.createVertex(stop, true)
      const incoming = this.#graph.createVertex(stop, false)
      const point = new Stop(outgoing, incoming)
      this.stops.push(point)
    }

    for (let i = 0; i < length - 1; i++) {
      const current = this.stops[i].outgoing
      const next = this.stops[i + 1].outgoing
      current.bind(next)
    }

    this.stops[length - 1].outgoing.bind(this.stops[length - 1].incoming)

    for (let i = length - 1; i > 0; i--) {
      const current = this.stops[i].incoming
      const next = this.stops[i - 1].incoming
      current.bind(next)
    }

    this.stops[0].incoming.bind(this.stops[0].outgoing)
  }

  getStopByName(name?: string): Stop | null {
    if (!name) throw new Error('name cannot be unset')
    return this.#stops.find(({ outgoing }) => outgoing?.name === name) ?? null
  }

  getVertexByStopName(name: string, direction: 'up' | 'down'): Vertex | null {
    const point = this.getStopByName(name)
    if (!point) return null
    return direction === 'up' ? point.outgoing : point.incoming
  }

  getStopIndex(name: string): number {
    return this.stops.findIndex((p) => p.outgoing?.name === name)
  }

  getPreviousStop(from: string) {
    const index = this.getStopIndex(from)
    if (index <= 0) return null
    return this.#stops[index - 1]
  }

  getNextStop(from: string) {
    const index = this.getStopIndex(from)
    if (index < 0 || index === this.stops.length - 1) return null
    return this.#stops[index + 1]
  }

  connect(line: Line, name: string) {
    if (!name) throw new Error('no name on connection point')

    const point = this.getStopByName(name)
    const otherPoint = line.getStopByName(name)

    if (!point) throw new Error(`No stop named: ${name} on line ${this.name}`)
    if (!otherPoint)
      throw new Error(`No stop named: ${name} on line ${line.name}`)

    const next = this.getNextStop(name)
    const previous = this.getPreviousStop(name)

    const otherNext = line.getNextStop(name)
    const otherPrevious = line.getPreviousStop(name)

    if (otherPrevious) point.outgoing.bind(otherPrevious.incoming)
    if (otherNext) point.outgoing.bind(otherNext.outgoing)
    if (otherPrevious) point.incoming.bind(otherPrevious.incoming)
    if (otherNext) point.incoming.bind(otherNext.outgoing)

    if (previous) otherPoint.outgoing.bind(previous.incoming)
    if (next) otherPoint.outgoing.bind(next.outgoing)
    if (previous) otherPoint.incoming.bind(previous.incoming)
    if (next) otherPoint.incoming.bind(next.outgoing)

    /* console.log({
      point: point.toString(),
      otherNext: otherNext?.toString(),
      otherPrevious: otherPrevious?.toString(),
      next: next?.toString(),
      previous: previous?.toString(),
    }) */
  }

  toString(): string {
    let parts: string[] = []

    this.stops.forEach(({ outgoing, incoming }) => {
      let str = ''
      str += outgoing.toString()
      str += ' <-> '
      str += incoming.toString()
      parts.push(str + '\n')
    })

    const sep = ' - '
    return `Line ${this.name}: \n${sep}${parts.join(sep)}`
  }
}
