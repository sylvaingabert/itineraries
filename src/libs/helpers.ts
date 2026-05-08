import Vertex from '../class/Vertex'

export function verticesToString(vertices: Vertex[]) {
  return vertices.map(({ name }) => name).join(', ')
}
