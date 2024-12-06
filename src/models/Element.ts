// Точка
export class Point {
  constructor(
    public readonly x: number,
    public readonly y: number,
  ) { }
}

// Стиль
export class Style {
  constructor(
    public readonly color: string,
    public readonly width: number,
  ) { }
}

// Элемент
export class Element {
  constructor(
    private _display: boolean = true
  ) { }
  get display() { return this._display }
  show() { this._display = true }
  hide() { this._display = false }
}

// Вершина
export class Vertex extends Element {
  constructor(
    public readonly point: Point,
    public readonly style?: Style,
  ) { super() }
}

// Линия
export class Line extends Element {
  constructor(
    public readonly a: Vertex,
    public readonly b: Vertex,
    public readonly style?: Style,
  ) { super() }
}

// Лейбл
export class Label extends Element {
  constructor(
    public text: string,
    public readonly point: Point,
    public readonly style?: Style,
  ) { super() }
}