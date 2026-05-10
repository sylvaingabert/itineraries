import Vertex from '../class/Vertex'
import { FSCallback } from '../types'

export default function bfs(vertex: Vertex | null, callback: FSCallback) {
  if (vertex === null) throw new Error('"vertex" must not be null')
  _bfs([vertex], callback, [], null)
}

function _bfs(
  vertices: Vertex[],
  callback: FSCallback,
  visited: Vertex[],
  previousVertex: Vertex | null,
) {
  const nextRow = !visited.length ? vertices : aggregateNextVertices(vertices)
  if (nextRow.length > 0) {
    for (let vertex of nextRow) {
      if (!visited.includes(vertex)) {
        visited.push(vertex)
        if (callback(vertex, previousVertex) === false) return
        previousVertex = vertex
      }
    }
    _bfs(nextRow, callback, visited, previousVertex)
  }
}

function aggregateNextVertices(vertices: Vertex[]) {
  return vertices.reduce((acc, current) => {
    return [...acc, ...current.edges.map(({ to }) => to)]
  }, [] as Vertex[])
}
