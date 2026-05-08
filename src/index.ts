import { exit } from 'node:process'
import Graph from './class/graph'
import Path from './class/Path'
import Vertex from './class/Vertex'
import bfs from './libs/bfs'
import dfs from './libs/dfs'

function main() {
  const a = new Vertex('A')
  const b = new Vertex('B')
  const c = new Vertex('C')
  const d = new Vertex('D')
  const e = new Vertex('E')
  const f = new Vertex('F')
  const g = new Vertex('G')

  a.linkedTo(b)
  a.linkedTo(c)
  a.linkedTo(e)

  b.linkedTo(d)
  b.linkedTo(f)

  c.linkedTo(g)

  e.linkedTo(f)

  const graph = new Graph(a)

  const dfsPath = new Path()
  dfs(graph.root, (current) => {
    dfsPath.addVertex(current)
  })
  const dfsPathStr = dfsPath.toString()
  if (dfsPathStr !== 'A, B, D, F, C, G, E') {
    console.error('DFS path is wrong !', { dfsPathStr })
    exit(1)
  }

  const bfsPath = new Path()
  bfs(graph.root, (current) => {
    bfsPath.addVertex(current)
  })
  const bfsPathStr = bfsPath.toString()
  if (bfsPathStr !== 'A, B, C, E, D, F, G') {
    console.error('BFS path is wrong !', { bfsPathStr })
    exit(1)
  }
}

main()
