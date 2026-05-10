import { beforeEach, expect, describe, it } from 'vitest'
import Graph from '../src/class/graph'
import { dijkstra } from '../src/libs/dijkstra'
import Vertex from '../src/class/Vertex'
import Line from '../src/class/Line'

describe('dijkstra-2', () => {
  let graph: Graph
  let lineA: Line
  let lineB: Line
  let lineD: Line
  let lineC: Line

  beforeEach(() => {
    graph = new Graph()

    lineA = new Line(graph, 'A')
    lineA.create([
      'Perrache',
      'Ampère - Victor Hugo',
      'Bellecour',
      'Cordeliers',
      'Hôtel de ville',
      'Foch',
      'Masséna',
      'Charpennes',
      'République - Villeurbanne',
      'Gratte-ciel',
    ])

    lineD = new Line(graph, 'D')
    lineD.create([
      'Saxe - Gambetta',
      'Guillotière - Gabriel Péri',
      'Bellecour',
      'Vieux Lyon - Cathédrale Saint-Jean',
      'Gorge de Loup',
    ])

    lineA.connect(lineD, 'Bellecour')

    lineB = new Line(graph, 'B')
    lineB.create([
      'Charpennes',
      'Brotteaux',
      'Gare Part-Dieu - Vivier Merle',
      'Place Guichard - Bourse du Travail',
      'Saxe - Gambetta',
      'Jean Macé',
      'Place Jean Jaurès',
    ])

    lineB.connect(lineD, 'Saxe - Gambetta')
    lineB.connect(lineA, 'Charpennes')

    lineC = new Line(graph, 'C')
    lineC.create([
      'Hôtel de ville',
      'Croix-Paquet',
      'Croix-Rousse',
      'Hénon',
      'Cuire',
    ])

    lineA.connect(lineC, 'Hôtel de ville')
  })

  it('Place Jean Jaurès > Gratte-ciel', () => {
    const from = lineB.getVertexByStopName('Place Jean Jaurès', 'down')
    const to = lineA.getVertexByStopName('Gratte-ciel', 'up')
    const path = dijkstra(graph, from, to)
    expect(path).not.toBe(null)
    expect(path?.toString()).toBe(
      'Place Jean Jaurès > Jean Macé > Saxe - Gambetta > Place Guichard - Bourse du Travail > Gare Part-Dieu - Vivier Merle > Brotteaux > Charpennes > République - Villeurbanne > Gratte-ciel (weight: 8)',
    )
  })

  it('Place Jean Jaurès > Croix-Rousse', () => {
    const from = lineB.getVertexByStopName('Place Jean Jaurès', 'down')
    const to = lineC.getVertexByStopName('Croix-Rousse', 'up')
    const path = dijkstra(graph, from, to)
    expect(path).not.toBe(null)
    expect(path?.toString()).toBe(
      'Place Jean Jaurès > Jean Macé > Saxe - Gambetta > Guillotière - Gabriel Péri > Bellecour > Cordeliers > Hôtel de ville > Croix-Paquet > Croix-Rousse (weight: 8)',
    )
  })

  it('Place Jean Jaurès > Hôtel de ville', () => {
    const from = lineB.getVertexByStopName('Place Jean Jaurès', 'down')
    const to = lineA.getVertexByStopName('Hôtel de ville', 'up')
    const path = dijkstra(graph, from, to)
    expect(path).not.toBe(null)
    expect(path?.toString()).toBe(
      'Place Jean Jaurès > Jean Macé > Saxe - Gambetta > Guillotière - Gabriel Péri > Bellecour > Cordeliers > Hôtel de ville (weight: 6)',
    )
  })

  it('Place Jean Jaurès > Perrache', () => {
    const from = lineB.getVertexByStopName('Place Jean Jaurès', 'down')
    const to = lineA.getVertexByStopName('Perrache', 'down')
    const path = dijkstra(graph, from, to)
    expect(path).not.toBe(null)
    expect(path?.toString()).toBe(
      'Place Jean Jaurès > Jean Macé > Saxe - Gambetta > Guillotière - Gabriel Péri > Bellecour > Ampère - Victor Hugo > Perrache (weight: 6)',
    )
  })

  it('Hôtel de ville > Perrache', () => {
    const from = lineA.getVertexByStopName('Hôtel de ville', 'down')
    const to = lineA.getVertexByStopName('Perrache', 'down')
    const path = dijkstra(graph, from, to)
    expect(path).not.toBe(null)
    expect(path?.toString()).toBe(
      'Hôtel de ville > Cordeliers > Bellecour > Ampère - Victor Hugo > Perrache (weight: 4)',
    )
  })

  it('Hôtel de ville > Saxe - Gambetta', () => {
    const from = lineA.getVertexByStopName('Hôtel de ville', 'down')
    const to = lineD.getVertexByStopName('Saxe - Gambetta', 'down')
    const path = dijkstra(graph, from, to)
    expect(path).not.toBe(null)
    expect(path?.toString()).toBe(
      'Hôtel de ville > Cordeliers > Bellecour > Guillotière - Gabriel Péri > Saxe - Gambetta (weight: 4)',
    )
  })

  it('Hôtel de ville > Gorge de Loup', () => {
    const from = lineA.getVertexByStopName('Hôtel de ville', 'down')
    const to = lineD.getVertexByStopName('Gorge de Loup', 'up')
    const path = dijkstra(graph, from, to)
    expect(path).not.toBe(null)
    expect(path?.toString()).toBe(
      'Hôtel de ville > Cordeliers > Bellecour > Vieux Lyon - Cathédrale Saint-Jean > Gorge de Loup (weight: 4)',
    )
  })

  it('Saxe - Gambetta > Gorge de Loup', () => {
    const from = lineD.getVertexByStopName('Saxe - Gambetta', 'up')
    const to = lineD.getVertexByStopName('Gorge de Loup', 'up')
    const path = dijkstra(graph, from, to)
    expect(path).not.toBe(null)
    expect(path?.toString()).toBe(
      'Saxe - Gambetta > Guillotière - Gabriel Péri > Bellecour > Vieux Lyon - Cathédrale Saint-Jean > Gorge de Loup (weight: 4)',
    )
  })

  it('Saxe - Gambetta > Hôtel de ville', () => {
    const from = lineD.getVertexByStopName('Saxe - Gambetta', 'up')
    const to = lineA.getVertexByStopName('Hôtel de ville', 'up')
    const path = dijkstra(graph, from, to)
    expect(path).not.toBe(null)
    expect(path?.toString()).toBe(
      'Saxe - Gambetta > Guillotière - Gabriel Péri > Bellecour > Cordeliers > Hôtel de ville (weight: 4)',
    )
  })

  it('Saxe - Gambetta > Perrache', () => {
    const from = lineD.getVertexByStopName('Saxe - Gambetta', 'up')
    const to = lineA.getVertexByStopName('Perrache', 'down')
    const path = dijkstra(graph, from, to)
    expect(path).not.toBe(null)
    expect(path?.toString()).toBe(
      'Saxe - Gambetta > Guillotière - Gabriel Péri > Bellecour > Ampère - Victor Hugo > Perrache (weight: 4)',
    )
  })

  it('Perrache > Hôtel de ville', () => {
    const from = lineA.getVertexByStopName('Perrache', 'up')
    const to = lineA.getVertexByStopName('Hôtel de ville', 'up')
    const path = dijkstra(graph, from, to)
    expect(path).not.toBe(null)
    expect(path?.toString()).toBe(
      'Perrache > Ampère - Victor Hugo > Bellecour > Cordeliers > Hôtel de ville (weight: 4)',
    )
  })

  it('Perrache > Saxe - Gambetta', () => {
    const from = lineA.getVertexByStopName('Perrache', 'up')
    const to = lineD.getVertexByStopName('Saxe - Gambetta', 'down')
    const path = dijkstra(graph, from, to)
    expect(path).not.toBe(null)
    expect(path?.toString()).toBe(
      'Perrache > Ampère - Victor Hugo > Bellecour > Guillotière - Gabriel Péri > Saxe - Gambetta (weight: 4)',
    )
  })

  it('Perrache > Gorge de Loup', () => {
    const from = lineA.getVertexByStopName('Perrache', 'up')
    const to = lineD.getVertexByStopName('Gorge de Loup', 'up')
    const path = dijkstra(graph, from, to)
    expect(path).not.toBe(null)
    expect(path?.toString()).toBe(
      'Perrache > Ampère - Victor Hugo > Bellecour > Vieux Lyon - Cathédrale Saint-Jean > Gorge de Loup (weight: 4)',
    )
  })

  it('Gorge de Loup > Saxe - Gambetta', () => {
    const from = lineD.getVertexByStopName('Gorge de Loup', 'down')
    const to = lineD.getVertexByStopName('Saxe - Gambetta', 'down')
    const path = dijkstra(graph, from, to)
    expect(path).not.toBe(null)
    expect(path?.toString()).toBe(
      'Gorge de Loup > Vieux Lyon - Cathédrale Saint-Jean > Bellecour > Guillotière - Gabriel Péri > Saxe - Gambetta (weight: 4)',
    )
  })

  it('Gorge de Loup > Hôtel de ville', () => {
    const from = lineD.getVertexByStopName('Gorge de Loup', 'down')
    const to = lineA.getVertexByStopName('Hôtel de ville', 'up')
    const path = dijkstra(graph, from, to)
    expect(path).not.toBe(null)
    expect(path?.toString()).toBe(
      'Gorge de Loup > Vieux Lyon - Cathédrale Saint-Jean > Bellecour > Cordeliers > Hôtel de ville (weight: 4)',
    )
  })

  it('Gorge de Loup > Perrache', () => {
    const from = lineD.getVertexByStopName('Gorge de Loup', 'down')
    const to = lineA.getVertexByStopName('Perrache', 'down')
    const path = dijkstra(graph, from, to)
    expect(path).not.toBe(null)
    expect(path?.toString()).toBe(
      'Gorge de Loup > Vieux Lyon - Cathédrale Saint-Jean > Bellecour > Ampère - Victor Hugo > Perrache (weight: 4)',
    )
  })

  it('Gorge de Loup > Cordeliers', () => {
    const from = lineD.getVertexByStopName('Gorge de Loup', 'down')
    const to = lineA.getVertexByStopName('Cordeliers', 'up')
    const path = dijkstra(graph, from, to)
    expect(path).not.toBe(null)
    expect(path?.toString()).toBe(
      'Gorge de Loup > Vieux Lyon - Cathédrale Saint-Jean > Bellecour > Cordeliers (weight: 3)',
    )
  })
})
