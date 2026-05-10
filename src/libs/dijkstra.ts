import Graph from '../class/graph'
import Path from '../class/Path'
import Vertex from '../class/Vertex'
import { walkAllPaths } from './walkAllPaths'

export function dijkstra(
  graph: Graph,
  from: Vertex | null,
  to: Vertex | null,
): Path | null {
  if (from === null) throw new Error('"from" cannot be null')
  if (to === null) throw new Error('"to" cannot be null')

  let shortest: Path | null = null
  walkAllPaths(graph, from, to, (path) => {
    if (shortest === null || path.weight < shortest.weight) shortest = path
  })
  return shortest
}
