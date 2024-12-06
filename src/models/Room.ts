import { Shape } from './index'
import { gaussianArea } from '../utils'

// Комната
export class Room {

  constructor(
    public readonly shapes: Shape[]
  ) {
    this.calculateArea()
  }

  calculateArea() {
    this.shapes.forEach((shapeItem, index) => {
      const area = gaussianArea(shapeItem.angles)
      const _labelObj = this.shapes[index].label
      if (_labelObj) {
        _labelObj.text = `${area}`
      }
    })
  }
}