import Graph from './class/graph'
import Line from './class/Line'
import { dijkstra } from './libs/dijkstra'
import { importMap } from './libs/importMap'
import { shortestPath } from './libs/path'

function main() {
  /*
  const graph = new Graph()
  const a = graph.createVertex('A')
  const b = graph.createVertex('B')
  const c = graph.createVertex('C')
  const d = graph.createVertex('D')
  const e = graph.createVertex('E')
  const f = graph.createVertex('F')
  const g = graph.createVertex('G')

  a.bind(b)
  a.bind(c)
  a.bind(e)
  b.bind(d)
  b.bind(f)
  c.bind(g)
  e.bind(f)

  const dfsPath = new Path()
  dfs(a, (current) => {
    dfsPath.addVertex(current)
  })
  const dfsPathStr = dfsPath.toString()
  if (dfsPathStr !== 'A, B, D, F, C, G, E') {
    console.error('DFS path is wrong !', { dfsPathStr })
    return
  }

  const bfsPath = new Path()
  bfs(a, (current) => {
    bfsPath.addVertex(current)
  })
  const bfsPathStr = bfsPath.toString()
  if (bfsPathStr !== 'A, B, C, E, D, F, G') {
    console.error('BFS path is wrong !', { bfsPathStr })
    return
  }
*/
  //

  const { graph, line } = importMap('maps/tcl.json')

  /* const graph = new Graph()

  const lineB = new Line(graph, 'B')
  lineB.create([
    'Saint-Genis-Laval Hôpital Sud',
    'Oullins Centre',
    "Gare d'Oullins",
    'Stade de Gerland - Le LOU',
    'Debourg',
    'Place Jean Jaurès',
    'Jean Macé',
    'Saxe - Gambetta',
    'Place Guichard - Bourse du Travail',
    'Gare Part-Dieu - Vivier Merle',
    'Brotteaux',
    'Charpennes - Charles Hernu',
  ])

  const lineD = new Line(graph, 'D')
  lineD.create([
    'Gare de Vaise',
    'Valmy',
    'Gorge de Loup',
    'Vieux Lyon - Cathédrale Saint-Jean',
    'Bellecour',
    'Guillotière - Gabriel Péri',
    'Saxe - Gambetta',
    'Garibaldi',
    'Sans Souci',
    'Monplaisir - Lumière',
    'Grange Blanche',
    'Laënnec',
    'Mermoz - Pinel',
    'Parilly',
    'Gare de Vénissieux',
  ])

  lineB.connect(lineD, 'Saxe - Gambetta')

  console.log(lineB.toString())
  console.log(lineD.toString())

  const line = {
    B: lineB,
    D: lineD,
  } */

  //const from = line['D'].getStopByName('Monplaisir - Lumière')
  //const to = line['B'].getStopByName('Jean Macé')i
  //const from = line['B'].getStopByName('Jean Macé')
  //const to = line['D'].getStopByName('Monplaisir - Lumière')

  const from = line['B'].getStopByName('Oullins Centre')
  const to = line['F1'].getStopByName('Minimes - Théâtres Romains')

  const path = shortestPath(graph, from, to)
  console.log('::>', path?.toString(true, false))
}

main()
