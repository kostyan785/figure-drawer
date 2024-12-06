import { SVG } from '@svgdotjs/svg.js'
import { Shape } from './index'

// Типы движков
export type engineType = 'canvas' | 'svg'

// Свойства движка
export interface EngineProps<T> {
    selector?: string
    width?: T
    height?: T
}

// Свойства фабрики движков
export type EngineFactoryProps<T> = EngineProps<T> & {
    engine?: engineType
    getEngine: (engine: engineType, selector: any, width: any, height: any) => any
}

// Движок
export type Engine<T> = EngineProps<T> & {
    clear(): void
    drawCircle(x: number, y: number, radius: number, color: string): any
    drawLine(aX: number, aY: number, bX: number, bY: number, width: number, color: string): any
    drawText(text: string, x: number, y: number, size: number, color: string): any
}

// SVG движок
export class SVGEngine implements Engine<string> {
    private readonly _svg: any

    constructor(
        public readonly selector: string,
        public readonly width: string,
        public readonly height: string
    ) {
        this._svg = SVG().addTo(selector).height(height).width(width)
    }
    clear() {
        this._svg?.clear()
    }
    drawCircle(x: number, y: number, radius: number, color: string): any {
        return this._svg?.circle(radius).cx(x).cy(y).fill(color)
    }
    drawLine(aX: number, aY: number, bX: number, bY: number, width: number, color: string): any {
        return this._svg?.line(aX, aY, bX, bY).stroke({ width, color })
    }
    drawText(text: string, x: number, y: number, size: number, color: string): any {
        return this._svg?.text(text).move(x, y).font({ size, fill: color })
    }
}

// Canvas движок
export class CanvasEngine implements Engine<number> {
    private readonly _ctx: any

    constructor(
        public readonly selector: string,
        public readonly width: number,
        public readonly height: number
    ) {
        const domElem = document.querySelector(selector) as HTMLCanvasElement
        domElem.width = width
        domElem.height = height
        this._ctx = domElem?.getContext('2d')
    }
    clear() {
        this._ctx?.clearRect(0, 0, this.width, this.height)
    }
    drawCircle(x: number, y: number, radius: number, color: string): any {
        this._ctx.beginPath()
        this._ctx?.arc(x, y, radius, 0, 360)
        this._ctx.closePath()
        this._ctx.fillStyle = color
        return this._ctx.fill()
    }
    drawLine(aX: number, aY: number, bX: number, bY: number, width: number, color: string): any {
        this._ctx.beginPath()
        this._ctx.moveTo(aX, aY)
        this._ctx.lineTo(bX, bY)
        this._ctx.closePath()
        this._ctx.lineWidth = width
        this._ctx.strokeStyle = color
        return this._ctx.stroke()
    }
    drawText(text: string, x: number, y: number, size: number, color: string): any {
        this._ctx.font = `${size}px Arial`
        this._ctx.fillStyle = `${color}`
        return this._ctx.fillText(text, x, y)
    }
}

// Фабрика движков
export class EngineFactory {
    static getEngine(engine: engineType, selector: string, width: any, height: any) {
        try {
            switch (engine) {
                case 'svg':
                    return new SVGEngine(selector, width, height)
                case 'canvas':
                    return new CanvasEngine(selector, width, height)
            }
            throw new Error('Bad engine')
        } catch (error) {
            console.warn(`${error}`)
        }
    }
}

// Рисующий
export class Drawer {
    constructor(
        public readonly engine?: Engine<any>
    ) {
        engine?.clear()
    }
    draw(shapes: Array<Shape>): void {
        shapes.forEach(shapeItem => {
            shapeItem.sides.forEach(side => {
                if (side?.display) {
                    this.engine?.drawLine(
                        side.a.point.x, side.a.point.y,
                        side.b.point.x, side.b.point.y,
                        side?.style?.width || 3,
                        side?.style?.color || '#00F'
                    )
                }
            })
            shapeItem.angles.forEach(angle => {
                if (angle?.display) {
                    this.engine?.drawCircle(
                        angle.point.x, angle.point.y,
                        angle?.style?.width || 10,
                        angle?.style?.color || '#0f0'
                    )
                }
            })
            const _labelObj = shapeItem.label
            if (_labelObj && _labelObj?.display) {
                this.engine?.drawText(
                    `${_labelObj.text || ''}`,
                    _labelObj.point.x, _labelObj.point.y,
                    _labelObj?.style?.width || 20,
                    _labelObj?.style?.color || '#f06'
                )
            }
        })
    }
    clear(): void {
        this.engine?.clear()
    }
}