import * as React from "react"
import "./App.css"
import shapesData from "./data/shapes.json"
import {
  EngineFactory,
  Engine,
  engineType,
  initModel,
  Drawer,
  DynamicShape,
  Room,
} from "./models"
import { Controls } from "./Controls"

// Приложение отрисовки фигур
const App = () => {
  const sceneWidth: number = 410
  const sceneHeight: number = 410

  const svgRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  const [engineType, setEngineType] = React.useState<engineType>("svg")
  const [engine, setEngine] = React.useState<Engine<any> | undefined>()
  const [drawer, setDrawer] = React.useState<Drawer | undefined>()

  // Инициализация объектов фигур
  const [shapes] = React.useState(
    shapesData.map((shape) => new DynamicShape(shape.type, initModel(shape)))
  )

  // Комната
  new Room(shapes)

  // Метод отрисовки фигур
  const draw = React.useCallback(() => {
    drawer?.clear()
    drawer?.draw(shapes)
  }, [drawer, shapes])

  // Обработка при инициализации движка
  const handleEngineChange = React.useCallback(() => {
    const canvas = canvasRef.current
    const svg = svgRef.current
    if (canvas) { canvas.width = 0; canvas.height = 0 }
    if (svg) { svg.innerHTML = "" }

    setEngine(EngineFactory.getEngine(engineType, `#${engineType}`, sceneWidth, sceneHeight))
  }, [engineType])

  // Инициализация движка
  React.useEffect(() => handleEngineChange(), [engineType, handleEngineChange])

  // Инициализация отрисовщика
  React.useEffect(() => {
    if (engine) { setDrawer(new Drawer(engine)) }
  }, [engine, setDrawer, engineType])

  // Запуск отрисовки
  React.useEffect(() => draw(), [drawer, engineType, draw])

  // Стиль блоков
  const divStyle: { [param: string]: number | string } = {
    height: "1000px", width: "50%", float: "left",
  }

  // Рендер приложения
  return (
    <>
      <p>
        <span>Engine({engineType}): </span>
        <button onClick={() => setEngineType("canvas")}>canvas</button>
        <button onClick={() => setEngineType("svg")}>svg</button>
      </p>
      <div style={{ ...divStyle }}>
        <div id={"svg"} ref={svgRef} />
        <canvas id={"canvas"} ref={canvasRef} />
      </div>
      <div style={{ ...divStyle }}>
        <Controls shapes={shapes} draw={draw} divStyle={divStyle} />
      </div>
    </>
  )
}

export default App
