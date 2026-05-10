import Vertex from '../class/Vertex'

export function verticesToString(vertices: Vertex[], unique: boolean) {
  let list: string[] = []
  if (unique) {
    for (let i = 0; i < vertices.length; i++) {
      const name = vertices[i].name

      if (i === 0) {
        list.push(name)
        continue
      }

      if (name !== list[i - 1]) {
        list.push(name)
      }
    }
  } else {
    list = vertices.map(({ name }) => name)
  }

  return list.join(' > ')
}
