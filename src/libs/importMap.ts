import { readFileSync } from 'node:fs'
import Graph from '../class/graph'
import Line from '../class/Line'

type Asset = {
  id: string
  name: string
  links: {
    id: number
    distance: number
  }
}

export function importMap(file: string): {
  graph: Graph
  line: Record<string, Line>
} {
  const data = importJsonFile(file)
  const graph = new Graph()

  const { lines: importedLines, stations } = data

  const mapLines: Record<string, Line> = {}

  for (let { name, stops } of importedLines) {
    const line = new Line(graph, name)
    line.create(stops)
    mapLines[name] = line
  }

  for (let { lines, stop } of stations) {
    const line1 = mapLines[lines[0]]
    const line2 = mapLines[lines[1]]
    line1.connect(line2, stop)
  }

  return {
    graph,
    line: mapLines,
  }
}

function importJsonFile(path: string) {
  const data = readFileSync(path, 'utf8')
  return JSON.parse(data)
}
