import Graph from '../class/graph'
import Path from '../class/Path'
import Stop from '../class/Stop'
import { dijkstra } from './dijkstra'

export function shortestPath(graph: Graph, from: Stop | null, to: Stop | null) {
  if (!from) throw new Error('"from" can not be null !')
  if (!to) throw new Error('"to" can not be null !')

  return dijkstra(graph, from.outgoing, to.outgoing)
}
