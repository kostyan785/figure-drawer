import { Line, Vertex, Label, Model } from './index'

// Фигура
export class Shape {
  protected _label?: Label
  protected _angles: Vertex[] = []
  protected _sides: Line[] = []

  constructor(
    public readonly model: Model
  ) {
    try {
      if (!this.validate()) {
        throw new Error("Incorrect model type was recieved")
      }
      else { this.init() }
    } catch (warning) { console.warn(warning) }
  }

  init() {
    this.label = this.model.label
    this.sides = this.model.lines
    this.angles = this.model.vertices
  }

  validate(): boolean {
    throw new Error("Abstract method 'validate' must be implemented.")
  }
  
  className(): string {
    throw new Error("Abstract method 'className' must be implemented.")
  }

  get label() { return this._label }
  set label(label: Label | undefined) { this._label = label }
  get sides() { return this._sides }
  set sides(sides: Line[]) { this._sides = sides }
  get angles() { return this._angles }
  set angles(angles: Vertex[]) { this._angles = angles }

  hideAngles() { this.angles.forEach(angle => { angle.hide() }) }
  showAngles() { this.angles.forEach(angle => { angle.show() }) }
  hideSides() { this.sides.forEach(side => { side.hide() }) }
  showSides() { this.sides.forEach(side => { side.show() }) }
  hideLabel() { this.label?.hide() }
  showLabel() { this.label?.show() }
}

// Квадрат
export class Square extends Shape {
  constructor(
    public readonly model: Model
  ) { super(model) }
  validate() {
    if (this.model.vertices.length === 4 && this.model.lines.length === 4) {
      return true
    }
    return false
  }
  className() { return 'Square' }
}

// Треугольник
export class Triangle extends Shape {
  constructor(
    public readonly model: Model
  ) { super(model) }
  validate() {
    if (this.model.vertices.length === 3 && this.model.lines.length === 3) {
      return true
    }
    return false
  }
  className() { return 'Triangle' }
}

// Динамическая фигура
export class DynamicShape extends Shape {
  private _shapeClasses: { [param: string]: any } = { Square, Triangle }
  private _shape: Shape

  constructor(className: string, model: Model) {
    super(model)
    return this._shape = new this._shapeClasses[
      className.charAt(0).toUpperCase() + className.slice(1)
    ](model)
  }
  validate() { return true }
}