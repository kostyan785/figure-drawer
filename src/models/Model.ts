import { Point, Line, Vertex, Label, Style } from './index'

// Модель
export class Model {
  constructor(
    public readonly vertices: Vertex[],
    public readonly lines: Line[],
    public readonly label?: Label,
  ) { }
}

// Данные модели
type elementData = {
  text?: string
  x: Vertex['point']['x']
  y: Vertex['point']['y']
  style: Style
}
interface ModelData {
  type: string
  lineColor: string
  label: elementData
  vertices: Array<elementData>
}

// Инициализация модели
export function initModel(modelData: ModelData): Model {
  const vertices = modelData.vertices.map(vertex => new Vertex(
    new Point(vertex.x, vertex.y),
    new Style(vertex.style.color, vertex.style.width)
  ))
  const lines = vertices.map((vertex, index) => {
    const other = vertices[index < vertices.length - 1 ? index + 1 : 0]
    return new Line(vertex, other, new Style(modelData.lineColor || 'yellow', 10))
  })
  const _labelObj = modelData.label
  const label = new Label(
    `${_labelObj.text || ''}`,
    new Point(_labelObj.x, _labelObj.y),
    new Style(_labelObj.style.color, _labelObj.style.width)
  )

  return new Model(vertices, lines, label)
}
