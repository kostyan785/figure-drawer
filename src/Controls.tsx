import * as React from "react"
import { Checkbox } from "./components/Checkbox"
import { Shape } from "./models"

interface ControlsProps {
  shapes: Shape[]
  divStyle: any
  draw: () => void
}

// Контролы управления свойствами отрисовки
export const Controls = ({ shapes, draw, divStyle }: ControlsProps) => {
  const [handledShapeTypes, setHandledShapeTypes] = React.useState<string[]>(["Square", "Triangle",])

  // Обработка видимости элементов
  const handleVisibilityChanged = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "Angles" | "Sides" | "Label"
  ) => {
    if (event.target.checked) {
      shapes.forEach((shape) => {
        handledShapeTypes.includes(shape.className()) && shape[`show${type}`]()
      })
    } else {
      shapes.forEach((shape) => {
        handledShapeTypes.includes(shape.className()) && shape[`hide${type}`]()
      })
    }
    draw()
  }

  // Обработка выбора фигуры
  const handleShapeTypesChanged = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "Square" | "Triangle"
  ) => {
    if (event.target.checked) {
      setHandledShapeTypes((prev) => [...prev, type])
    } else {
      setHandledShapeTypes((prev) => [...prev.filter((el) => el !== type)])
    }
  }

  return (
    <>
      <div style={{ ...divStyle, ...{background: '#ebdef0', height: 'auto'} }}>
        <Checkbox
          text={"Angles"}
          checked={true}
          onChange={(event) => handleVisibilityChanged(event, "Angles")}
        />
        <Checkbox
          text={"Sides"}
          checked={true}
          onChange={(event) => handleVisibilityChanged(event, "Sides")}
        />
        <Checkbox
          text={"Labels"}
          checked={true}
          onChange={(event) => handleVisibilityChanged(event, "Label")}
        />
      </div>
      <div style={{ ...divStyle, ...{background: '#d5f5e3', height: 'auto'} }}>
        <Checkbox
          text={"Square"}
          checked={true}
          onChange={(event) => handleShapeTypesChanged(event, "Square")}
        />
        <Checkbox
          text={"Triangle"}
          checked={true}
          onChange={(event) => handleShapeTypesChanged(event, "Triangle")}
        />
      </div>
    </>
  )
}
