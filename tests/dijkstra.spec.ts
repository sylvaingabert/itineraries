import { beforeEach, expect, describe, it } from 'vitest'
import Graph from '../src/class/graph'
import { dijkstra } from '../src/libs/dijkstra'
import Vertex from '../src/class/Vertex'

let cross: Graph
let b: Vertex
let b1: Vertex
let b2: Vertex
let b4: Vertex
let b5: Vertex
let bt: Vertex

let bp1: Vertex
let bp2: Vertex
let bp4: Vertex
let bp5: Vertex

let c: Vertex
let c1: Vertex
let c2: Vertex
let c4: Vertex
let c5: Vertex
let ct: Vertex

let cp1: Vertex
let cp2: Vertex
let cp4: Vertex
let cp5: Vertex

describe('dijkstra', () => {
  beforeEach(() => {
    cross = new Graph()

    let i = 0

    b = cross.createVertex('B')

    i = 1
    b1 = cross.createVertex('B' + i)

    i++
    b2 = cross.createVertex('B' + i)

    i++
    b4 = cross.createVertex('B' + i)

    i++
    b5 = cross.createVertex('B' + i)

    i++
    bt = cross.createVertex('BT')

    i = 1
    bp1 = cross.createVertex('Bp' + i)

    i++
    bp2 = cross.createVertex('Bp' + i)

    i++
    bp4 = cross.createVertex('Bp' + i)

    i++
    bp5 = cross.createVertex('Bp' + i)

    c = cross.createVertex('C')

    i = 1
    c1 = cross.createVertex('C' + i)

    i++
    c2 = cross.createVertex('C' + i)

    i++
    c4 = cross.createVertex('C' + i)

    i++
    c5 = cross.createVertex('C' + i)

    ct = cross.createVertex('CT')

    i = 1
    cp1 = cross.createVertex('Cp' + i)

    i++
    cp2 = cross.createVertex('Cp' + i)

    i++
    cp4 = cross.createVertex('Cp' + i)

    i++
    cp5 = cross.createVertex('Cp' + i)

    b.bind(b1)
    b1.bind(b2)
    b2.bind(b4)
    b4.bind(b5)
    b5.bind(bt)
    bt.bind(bp1)

    bp1.bind(bp2)
    bp2.bind(bp4)
    bp4.bind(bp5)
    bp5.bind(b)

    c.bind(c1)
    c1.bind(c2)
    c2.bind(c4)
    c4.bind(c5)
    c5.bind(ct)
    ct.bind(cp1)

    cp1.bind(cp2)
    cp2.bind(cp4)
    cp4.bind(cp5)
    cp5.bind(c)

    function connect(
      connectors: {
        from: Vertex
        outs: [Vertex, Vertex, Vertex]
      }[],
    ) {
      for (let connector of connectors) {
        console.log(connector.from.toString())
        for (let out of connector.outs) {
          console.log('--', out.toString())
          connector.from.bind(out)
        }
      }
    }

    connect([
      {
        from: b2,
        outs: [b4, c4, cp4],
      },
      {
        from: bp2,
        outs: [b2, cp4, c4],
      },
      {
        from: c2,
        outs: [c4, bp4, b4],
      },
      {
        from: cp2,
        outs: [cp4, b4, bp4],
      },
    ])
  })

  it('B > BT v', () => {
    const path = dijkstra(cross, b, bt)
    expect(path).not.toBe(null)
    expect(path?.toString()).toBe('B > B1 > B2 > B3 > B4 > BT (weight: 5)')
  })

  it('B > C v', () => {
    const path = dijkstra(cross, b, c)
    expect(path).not.toBe(null)
    expect(path?.toString()).toBe('B > B1 > B2 > Cp3 > Cp4 > C (weight: 5)')
  })

  it('B > CT v', () => {
    const path = dijkstra(cross, b, ct)
    expect(path).not.toBe(null)
    expect(path?.toString()).toBe('B > B1 > B2 > C3 > C4 > CT (weight: 5)')
  })

  it('C > CT v', () => {
    const path = dijkstra(cross, c, ct)
    expect(path).not.toBe(null)
    expect(path?.toString()).toBe('C > C1 > C2 > C3 > C4 > CT (weight: 5)')
  })

  it('C > B v', () => {
    const path = dijkstra(cross, c, b)
    expect(path).not.toBe(null)
    expect(path?.toString()).toBe('C > C1 > C2 > Bp3 > Bp4 > B (weight: 5)')
  })

  it('C > BT v', () => {
    const path = dijkstra(cross, c, bt)
    expect(path).not.toBe(null)
    expect(path?.toString()).toBe('C > C1 > C2 > B3 > B4 > BT (weight: 5)')
  })

  it('BT > B v', () => {
    const path = dijkstra(cross, bt, b)
    expect(path).not.toBe(null)
    expect(path?.toString()).toBe('BT > Bp1 > Bp2 > Bp3 > Bp4 > B (weight: 5)')
  })

  it('BT > C v', () => {
    const path = dijkstra(cross, bt, c)
    expect(path).not.toBe(null)
    expect(path?.toString()).toBe('BT > Bp1 > Bp2 > Cp3 > Cp4 > C (weight: 5)')
  })

  it('BT > CT v', () => {
    const path = dijkstra(cross, bt, ct)
    expect(path).not.toBe(null)
    expect(path?.toString()).toBe('BT > Bp1 > Bp2 > C3 > C4 > CT (weight: 5)')
  })

  it('CT > C v', () => {
    const path = dijkstra(cross, ct, c)
    expect(path).not.toBe(null)
    expect(path?.toString()).toBe('CT > Cp1 > Cp2 > Cp3 > Cp4 > C (weight: 5)')
  })

  it('CT > B v', () => {
    const path = dijkstra(cross, ct, b)
    expect(path).not.toBe(null)
    expect(path?.toString()).toBe('CT > Cp1 > Cp2 > Bp3 > Bp4 > B (weight: 5)')
  })

  it('CT > BT v', () => {
    const path = dijkstra(cross, ct, bt)
    expect(path).not.toBe(null)
    expect(path?.toString()).toBe('CT > Cp1 > Cp2 > B3 > B4 > BT (weight: 5)')
  })
})
