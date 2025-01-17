export class Point {
  constructor(
    public readonly x: number,
    public readonly y: number,
  ) {}
}

export class Vertex {
  constructor(
    public readonly point: Point,
  ) {}
}

export class Line {
  constructor(
    public readonly a: Vertex,
    public readonly b: Vertex,
  ) {}
}

export class Model {
  constructor(
    public readonly vertices: Vertex[],
    public readonly lines: Line[],
  ) {}
}


/**
 * Генерация модели.
 * Рефачить необязательно :)
 */
export function initModel(): Model {
  const vertices = [[10, 10], [310, 10], [310, 310], [10, 310]].map(values => new Vertex(new Point(values[0], values[1])));
  const lines = vertices.map((vertex, index) => {
    const other = vertices[index < vertices.length - 1? index + 1 : 0];
    return new Line(vertex, other);
  });

  return new Model(vertices, lines);
}
