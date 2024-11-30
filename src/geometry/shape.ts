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

export class Shape {
  constructor(
    public readonly vertices: Vertex[],
    public readonly lines: Line[],
  ) {}
}
