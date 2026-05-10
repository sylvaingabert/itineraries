import Graph from '../class/graph'
import Path from '../class/Path'
import Vertex from '../class/Vertex'

type OnPath = (path: Path) => void

export function walkAllPaths(
  graph: Graph,
  from: Vertex,
  to: Vertex,
  onPath: OnPath,
): void {
  walk(graph, from, to, onPath)
}

function walk(
  graph: Graph,
  from: Vertex,
  to: Vertex,
  onPath: OnPath,
  path: Path = new Path(),
) {
  if (path.includes(from)) return

  if (from.equals(to)) {
    path.addVertex(from)
    onPath(path)
    return
  }

  for (let edge of from.edges) {
    const currentPath = path.to(from)
    currentPath.addVertex(from)
    walk(graph, edge.to, to, onPath, currentPath)
  }
}
