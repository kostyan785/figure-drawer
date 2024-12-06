import { Vertex } from '../models/index'

export const gaussianArea = (vertices: Vertex[]): number => {
    let area = 0
    let xFirst = 0
    let yFirst = 0
    for (let i = 0; i < vertices.length; i++) {
        if (i < vertices.length - 1) {
            xFirst += vertices[i].point.x * vertices[i + 1].point.y
            yFirst += vertices[i].point.y * vertices[i + 1].point.x
        }
        else {
            xFirst += vertices[i].point.x * vertices[0].point.y
            yFirst += vertices[i].point.y * vertices[0].point.x
        }
    }
    area = (xFirst - yFirst) / 2

    return area
}    