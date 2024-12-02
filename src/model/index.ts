import { getModelFieldNames } from "../utils";
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

export class Room {
  constructor(
    public readonly lines: Line[],
  ) {}
}

export type Coords = number[][]; // TODO; надо бы поточнее типизировать, в пока так

export const initRoom = (coords: Coords): Room => {
  const vertices: Vertex[] = coords.map(x => new Vertex( new Point(x[0], x[1])));
    const lines: Line[] = vertices.map((vertex, index) => {
    const other = vertices[index < vertices.length - 1? index + 1 : 0];
    return new Line(vertex, other);
  });
  return new Room(lines);
};

export const initCustomModel = (shapes?: string[]): Model => {
  const model = initModel();
  const shapeList = shapes || getModelFieldNames(model);
  const modelClone = {
    ...model,
    lines: shapeList.includes('lines') ? model.lines : [],
    vertices: shapeList.includes('vertices') ? model.vertices : [],
  };

  return modelClone;
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
