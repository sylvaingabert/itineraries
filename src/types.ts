import Vertex from './class/Vertex'

export type FSCallback = (
  vertex: Vertex,
  previousVertex: Vertex | null,
) => boolean | undefined
