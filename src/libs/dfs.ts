import Vertex from '../class/Vertex'
import { FSCallback } from '../types'

export default function dfs(vertex: Vertex | null, callback: FSCallback) {
  if (vertex === null) throw new Error('"vertex" must not be null')
  _dfs(vertex, callback, [], null)
}

function _dfs(
  vertex: Vertex,
  callback: FSCallback,
  visited: Vertex[],
  previousVertex: Vertex | null,
) {
  if (!visited.includes(vertex)) {
    visited.push(vertex)
    if (callback(vertex, previousVertex) === false) return
  }

  for (let edge of vertex.edges) {
    _dfs(edge.to, callback, visited, vertex)
  }
}
