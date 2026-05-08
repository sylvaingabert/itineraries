import Vertex from '../class/Vertex'
import { FSCallback } from '../types'

export default function dfs(vertex: Vertex, callback: FSCallback) {
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

  for (let currentVertex of vertex.links) {
    _dfs(currentVertex, callback, visited, vertex)
  }
}
